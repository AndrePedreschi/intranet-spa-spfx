import { ReactElement, useCallback, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  Banner,
  CardNews,
  ContainerNews,
  ReturnLink,
  TitleNews,
  Typography,
  TypographyText,
} from "./styles";
import { getNewsList, TGetNewsListResponse } from "../../services/news.service";
import { useZustandStore } from "../../store";

export const News = (): ReactElement => {
  const { context } = useZustandStore();
  const [listNews, setListNews] = useState<TGetNewsListResponse[]>();

  const getData = useCallback(async () => {
    if (!context) return;

    setListNews(await getNewsList(context));
  }, [context]);

  function breakDescription(description: string, id: number): JSX.Element {
    if (description.length > 255) {
      const breakedDescription = description.slice(0, 255);
      return (
        <>
          {breakedDescription}
          {"... "}
          <Link
            to={`/noticias/${id}`}
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
      return JSON.parse(likes || "[]")[0] || 0;
    } catch (error) {
      console.error("Erro ao processar os likes:", error);
      return 0;
    }
  }

  function formateDate(date: string) {
    return date.split("T")[0].split("-").reverse().join("/");
  }

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <ReturnLink href="/home">{"<< Voltar"}</ReturnLink>
      <ContainerNews>
        {listNews &&
          listNews.map((item) => (
            <CardNews key={item.Title}>
              <Banner src={item.LinkBanner}></Banner>
              <TitleNews>{item.Title}</TitleNews>
              <Typography>
                {formateDate(item.Created)}
                <div>
                  {item.Views} Views {parseLikes(item.Likes)} Likes
                </div>
              </Typography>
              <TypographyText>
                {breakDescription(item.Descricao, item.ID)}
              </TypographyText>
            </CardNews>
          ))}
      </ContainerNews>
    </>
  );
};
