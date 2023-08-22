import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { useGetCryptoQuery } from "../store/Crypto/CryptoApi";
import Loader from "../Misc/Loader";
import { Link } from "react-router-dom";
import Cryptocurrencies from "../Crytocurrency/Cryptocurrencies";
import News from "../News/News";

const { Title } = Typography;

const Home = () => {
  const { data, isLoading } = useGetCryptoQuery(10);

  const GlobalStats = data?.data?.stats;

//   console.log(data);

  if (isLoading) return <Loader />;

  return (
    <>
      <Title level={2} className="heading">
        Global Cryptocurrency stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={GlobalStats.total}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={GlobalStats.totalExchanges}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(GlobalStats.totalMarketCap)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={millify(GlobalStats.total24hVolume)}
          ></Statistic>
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(GlobalStats.totalMarkets)}
          ></Statistic>
        </Col>
      </Row>

      <div className="home-heading-container">
        <h2 className="home-title">Top 10 Cryptocurrency</h2>
        <h3 className="show-more">
          <Link to={"/cryptocurrency"}>Show more</Link>
        </h3>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <h2 className="home-title">Latest Cryptocurrency News</h2>
        <h3 className="show-more">
          <Link to={"/news"}>Show more</Link>
        </h3>
      </div>
      <News simplified />
    </>
  );
};

export default Home;
