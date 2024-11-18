import { ReactElement, useCallback, useEffect, useState } from "react";

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

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <p>Footer</p>;
      {list &&
        list.map((itens) => (
          <a key={itens.Title} href={itens.Hyperlinks.Url}>
            {itens.Title}
          </a>
        ))}
    </div>
  );
};
