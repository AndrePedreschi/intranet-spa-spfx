import { ReactElement } from "react";

import { HashRouter, Route, Switch } from "react-router-dom";

import { Home } from "../screens/Home";
import { NotFound } from "../screens/NotFound";

export function App(): ReactElement {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        {/* <Route
          path="/produto/:id"
          component={() => <ProtectedRoute component={ProductOverview} />}
        /> */}

        <Route path="*" component={NotFound} />
      </Switch>
    </HashRouter>
  );
}
