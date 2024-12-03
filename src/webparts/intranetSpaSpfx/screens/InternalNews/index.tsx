import { ReactElement } from "react";

import { useHistory } from "react-router-dom";

import { MostViewed } from "./MostViewed";
import { News } from "./News";
import {
  Container,
  Section,
  ReturnLink,
  ButtonBack,
  DoubleArrow,
} from "./styles";
import doubleArrow from "../../assets/double-arrow.svg";

export function InternalNews(): ReactElement {
  const history = useHistory();

  return (
    <Container>
      <ReturnLink>
        <ButtonBack onClick={() => history.goBack()}>
          <DoubleArrow src={doubleArrow} alt="arrow" />
          Voltar
        </ButtonBack>
      </ReturnLink>

      <Section>
        <News />
        <MostViewed />
      </Section>
    </Container>
  );
}
