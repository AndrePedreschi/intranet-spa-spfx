import { ReactElement, useCallback, useEffect, useState } from "react";

import {
  FooterContainer,
  FooterLinks,
  Link,
  Logo,
  RightsContainer,
  RightsReserved,
} from "./styles";
import itleanWhite from "../../assets/itlean-white.svg";
import {
  getFooterList,
  TGetFooterListResponse,
} from "../../services/footer.service";
import { useZustandStore } from "../../store";

export const Footer = (): ReactElement => {
  const { context } = useZustandStore();
  const [list, setList] = useState<TGetFooterListResponse[]>();

  const getData = useCallback(async () => {
    if (!context) return;

    setList(await getFooterList(context));

    const res = await getFooterList(context);
    console.log("lista footer", res);
  }, [context]);

  function getDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    return `IT Lean ${year.toString()}. Todos os direitos reservados.`;
  }

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <FooterContainer>
        <Logo src={itleanWhite} alt="Logo" />
        <FooterLinks>
          {list &&
            list.map((item) => (
              <Link
                key={item.Title}
                isActive={location.pathname === item.Hyperlinks.Url}
                href={item.Hyperlinks.Url}
              >
                {item.Title}
              </Link>
            ))}
        </FooterLinks>
      </FooterContainer>
      <RightsContainer>
        <RightsReserved>{getDate()}</RightsReserved>
      </RightsContainer>
    </>
  );
};
