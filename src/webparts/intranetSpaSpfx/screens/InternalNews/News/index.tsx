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
import { Loader } from "../../../components/Loader";
import {
  getCommentsList,
  TGetCommentsListResponse,
  postNewComment,
  updateCommentLikes,
  deleteComment,
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
  deleteSubComment,
} from "../../../services/subcomments.service";
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

  /* const getData = useCallback(async () => {
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
  }, [context, id]); */

  const getData = useCallback(async () => {
    if (!context || !context.pageContext) return;

    try {
      await updateNewsViews(context, Number(id));

      const newsResponse: TNews = await getNewsById(context, Number(id));

      const [comments, user] = await Promise.all([
        getCommentsList(context, newsResponse.Id),
        getUser(context, newsResponse.AuthorId),
      ]);

      const processedComments = await Promise.all(
        comments.map(async (comment) => {
          const [subComments, commentUser] = await Promise.all([
            getSubCommentsList(context, comment.Id),
            getUser(context, comment.AuthorId),
          ]);

          const processedSubComments = await Promise.all(
            subComments.map(async (subComment) => ({
              ...subComment,
              user: await getUser(context, subComment.AuthorId),
            })),
          );

          return {
            ...comment,
            SubComments: processedSubComments,
            user: commentUser,
          };
        }),
      );

      setNews({
        ...newsResponse,
        Comments: processedComments,
        user,
      });
    } catch (error: any) {
      console.error("Erro ao buscar notícia:", error.message || error);
    }
  }, [context, id]);

  const handleCommentLike = async (dataReceived: {
    id: number;
    arrayLikes: number[];
  }) => {
    if (!context) return;
    try {
      setLoading(dataReceived.id);
      await updateCommentLikes(context, dataReceived.id);
    } catch (error) {
      console.error("Erro ao dar like em um comentário:", error);
    }
    setLoading(undefined);
  };

  const handleNewsLike = async (dataReceived: {
    id: number;
    arrayLikes: number[];
  }) => {
    if (!context) return;
    try {
      setLoading(dataReceived.id);

      await updateNewsLikes(context, dataReceived.id);
    } catch (error) {
      console.error("Erro ao dar like em uma notícia:", error);
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
      const { subCommentId } = await postNewSubComment(context, subCommentBody);

      const currentUser = await getUser(context, currentUserId);

      setNews((prevNews) => {
        if (!prevNews) return prevNews;
        const updatedComments = prevNews.Comments?.map((comment) => {
          if (comment.Id === commentId) {
            const subComment = comment.SubComments || [];
            const updatedSubComments = [
              ...subComment,
              {
                ...subCommentBody,
                Id: subCommentId,
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
        Comentario: comment,
        IdNoticia: newsId,
      };

      const { newComment } = await postNewComment(context, commentBody);
      newComment.user = await getUser(context, newComment.AuthorId);

      setNews((prevNews) => {
        if (!prevNews) return prevNews;
        return {
          ...prevNews,
          Comments: [...(prevNews.Comments || []), newComment],
        };
      });
      setCommentLoading(false);
    } catch (error) {
      console.error("Erro fazer um comentário:", error);
      setCommentLoading(false);
    }
  };

  const deleteSubCommentFn = async (
    commentId: number,
    subCommentId: number | undefined,
  ) => {
    if (!context || !subCommentId) return;

    try {
      await deleteSubComment(context, subCommentId);
      setNews((prevNews) => {
        if (!prevNews) return prevNews;
        const updatedComments = prevNews.Comments?.map((comment) => {
          if (comment.Id === commentId) {
            const updatedSubComments = comment.SubComments?.filter(
              (subComment) => subComment.Id !== subCommentId,
            );
            return { ...comment, SubComments: updatedSubComments };
          }
          return comment;
        });

        return { ...prevNews, Comments: updatedComments };
      });
    } catch (error) {
      console.error("Erro ao deletar um comentário:", error);
    }
  };

  const deleteCommentFn = async (commentId: number) => {
    if (!context) return;

    if (!news || !news.Comments) {
      console.error("Erro: `news` ou `news.Comments` está indefinido.");
      return;
    }
    try {
      await deleteComment(context, commentId);

      const commentToDelete = news.Comments?.find(
        (comment) => comment.Id === commentId,
      );

      if (commentToDelete?.SubComments) {
        const validSubCommentIds = commentToDelete.SubComments.map(
          (subComment) => subComment.Id,
        ).filter((id): id is number => id !== undefined);

        await Promise.all(
          validSubCommentIds.map((subCommentId) =>
            deleteSubComment(context, subCommentId),
          ),
        );
      }

      setNews((prevNews) => {
        if (!prevNews) return prevNews;
        const updatedComments = prevNews.Comments?.filter(
          (comment) => comment.Id !== commentId,
        );

        return { ...prevNews, Comments: updatedComments };
      });
    } catch (error) {
      console.error("Erro ao deletar um comentário:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return news ? (
    <Container>
      {news.LinkBanner && <NewsImg src={news.LinkBanner} />}
      <h1>{news.Title || "Título indisponível"}</h1>
      <UserSection>
        <UserImg $url={news.user?.UserImg} />
        <UserData>
          <h1>{news.user?.Title}</h1>
          <p>{formatDate(news.Created)}</p>
        </UserData>
      </UserSection>
      <p>{news.Descricao || "Descrição indisponível"}</p>
      <LikeViews
        likeLoadingControl={loading}
        origin={"news"}
        dataToLikeViews={news}
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
                  <div>
                    <UserImg $url={comment.user?.UserImg} />
                    <UserData>
                      <h1>{comment.user?.Title}</h1>
                      <p>{formatDate(comment.Created)}</p>
                    </UserData>
                  </div>

                  {comment.AuthorId === currentUserId ? (
                    <button onClick={() => deleteCommentFn(comment.Id)}>
                      X
                    </button>
                  ) : null}
                </UserSection>

                <p>{comment.Comentario}</p>
                <hr />
                <LikeViews
                  likeLoadingControl={loading}
                  origin={"comment"}
                  dataToLikeViews={comment}
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
                          <div>
                            <UserImg $url={subComment.user?.UserImg} />

                            <UserData>
                              <h1>{subComment.user?.Title}</h1>
                              <p>{formatDate(subComment.Created)}</p>
                            </UserData>
                          </div>

                          {subComment.AuthorId === currentUserId ? (
                            <button
                              onClick={() =>
                                deleteSubCommentFn(comment.Id, subComment.Id)
                              }
                            >
                              X
                            </button>
                          ) : null}
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
        {commentLoading && <Loader />}
      </CommentContainer>
    </Container>
  ) : (
    <LoadingContainer>
      <Loader />
    </LoadingContainer>
  );
};
