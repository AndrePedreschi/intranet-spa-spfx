import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { useZustandStore } from "../store";

export type TGetImagesList = {
  Name: string;
  ServerRelativeUrl: string;
};

const urlSite = useZustandStore.getState().urlSite;

/**
 * Obtém a lista de logos da biblioteca de imagens no SharePoint.
 *
 * @param {WebPartContext} context - O contexto do web part do SharePoint, necessário para realizar requisições HTTP.
 * @returns {Promise<TGetImagesList[]>} - Uma promessa que resolve em um array de objetos contendo o nome e a URL relativa dos arquivos de imagem.
 * @throws {Error} - Lança um erro se a requisição falhar ou a resposta não for válida.
 *
 * @example
 * ```typescript
 * import { getImagesList } from './services/getImagesList';
 * import { WebPartContext } from '@microsoft/sp-webpart-base';
 *
 * // Exemplo de uso em um componente
 * async function fetchLogos(context: WebPartContext) {
 *   try {
 *     const logos = await getImagesList(context);
 *     console.log('Logos encontradas:', logos);
 *   } catch (error) {
 *     console.error('Erro ao buscar logos:', error);
 *   }
 * }
 * ```
 */
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

export type TGetBannersList = {
  Name: string;
  ServerRelativeUrl: string;
};

/**
 * Obtém a lista de banners de uma pasta específica na biblioteca de imagens do SharePoint.
 *
 * @param {WebPartContext} context - O contexto do WebPart, utilizado para acessar a API do SharePoint.
 * @returns {Promise<TGetBannersList[]>} - Uma promessa que resolve para uma lista de objetos representando os banners, contendo nome e URL relativa.
 * @throws {Error} - Lança um erro se a requisição à API do SharePoint falhar.
 *
 * @example
 * import { getBannersList } from './path/to/file';
 *
 * const context = this.context; // Contexto do WebPart.
 *
 * getBannersList(context)
 *   .then((banners) => {
 *     console.log(banners);
 *   })
 *   .catch((error) => {
 *     console.error('Erro ao buscar banners:', error);
 *   });
 */
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
