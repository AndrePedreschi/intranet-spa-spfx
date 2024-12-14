import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { useZustandStore } from "../store";
import { TGetUserResponse } from "./user.service";

export type TGetSubCommentsListResponse = {
  user: TGetUserResponse;
  Id: number;
  IdComentario: number;
  SubComentario: string;
  Created: string;
  AuthorId: number;
};

export type TRequestBody = {
  IdComentario: number;
  SubComentario: string;
};

const urlSite = useZustandStore.getState().urlSite;
/**
 * Obtém a lista de subcomentários associada a um comentário específico no SharePoint.
 *
 * @param {WebPartContext} context - O contexto do WebPart que inclui informações do site e da página atual.
 * @param {number} commentId - O ID do comentário para o qual os subcomentários serão buscados.
 * @returns {Promise<TGetSubCommentsListResponse[]>} Uma promessa que resolve com uma lista de subcomentários.
 * @throws {Error} Lança um erro se a requisição falhar.
 *
 * @example
 * const subComments = await getSubCommentsList(context, 12);
 * console.log(subComments);
 * // Saída esperada:
 * // [
 * //   {
 * //     Id: 1,
 * //     IdComentario: 123,
 * //     SubComentario: "Este é um subcomentário.",
 * //     Created: "2024-11-22T10:00:00Z",
 * //     AuthorId: 45
 * //   },
 * //   {
 * //     Id: 2,
 * //     IdComentario: 123,
 * //     SubComentario: "Outro subcomentário.",
 * //     Created: "2024-11-22T11:00:00Z",
 * //     AuthorId: 46
 * //   }
 * // ]
 */
export const getSubCommentsList = async (
  context: WebPartContext,
  commentId: number,
): Promise<TGetSubCommentsListResponse[]> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('SubComentarios')/items`;
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

/**
 * Envia um novo subcomentário para a lista "SubComentarios" no SharePoint.
 *
 * @param {WebPartContext} context - O contexto do WebPart que inclui informações do site e da página atual.
 * @param {TRequestBody} requestBody - O corpo da requisição contendo os dados do subcomentário.
 * @returns {Promise<void>} Uma promessa que resolve com uma mensagem de sucesso ao enviar o subcomentário.
 * @throws {Error} Lança um erro se a requisição falhar.
 *
 * @example
 * const requestBody = {
 *   IdComentario: 12,
 *   SubComentario: "Este é um novo subcomentário."
 * };
 *
 *  const response = await postNewSubComment(context, requestBody);
 *  console.log(response.msg);
 * // Saída esperada: "Comentário enviado com sucesso!"
 */
export const postNewSubComment = async (
  context: WebPartContext,
  requestBody: TRequestBody,
): Promise<{ msg: string; subCommentId: number }> => {
  const url = `${urlSite}/_api/web/lists/getbytitle('SubComentarios')/items`;

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

  const postResponseJson = await updateResponse.json();

  return {
    msg: "Comentário enviado com sucesso!",
    subCommentId: postResponseJson.Id,
  };
};

/**
 * Exclui um subcomentário de uma lista do SharePoint com base no ID fornecido.
 *
 * @param {WebPartContext} context - O contexto do WebPart necessário para realizar a chamada à API REST do SharePoint.
 * @param {number} subCommentId - O ID do subcomentário que será excluído.
 * @returns {Promise<void>} - Retorna uma Promise resolvida quando a exclusão for bem-sucedida.
 * @throws {Error} - Lança um erro caso a requisição falhe, incluindo detalhes da resposta do servidor.
 *
 * @example
 * // Exemplo de uso
 * try {
 *   await deleteSubComment(context, 123);
 *   console.log("Subcomentário excluído com sucesso!");
 * } catch (error) {
 *   console.error("Erro ao excluir subcomentário:", error);
 * }
 */
export const deleteSubComment = async (
  context: WebPartContext,
  subCommentId: number,
): Promise<void> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('SubComentarios')/items(${subCommentId})`;

  const body = JSON.stringify({ Id: subCommentId });
  const headers = {
    "X-HTTP-Method": "DELETE",
    "IF-MATCH": "*",
  };

  const updateResponse = await context.spHttpClient.post(
    urlBase,
    SPHttpClient.configurations.v1,
    { body: body, headers: headers },
  );

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    throw new Error(`Failed to update Views: ${errorText}`);
  }
};

/**
 * Atualiza a mensagem de um subcomentário específico.
 *
 * @param {WebPartContext} context - O contexto do WebPart necessário para realizar a chamada à API REST do SharePoint.
 * @param {number} subCommentId - O ID do subcomentário a ser editado.
 * @param {string} msgToEdit - O novo conteúdo do subcomentário.
 * @returns {Promise<void>} - Retorna uma Promise que é resolvida quando o subcomentário é atualizado com sucesso.
 * @throws {Error} - Lança um erro caso a requisição falhe, incluindo detalhes da resposta do servidor.
 *
 * @example
 * // Exemplo de uso
 * try {
 *   await updateSubComment(context, 456, "Novo conteúdo do subcomentário");
 *   console.log("Subcomentário atualizado com sucesso!");
 * } catch (error) {
 *   console.error("Erro ao atualizar o subcomentário:", error);
 * }
 */
export const updateSubComment = async (
  context: WebPartContext,
  subCommentId: number,
  msgToEdit: string,
): Promise<void> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('SubComentarios')/items(${subCommentId})`;

  const body = JSON.stringify({
    SubComentario: msgToEdit,
  });

  const headers = {
    "X-HTTP-Method": "MERGE",
    "IF-MATCH": "*",
  };

  const updateResponse = await context.spHttpClient.post(
    urlBase,
    SPHttpClient.configurations.v1,
    { body: body, headers: headers },
  );

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    throw new Error(`Failed to update Views: ${errorText}`);
  }
};
