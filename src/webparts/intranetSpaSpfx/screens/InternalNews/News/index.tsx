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
  LikesSection,
  SubCommentsContainer,
  SubCommentSection,
  NewsImg,
} from "./styles";
import { Loading } from "../../../components/Loading";
import {
  getCommentsList,
  TGetCommentsListResponse,
  //postNewComment,
  //updateCommentLikes,
} from "../../../services/comments.service";
import {
  getNewsById,
  updateNewsViews,
  //updateNewsLikes,
  TGetNewsListResponse,
} from "../../../services/news.service";
import {
  getSubCommentsList,
  TGetSubCommentsListResponse,
  //postNewSubComment,
} from "../../../services/subComments.service";
import { getUser, TGetUserResponse } from "../../../services/user.service";
import { useZustandStore } from "../../../store";
import { formatDate } from "../../../utils/formatDate";

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
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<TNews>();
  const [user, setUser] = useState<string>("");

  const getData = useCallback(async () => {
    if (context && context.pageContext) {
      try {
        const newsResponse: TNews = await getNewsById(context, Number(id));
        updateNewsViews(context, newsResponse.Id);

        newsResponse["Comments"] = await getCommentsList(
          context,
          newsResponse.Id,
        );
        newsResponse["user"] = await getUser(context, newsResponse.AuthorId);

        newsResponse.Comments.forEach(async (comment) => {
          comment.SubComments = await getSubCommentsList(context, comment.Id);
          comment.user = await getUser(context, comment.AuthorId);

          comment.SubComments.forEach(async (subComment) => {
            subComment.user = await getUser(context, subComment.AuthorId);
          });
        });

        console.log(newsResponse);

        setNews(newsResponse);
      } catch (error) {
        console.error("Erro ao buscar notícia:", error);
      }
    }
  }, [context, id]);

  useEffect(() => {
    if (
      !context ||
      context === undefined ||
      context.pageContext === undefined ||
      context.pageContext.legacyPageContext === undefined
    )
      return;
    const user: string = context.pageContext.legacyPageContext.userLoginName;
    const userPhotoUrl = `${context.pageContext.web.absoluteUrl}/_layouts/15/userphoto.aspx?UserName=${user}&size=L`;

    setUser(userPhotoUrl);

    getData();
  }, [context, getData]);

  /* useEffect(() => {
    console.log("noticias", news);
  }, [news]); */

  return news ? (
    <Container>
      <UserImg $url={user} />
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
      <LikesSection>
        <p>coração</p>
        <p>{JSON.parse(news.Likes).length} Likes</p>
      </LikesSection>
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
                <LikesSection>
                  <p>coração</p>
                  <p>{JSON.parse(comment.Likes).length} Likes</p>
                </LikesSection>
                <hr />
                <SubCommentsContainer>
                  <p>Teste de subcomentário</p>
                  {comment.SubComments &&
                    comment.SubComments.map((subComment) => (
                      <SubCommentSection key={subComment.Id}>
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
              <form>
                <input type="text" />
              </form>
            </CommentSection>
          ))}
      </CommentContainer>
    </Container>
  ) : (
    <LoadingContainer>
      <Loading />
    </LoadingContainer>
  );
};
