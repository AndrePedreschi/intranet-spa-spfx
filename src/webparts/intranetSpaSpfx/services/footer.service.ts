import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { useZustandStore } from "../store";

export type TGetFooterListResponse = {
  Title: string;
  Hyperlinks: {
    Description: string;
    Url: string;
  };
  Link: string;
};

const urlSite = useZustandStore.getState().urlSite;

/**
 * Obtém os itens da lista 'Footer' no SharePoint.
 *
 * @param {WebPartContext} context - O contexto do web part do SharePoint, necessário para realizar requisições HTTP.
 * @returns {Promise<TGetFooterListResponse[]>} - Uma promessa que resolve em um array de itens da lista 'Footer'.
 * @throws {Error} - Lança um erro se a requisição falhar ou a resposta não for válida.
 *
 * @example
 * ```typescript
 * import { getFooterList } from './services/getFooterList';
 * import { WebPartContext } from '@microsoft/sp-webpart-base';
 *
 * // Exemplo de uso em um componente
 * async function fetchFooterItems(context: WebPartContext) {
 *   try {
 *     const footerItems = await getFooterList(context);
 *     console.log('Itens do Footer:', footerItems);
 *   } catch (error) {
 *     console.error('Erro ao buscar itens da lista Footer:', error);
 *   }
 * }
 * ```
 */
export const getFooterList = async (
  context: WebPartContext,
): Promise<TGetFooterListResponse[]> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('Footer')/items`;
  const select = `?$select=Title,Hyperlinks,Link`;

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
