import { ReactElement, useEffect } from "react";

import { HashRouter, Route, Switch } from "react-router-dom";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { IIntranetSpaSpfxWebPartProps } from "../IntranetSpaSpfxWebPart";
import { Home } from "../screens/Home";
import { InternalNews } from "../screens/InternalNews";
import { News } from "../screens/News";
import { NotFound } from "../screens/NotFound";
import { useZustandStore } from "../store";

export function App({ context }: IIntranetSpaSpfxWebPartProps): ReactElement {
  const { updateContext } = useZustandStore();

  useEffect(() => {
    updateContext(context);
  }, [context, updateContext]);

  return (
    <HashRouter>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/news" component={News} />
        <Route path="/internalNews/:id" component={InternalNews} />
        <Route path="/teste" component={InternalNews} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </HashRouter>
  );
}
