import { ReactElement, useEffect, useState } from "react";

import { Tooltip } from "@mui/material";

import { Container, LikesSection, IconHeart } from "./styles";
import likedHeart from "../../assets/heart-liked.svg";
import iconHeart from "../../assets/icon-heart.svg";
import { TGetCommentsListResponse } from "../../services/comments.service";
import { TGetNewsListResponse } from "../../services/news.service";
import { useZustandStore } from "../../store";
import { formatStringToArray } from "../../utils/formatLikesViews";
import { Spinner } from "../Spinner";

type TLikeViews = {
  likeLoadingControl?: number;
  origin: "news" | "comment";
  dataToLikeViews: TGetNewsListResponse | TGetCommentsListResponse;
  showLike?: boolean;
  showViews?: boolean;
  handleLike?: (dataToSend: { id: number; arrayLikes: number[] }) => void;
  usersInfo?: Record<number, { name: string }>;
};

export const LikeViews = ({
  likeLoadingControl,
  showLike = true,
  showViews = true,
  dataToLikeViews,
  origin,
  handleLike,
  usersInfo,
}: TLikeViews): ReactElement => {
  const { context } = useZustandStore();
  const user: number = context?.pageContext?.legacyPageContext.userId;
  const [likes, setLikes] = useState<number[]>([]);
  const [id, setId] = useState<number>();

  const verifyType = (
    data: TGetNewsListResponse | TGetCommentsListResponse,
  ): data is TGetNewsListResponse => {
    return "Views" in data;
  };

  const likeSomething = async () => {
    const audio = new Audio(`/sites/SPA-Example/Sons/like.ogg`);
    if (!id || !handleLike) return;
    if (likes.includes(user)) {
      const editedLikes = likes.filter((userId) => userId !== user);
      setLikes(editedLikes);
      return handleLike({ id: id, arrayLikes: editedLikes });
    } else {
      const editedLikes = [...likes, user];
      setLikes(editedLikes);

      audio.play();
      return handleLike({ id: id, arrayLikes: editedLikes });
    }
  };

  useEffect(() => {
    setLikes(formatStringToArray(dataToLikeViews.LikedUsers));
    setId(dataToLikeViews.Id);
  }, [dataToLikeViews]);

  return (
    <Container>
      {showLike && (
        <LikesSection>
          {likeLoadingControl === id &&
          (origin === "comment" || origin === "news") ? (
            <Spinner />
          ) : (
            <Tooltip
              title={
                likes.length > 0 ? (
                  <div>
                    {likes.length <= 4
                      ? likes.map((id) => (
                          <div key={id}>
                            {usersInfo && usersInfo[id]?.name
                              ? usersInfo[id]?.name
                              : "Carregando..."}
                          </div>
                        ))
                      : (() => {
                          const randomLikes = likes
                            .sort(() => 0.5 - Math.random())
                            .slice(0, 4);
                          return (
                            <div>
                              {randomLikes.map((id) => (
                                <div key={id}>
                                  {usersInfo && usersInfo[id]?.name
                                    ? usersInfo[id]?.name
                                    : "Carregando..."}
                                </div>
                              ))}
                              <div>
                                e outras {likes.length - 4} pessoas curtiram
                                isso
                              </div>
                            </div>
                          );
                        })()}
                  </div>
                ) : (
                  "Nenhum usuário curtiu ainda"
                )
              }
              arrow
              placement="top"
            >
              <IconHeart
                src={likes.includes(user) ? likedHeart : iconHeart}
                alt="heart"
                onClick={likeSomething}
              />
            </Tooltip>
          )}
          <p>
            {likes.length} {likes.length === 1 ? "Like" : "Likes"}
          </p>
        </LikesSection>
      )}
      {showViews && verifyType(dataToLikeViews) && (
        <section>
          <p>{dataToLikeViews.Views || 0} Views</p>
        </section>
      )}
    </Container>
  );
};
