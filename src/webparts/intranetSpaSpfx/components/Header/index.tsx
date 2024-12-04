import { ReactElement, useCallback, useEffect, useState } from "react";

import { useLocation, Link } from "react-router-dom";

import { NavBar, Logo, NavLinks } from "./styles";
import {
  getHeaderList,
  TGetHeaderListResponse,
} from "../../services/header.service";
import { getImagesList, TGetImagesList } from "../../services/logo.service";
import { useZustandStore } from "../../store";

export const Header = (): ReactElement => {
  const { context } = useZustandStore();
  const [headerList, setHeaderList] = useState<TGetHeaderListResponse[]>();
  const [logo, setLogo] = useState<TGetImagesList>();
  const location = useLocation();
  const urlVerifyRegex = /^https:\/\//;

  const getData = useCallback(async () => {
    if (!context) return;
    const headerListResponse = await getHeaderList(context);
    setHeaderList(headerListResponse);

    const logoList = await getImagesList(context);
    const logo = logoList.find((item) => item.Name === "logo.png");
    if (logo) setLogo(logo);
  }, [context]);

  const identifyActiveUrl = (title: string) => {
    switch (title) {
      case "Notícias":
        return location.pathname === "/news" ? "isActive" : "";

      default:
        return "";
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <NavBar>
        {logo && (
          <Link to={"/"}>
            <Logo key={logo.Name} src={logo.ServerRelativeUrl} alt="Logo" />
          </Link>
        )}
        <NavLinks>
          {headerList &&
            headerList.map((headerItem) =>
              !urlVerifyRegex.test(headerItem.Hyperlink.Description) ? (
                <Link
                  key={headerItem.Title}
                  className={identifyActiveUrl(headerItem.Title)}
                  to={{ pathname: headerItem.Hyperlink.Description }}
                >
                  {headerItem.Title}
                </Link>
              ) : (
                <a
                  key={headerItem.Title}
                  href={headerItem.Hyperlink.Url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {headerItem.Title}
                </a>
              ),
            )}
        </NavLinks>
      </NavBar>
    </>
  );
};
