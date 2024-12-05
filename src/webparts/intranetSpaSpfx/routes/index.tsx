import { ReactElement, useEffect } from "react";

import { HashRouter, Route, Switch } from "react-router-dom";

import { faviconUrl } from "../assets/assets";
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
    const oldFavicon = document.getElementById("favicon");
    if (oldFavicon) {
      oldFavicon.style.display = "none";
      oldFavicon.remove();
    }

    const newFavicon = document.createElement("link");
    newFavicon.type = "image/x-icon";
    newFavicon.rel = "shortcut icon";
    newFavicon.href = faviconUrl;
    document.head.appendChild(newFavicon);

    const linkFontPoppins = document.createElement("link");
    linkFontPoppins.href =
      "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap";
    linkFontPoppins.rel = "stylesheet";
    document.head.appendChild(linkFontPoppins);

    const linkFontRoboto = document.createElement("link");
    linkFontRoboto.href =
      "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap";
    linkFontRoboto.rel = "stylesheet";

    document.head.appendChild(linkFontRoboto);

    return () => {
      document.head.removeChild(newFavicon);
      document.head.removeChild(linkFontPoppins);
      document.head.removeChild(linkFontRoboto);
    };
  }, []);

  useEffect(() => {
    updateContext(context);
  }, [context, updateContext]);

  return (
    <main className="screenTransitionControl">
      <HashRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/news" component={News} />
          <Route path="/internalNews/:id" component={InternalNews} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </HashRouter>
    </main>
  );
}
