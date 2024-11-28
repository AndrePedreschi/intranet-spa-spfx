import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { useZustandStore } from "../store";

export type TGetFooterListResponse = {
  Title: string;
  Hyperlinks: {
    Description: string;
    Url: string;
  };
};

const urlSite = useZustandStore.getState().urlSite;

export const getFooterList = async (
  context: WebPartContext,
): Promise<TGetFooterListResponse[]> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('Footer')/items`;
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
