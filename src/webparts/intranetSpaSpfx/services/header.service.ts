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

/**
 * Obtém os itens da lista 'Header' no SharePoint.
 *
 * @param {WebPartContext} context - O contexto do web part do SharePoint, necessário para realizar requisições HTTP.
 * @returns {Promise<TGetHeaderListResponse[]>} - Uma promessa que resolve em um array de itens da lista 'Header'.
 * @throws {Error} - Lança um erro se a requisição falhar ou a resposta não for válida.
 *
 * @example
 * ```typescript
 * import { getHeaderList } from './services/getHeaderList';
 * import { WebPartContext } from '@microsoft/sp-webpart-base';
 *
 * // Exemplo de uso em um componente
 * async function fetchHeaderItems(context: WebPartContext) {
 *   try {
 *     const headerItems = await getHeaderList(context);
 *     console.log('Itens do Header:', headerItems);
 *   } catch (error) {
 *     console.error('Erro ao buscar itens da lista Header:', error);
 *   }
 * }
 * ```
 */
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
