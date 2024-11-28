import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { useZustandStore } from "../store";

export type TGetHeaderListResponse = {
  Title: string;
  Hyperlink: {
    Description: string;
    Url: string;
  };
  Link: string;
};

const urlSite = useZustandStore.getState().urlSite;

export const getHeaderList = async (
  context: WebPartContext,
): Promise<TGetHeaderListResponse[]> => {
  const urlBase = `${urlSite}/_api/web/lists/GetById(id='f1d5f098-bf52-4edc-8278-396c363b216b')/items`;
  const select = `?$select=Title,Hyperlink,Link`;

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
