import { ReactElement, useCallback, useEffect, useState } from "react";

import { getNewsListPaginated } from "../../services/news.service";
import { useZustandStore } from "../../store";

export function InternalNews(): ReactElement {
  const { context } = useZustandStore();
  const [param, setParam] = useState("");
  const itemsPerPage = 10;

  const getWithParam = async () => {
    if (context) {
      try {
        const { data, nextSkipToken } = await getNewsListPaginated(
          context,
          itemsPerPage,
          param,
        );

        console.log("Itens da página seguinte:", data);
        if (nextSkipToken) {
          setParam(nextSkipToken);
        } else {
          console.log("Final da lista");
        }
      } catch (error) {
        console.error("Erro ao buscar dados paginados:", error);
      }
    }
  };

  const getData = useCallback(async () => {
    if (context) {
      try {
        const { data, nextSkipToken } = await getNewsListPaginated(
          context,
          itemsPerPage,
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
  }, [context]);
  useEffect(() => {
    getData();
  }, [context, getData]);
  return (
    <div>
      <button onClick={getWithParam}>get com parametro</button>
      <p>testing...</p>
    </div>
  );
}
