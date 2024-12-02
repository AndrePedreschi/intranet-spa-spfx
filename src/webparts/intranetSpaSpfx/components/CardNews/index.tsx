import { ReactElement } from "react";

import {
  CardNews,
  Banner,
  TitleNews,
  Typography,
  TypographyText,
} from "./styles";

export const Cards = (): ReactElement => {
  return (
    <>
      <CardNews>
        <Banner>Image</Banner>
        <TitleNews>Title</TitleNews>
        <Typography>
          Date
          <div>
            Likes <p>Views</p>
          </div>
        </Typography>
        <TypographyText>Description</TypographyText>
      </CardNews>
    </>
  );
};

export { CardNews };
