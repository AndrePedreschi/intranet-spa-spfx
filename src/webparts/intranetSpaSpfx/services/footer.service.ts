import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export type TGetFooterListResponse = {
  Title: string;
  Hyperlinks: {
    Description: string;
    Url: string;
  };
};

export const getFooterList = async (
  context: WebPartContext,
): Promise<TGetFooterListResponse[]> => {
  const urlBase = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Footer')/items`;
  const select = `?$select=Title,Hyperlinks`;

  const response = await context.spHttpClient.get(
    urlBase + select,
    SPHttpClient.configurations.v1,
  );

  if (!response || (response && !response.ok)) {
    const responseText = await response.text();
    throw new Error(responseText);
  }

  const responseJson = await response.json();
  return responseJson.value;
};
