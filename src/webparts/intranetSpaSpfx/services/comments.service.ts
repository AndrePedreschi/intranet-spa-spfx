import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { useZustandStore } from "../store";
import { TGetSubCommentsListResponse } from "./subcomments.service";
import { TGetUserResponse } from "./user.service";
import {
  formatArrayToString,
  formatStringToArray,
} from "../utils/formatLikesViews";

export type TGetCommentsListResponse = {
  user: TGetUserResponse;
  SubComments: TGetSubCommentsListResponse[];
  Id: number;
  LikedUsers: string;
  IdNoticia: number;
  Comentario: string;
  Created: string;
  AuthorId: number;
};
export type TRequestBody = {
  Comentario: string;
  IdNoticia: number;
};

const urlSite = useZustandStore.getState().urlSite;

/**
 * Obtém a lista de comentários associada a uma notícia específica no SharePoint.
 *
 * @param {WebPartContext} context - O contexto do WebPart que inclui informações do site e da página atual.
 * @param {number} newsId - O ID da notícia para a qual os comentários serão buscados.
 * @returns {Promise<TGetCommentsListResponse[]>} Uma promessa que resolve com uma lista de comentários.
 * @throws {Error} Lança um erro se a requisição falhar.
 *
 * @example
 * const comments = await getCommentsList(context, 123);
 * console.log(comments);
 * // Saída esperada:
 * // [
 * //   {
 * //     Id: 1,
 * //     LikedUsers: "45, 46",
 * //     IdNoticia: 123,
 * //     Comentario: "Primeiro comentário.",
 * //     Created: "2024-11-22T10:00:00Z",
 * //     AuthorId: 45
 * //   },
 * //   {
 * //     Id: 2,
 * //     LikedUsers: "",
 * //     IdNoticia: 123,
 * //     Comentario: "Segundo comentário.",
 * //     Created: "2024-11-22T11:00:00Z",
 * //     AuthorId: 46
 * //   }
 * // ]
 */
export const getCommentsList = async (
  context: WebPartContext,
  newsId: number,
): Promise<TGetCommentsListResponse[]> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('Comentarios')/items`;
  const select = `?$select=Id,LikedUsers,IdNoticia,Comentario,Created,AuthorId`;
  const filter = `$filter=IdNoticia eq ${newsId}`;
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
 * Envia um novo comentário para a lista "Comentarios" no SharePoint.
 *
 * @param {WebPartContext} context - O contexto do WebPart que inclui informações do site e da página atual.
 * @param {TRequestBody} requestBody - O corpo da requisição contendo os dados do comentário.
 * @returns {Promise<{ msg: string }>} Uma promessa que resolve com uma mensagem de sucesso ao enviar o comentário.
 * @throws {Error} Lança um erro se a requisição falhar.
 *
 * @example
 * const requestBody = {
 *   Likes: "", // Inicialmente vazio
 *   Comentario: "Este é um novo comentário.",
 *   IdNoticia: 123
 * };
 *
 * const response = await postNewComment(context, requestBody);
 * console.log(response.msg);
 * // Saída esperada: "Comentário enviado com sucesso!"
 */
export const postNewComment = async (
  context: WebPartContext,
  requestBody: TRequestBody,
): Promise<{ msg: string; newComment: TGetCommentsListResponse }> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('Comentarios')/items`;

  const body = JSON.stringify(requestBody);

  const headers = {
    "X-HTTP-Method": "POST",
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
  const postResponseJson = await updateResponse.json();
  return {
    msg: "Comentário enviado com sucesso!",
    //commentId: postResponseJson.Id,
    newComment: postResponseJson,
  };
};

/**
 * Atualiza os "likes" de um comentário na lista "Comentarios" do SharePoint.
 *
 * Este método adiciona ou remove o ID do usuário atual da lista de "likes" de um comentário específico.
 *
 * @param {WebPartContext} context - O contexto do WebPart que inclui informações do site e da página atual.
 * @param {number} commentId - O ID do comentário na lista "Comentarios" que será atualizado.
 * @returns {Promise<void>} Uma promessa que resolve quando a atualização dos "likes" é concluída.
 * @throws {Error} Lança um erro se a recuperação ou a atualização do item falhar.
 *
 * @example
 * try {
 *   await updateCommentLikes(context, 123);
 *   console.log("Likes atualizados com sucesso!");
 * } catch (error) {
 *   console.error(error.message);
 * }
 */
export const updateCommentLikes = async (
  context: WebPartContext,
  commentId: number,
): Promise<void> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('Comentarios')/items(${commentId})`;
  const getItemResponse = await context.spHttpClient.get(
    urlBase,
    SPHttpClient.configurations.v1,
  );

  if (!getItemResponse.ok) {
    const errorText = await getItemResponse.text();
    throw new Error(`Failed to retrieve item: ${errorText}`);
  }

  const responseJson = await getItemResponse.json();

  const user: number = context.pageContext.legacyPageContext.userId;
  let likes: number[] = formatStringToArray(responseJson.LikedUsers);

  if (!likes.find((userId: number) => userId === user)) {
    likes.push(user);
  } else {
    likes = likes.filter((userId: number) => userId !== user);
  }

  const body = JSON.stringify({
    LikedUsers: formatArrayToString(likes),
  });

  const headers = {
    "X-HTTP-Method": "MERGE",
    "IF-MATCH": (responseJson as any)["@odata.etag"],
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
 * Exclui um comentário de uma lista do SharePoint com base no ID fornecido.
 *
 * @param {WebPartContext} context - O contexto do WebPart necessário para realizar a chamada à API REST do SharePoint.
 * @param {number} commentId - O ID do comentário que será excluído.
 * @returns {Promise<void>} - Retorna uma Promise resolvida quando a exclusão for bem-sucedida.
 * @throws {Error} - Lança um erro caso a requisição falhe, incluindo detalhes da resposta do servidor.
 *
 * @example
 * // Exemplo de uso
 * try {
 *   await deleteComment(context, 456);
 *   console.log("Comentário excluído com sucesso!");
 * } catch (error) {
 *   console.error("Erro ao excluir comentário:", error);
 * }
 */
export const deleteComment = async (
  context: WebPartContext,
  commentId: number,
): Promise<void> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('Comentarios')/items(${commentId})`;

  const body = JSON.stringify({ Id: commentId });
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
 * Atualiza a mensagem de um comentário específico.
 *
 * @param {WebPartContext} context - O contexto do WebPart necessário para realizar a chamada à API REST do SharePoint.
 * @param {number} commentId - O ID do comentário a ser editado.
 * @param {string} msgToEdit - O novo conteúdo do comentário.
 * @returns {Promise<void>} - Retorna uma Promise que é resolvida quando o comentário é atualizado com sucesso.
 * @throws {Error} - Lança um erro caso a requisição falhe, incluindo detalhes da resposta do servidor.
 *
 * @example
 * // Exemplo de uso
 * try {
 *   await updateComment(context, 123, "Novo conteúdo do comentário");
 *   console.log("Comentário atualizado com sucesso!");
 * } catch (error) {
 *   console.error("Erro ao atualizar o comentário:", error);
 * }
 */
export const updateComment = async (
  context: WebPartContext,
  commentId: number,
  msgToEdit: string,
): Promise<void> => {
  const urlBase = `${urlSite}/_api/web/lists/getbytitle('Comentarios')/items(${commentId})`;

  const body = JSON.stringify({
    Comentario: msgToEdit,
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
