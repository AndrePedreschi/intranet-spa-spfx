import { ReactElement, useCallback, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import { ButtonBack, ContainerNews, DoubleArrow, ReturnLink } from "./styles";
import doubleArrow from "../../assets/double-arrow.svg";
import { CardNews } from "../../components/CardNews";
import { InfiniteScroll } from "../../components/InfiniteScroll";
import { LikeViews } from "../../components/LikeViews";
import {
  getNewsListPaginated,
  TGetNewsListResponse,
  updateNewsLikesAndViews,
} from "../../services/news.service";
import { useZustandStore } from "../../store";
import {
  formatArrayToString,
  formatStringToArray,
} from "../../utils/formatLikesViews";
export const News = (): ReactElement => {
  const [loading, setLoading] = useState<number>();
  const { context } = useZustandStore();
  const [listNews, setListNews] = useState<TGetNewsListResponse[]>([]);
  const [nextUrlRequest, setNextUrlRequest] = useState<string | null>(null);
  const [endOfList, setEndOfList] = useState(false);
  const history = useHistory();

  const itemsPerPage = 8;

  const getData = useCallback(
    async (url?: string) => {
      if (!context) return;
      try {
        const { data, nextSkipToken: nextSkipToken } =
          await getNewsListPaginated(context, itemsPerPage, url);
        setNextUrlRequest(nextSkipToken || null);
        setListNews((prevListNews) => {
          const newItems = data.filter(
            (news) => !prevListNews.some((prevNews) => prevNews.Id === news.Id),
          );
          return [...prevListNews, ...newItems];
        });

        if (!nextSkipToken) {
          setEndOfList(true);
          console.log("Fim da lista alcançado.");
        }
      } catch (error) {
        console.error("Erro ao buscar dados paginados:", error);
      }
    },
    [context],
  );

  const handleLike = async (dataReceived: {
    id: number;
    arrayLikes: number[];
  }) => {
    if (!context) return;
    try {
      setLoading(dataReceived.id);
      const user: number = context?.pageContext?.legacyPageContext.userId;

      await updateNewsLikesAndViews(context, dataReceived.id);
      const newsToEdit = listNews?.find((news) => news.Id === dataReceived.id);

      if (
        newsToEdit &&
        !formatStringToArray(newsToEdit.LikedUsers).includes(user) &&
        !formatStringToArray(newsToEdit.ViewedUsers).includes(user)
      ) {
        setListNews((prevListNews) => {
          if (!prevListNews) return prevListNews;

          const updatedLikes = prevListNews.map((news) =>
            news.Id === dataReceived.id
              ? {
                  ...news,
                  Views: news.Views + 1,
                  LikedUsers: formatArrayToString(dataReceived.arrayLikes),
                }
              : news,
          );
          return updatedLikes;
        });
      }
    } catch (error) {
      console.error("Erro dar like em uma notícia:", error);
    } finally {
      setLoading(undefined);
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="screenTransitionControl">
      <ReturnLink>
        <ButtonBack onClick={() => history.goBack()}>
          <DoubleArrow src={doubleArrow} alt="arrow" />
          Voltar
        </ButtonBack>
      </ReturnLink>
      <InfiniteScroll
        endOfListCondition={endOfList}
        scrollRequestLoading={!!loading}
        nextUrlRequest={nextUrlRequest ?? ""}
        handlerPageChange={() => {
          if (nextUrlRequest) getData(nextUrlRequest);
        }}
      >
        <ContainerNews>
          {listNews &&
            listNews.map((news) => (
              <CardNews key={news.Id} cardData={news}>
                <LikeViews
                  likeLoadingControl={loading}
                  origin={"news"}
                  dataToLikeViews={news}
                  handleLike={(dataReceived) => handleLike(dataReceived)}
                />
              </CardNews>
            ))}
        </ContainerNews>
      </InfiniteScroll>
    </div>
  );
};
