import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { useZustandStore } from "../store";

export type TGetImagesList = {
  Name: string;
  ServerRelativeUrl: string;
};

const urlSite = useZustandStore.getState().urlSite;
export const getImagesList = async (
  context: WebPartContext,
): Promise<TGetImagesList[]> => {
  if (context.pageContext === undefined) return [];

  const folderPath = `${context.pageContext.web.serverRelativeUrl}/Imagens/site`;
  const urlBase = `${urlSite}/_api/web/GetFolderByServerRelativeUrl('${folderPath}')/Files`;
  const select = `?$select=Name,ServerRelativeUrl`;

  const response = await context.spHttpClient.get(
    urlBase + select,
    SPHttpClient.configurations.v1,
  );

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(`Erro ao buscar arquivos: ${responseText}`);
  }

  const responseJson = await response.json();
  return responseJson.value;
};
