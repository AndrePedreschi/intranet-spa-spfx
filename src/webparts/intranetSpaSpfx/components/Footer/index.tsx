import { ReactElement, useCallback, useEffect, useState } from "react";

import {
  FooterContainer,
  FooterLinks,
  Link,
  Logo,
  RightsContainer,
  RightsReserved,
} from "./styles";
import {
  getFooterList,
  TGetFooterListResponse,
} from "../../services/footer.service";
import { getImagesList, TGetImagesList } from "../../services/logo.service";
import { useZustandStore } from "../../store";

export const Footer = (): ReactElement => {
  const { context } = useZustandStore();
  const [list, setList] = useState<TGetFooterListResponse[]>();
  const [logo, setLogo] = useState<TGetImagesList[]>();

  const getData = useCallback(async () => {
    if (!context) return;

    setList(await getFooterList(context));
    setLogo(await getImagesList(context));
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
        {logo &&
          logo
            .filter((item) => item.Name === "logo-branco.png")
            .map((item) => (
              <Logo key={item.Name} src={item.ServerRelativeUrl} alt="Logo" />
            ))}
        <FooterLinks>
          {list &&
            list.map((item) => (
              <Link
                key={item.Title}
                isActive={location.href === item.Hyperlinks.Url}
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
