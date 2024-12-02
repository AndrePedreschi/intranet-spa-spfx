import { ReactElement } from "react";

import { Link } from "react-router-dom";

import {
  CardWrapper,
  BannerWrapper,
  TitleWrapper,
  InfoWrapper,
  DescriptionWrapper,
} from "./styles";

interface CardNewsProps {
  id?: number;
  bannerContent: string;
  title: string;
  date: string;
  likes: string;
  views: number;
  description: string;
  iconHeart?: React.ReactNode;
}

export const CardNews = ({
  bannerContent,
  title = "Título não disponível",
  date,
  likes = "",
  views = 0,
  description = "Descrição indisponível",
  id,
  iconHeart,
}: CardNewsProps): ReactElement => {
  const breakDescription = (): ReactElement => {
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
  };

  const breakTitle = (): string => {
    if (title.length > 50) {
      const breakedTitle = title.slice(0, 50);
      return breakedTitle;
    } else {
      return title;
    }
  };

  const parseLikes = () => {
    try {
      const likesParsed: number[] = JSON.parse(likes || "[]");
      return likesParsed.length;
    } catch (error) {
      console.error("Erro ao processar os likes:", error);
      return 0;
    }
  };

  const formateDate = () => {
    return date.split("T")[0].split("-").reverse().join("/");
  };

  return (
    <CardWrapper>
      <BannerWrapper src={bannerContent} alt="banner"></BannerWrapper>
      <TitleWrapper>{breakTitle()}</TitleWrapper>
      <InfoWrapper>
        {formateDate()}
        <div>
          {iconHeart}
          {parseLikes()} Likes
          <p>{views} Views</p>
        </div>
      </InfoWrapper>
      <DescriptionWrapper>{breakDescription()}</DescriptionWrapper>
    </CardWrapper>
  );
};
