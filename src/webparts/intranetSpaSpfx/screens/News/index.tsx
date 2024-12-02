import { ReactElement, useCallback, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import {
  ButtonBack,
  ContainerNews,
  DoubleArrow,
  IconHeart,
  ReturnLink,
} from "./styles";
import doubleArrow from "../../assets/double-arrow.svg";
import likedHeart from "../../assets/heart-liked.svg";
import iconHeart from "../../assets/icon-heart.svg";
import { CardNews } from "../../components/CardNews";
import {
  getNewsListPaginated,
  TGetNewsListResponse,
  updateNewsLikesAndViews,
} from "../../services/news.service";
import { useZustandStore } from "../../store";

export const News = (): ReactElement => {
  const { context } = useZustandStore();
  const [listNews, setListNews] = useState<TGetNewsListResponse[]>();
  const [likedNews, setLikedNews] = useState<number[]>([]);
  const history = useHistory();
  const user: string = context?.pageContext?.legacyPageContext.userId;

  const [, setParam] = useState("");
  const itemsPerPage = 25;

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

          setListNews(data);
        } catch (error) {
          console.error("Erro ao buscar dados paginados:", error);
        }
      }
    },
    [context],
  );

  async function handleLike(newsId: number) {
    if (!likedNews.includes(newsId)) {
      setLikedNews([...likedNews, newsId]);
      if (context) {
        await updateNewsLikesAndViews(context, newsId);
        getData();
      }
    } else {
      setLikedNews(likedNews.filter((id) => id !== newsId));
      getData();
    }
  }

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <ReturnLink>
        <ButtonBack onClick={() => history.goBack()}>
          <DoubleArrow src={doubleArrow} alt="arrow" />
          Voltar
        </ButtonBack>
      </ReturnLink>
      <ContainerNews>
        {listNews &&
          listNews.map((item) => (
            <CardNews
              key={item.Id || item.Title}
              id={item.Id}
              bannerContent={item.LinkBanner}
              title={item.Title}
              date={item.Created}
              likes={item.Likes}
              views={item.Views}
              description={item.Descricao}
              iconHeart={
                <IconHeart
                  src={
                    item.Likes && user && item.Likes.includes(user)
                      ? likedHeart
                      : iconHeart
                  }
                  alt="heart"
                  onClick={() => handleLike(item.Id)}
                />
              }
            ></CardNews>
          ))}
      </ContainerNews>
    </>
  );
};
