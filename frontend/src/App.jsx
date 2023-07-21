import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { Home } from "./Layouts/home";
import { Success } from "./Layouts/Success";
import { Error } from "./Layouts/Error";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home">
          <Redirect to="/" />
        </Route>
        <Route path="/success" component={Success} />
        <Route path="/*" component={Error} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
