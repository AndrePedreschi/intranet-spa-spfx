import { ReactElement, useCallback, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  FooterContainer,
  FooterLinks,
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
  const [footerList, setFooterList] = useState<TGetFooterListResponse[]>();
  const [logo, setLogo] = useState<TGetImagesList>();
  const urlVerifyRegex = /^https:\/\//;

  const getData = useCallback(async () => {
    if (!context) return;

    const logoList = await getImagesList(context);
    const logo = logoList.find((item) => item.Name === "logo-branco.png");
    if (logo) setLogo(logo);

    const footerListResponse = await getFooterList(context);
    setFooterList(footerListResponse);
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
        {logo && (
          <Logo key={logo.Name} src={logo.ServerRelativeUrl} alt="Logo" />
        )}
        <FooterLinks>
          {footerList &&
            footerList.map((footerItem) =>
              !urlVerifyRegex.test(footerItem.Hyperlinks.Description) ? (
                <Link
                  key={footerItem.Title}
                  to={{ pathname: footerItem.Hyperlinks.Description }}
                >
                  {footerItem.Title}
                </Link>
              ) : (
                <a
                  key={footerItem.Title}
                  href={footerItem.Hyperlinks.Url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {footerItem.Title}
                </a>
              ),
            )}
        </FooterLinks>
      </FooterContainer>
      <RightsContainer>
        <RightsReserved>{getDate()}</RightsReserved>
      </RightsContainer>
    </>
  );
};
