import { ReactElement, useEffect, useState, useCallback } from "react";
import {
  NewsContainer,
  MainNews,
  OtherNews,
  NewsItem,
  UserInfo,
} from "./styles";
import {
  getNewsListPaginated,
  TGetNewsListResponse,
} from "../../../services/news.service";
import { LikeViews } from "../../../components/LikeViews";
import { useZustandStore } from "../../../store";
import { getUser, TGetUserResponse } from "../../../services/user.service";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";
import { motion } from "framer-motion";
import { Spinner } from "../../../components/Spinner";

export const CardNewsHome = (): ReactElement => {
  const { context } = useZustandStore();
  const [news, setNews] = useState<TGetNewsListResponse[]>([]);
  const [users, setUsers] = useState<Record<number, TGetUserResponse>>({});
  const [loading, setLoading] = useState(true);

  const fetchNews = useCallback(async () => {
    if (!context) return;

    try {
      const { data } = await getNewsListPaginated(context, 4);
      setNews(data);

      const userPromises = data.map((item) => getUser(context, item.AuthorId));
      const userResults = await Promise.all(userPromises);

      const usersMap = userResults.reduce(
        (acc, user) => {
          acc[user.Id] = user;
          return acc;
        },
        {} as Record<number, TGetUserResponse>,
      );

      setUsers(usersMap);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar as notícias ou usuários:", error);
      setLoading(false);
    }
  }, [context]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Spinner color="#c02c2e" height={40} width={40} />
      </div>
    );
  }

  if (!news.length) {
    return <p style={{ textAlign: "center" }}>Nenhuma notícia disponível.</p>;
  }

  return (
    <NewsContainer>
      {/* Notícia Principal */}
      {news.slice(0, 1).map((mainNews) => (
        <motion.div
          key={mainNews.Id}
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <MainNews>
            <img src={mainNews.LinkBanner} alt={mainNews.Title} />
            <div className="main-news-content">
              <h2>{mainNews.Title}</h2>
              <p>
                {mainNews.Descricao.slice(0, 185)}...{" "}
                <Link
                  to={`/internalNews/${mainNews.Id}`}
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Leia Mais
                </Link>
              </p>
              <UserInfo>
                <img
                  src={
                    users[mainNews.AuthorId]?.UserImg ||
                    "https://via.placeholder.com/40"
                  }
                  alt={users[mainNews.AuthorId]?.Title || "Imagem do usuário"}
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
                <div>
                  <p>
                    {users[mainNews.AuthorId]?.Title || "Carregando usuário..."}
                  </p>
                  <p>{formatDate(mainNews.Created)}</p>
                </div>
                <LikeViews
                  showLike={false}
                  origin="news"
                  dataToLikeViews={mainNews}
                />
              </UserInfo>
            </div>
          </MainNews>
        </motion.div>
      ))}

      {/* Outras Notícias */}
      <OtherNews>
        {news.slice(1).map((item, index) => (
          <motion.div
            key={item.Id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
            }}
          >
            <NewsItem>
              <img src={item.LinkBanner} alt={item.Title} />
              <div>
                <h3>{item.Title}</h3>
                <p>
                  {item.Descricao.slice(0, 120)}...{" "}
                  <Link
                    to={`/internalNews/${item.Id}`}
                    style={{ color: "blue", textDecoration: "underline" }}
                  >
                    Leia Mais
                  </Link>
                </p>
                <UserInfo>
                  <img
                    src={
                      users[item.AuthorId]?.UserImg ||
                      "https://via.placeholder.com/40"
                    }
                    alt={users[item.AuthorId]?.Title || "Imagem do usuário"}
                  />
                  <div>
                    <p>{users[item.AuthorId]?.Title || "Carregando..."}</p>
                    <p>{formatDate(item.Created)}</p>
                  </div>
                  <LikeViews
                    showLike={false}
                    origin="news"
                    dataToLikeViews={item}
                  />
                </UserInfo>
              </div>
            </NewsItem>
          </motion.div>
        ))}
      </OtherNews>
    </NewsContainer>
  );
};
