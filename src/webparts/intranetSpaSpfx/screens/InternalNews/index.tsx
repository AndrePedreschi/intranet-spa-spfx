import { ReactElement } from "react";

import { useHistory } from "react-router-dom";

import { MostViewed } from "./MostViewed";
import { News } from "./News";
import {
  Container,
  Section,
  MostViewedSection,
  ButtonBack,
  DoubleArrow,
} from "./styles";
import doubleArrow from "../../assets/double-arrow.svg";

export function InternalNews(): ReactElement {
  const history = useHistory();

  return (
    <Container>
      <section>
        <ButtonBack onClick={() => history.goBack()}>
          <DoubleArrow src={doubleArrow} alt="arrow" />
          Voltar
        </ButtonBack>
      </section>

      <Section>
        <News />
        <MostViewedSection>
          <MostViewed />
        </MostViewedSection>
      </Section>
    </Container>
  );
}
