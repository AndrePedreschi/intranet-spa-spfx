import { ReactElement, useCallback, useEffect, useState } from "react";

import { NavBar, Logo, NavLinks, Link } from "./styles";
import {
  getHeaderList,
  TGetHeaderListResponse,
} from "../../services/header.service";
import { getImagesList, TGetImagesList } from "../../services/logo.service";
import { useZustandStore } from "../../store";

export const Header = (): ReactElement => {
  const { context } = useZustandStore();
  const [list, setList] = useState<TGetHeaderListResponse[]>();
  const [logo, setLogo] = useState<TGetImagesList[]>();

  const getData = useCallback(async () => {
    if (!context) return;

    setList(await getHeaderList(context));
    setLogo(await getImagesList(context));
  }, [context]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <NavBar>
        {logo &&
          logo
            .filter((item) => item.Name === "logo.png")
            .map((item) => (
              <Logo key={item.Name} src={item.ServerRelativeUrl} alt="Logo" />
            ))}
        <NavLinks>
          {list &&
            list.map((item) => (
              <Link
                key={item.Title}
                isActive={location.href === item.Hyperlink.Url}
                href={item.Hyperlink.Url}
              >
                {item.Title}
              </Link>
            ))}
        </NavLinks>
      </NavBar>
    </>
  );
};
