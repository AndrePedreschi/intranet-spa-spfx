import { SPHttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export type TOptions<T = any> = {
  headers: THeader;
  body?: T;
};

export type THeader = {
  "X-HTTP-Method": string;
  "If-Match"?: string;
};

export type TPagination = {
  pageSize: number;
  nexUrl?: string | null;
};

export type TCrudProps<T = any> = {
  context: WebPartContext;
  url: string;
  method: "GET" | "UPDATE" | "POST" | "DELETE";
  data?: T;
  etag?: boolean;
  pagination?: TPagination;
};

/**
 * Função genérica para realizar operações CRUD (Create, Read, Update, Delete) em uma lista SharePoint.
 *
 * @template T - O tipo genérico dos dados retornados ou enviados.
 *
 * @param {TCrudProps<T>} params - Os parâmetros necessários para a execução da operação CRUD.
 * @param {WebPartContext} params.context - O contexto do WebPart para interagir com o SharePoint.
 * @param {string} params.url - A URL da API REST do SharePoint onde a operação será realizada.
 * @param {"GET" | "UPDATE" | "POST" | "DELETE"} params.method - O método HTTP a ser utilizado (GET, UPDATE, POST ou DELETE).
 * @param {T} [params.data] - Os dados enviados na requisição (usado para UPDATE ou POST).
 * @param {boolean} [params.etag] - Indica se o etag do cabeçalho `If-Match` deve ser incluído na requisição (apenas para UPDATE).
 * @param {TPagination} [params.pagination] - Configurações de paginação para requisições do tipo GET.
 *
 * @returns {Promise<T | { data: T[]; nextSkipToken: string | null } | void>} - O retorno da função pode variar:
 *  - Para GET com paginação: um objeto contendo os dados e o token de próxima página.
 *  - Para outros casos: o tipo genérico `T` ou `void` para requisições sem retorno (ex.: DELETE).
 *
 * @throws {Error} Lança erro se ocorrer falha na requisição ou se o método HTTP for inválido.
 *
 * @example
 * // Exemplo POST: Criar um novo item
 * const { context } = useZustandStore();
 * const postData = useCallback(async () => {
 *   if (context) {
 *     try {
 *       const url = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Comentarios')/items`;
 *       await crud({
 *         url: url,
 *         context: context,
 *         method: "POST",
 *         data: {
 *           Likes: "[]",
 *           Comentario: "Este é um novo comentário.",
 *           IdNoticia: 2,
 *         },
 *       });
 *
 *       console.log("Criado com sucesso!");
 *     } catch (error) {
 *       console.error("Erro ao buscar dados paginados:", error);
 *     }
 *   }
 * }, [context]);
 *
 * @example
 * //Exemplo GET simples: Obter os itens de uma lista
 * const { context } = useZustandStore();
 * const getData = useCallback(
 *   async (idNoticia: number) => {
 *     if (context) {
 *       try {
 *         const urlBase = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Comentarios')/items(${idNoticia})`;
 *
 *         const data = await crud({
 *           url: urlBase,
 *           context: context,
 *           method: "GET",
 *         });
 *
 *         console.log("Item recebido:", data);
 *       } catch (error) {
 *         console.error("Erro ao buscar dados paginados:", error);
 *       }
 *     }
 *   },
 *   [context],
 * );
 *
 * @example
 * // Exemplo GET Paginado: Obter itens paginados
 * const { context } = useZustandStore();
 * const [param, setParam] = useState<string>("");
 * const itemsPerPage = 2;
 *
 * const getData = useCallback(
 *  async (url?: string) => {
 *   if (context) {
 *    try {
 *     const urlBase = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Noticias')/items`;
 *     const select = `?$select=ID,Title,Likes,Views,LinkBanner,Descricao,Created,AuthorId`;
 *     const top = `&$top=${itemsPerPage}`;
 *     const dataUrl = `${urlBase}${select}${top}`;
 *     const { data, nextSkipToken } = await crud({
 *      url: url || dataUrl,
 *      context: context,
 *      method: "GET",
 *      pagination: {
 *        pageSize: itemsPerPage,
 *        nexUrl: url,
 *      },
 *    });
 *    if (nextSkipToken) {
 *      setParam(nextSkipToken);
 *    } else {
 *      console.log("Final da lista");
 *    }
 *
 *    console.log("Itens da página atual:", data);
 *   } catch (error) {
 *    console.error("Erro ao buscar dados paginados:", error);
 *   }
 *  }
 * },
 * [context],
 * );
 *
 * @example
 * // Exemplo UPDATE: Atualizar um item
 * const { context } = useZustandStore();
 * const updateData = useCallback(
 *   async (idNoticia: number) => {
 *     if (context) {
 *       try {
 *         const urlBase = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Comentarios')/items(${idNoticia})`;
 *         await crud({
 *           url: urlBase,
 *           context: context,
 *           method: "UPDATE",
 *           etag: true,
 *           data: {
 *             Comentario: "Comentário atualizado",
 *           },
 *         });
 *
 *         console.log(`Item ${idNoticia} atualizado com sucesso!`);
 *       } catch (error) {
 *         console.error("Erro ao buscar dados paginados:", error);
 *       }
 *     }
 *   },
 *   [context],
 * );
 *
 * @example
 * // Exemplo DELETE: Deletar um item
 * const { context } = useZustandStore();
 * const deleteData = useCallback(
    async (idNoticia: number) => {
      if (context) {
        try {
          const urlBase = `${context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('Comentarios')/items(${idNoticia})`;
          await crud({
            url: urlBase,
            context: context,
            method: "DELETE",
          });

          console.log(`Item ${idNoticia} deletado com sucesso!`);
        } catch (error) {
          console.error("Erro ao buscar dados paginados:", error);
        }
      }
    },
    [context],
  );
 */
export const crud = async <T = any>({
  context,
  url,
  method,
  data,
  etag,
  pagination,
}: TCrudProps<T>): Promise<
  T | { data: T[]; nextSkipToken: string | null } | void
> => {
  try {
    if (!["GET", "UPDATE", "POST", "DELETE"].includes(method)) {
      throw new Error("Opção de método inválida");
    }

    const opt: TOptions = {
      headers: {
        "X-HTTP-Method": method === "UPDATE" ? "MERGE" : method,
      },
    };

    if (method === "UPDATE" || method === "POST") {
      opt.body = JSON.stringify(data);
    }

    if ((method === "UPDATE" || method === "DELETE") && etag) {
      const getItemResponse = await context.spHttpClient.get(
        url,
        SPHttpClient.configurations.v1,
      );
      const responseJson = await getItemResponse.json();
      opt.headers["If-Match"] = (responseJson as any)["@odata.etag"];
    } else {
      opt.headers["If-Match"] = "*";
    }

    const res = await context.spHttpClient[method === "GET" ? "get" : "post"](
      url,
      SPHttpClient.configurations.v1,
      opt,
    );

    if (!res.ok) {
      throw new Error(`Erro: ${res.status} - ${res.statusText}`);
    }

    if (res.status === 204) {
      return;
    } else {
      const responseJson = await res.json();

      if (method === "GET" && pagination) {
        const nextSkipToken: string | null = responseJson["@odata.nextLink"]
          ? responseJson["@odata.nextLink"]
          : null;

        return {
          data: responseJson.value ? responseJson.value : responseJson,
          nextSkipToken,
        };
      } else {
        return responseJson.value ? responseJson.value : responseJson;
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
