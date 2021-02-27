import React from "react";
import Login from "./Login";
import Header from "./Header";
import Home from "./Home";
import useToken from "./useToken";

import { Route, Switch } from "react-router-dom";
import Signup from "./SignUP";

const App = () => {
  const { token, setToken } = useToken();

  if (!token) {
    return (
      <>
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/" render={() => <Login setToken={setToken} />} />
        </Switch>
      </>
    );
  }
  return (
    <>
      <div className="Header">
        <Header />
      </div>

      <Switch>
        <Route
          exact
          path="/home/:accessToken"
          render={(props) => <Home {...props} />}
        />
      </Switch>
    </>
  );
};
export default App;
