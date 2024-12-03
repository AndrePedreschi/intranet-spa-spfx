import { ReactElement, useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  LoadingContainer,
  Container,
  CommentContainer,
  CommentSection,
  Comment,
  UserSection,
  UserImg,
  UserData,
  SubCommentsContainer,
  SubCommentSection,
  NewsImg,
} from "./styles";
import { LikeViews } from "../../../components/LikeViews";
import { Loading } from "../../../components/Loading";
import {
  getCommentsList,
  TGetCommentsListResponse,
  postNewComment,
  updateCommentLikes,
} from "../../../services/comments.service";
import {
  getNewsById,
  updateNewsViews,
  updateNewsLikes,
  TGetNewsListResponse,
} from "../../../services/news.service";
import {
  getSubCommentsList,
  TGetSubCommentsListResponse,
  postNewSubComment,
} from "../../../services/subComments.service";
import { getUser, TGetUserResponse } from "../../../services/user.service";
import { useZustandStore } from "../../../store";
import { formatDate } from "../../../utils/formatDate";
import { CommentForm } from "../CommentForm";

type TSubComments = {
  user?: TGetUserResponse;
} & TGetSubCommentsListResponse;

type TComments = {
  user?: TGetUserResponse;
  SubComments?: TSubComments[];
} & TGetCommentsListResponse;

type TNews = {
  user?: TGetUserResponse;
  Comments?: TComments[];
} & TGetNewsListResponse;

export const News = (): ReactElement => {
  const { context } = useZustandStore();
  const currentUserId = context?.pageContext?.legacyPageContext.userId;
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<TNews>();
  const [loading, setLoading] = useState<number>();
  const [commentLoading, setCommentLoading] = useState<boolean>(false);

  const getData = useCallback(async () => {
    if (context && context.pageContext) {
      try {
        await updateNewsViews(context, Number(id));
        const newsResponse: TNews = await getNewsById(context, Number(id));

        newsResponse["Comments"] = await getCommentsList(
          context,
          newsResponse.Id,
        );
        newsResponse["user"] = await getUser(context, newsResponse.AuthorId);

        for await (const comment of newsResponse.Comments) {
          comment.SubComments = await getSubCommentsList(context, comment.Id);
          comment.user = await getUser(context, comment.AuthorId);

          for await (const subComment of comment.SubComments) {
            subComment.user = await getUser(context, subComment.AuthorId);
          }
        }

        setNews(newsResponse);
      } catch (error: any) {
        console.error("Erro ao buscar notícia:", error.message || error);
      }
    }
  }, [context, id]);

  const handleCommentLike = async (dataReceived: {
    id: number;
    arrayLikes: string;
  }) => {
    if (!context) return;
    try {
      setLoading(dataReceived.id);
      await updateCommentLikes(context, dataReceived.id);
      setNews((prevNews) => {
        if (!prevNews) return prevNews;

        const updatedComments = prevNews.Comments?.map((comment) =>
          comment.Id === dataReceived.id
            ? { ...comment, Likes: dataReceived.arrayLikes }
            : comment,
        );

        return { ...prevNews, Comments: updatedComments };
      });
    } catch (error) {
      console.error("Erro dar like em um comentário:", error);
    }
    setLoading(undefined);
  };

  const handleNewsLike = async (dataReceived: {
    id: number;
    arrayLikes: string;
  }) => {
    if (!context) return;
    try {
      setLoading(dataReceived.id);

      await updateNewsLikes(context, dataReceived.id);

      setNews((prevNews) => {
        if (!prevNews) return prevNews;
        return { ...prevNews, Likes: dataReceived.arrayLikes };
      });
    } catch (error) {
      console.error("Erro dar like em um comentário:", error);
    }
    setLoading(undefined);
  };

  const postSubComment = async (subComment: string, commentId: number) => {
    if (!context) return;
    try {
      const subCommentBody = {
        IdComentario: commentId,
        SubComentario: subComment,
      };
      await postNewSubComment(context, subCommentBody);

      const currentUser = await getUser(context, currentUserId);

      //obs: o subcomentário podemos utilizar essa técnica de enviar os dados e atualizar os dados localmente, para não fazer outra chamada da lista de subcomentários.
      //isso só é possível pois não utilizamos o id do subcomentário
      setNews((prevNews) => {
        if (!prevNews) return prevNews;
        const updatedComments = prevNews.Comments?.map((comment) => {
          if (comment.Id === commentId) {
            const subComment = comment.SubComments || [];
            const updatedSubComments = [
              ...subComment,
              {
                ...subCommentBody,
                AuthorId: currentUserId,
                Created: new Date().toISOString(),
                user: currentUser,
              },
            ];
            return { ...comment, SubComments: updatedSubComments };
          }
          return comment;
        });

        return { ...prevNews, Comments: updatedComments };
      });
    } catch (error) {
      console.error("Erro fazer um subComentário:", error);
    }
  };

  const postComment = async (comment: string, newsId: number) => {
    if (!context) return;
    try {
      setCommentLoading(true);
      const commentBody = {
        Likes: "[]",
        Comentario: comment,
        IdNoticia: newsId,
      };

      await postNewComment(context, commentBody);
      const newCommentList = await getCommentsList(context, newsId);
      for await (const comment of newCommentList) {
        comment.SubComments = await getSubCommentsList(context, comment.Id);
        comment.user = await getUser(context, comment.AuthorId);

        for await (const subComment of comment.SubComments) {
          subComment.user = await getUser(context, subComment.AuthorId);
        }
      }

      setNews((prevNews) => {
        if (!prevNews) return prevNews;
        return {
          ...prevNews,
          Comments: newCommentList,
        };
      });
      setCommentLoading(false);
    } catch (error) {
      console.error("Erro fazer um comentário:", error);
      setCommentLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return news ? (
    <Container>
      <NewsImg src={news.LinkBanner} />
      <h1>{news.Title}</h1>
      <UserSection>
        <UserImg $url={news.user?.UserImg} />
        <UserData>
          <h1>{news.user?.Title}</h1>
          <p>{formatDate(news.Created)}</p>
        </UserData>
      </UserSection>
      <p>{news.Descricao}</p>
      <LikeViews
        loadingControl={loading}
        origin={"news"}
        dataToLike={news}
        handleLike={(dataReceived) => handleNewsLike(dataReceived)}
      />

      <CommentForm
        formType={"Comment"}
        submitFunction={(comment) => postComment(comment.msg, news.Id)}
      />

      <CommentContainer>
        {news.Comments &&
          news.Comments.map((comment) => (
            <CommentSection key={comment.Id}>
              <Comment>
                <UserSection>
                  <UserImg $url={comment.user?.UserImg} />

                  <UserData>
                    <h1>{comment.user?.Title}</h1>
                    <p>{formatDate(comment.Created)}</p>
                  </UserData>
                </UserSection>
                <p>{comment.Comentario}</p>
                <hr />
                <LikeViews
                  loadingControl={loading}
                  origin={"comment"}
                  dataToLike={comment}
                  showViews={false}
                  handleLike={(dataReceived) => handleCommentLike(dataReceived)}
                />

                <SubCommentsContainer>
                  {comment.SubComments &&
                    comment.SubComments.map((subComment) => (
                      <SubCommentSection
                        key={subComment.Created + subComment.AuthorId}
                      >
                        <UserSection>
                          <UserImg $url={subComment.user?.UserImg} />

                          <UserData>
                            <h1>{subComment.user?.Title}</h1>
                            <p>{formatDate(subComment.Created)}</p>
                          </UserData>
                        </UserSection>

                        <p>{subComment.SubComentario}</p>
                      </SubCommentSection>
                    ))}
                </SubCommentsContainer>
              </Comment>
              <CommentForm
                formType={"SubComment"}
                submitFunction={(subComment) =>
                  postSubComment(subComment.msg, comment.Id)
                }
              />
            </CommentSection>
          ))}
        {commentLoading && <Loading />}
      </CommentContainer>
    </Container>
  ) : (
    <LoadingContainer>
      <Loading />
    </LoadingContainer>
  );
};
