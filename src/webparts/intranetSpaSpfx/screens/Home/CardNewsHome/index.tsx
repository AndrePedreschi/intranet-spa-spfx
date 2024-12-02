import { ReactElement } from "react";
import {
  NewsContainer,
  MainNews,
  OtherNews,
  NewsItem,
  UserInfo,
  Stats,
} from "./styles";

// Função para limitar o texto com "..."
const truncateText = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

export const CardNewsHome = (): ReactElement => {
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a nunc sed justo fringilla tempus. Curabitur finibus porta sodales. Cras hendrerit auctor suscipit. Maecenas facilisis Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a nunc sed justo fringilla tempus. Curabitur finibus porta sodales. Cras hendrerit auctor suscipit. Maecenas facilisis";

  return (
    <NewsContainer>
      <MainNews>
        <img
          src="https://via.placeholder.com/800x400"
          alt="Notícia principal"
        />
        <h2>Notícia Principal</h2>
        <p>{truncateText(description, 185)}</p>

        <div>
          <p>Usuário </p>
          <p>20/11/2024</p>
        </div>
        <Stats>
          <span>👍 45</span>
          <span>👁️ 100</span>
        </Stats>
      </MainNews>
      <OtherNews>
        {[1, 2, 3].map((_, index) => (
          <NewsItem key={index}>
            <img
              src={`https://via.placeholder.com/250x150`}
              alt={`Notícia ${index + 1}`}
            />
            <div>
              <h3>Notícia {index + 1}</h3>
              <p>{truncateText(description, 185)}</p>
              <UserInfo>
                <img
                  src="https://via.placeholder.com/40"
                  alt={`Usuário ${index + 1}`}
                />
                <div>
                  <p>Usuário {index + 1}</p>
                  <p>20/11/2024</p>
                </div>
                <Stats>
                  <span>👍 45</span>
                  <span>👁️ 100</span>
                </Stats>
              </UserInfo>
            </div>
          </NewsItem>
        ))}
      </OtherNews>
    </NewsContainer>
  );
};
