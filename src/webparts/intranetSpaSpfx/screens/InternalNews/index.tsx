import { ReactElement } from "react";

import { useHistory } from "react-router-dom";

import { MostViewed } from "./MostViewed";
import { News } from "./News";
import { Container, Back, Section } from "./styles";

export function InternalNews(): ReactElement {
  const history = useHistory();

  return (
    <Container>
      <Back onClick={history.goBack}>
        <div>
          <p>{"<<"}</p>
          <p>Voltar</p>
        </div>
      </Back>

      <Section>
        <News />
        <MostViewed />
      </Section>
    </Container>
  );
}
