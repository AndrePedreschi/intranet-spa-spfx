import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export type TGetNewsListResponse = {
  Id: number;
  Title: string;
  Likes: string;
  Views: number;
  LinkBanner: string;
  Descricao: string;
  Created: string;
  AuthorId: number;
};

export const getMostViewedNewsList = async (
  context: WebPartContext,
): Promise<TGetNewsListResponse> => {
  const urlBase = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Noticias')/items`;
  const select = `?$select=Id,Title,Likes,Views,LinkBanner,Descricao,Created,AuthorId`;
  const orderBy = `&$orderby=Views desc`;
  const top = `&$top=4`;

  const response = await context.spHttpClient.get(
    `${urlBase}${select}&${orderBy}&${top}`,
    SPHttpClient.configurations.v1,
  );

  if (!response || (response && !response.ok)) {
    const responseText = await response.text();
    throw new Error(responseText);
  }

  const responseJson = await response.json();
  return responseJson.value;
};

//trabalhando
export const getNewsListPaginated = async (
  context: WebPartContext,
): Promise<any> => {
  const urlBase = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Noticias')/items`;
  const select = `?$select=ID,Title,Likes,Views,LinkBanner,Descricao,Created,AuthorId`;
  const orderBy = `&$orderby=Views desc`;
  const top = `&$top=4`;

  const response = await context.spHttpClient.get(
    `${urlBase}${select}&${orderBy}&${top}`,
    SPHttpClient.configurations.v1,
  );

  if (!response || (response && !response.ok)) {
    const responseText = await response.text();
    throw new Error(responseText);
  }

  const responseJson = await response.json();
  return responseJson.value;
};

export const updateNewsViews = async (
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

  //podemos pegar o etag dessa maneira ou configurando o IF-MATCH assim: "IF-MATCH": (responseJson as any)["@odata.etag"],
  /* const etag = getItemResponse.headers.get("ETag");
  if (!etag) {
    throw new Error("Failed to retrieve ETag for the item.");
  } */

  const responseJson = await getItemResponse.json();

  const body = JSON.stringify({
    Views: responseJson.Views + 1,
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

export const updateNewsLikes = async (
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
    url,
    SPHttpClient.configurations.v1,
    { body: body, headers: headers },
  );

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    throw new Error(`Failed to update Views: ${errorText}`);
  }
};
