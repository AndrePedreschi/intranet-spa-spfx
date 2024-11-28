import { ReactElement, useCallback, useEffect, useState } from "react";

import { Link, useHistory } from "react-router-dom";

import {
  Banner,
  ButtonBack,
  CardNews,
  ContainerNews,
  DoubleArrow,
  IconHeart,
  ReturnLink,
  TitleNews,
  Typography,
  TypographyText,
} from "./styles";
import doubleArrow from "../../assets/double-arrow.svg";
import likedHeart from "../../assets/heart-liked.svg";
import iconHeart from "../../assets/icon-heart.svg";
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

  function breakDescription(description: string, id: number): JSX.Element {
    if (description.length > 90) {
      const breakedDescription = description.slice(0, 90);
      return (
        <>
          {breakedDescription}
          {"... "}
          <Link
            to={`/internalNews/${id}`}
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Leia Mais
          </Link>
        </>
      );
    }
    return <>{description}</>;
  }

  function parseLikes(likes: string) {
    try {
      const likesParsed: number[] = JSON.parse(likes || "[]");
      return likesParsed.length;
    } catch (error) {
      console.error("Erro ao processar os likes:", error);
      return 0;
    }
  }

  function formateDate(date: string) {
    return date.split("T")[0].split("-").reverse().join("/");
  }

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
            <CardNews key={item.Id || item.Title}>
              <Banner src={item.LinkBanner}></Banner>
              <TitleNews>{item.Title}</TitleNews>
              <Typography>
                {formateDate(item.Created)}
                <div>
                  <IconHeart
                    src={
                      item.Likes && user && item.Likes.includes(user)
                        ? likedHeart
                        : iconHeart
                    }
                    alt="heart"
                    liked={item.Likes && user && item.Likes.includes(user)}
                    onClick={() => handleLike(item.Id)}
                  />
                  {parseLikes(item.Likes)} Likes <p>{item.Views} Views</p>
                </div>
              </Typography>
              <TypographyText>
                {breakDescription(item.Descricao, item.Id)}
              </TypographyText>
            </CardNews>
          ))}
      </ContainerNews>
    </>
  );
};
