import { ReactElement, useEffect, useState, useCallback } from "react";
import {
  NewsContainer,
  MainNews,
  OtherNews,
  NewsItem,
  UserInfo,
  Stats,
} from "./styles";
import {
  getNewsListPaginated,
  TGetNewsListResponse,
} from "../../../services/news.service";
import { useZustandStore } from "../../../store";

const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export const CardNewsHome = (): ReactElement => {
  const { context } = useZustandStore();
  const [news, setNews] = useState<TGetNewsListResponse[]>([]);

  const fetchNews = useCallback(async () => {
    if (!context) return;

    try {
      const { data } = await getNewsListPaginated(context, 4);
      setNews(data);
    } catch (error) {
      console.error("Erro ao buscar as notícias:", error);
    }
  }, [context]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (!news.length) {
    return <p>Carregando notícias...</p>;
  }

  const [mainNews, ...otherNews] = news.reverse();

  return (
    <NewsContainer>
      {/* Notícia Principal */}
      <MainNews>
        <img src={mainNews.LinkBanner} alt={mainNews.Title} />
        <h2>{mainNews.Title}</h2>
        <p>{truncateText(mainNews.Descricao, 185)}</p>

        <div>
          <p>{mainNews.Created.split("T")[0]}</p>
          <p>{mainNews.Created}</p>
        </div>
        <Stats>
          {/* <span>👍 {mainNews.LikedUsers?.length || 0}</span> */}
          {/* <span>👁️ {mainNews.Views}</span> */}
        </Stats>
      </MainNews>

      {/* Outras Notícias */}
      <OtherNews>
        {otherNews.map((item) => (
          <NewsItem key={item.Id}>
            <img src={item.LinkBanner} alt={item.Title} />
            <div>
              <h3>{item.Title}</h3>
              <p>{truncateText(item.Descricao, 120)}</p>
              <UserInfo>
                <img
                  src={`https://via.placeholder.com/40`}
                  alt={item.Created}
                />
                <div>
                  <p>{item.Created.split("T")[0]}</p>
                  <p>{item.Created}</p>
                </div>
                <Stats>{/* <span>👁️ {item.Views}</span> */}</Stats>
              </UserInfo>
            </div>
          </NewsItem>
        ))}
      </OtherNews>
    </NewsContainer>
  );
};
