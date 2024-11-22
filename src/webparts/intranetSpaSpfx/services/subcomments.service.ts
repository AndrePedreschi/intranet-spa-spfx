import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export type TGetSubCommentsListResponse = {
  Id: number;
  IdComentario: number;
  SubComentario: string;
  Created: string;
  AuthorId: number;
};

export const getSubCommentsList = async (
  context: WebPartContext,
  commentId: number,
): Promise<TGetSubCommentsListResponse> => {
  const urlBase = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('SubComentarios')/items`;
  const select = `?$select=Id,IdComentario,SubComentario,Created,AuthorId`;
  const filter = `$filter=IdComentario eq ${commentId}`;
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

export const postNewSubComment = async (
  context: WebPartContext,
  requestBody: any,
): Promise<void> => {
  const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('SubComentarios')/items`;

  const body = JSON.stringify(requestBody);

  const headers = {
    "X-HTTP-Method": "POST",
    "IF-MATCH": "*",
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
