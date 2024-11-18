import { ReactElement, useCallback, useEffect, useState } from "react";

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
    <div>
      <p>Header</p>;
      {list &&
        list.map((itens) => (
          <a key={itens.Title} href={itens.Hyperlink.Url}>
            {itens.Title}
          </a>
        ))}
    </div>
  );
};
