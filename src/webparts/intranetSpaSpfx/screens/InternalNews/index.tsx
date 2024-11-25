import { ReactElement, useCallback, useEffect, useState } from "react";

import { getNewsListPaginated } from "../../services/news.service";
import { useZustandStore } from "../../store";

export function InternalNews(): ReactElement {
  const { context } = useZustandStore();

  const [param, setParam] = useState<string>("");
  const itemsPerPage = 2;

  const getData = useCallback(
    async (url?: string) => {
      if (context) {
        try {
          const { data, nextSkipToken } = await getNewsListPaginated(
            context,
            itemsPerPage,
            url,
          );

          if (nextSkipToken) {
            setParam(nextSkipToken);
          } else {
            console.log("Final da lista");
          }

          console.log("Itens da página atual:", data);
        } catch (error) {
          console.error("Erro ao buscar dados paginados:", error);
        }
      }
    },
    [context],
  );

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div>
      <button onClick={() => getData(param)}>get com parametro</button>
      <p>testing...</p>
    </div>
  );
}
