import { WebPartContext } from "@microsoft/sp-webpart-base";

export type TCrudProps = {
  context: WebPartContext;
  url: string;
  method: "GET" | "UPDATE" | "POST" | "DELETE";
  data: any;
};

export type THeader = {
  Accept: string;
  "Content-Type": string;
  "X-HTTP-Method"?: string;
  "If-Match"?: string;
};

export type TOptions = {
  method: string;
  headers: THeader;
  body?: any;
};

export const crud = async ({ url, method, data }: TCrudProps) => {
  try {
    if (!["GET", "UPDATE", "POST", "DELETE"].includes(method)) {
      throw new Error("Opção de método inválida");
    }

    const opt: TOptions = {
      method: method === "UPDATE" ? "POST" : method,
      headers: {
        Accept: "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
      },
    };

    if (method === "UPDATE" || method === "POST") {
      opt.body = JSON.stringify(data);
      //opt.headers['X-RequestDigest'] = $('#__REQUESTDIGEST').value

      if (method === "UPDATE") {
        opt.headers["X-HTTP-Method"] = "MERGE";
        opt.headers["If-Match"] = "*";
      }
    }

    const res = await fetch(url, opt);

    /* const response = await context.spHttpClient.get(
        `${urlBase}${select}&${orderBy}&${top}`,
        SPHttpClient.configurations.v1,
      ); */

    /* const headers = {
         "X-HTTP-Method": "MERGE",
         "IF-MATCH": (responseJson as any)["@odata.etag"],
       }; */

    /* const updateResponse = await context.spHttpClient.post(
         url,
         SPHttpClient.configurations.v1,
         { body: body, headers: headers },
       ); */

    if (!res.ok) {
      throw new Error(`Erro: ${res.status} - ${res.statusText}`);
    }

    if (res.status === 204) {
      return [];
    } else {
      const data = await res.json();

      if (data != undefined && data.d) {
        return data.d.results ? data.d.results : data.d;
      }

      return [];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* function SHPListItemDataTypeFromList(listInternalName) {
    const listInternalNameFormatted = ${listInternalName.charAt(toUpperCase())}${listInternalName.split(' ').join('').slice(1)};
    const dataType = SP.Data.${listInternalNameFormatted}ListItem
    return dataType;
}; */

/* async function SHPGetFormDigestValue(siteUrl) {
    try {
        const endpoint = ${siteUrl || '../'}_api/contextinfo
        const formDigestHeader = {
            method: 'POST',
            headers: {
                'Accept': 'application/json;odata=verbose',
                'Content-Type': 'application/json;odata=verbose'
            }
        }

        const res = await fetch(endpoint, formDigestHeader)

        if (!res.ok) {
            throw new Error(`Erro: ${res.status} - ${res.statusText}`)
        }

        const data = await res.json()

        return data.d.GetContextWebInformation.FormDigestValue
    } catch (error) {
        console.error(error)
        throw error
    }
}; */
