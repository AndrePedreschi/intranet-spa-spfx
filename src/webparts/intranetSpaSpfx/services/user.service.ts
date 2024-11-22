import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export type TGetUserResponse = {
  Id: number;
  Title: string;
  Email: string;
  UserImg: string;
};

/**
 * Obtém informações detalhadas de um usuário do SharePoint por ID.
 *
 * @param {WebPartContext} context - O contexto do WebPart que inclui informações do site e da página atual.
 * @param {number} userId - O ID do usuário a ser buscado.
 * @returns {Promise<TGetUserResponse>} Uma promessa que resolve com os dados do usuário, incluindo a URL da foto do perfil.
 * @throws {Error} Lança um erro se a resposta da API for inválida ou ocorrer falha na obtenção dos dados.
 *
 * @example
 * const user = await getUser(context, 5);
 * console.log(user);
 * // Saída esperada:
 * // {
 * //   Id: 6,
 * //   Email: "exemplo@dominio.com",
 * //   Title: "Nome do Usuário",
 * //   UserImg: "https://site/_layouts/15/userphoto.aspx?UserName=exemplo@dominio.com&size=L"
 * // }
 */
export const getUser = async (
  context: WebPartContext,
  userId: number,
): Promise<TGetUserResponse> => {
  const urlBase = `${context.pageContext.web.absoluteUrl}/_api/web/getuserbyid(${userId})`;

  const userResponse = await context.spHttpClient.get(
    urlBase,
    SPHttpClient.configurations.v1,
  );

  if (!userResponse || (userResponse && !userResponse.ok)) {
    const responseText = await userResponse.text();
    throw new Error(responseText);
  }

  const userResponseJson = await userResponse.json();
  const photoUrl = `${context.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?UserName=${userResponseJson.Email}&size=L`;

  return {
    Id: userResponseJson.Id,
    Title: userResponseJson.Title,
    Email: userResponseJson.Email,
    UserImg: photoUrl,
  };
};
