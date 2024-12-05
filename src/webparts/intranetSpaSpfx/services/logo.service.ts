import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export type TGetImagesList = {
  Name: string;
  ServerRelativeUrl: string;
};

export const getImagesList = async (
  context: WebPartContext,
): Promise<TGetImagesList[]> => {
  const folderPath = `${context.pageContext.web.serverRelativeUrl}/Imagens/site`;
  const urlBase = `${context.pageContext.web.absoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${folderPath}')/Files`;
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

export type TGetBannersList = {
  Name: string;
  ServerRelativeUrl: string;
};

export const getBannersList = async (
  context: WebPartContext,
): Promise<TGetBannersList[]> => {
  const folderPath = `${context.pageContext.web.serverRelativeUrl}/Imagens/Banners`;
  const urlBase = `${context.pageContext.web.absoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${folderPath}')/Files`;
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
