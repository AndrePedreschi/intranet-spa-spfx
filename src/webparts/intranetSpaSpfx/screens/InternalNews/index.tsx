import { ReactElement, useCallback, useEffect, useState } from "react";

import { Card } from "./styles";
import { InfiniteScroll } from "../../components/InfiniteScroll";
import {
  getNewsListPaginated,
  TGetNewsListResponse,
} from "../../services/news.service";
import { useZustandStore } from "../../store";

export function InternalNews(): ReactElement {
  const { context } = useZustandStore();

  const [requestEnd, setRequestEnd] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [listNews, setListNews] = useState<TGetNewsListResponse[]>();
  const [param, setParam] = useState("");
  const itemsPerPage = 1;

  const getData = useCallback(
    async (url?: string) => {
      if (requestEnd) return;
      if (context) {
        try {
          setIsLoading(true);
          const { data, nextSkipToken } = await getNewsListPaginated(
            context,
            itemsPerPage,
            url,
          );

          if (nextSkipToken) {
            setParam(nextSkipToken);
          } else {
            setRequestEnd(true);
          }

          setListNews((news) => [...(news || []), ...data]);
          setIsLoading(false);
          return;
        } catch (error) {
          console.error("Erro ao buscar dados paginados:", error);
        }
      }
    },
    [context, requestEnd],
  );

  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <div>
      <InfiniteScroll
        endOfListCondition={requestEnd}
        handlerPageChange={() => getData(param)}
        scrollRequestLoading={isLoading}
        nextUrlRequest={param}
      >
        {listNews &&
          listNews.map((news, index) => <Card key={index}>{news.Title}</Card>)}
      </InfiniteScroll>
    </div>
  );
}
