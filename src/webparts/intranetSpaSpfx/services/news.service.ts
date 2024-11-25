import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export type TGetNewsListResponse = {
  ID: number;
  Title: string;
  Descricao: string;
  Views: number;
  Likes: string;
  Created: string;
  LinkBanner: string;
};

export const getNewsList = async (
  context: WebPartContext,
): Promise<TGetNewsListResponse[]> => {
  const urlBase = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Noticias')/items`;
  const query = `?$select=ID,Title,Descricao,Views,Likes,Created,LinkBanner`;

  const response = await context.spHttpClient.get(
    urlBase + query,
    SPHttpClient.configurations.v1,
  );

  if (!response || (response && !response.ok)) {
    const responseText = await response.text();
    throw new Error(responseText);
  }

  const responseJson = await response.json();
  console.log("resp", responseJson.value);
  return responseJson.value;
};
