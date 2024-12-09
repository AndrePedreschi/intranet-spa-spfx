import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { useZustandStore } from "../store";
import {
  formatArrayToString,
  formatStringToArray,
} from "../utils/formatLikesViews";

export type TGetNewsListResponse = {
  Id: number;
  Title: string;
  LikedUsers: string;
  Views: number;
  LinkBanner: string;
  Descricao: string;
  Created: string;
  AuthorId: number;
  ViewedUsers?: string;
};
const urlSite = useZustandStore.getState().urlSite;
/**
 * Recupera as 4 notícias mais visualizadas de uma lista do SharePoint, ordenadas pela contagem de visualizações em ordem decrescente.
 *
 * Este método faz uma requisição à API REST do SharePoint para obter os itens da lista "Noticias" e retorna as 4 notícias com o maior número de visualizações. A lista é filtrada e ordenada para garantir que as notícias mais populares sejam recuperadas.
 *
 * @param {WebPartContext} context - O contexto do WebPart que inclui informações sobre o site e a página atual.
 * @param {number} amountOfNews - Quantidade de itens a ser buscado.
 * @returns {Promise<TGetNewsListResponse[]>} Uma promessa que resolve com uma lista das 4 notícias mais visualizadas, cada uma com os campos: Id, Title, LikedUsers, Views, LinkBanner, Descricao, Created, AuthorId.
 * @throws {Error} Lança um erro se a requisição falhar.
 *
 * @example
 * const mostViewedNews = await getMostViewedNewsList(context, 4);
 * // A função retorna as 4 notícias mais visualizadas com os detalhes de cada uma.
 */
export const getMostViewedNewsList = async (
  context: WebPartContext,
  amountOfNews: number,
): Promise<TGetNewsListResponse[]> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('Noticias')/items`;
  const select = `?$select=Id,Title,LikedUsers,Views,LinkBanner,Descricao,Created,AuthorId`;
  const orderBy = `&$orderby=Views desc`;
  const top = `&$top=${amountOfNews}`;

  const response = await context.spHttpClient.get(
    `${urlBase}${select}${orderBy}${top}`,
    SPHttpClient.configurations.v1,
  );

  if (!response || (response && !response.ok)) {
    const responseText = await response.text();
    throw new Error(responseText);
  }

  const responseJson = await response.json();
  return responseJson.value;
};

/**
 * Recupera os detalhes de uma notícia específica pelo seu ID a partir de uma lista no SharePoint.
 *
 * Este método busca uma notícia na lista `Noticias` com base no `newsId` fornecido e retorna suas propriedades selecionadas.
 *
 * @param {WebPartContext} context - O contexto do WebPart que inclui informações sobre o site e a página atual.
 * @param {number} newsId - O ID da notícia a ser buscada.
 * @returns {Promise<TGetNewsListResponse>}
 * Um objeto contendo os detalhes da notícia no formato `TGetNewsListResponse`.
 * @throws {Error} Lança um erro se a requisição falhar ou se o item não for encontrado.
 *
 * @example
 * const newsId = 123;
 * const news = await getNewsById(context, newsId);
 * console.log("Detalhes da notícia:", news);
 */
export const getNewsById = async (
  context: WebPartContext,
  newsId: number,
): Promise<TGetNewsListResponse> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('Noticias')/items(${newsId})`;
  const select = `?$select=Id,Title,LikedUsers,Views,LinkBanner,Descricao,Created,AuthorId`;

  const response = await context.spHttpClient.get(
    `${urlBase}${select}`,
    SPHttpClient.configurations.v1,
  );

  if (!response || (response && !response.ok)) {
    const responseText = await response.text();
    throw new Error(responseText);
  }

  const responseJson = await response.json();
  return responseJson;
};

/**
 * Recupera a lista de notícias paginada do SharePoint.
 *
 * Este método permite a obtenção de notícias em partes, utilizando o recurso de paginação do SharePoint com o skiptoken.
 *
 * @param {WebPartContext} context - O contexto do WebPart que inclui informações sobre o site e a página atual.
 * @param {number} pageSize - O número de itens a serem recuperados por página.
 * @param {string} [skipToken] - O token de paginação para buscar a próxima página. Se omitido, busca a página seguinte.
 * @returns {Promise<{ data: TGetNewsListResponse[]; nextSkipToken: string | null }>}
 * Um objeto contendo:
 * - `data`: Uma lista de objetos no formato `TGetNewsListResponse` contendo as notícias recuperadas.
 * - `nextSkipToken`: O token de paginação para a próxima página, ou `null` se não houver mais páginas.
 * @throws {Error} Lança um erro se a requisição falhar.
 *
 * @example
 * const [param, setParam] = useState<string>("");
 * const itemsPerPage = 2;
 *
 * const getData = useCallback(
 *   async (url?: string) => {
 *     if (context) {
 *       try {
 *         const { data, nextSkipToken } = await getNewsListPaginated(
 *           context,
 *           itemsPerPage,
 *           url,
 *         );
 *
 *         if (nextSkipToken) {
 *           setParam(nextSkipToken);
 *         } else {
 *           console.log("Final da lista");
 *         }
 *
 *         console.log("Itens da página atual:", data);
 *       } catch (error) {
 *         console.error("Erro ao buscar dados paginados:", error);
 *       }
 *     }
 *   },
 *   [context],
 * );
 */
export const getNewsListPaginated = async (
  context: WebPartContext,
  pageSize: number,
  skipToken?: string | null,
): Promise<{
  data: TGetNewsListResponse[];
  nextSkipToken: string | null;
}> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('Noticias')/items`;
  const select = `?$select=ID,Title,LikedUsers,ViewedUsers,Views,LinkBanner,Descricao,Created,AuthorId`;
  const top = `&$top=${pageSize}`;
  const skipTokenParam = skipToken
    ? `&$skiptoken=${skipToken.replace("&", "%26")}`
    : "";

  const dataUrl = `${urlBase}${select}${top}${skipTokenParam}`;

  const dataResponse = await context.spHttpClient.get(
    dataUrl,
    SPHttpClient.configurations.v1,
  );

  if (!dataResponse.ok) {
    const errorText = await dataResponse.text();
    throw new Error(`Failed to get paginated items: ${errorText}`);
  }

  const responseJson = await dataResponse.json();

  const nextSkipToken: string | null = responseJson["@odata.nextLink"]
    ? new URL(responseJson["@odata.nextLink"]).searchParams.get("$skiptoken")
    : null;

  return {
    data: responseJson.value,
    nextSkipToken,
  };
};

/**
 * Recupera uma lista paginada de notícias de uma lista do SharePoint, utilizando uma URL de paginação simplificada.
 *
 * Este método permite obter itens em partes (paginação), com suporte a URLs de continuação para buscar as próximas páginas.
 *
 * @param {WebPartContext} context - O contexto do WebPart que inclui informações sobre o site e a página atual.
 * @param {number} pageSize - O número de itens a serem recuperados por página.
 * @param {string | null} [nextUrl] - A URL para buscar a próxima página. Se omitida, inicia na primeira página.
 * @returns {Promise<{ data: TGetNewsListResponse[]; nextSkipToken: string | null }>}
 * Um objeto contendo:
 * - `data`: Uma lista de objetos no formato `TGetNewsListResponse` contendo as notícias recuperadas.
 * - `nextSkipToken`: A URL para buscar a próxima página, ou `null` se não houver mais páginas.
 * @throws {Error} Lança um erro se a requisição falhar.
 *
 * @example
 * const [param, setParam] = useState<string>("");
 * const itemsPerPage = 2;
 *
 * const getData = useCallback(
 *   async (url?: string) => {
 *     if (context) {
 *       try {
 *         const { data, nextSkipToken } = await getNewsListPaginatedSimple(
 *           context,
 *           itemsPerPage,
 *           url,
 *         );
 *         if (nextSkipToken) setParam(nextSkipToken);
 *         console.log("Itens simples:", data);
 *       } catch (error) {
 *         console.error("Erro ao buscar dados paginados:", error);
 *       }
 *     }
 *   },
 *   [context],
 * );
 *
 */
export const getNewsListPaginatedSimple = async (
  context: WebPartContext,
  pageSize: number,
  nextUrl?: string | null,
): Promise<{ data: TGetNewsListResponse[]; nextSkipToken: string | null }> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('Noticias')/items`;
  const select = `?$select=ID,Title,LikedUsers,Views,LinkBanner,Descricao,Created,AuthorId`;
  const top = `&$top=${pageSize}`;

  const dataUrl = `${urlBase}${select}${top}`;

  const dataResponse = await context.spHttpClient.get(
    nextUrl || dataUrl,
    SPHttpClient.configurations.v1,
  );

  if (!dataResponse.ok) {
    const errorText = await dataResponse.text();
    throw new Error(`Failed to get paginated items: ${errorText}`);
  }

  const responseJson = await dataResponse.json();
  const nextSkipToken: string | null = responseJson["@odata.nextLink"]
    ? responseJson["@odata.nextLink"]
    : null;

  return {
    data: responseJson.value,
    nextSkipToken,
  };
};

/**
 * Atualiza o número de visualizações de uma notícia no SharePoint, incrementando em 1 o valor atual de visualizações.
 *
 * Este método recupera o item da notícia com base no ID fornecido, incrementa o contador de visualizações em 1 e atualiza o item no SharePoint.
 * A atualização é feita usando o método `MERGE` da API REST do SharePoint, e o cabeçalho `IF-MATCH` é utilizado para garantir que a atualização aconteça apenas se os dados não forem alterados por outro usuário entre o momento da leitura e da atualização.
 *
 * @param {WebPartContext} context - O contexto do WebPart que inclui informações sobre o site e a página atual.
 * @param {number} newsId - O ID da notícia cujas visualizações devem ser atualizadas.
 * @returns {Promise<void>} Uma promessa que resolve quando a operação de atualização for concluída com sucesso.
 * @throws {Error} Lança um erro se a requisição falhar em qualquer momento (ao recuperar o item ou ao atualizar as visualizações).
 *
 * @example
 * await updateNewsViews(context, 123);
 * // A função tentará incrementar o número de visualizações da notícia com ID 123.
 */
export const updateNewsViews = async (
  context: WebPartContext,
  newsId: number,
): Promise<void> => {
  const url = `${urlSite}/_api/web/lists/getbytitle('Noticias')/items(${newsId})`;
  const getItemResponse = await context.spHttpClient.get(
    url,
    SPHttpClient.configurations.v1,
  );

  if (!getItemResponse.ok) {
    const errorText = await getItemResponse.text();
    throw new Error(`Failed to retrieve item: ${errorText}`);
  }

  //podemos pegar o etag dessa maneira ou configurando o IF-MATCH assim: "IF-MATCH": (responseJson as any)["@odata.etag"],
  /* const etag = getItemResponse.headers.get("ETag");
  if (!etag) {
    throw new Error("Failed to retrieve ETag for the item.");
  } */

  const responseJson = await getItemResponse.json();

  const viewedUsers: number[] = formatStringToArray(responseJson.ViewedUsers);
  const user: number = context.pageContext.legacyPageContext.userId;

  if (!viewedUsers.find((userId: number) => userId === user)) {
    viewedUsers.push(user);
  }

  const body = JSON.stringify({
    Views: responseJson.Views + 1,
    ViewedUsers: formatArrayToString(viewedUsers),
  });

  const headers = {
    "X-HTTP-Method": "MERGE",
    "IF-MATCH": (responseJson as any)["@odata.etag"],
  };

  const updateResponse = await context.spHttpClient.post(
    url,
    SPHttpClient.configurations.v1,
    { body: body, headers: headers },
  );

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    throw new Error(`Failed to update Views: ${errorText}`);
  }
};

/**
 * Atualiza a lista de "likes" de uma notícia no SharePoint, adicionando ou removendo o usuário atual da lista de curtidas.
 *
 * Este método verifica se o usuário atual já curtiu a notícia. Caso já tenha curtido, ele remove o usuário da lista de curtidas. Se não, o usuário é adicionado à lista.
 *
 * @param {WebPartContext} context - O contexto do WebPart que inclui informações sobre o site e a página atual.
 * @param {number} newsId - O ID da notícia cujos "likes" devem ser atualizados.
 * @returns {Promise<void>} Uma promessa que resolve quando a operação de atualização for concluída com sucesso.
 * @throws {Error} Lança um erro se a requisição falhar em qualquer momento (ao recuperar o item ou ao atualizar os "likes").
 *
 * @example
 * await updateNewsLikes(context, 123);
 * // A função tentará adicionar ou remover o "like" do usuário atual para a notícia com ID 123.
 */
export const updateNewsLikes = async (
  context: WebPartContext,
  newsId: number,
): Promise<void> => {
  const url = `${urlSite}/_api/web/lists/getbytitle('Noticias')/items(${newsId})`;
  const getItemResponse = await context.spHttpClient.get(
    url,
    SPHttpClient.configurations.v1,
  );

  if (!getItemResponse.ok) {
    const errorText = await getItemResponse.text();
    throw new Error(`Failed to retrieve item: ${errorText}`);
  }

  const responseJson = await getItemResponse.json();

  const user: number = context.pageContext.legacyPageContext.userId;
  let likes: number[] = formatStringToArray(responseJson.LikedUsers);

  if (!likes.find((userId: number) => userId === user)) {
    likes.push(user);
  } else {
    likes = likes.filter((userId: number) => userId !== user);
  }

  const body = JSON.stringify({
    LikedUsers: formatArrayToString(likes),
  });

  const headers = {
    "X-HTTP-Method": "MERGE",
    "IF-MATCH": (responseJson as any)["@odata.etag"],
  };

  const updateResponse = await context.spHttpClient.post(
    url,
    SPHttpClient.configurations.v1,
    { body: body, headers: headers },
  );

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    throw new Error(`Failed to update Views: ${errorText}`);
  }
};

/**
 * Atualiza as informações de curtidas e visualizações de uma notícia na lista 'Noticias' do SharePoint.
 *
 * @param {WebPartContext} context - O contexto do web part do SharePoint, necessário para realizar requisições HTTP.
 * @param {number} newsId - O ID da notícia a ser atualizada.
 * @returns {Promise<{ likes: number; views: number }>} - Uma promessa que resolve com o número atualizado de curtidas e visualizações da notícia.
 * @throws {Error} - Lança um erro se a requisição falhar em obter ou atualizar os dados da notícia.
 *
 * @example
 * ```typescript
 * import { updateNewsLikesAndViews } from './services/updateNewsLikesAndViews';
 * import { WebPartContext } from '@microsoft/sp-webpart-base';
 *
 * async function handleNewsInteraction(context: WebPartContext, newsId: number) {
 *   try {
 *     const { likes, views } = await updateNewsLikesAndViews(context, newsId);
 *     console.log(`Notícia atualizada! Curtidas: ${likes}, Visualizações: ${views}`);
 *   } catch (error) {
 *     console.error('Erro ao atualizar curtidas e visualizações:', error);
 *   }
 * }
 * ```
 */
export const updateNewsLikesAndViews = async (
  context: WebPartContext,
  newsId: number,
): Promise<void> => {
  const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Noticias')/items(${newsId})`;

  const getItemResponse = await context.spHttpClient.get(
    url,
    SPHttpClient.configurations.v1,
  );

  if (!getItemResponse.ok) {
    const errorText = await getItemResponse.text();
    throw new Error(`Failed to retrieve item: ${errorText}`);
  }

  const responseJson = await getItemResponse.json();
  const user: number = context.pageContext.legacyPageContext.userId;

  let updatedViews = responseJson.Views || 0;
  let updatedLikedUsers: number[] = formatStringToArray(
    responseJson.LikedUsers,
  );

  const viewedUsers: number[] = formatStringToArray(responseJson.ViewedUsers);

  if (!updatedLikedUsers.includes(user)) {
    updatedLikedUsers.push(user);
    if (!viewedUsers.includes(user)) {
      viewedUsers.push(user);
      updatedViews += 1;
    }
  } else {
    updatedLikedUsers = updatedLikedUsers.filter(
      (userId: number) => userId !== user,
    );
  }

  const body = JSON.stringify({
    LikedUsers: formatArrayToString(updatedLikedUsers),
    Views: updatedViews,
    ViewedUsers: formatArrayToString(viewedUsers),
  });

  const headers = {
    "X-HTTP-Method": "MERGE",
    "IF-MATCH": (responseJson as any)["@odata.etag"],
  };

  const updateResponse = await context.spHttpClient.post(
    url,
    SPHttpClient.configurations.v1,
    { body, headers },
  );

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    throw new Error(`Failed to update Likes and Views: ${errorText}`);
  }
};
