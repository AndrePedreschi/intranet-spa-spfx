import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { useZustandStore } from "../store";

export type TGetCommentsListResponse = {
  Id: number;
  Likes: string;
  IdNoticia: number;
  Comentario: string;
  Created: string;
  AuthorId: number;
};
export type TRequestBody = {
  Likes: string;
  Comentario: string;
  IdNoticia: number;
};

const urlSite = useZustandStore.getState().urlSite;

/**
 * Obtém a lista de comentários associada a uma notícia específica no SharePoint.
 *
 * @param {WebPartContext} context - O contexto do WebPart que inclui informações do site e da página atual.
 * @param {number} newsId - O ID da notícia para a qual os comentários serão buscados.
 * @returns {Promise<TGetCommentsListResponse[]>} Uma promessa que resolve com uma lista de comentários.
 * @throws {Error} Lança um erro se a requisição falhar.
 *
 * @example
 * const comments = await getCommentsList(context, 123);
 * console.log(comments);
 * // Saída esperada:
 * // [
 * //   {
 * //     Id: 1,
 * //     Likes: "[45, 46]",
 * //     IdNoticia: 123,
 * //     Comentario: "Primeiro comentário.",
 * //     Created: "2024-11-22T10:00:00Z",
 * //     AuthorId: 45
 * //   },
 * //   {
 * //     Id: 2,
 * //     Likes: "[]",
 * //     IdNoticia: 123,
 * //     Comentario: "Segundo comentário.",
 * //     Created: "2024-11-22T11:00:00Z",
 * //     AuthorId: 46
 * //   }
 * // ]
 */
export const getCommentsList = async (
  context: WebPartContext,
  newsId: number,
): Promise<TGetCommentsListResponse[]> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('Comentarios')/items`;
  const select = `?$select=Id,Likes,IdNoticia,Comentario,Created,AuthorId`;
  const filter = `$filter=IdNoticia eq ${newsId}`;
  const orderBy = `&$orderby=Created asc`;

  const response = await context.spHttpClient.get(
    `${urlBase}${select}&${filter}&${orderBy}`,
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
 * Envia um novo comentário para a lista "Comentarios" no SharePoint.
 *
 * @param {WebPartContext} context - O contexto do WebPart que inclui informações do site e da página atual.
 * @param {TRequestBody} requestBody - O corpo da requisição contendo os dados do comentário.
 * @returns {Promise<{ msg: string }>} Uma promessa que resolve com uma mensagem de sucesso ao enviar o comentário.
 * @throws {Error} Lança um erro se a requisição falhar.
 *
 * @example
 * const requestBody = {
 *   Likes: "[]", // Inicialmente vazio
 *   Comentario: "Este é um novo comentário.",
 *   IdNoticia: 123
 * };
 *
 * const response = await postNewComment(context, requestBody);
 * console.log(response.msg);
 * // Saída esperada: "Comentário enviado com sucesso!"
 */
export const postNewComment = async (
  context: WebPartContext,
  requestBody: TRequestBody,
): Promise<{ msg: string }> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('Comentarios')/items`;

  const body = JSON.stringify(requestBody);

  const headers = {
    "X-HTTP-Method": "POST",
    "IF-MATCH": "*",
  };

  const updateResponse = await context.spHttpClient.post(
    urlBase,
    SPHttpClient.configurations.v1,
    { body: body, headers: headers },
  );

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    throw new Error(`Failed to update Views: ${errorText}`);
  }
  return { msg: "Comentário enviado com sucesso!" };
};

/**
 * Atualiza os "likes" de um comentário na lista "Comentarios" do SharePoint.
 *
 * Este método adiciona ou remove o ID do usuário atual da lista de "likes" de um comentário específico.
 *
 * @param {WebPartContext} context - O contexto do WebPart que inclui informações do site e da página atual.
 * @param {number} commentId - O ID do comentário na lista "Comentarios" que será atualizado.
 * @returns {Promise<void>} Uma promessa que resolve quando a atualização dos "likes" é concluída.
 * @throws {Error} Lança um erro se a recuperação ou a atualização do item falhar.
 *
 * @example
 * try {
 *   await updateCommentLikes(context, 123);
 *   console.log("Likes atualizados com sucesso!");
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
export const updateCommentLikes = async (
  context: WebPartContext,
  commentId: number,
): Promise<void> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('Comentarios')/items(${commentId})`;
  const getItemResponse = await context.spHttpClient.get(
    urlBase,
    SPHttpClient.configurations.v1,
  );

  if (!getItemResponse.ok) {
    const errorText = await getItemResponse.text();
    throw new Error(`Failed to retrieve item: ${errorText}`);
  }

  const responseJson = await getItemResponse.json();

  const user: string = context.pageContext.legacyPageContext.userId;
  let likes: string[] = JSON.parse(responseJson.Likes);

  if (likes === null) {
    likes = [];
    likes.push(user);
  } else if (!likes.find((userId: string) => userId === user)) {
    likes.push(user);
  } else {
    likes = likes.filter((userId: string) => userId !== user);
  }

  const body = JSON.stringify({
    Likes: JSON.stringify(likes),
  });

  const headers = {
    "X-HTTP-Method": "MERGE",
    "IF-MATCH": (responseJson as any)["@odata.etag"],
  };

  const updateResponse = await context.spHttpClient.post(
    urlBase,
    SPHttpClient.configurations.v1,
    { body: body, headers: headers },
  );

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    throw new Error(`Failed to update Views: ${errorText}`);
  }
};
