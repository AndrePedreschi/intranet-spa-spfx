import { ReactElement, useEffect, useState } from "react";

import { Container, LikesSection, IconHeart } from "./styles";
import likedHeart from "../../assets/heart-liked.svg";
import iconHeart from "../../assets/icon-heart.svg";
import { TGetCommentsListResponse } from "../../services/comments.service";
import { TGetNewsListResponse } from "../../services/news.service";
import { useZustandStore } from "../../store";
import { Spinner } from "../Spinner";

type TLikeViews = {
  loadingControl: number | undefined;
  origin: "news" | "comment";
  dataToLike: TGetNewsListResponse | TGetCommentsListResponse;
  showLike?: boolean;
  showViews?: boolean;
  handleLike: (dataToSend: { id: number; arrayLikes: string }) => void;
};

export const LikeViews = ({
  loadingControl,
  showLike = true,
  showViews = true,
  dataToLike,
  origin,
  handleLike,
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
    if (!id) return;
    if (likes.includes(user)) {
      const editedLikes = likes.filter((userId) => userId !== user);
      setLikes(editedLikes);
      return handleLike({ id: id, arrayLikes: JSON.stringify(editedLikes) });
    } else {
      const editedLikes = [...likes, user];
      setLikes(editedLikes);

      audio.play();
      return handleLike({ id: id, arrayLikes: JSON.stringify(editedLikes) });
    }
  };

  useEffect(() => {
    setLikes(JSON.parse(dataToLike.Likes || "[]"));
    setId(dataToLike.Id);
  }, [dataToLike]);

  return (
    <Container>
      {showLike && (
        <LikesSection>
          {(loadingControl === id && origin === "comment") ||
          (loadingControl === id && origin === "news") ? (
            <Spinner />
          ) : (
            <IconHeart
              src={likes.includes(user) ? likedHeart : iconHeart}
              alt="heart"
              onClick={likeSomething}
            />
          )}
          <p>
            {likes.length} {likes.length === 1 ? "Like" : "Likes"}
          </p>
        </LikesSection>
      )}
      {showViews && verifyType(dataToLike) && (
        <section>
          <p>{dataToLike.Views} Views</p>
        </section>
      )}
    </Container>
  );
};
