import { ReactElement, useCallback, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { Container, TextSection } from "./styles";
import { Loading } from "../../../components/Loading";
import {
  getMostViewedNewsList,
  TGetNewsListResponse,
} from "../../../services/news.service";
import { useZustandStore } from "../../../store";

export const MostViewed = (): ReactElement => {
  const { context } = useZustandStore();
  const [news, setNews] = useState<TGetNewsListResponse[]>();

  const getData = useCallback(async () => {
    if (context) {
      try {
        setNews(await getMostViewedNewsList(context, 3));
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      }
    }
  }, [context]);

  useEffect(() => {
    getData();
  }, [getData]);

  return news ? (
    <Container>
      <TextSection>
        <p>Mais lidas</p>
        <Link to={"/news"}>Veja mais</Link>
      </TextSection>
      {news &&
        news?.map((newsMap) => <div key={newsMap.Id}>{newsMap.Title}</div>)}
    </Container>
  ) : (
    <Loading />
  );
};
