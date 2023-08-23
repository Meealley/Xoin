import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  NumberOutlined,
  ThunderboltOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../store/Crypto/CryptoApi";
import Loader from "../Misc/Loader";
import LineChart from "../Exchanges/LineChart";

const { Option } = Select;

const CryptoDetail = () => {
  const [timePeriod, setTimePeriod] = useState("24h");
  const { coinId } = useParams();
  const [link, setLink] = useState(coinId)
  const { data, isLoading } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    link,
    timePeriod,
  });
  const cryptoDetails = data?.data?.coin;
  console.log(coinHistory);
  console.log(data);
  if (isLoading) return <Loader />;

  const valueChangler = (value) => {
    setTimePeriod(value);
  };

  //the timeperiod and misc
  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <>
      Cryptodetails {coinId}
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <h2 className="coin-name">
            {cryptoDetails.name} ({cryptoDetails.symbol})
          </h2>
          <p>
            {cryptoDetails.name} lives in the heart of the us crypto market
            exchange
          </p>
        </Col>

        <Select
          defaultValue={"7d"}
          className="select-timeperiod"
          placeholder="Select Time period"
          onChange={valueChangler}
        >
          {time.map((date) => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>

        {/* the linechart  */}
        {/* <LineChart coinHistory={coinHistory} currentPrice={millify(cryptoDetails.price)} coinName={cryptoDetails.name}/> */}

        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <h2 className="coin-details-heading">
                {cryptoDetails.name} value statistics
              </h2>
              <p className="capitalize">
                an overview showing the stats on {cryptoDetails.name}
              </p>
            </Col>

            {stats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <p>{icon}</p>
                  <p>{title}</p>
                </Col>
                <h4 className="stats">{value}</h4>
              </Col>
            ))}
          </Col>
        </Col>
        <Col className="other-stats-info">
          <Col className="coin-value-statistics">
            <Col className="coin-value-statistics-heading">
              <h2 className="coin-details-heading">
                {cryptoDetails.name} other statistics
              </h2>
              <p className="capitalize">
                an overview showing the stats on {cryptoDetails.name}
              </p>
            </Col>

            {genericStats.map(({ icon, title, value }) => (
              <Col className="coin-stats">
                <Col className="coin-stats-name">
                  <p>{icon}</p>
                  <p>{title}</p>
                </Col>
                <h4 className="stats">{value}</h4>
              </Col>
            ))}
          </Col>
        </Col>

        <Col className="coin-desc-link">
          <Row className="coin-desc">
            <div className="coin-details-heading">
              <h2>What is {cryptoDetails.name}</h2>
              <p>{HTMLReactParser(cryptoDetails.description)}</p>
            </div>
          </Row>
        </Col>
      </Col>
    </>
  );
};

export default CryptoDetail;
