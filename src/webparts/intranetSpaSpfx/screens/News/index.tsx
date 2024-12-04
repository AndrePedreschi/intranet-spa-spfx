import { ReactElement, useCallback, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import { ButtonBack, ContainerNews, DoubleArrow, ReturnLink } from "./styles";
import doubleArrow from "../../assets/double-arrow.svg";
import { CardNews } from "../../components/CardNews";
import { LikeViews } from "../../components/LikeViews";
import {
  getNewsListPaginated,
  TGetNewsListResponse,
  updateNewsLikesAndViews,
} from "../../services/news.service";
import { useZustandStore } from "../../store";

export const News = (): ReactElement => {
  const [loading, setLoading] = useState<number>();
  const { context } = useZustandStore();
  const [listNews, setListNews] = useState<TGetNewsListResponse[]>();
  const history = useHistory();

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

  const handleLike = async (dataReceived: {
    id: number;
    arrayLikes: string;
  }) => {
    if (!context) return;
    try {
      setLoading(dataReceived.id);

      await updateNewsLikesAndViews(context, dataReceived.id);
    } catch (error) {
      console.error("Erro dar like em um comentário:", error);
    }

    setLoading(undefined);
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
    </div>
  );
};
