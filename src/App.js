import React from "react";
import NavBar from "./Components/Navigation/NavBar";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Components/RootLayout";
// import { Switch, Route, Link } from "react-router-dom";
import Home from "./Components/Home/Home";
import { Layout, Typography, Space } from "antd";
import "./App.css";
import Cryptocurrencies from "./Components/Crytocurrency/Cryptocurrencies";
import Exchanges from "./Components/Exchanges/Exchanges";
import CryptoDetail from "./Components/Crytocurrency/CryptoDetail";
import News from "./Components/News/News";
import Errorpage from "./Components/Misc/Errorpage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement : <Errorpage />,
      children: [
        { path: "", element: <Home /> },
        { path: "exchange", element: <Exchanges /> },
        { path: "cryptocurrency", element: <Cryptocurrencies /> },
        { path: "crypto/:coinID", element: <CryptoDetail /> },
        { path: "news", element: <News /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />

      {/* <div className="app"> */}
      {/* <div className="navbar">
          <NavBar />
        </div> */}
      {/* <div className="main">
          <Layout>
            <div className="routes">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/exchange">
                  <Exchanges />
                </Route>
                <Route exact path="/cryptocurrency">
                  <Cryptocurrencies />
                </Route>
                <Route exact path="/crypto/:coinId">
                  <CryptoDetail />
                </Route>
                <Route exact path="/news">
                  <News />
                </Route>
              </Switch>
            </div>
          </Layout>
        </div> */}
      {/* <div className="footer">All rights reserved</div>
      </div> */}
    </>
  );
};

export default App;
