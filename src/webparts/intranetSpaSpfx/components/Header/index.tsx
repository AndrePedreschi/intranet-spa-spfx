import { ReactElement, useCallback, useEffect, useState } from "react";

import { NavBar, Logo, NavLinks, Link } from "./styles";
import itLean from "../../assets/itlean.svg";
import {
  getHeaderList,
  TGetHeaderListResponse,
} from "../../services/header.service";
import { useZustandStore } from "../../store";

export const Header = (): ReactElement => {
  const { context } = useZustandStore();
  const [list, setList] = useState<TGetHeaderListResponse[]>();

  const getData = useCallback(async () => {
    if (!context) return;

    setList(await getHeaderList(context));
  }, [context]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <NavBar>
      <Logo src={itLean} alt="Logo" />
      <NavLinks>
        {list &&
          list.map((item) => (
            <Link
              key={item.Title}
              isActive={location.pathname === item.Hyperlink.Url}
              href={item.Hyperlink.Url}
            >
              {item.Title}
            </Link>
          ))}
      </NavLinks>
    </NavBar>
  );
};
