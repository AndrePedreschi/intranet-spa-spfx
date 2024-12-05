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
  const [listNews, setListNews] = useState<TGetNewsListResponse[]>([]);
  const history = useHistory();
  const user: number = context?.pageContext?.legacyPageContext.userId || 0;

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
          const normalizedData = data.map((item) => ({
            ...item,
            LikedUsers:
              typeof item.LikedUsers === "string"
                ? item.LikedUsers.split(",").map(Number)
                : Array.isArray(item.LikedUsers)
                  ? item.LikedUsers
                  : [],
          }));

          setListNews(normalizedData);
        } catch (error) {
          console.error("Erro ao buscar dados paginados:", error);
        }
      }
    },
    [context],
  );
  //Funcional sem a utilização do getData(). Entretanto, é necessário remover o "[]" da prop Likes na lista de Sharepoint. Alteração da prop Likes de string para array de strings na tipagem TGetNewsListResponse.
  const handleLike = (newsId: number) => {
    setListNews((prevListNews) =>
      prevListNews.map((item) => {
        if (item.Id === newsId) {
          const isLiked =
            Array.isArray(item.LikedUsers) && item.LikedUsers.includes(user);
          const updatedLikes = isLiked
            ? Array.isArray(item.LikedUsers)
              ? item.LikedUsers.filter((id) => id !== user)
              : []
            : Array.isArray(item.LikedUsers)
              ? [...item.LikedUsers, user]
              : [user];
          return { ...item, LikedUsers: updatedLikes };
        }
        return item;
      }),
    );
    if (context) {
      updateNewsLikesAndViews(context, newsId);
    }
  };

  useEffect(() => {
    console.log("listNews", listNews);
  }, [listNews]);

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
              likes={
                Array.isArray(item.LikedUsers) ? item.LikedUsers.length : 0
              }
              views={item.Views}
              description={item.Descricao}
              iconHeart={
                <IconHeart
                  src={
                    Array.isArray(item.LikedUsers) &&
                    user &&
                    item.LikedUsers.includes(user)
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
