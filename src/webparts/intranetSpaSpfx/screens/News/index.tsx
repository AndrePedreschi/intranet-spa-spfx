import { ReactElement, useCallback, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import {
  ButtonBack,
  ContainerNews,
  DoubleArrow,
  ReturnLink,
  ViewAllLikes,
} from "./styles";
import doubleArrow from "../../assets/double-arrow.svg";
import { CardNews } from "../../components/CardNews";
import { InfiniteScroll } from "../../components/InfiniteScroll";
import { LikeViews } from "../../components/LikeViews";
import { ModalLikes } from "../../components/ModalLikes";
import {
  getNewsListPaginated,
  TGetNewsListResponse,
  updateNewsLikesAndViews,
} from "../../services/news.service";
import { getUser } from "../../services/user.service";
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
  const [endOfList, setEndOfList] = useState<boolean>(false);
  const [loadingScroll, setLoadingScroll] = useState<boolean>(false);
  const [usersInfo, setUsersInfo] = useState<
    Record<number, { name: string; photo?: string }>
  >({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentNewsId, setCurrentNewsId] = useState<number>(0);
  const history = useHistory();

  const itemsPerPage = 8;

  const getData = useCallback(
    async (url?: string) => {
      if (!context) return;
      try {
        setLoadingScroll(true);
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
        }
      } catch (error) {
        console.error("Erro ao buscar dados paginados:", error);
      } finally {
        setLoadingScroll(false);
      }
    },
    [context],
  );

  const getUsers = useCallback(
    async (userIds: number[]) => {
      if (!context) return;
      const getUsers: Record<number, { name: string; photo?: string }> = {};
      try {
        const promises = userIds.map(async (id) => {
          const user = await getUser(context, id);
          return {
            id,
            name: user?.Title || `User ${id}`,
            photo: user?.UserImg || "",
          };
        });
        const returnedUsers = await Promise.all(promises);
        returnedUsers.forEach(({ id, name, photo }) => {
          getUsers[id] = { name, photo };
        });
        setUsersInfo((prev) => ({ ...prev, ...getUsers }));
      } catch (error) {
        console.error("Erro ao buscar dados dos usuários:", error);
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
  const openModal = (newsId: number) => {
    setShowModal(true);
    setCurrentNewsId(newsId);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (listNews.length === 0) {
      getData();
    }
    const allLikedUsersIds = listNews.flatMap((news) =>
      formatStringToArray(news.LikedUsers),
    );
    const uniqueIds = Array.from(new Set(allLikedUsersIds));
    const idsNotLoaded = uniqueIds.filter((id) => !usersInfo[id]);
    if (idsNotLoaded.length > 0) {
      getUsers(idsNotLoaded);
    }
  }, [listNews, usersInfo, getUsers, getData]);

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
        scrollRequestLoading={loadingScroll}
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
                  usersInfo={usersInfo}
                />
                <ViewAllLikes onClick={() => openModal(news.Id)}>
                  {`Visualizar todos os likes`}
                </ViewAllLikes>
                {showModal && currentNewsId === news.Id && (
                  <ModalLikes
                    isOpen={showModal}
                    onClose={closeModal}
                    currentNewsId={currentNewsId}
                    listNews={listNews}
                    usersInfo={usersInfo}
                    formatStringToArray={formatStringToArray}
                  />
                )}
              </CardNews>
            ))}
        </ContainerNews>
      </InfiniteScroll>
    </div>
  );
};
