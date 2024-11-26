import { ReactElement, useCallback, useEffect, useState } from "react";

import {
  getNewsListPaginated,
  TGetNewsListResponse,
} from "../../services/news.service";
import { useZustandStore } from "../../store";

export function InternalNews(): ReactElement {
  const { context } = useZustandStore();

  const [listNews, setListNews] = useState<TGetNewsListResponse[]>();
  const [param, setParam] = useState("");
  const itemsPerPage = 1;

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

          setListNews((news) => [...(news || []), ...data]);
          return;
        } catch (error) {
          console.error("Erro ao buscar dados paginados:", error);
        }
      }
    },
    [context],
  );

  useEffect(() => {
    getData();
    return () => {
      //captura o fim de vida do componente
    };
  }, [getData]);
  return (
    <div>
      <button onClick={() => getData(param)}>Get more</button>
      {listNews &&
        listNews.map((news, index) => <div key={index}>{news.Title}</div>)}
    </div>
  );
}
