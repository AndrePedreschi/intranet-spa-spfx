import { ReactElement, ReactNode } from "react";

import { Link } from "react-router-dom";

import {
  CardWrapper,
  BannerWrapper,
  Banner,
  TitleWrapper,
  InfoWrapper,
  DescriptionWrapper,
} from "./styles";
import { TGetNewsListResponse } from "../../services/news.service";

interface ICardNewsProps {
  cardData: TGetNewsListResponse;
  children: ReactNode;
}

export const CardNews = ({
  cardData,
  children,
}: ICardNewsProps): ReactElement => {
  const breakDescription = (): ReactElement => {
    const description = cardData.Descricao || "Descrição indisponível";
    if (description.length > 90) {
      const breakedDescription = cardData.Descricao.slice(0, 90);
      return (
        <>
          {breakedDescription}
          {"... "}
          <Link
            to={`/internalNews/${cardData.Id}`}
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Leia Mais
          </Link>
        </>
      );
    }
    return (
      <>
        {description}
        {"  "}
        <Link
          to={`/internalNews/${cardData.Id}`}
          style={{ color: "blue", textDecoration: "underline" }}
        >
          Leia Mais
        </Link>
      </>
    );
  };

  const breakTitle = (): string => {
    const title = cardData.Title || "Título não disponível";
    if (title.length > 50) {
      const breakedTitle = cardData.Title.slice(0, 50);
      return `${breakedTitle}...`;
    } else {
      return title;
    }
  };

  const formateDate = (date: string) => {
    return date.split("T")[0].split("-").reverse().join("/");
  };

  return (
    <CardWrapper>
      <BannerWrapper>
        {cardData.LinkBanner ? (
          <Banner src={cardData.LinkBanner} alt="banner" />
        ) : (
          <p>Sem imagem</p>
        )}
      </BannerWrapper>
      <TitleWrapper>{breakTitle()}</TitleWrapper>
      <InfoWrapper>
        {formateDate(cardData.Created)}
        {children}
      </InfoWrapper>
      <DescriptionWrapper>{breakDescription()}</DescriptionWrapper>
    </CardWrapper>
  );
};

export { CardNews };
