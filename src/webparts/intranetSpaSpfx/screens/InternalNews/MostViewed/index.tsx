import { ReactElement, useCallback, useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { Container, TextSection } from "./styles";
import { CardNews } from "../../../components/CardNews";
import { LikeViews } from "../../../components/LikeViews";
import { Loading } from "../../../components/Loading";
import {
  getMostViewedNewsList,
  TGetNewsListResponse,
} from "../../../services/news.service";
import { useZustandStore } from "../../../store";

export const MostViewed = (): ReactElement => {
  const { context } = useZustandStore();
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<TGetNewsListResponse[]>([]);

  const getData = useCallback(async () => {
    if (context) {
      try {
        const newsResponse = await getMostViewedNewsList(context, 3);

        newsResponse.forEach((news) => {
          if (news.Id === Number(id)) news.Views += 1;
        });

        setNews(newsResponse);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
      }
    }
  }, [context, id]);

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
        news?.map((newsMap) => (
          <CardNews key={newsMap.Id} cardData={newsMap}>
            <LikeViews
              showLike={false}
              origin="news"
              dataToLikeViews={newsMap}
            />
          </CardNews>
        ))}
    </Container>
  ) : (
    <Loading />
  );
};
