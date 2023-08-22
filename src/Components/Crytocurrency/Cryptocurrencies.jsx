import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptoQuery } from "../store/Crypto/CryptoApi";
import Loader from "../Misc/Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isLoading } = useGetCryptoQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptoList, searchTerm]);

  if (isLoading) return <Loader />;
  console.log(cryptos);

  const searchChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      {!simplified && (
        <div>
          <input
            type="text"
            onChange={searchChangeHandler}
            placeholder="Search Cryptocurrency"
            className="search-crypto border border-black rounded-md p-4"
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container pt-10">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className={`crypto-card`}
            key={currency.id}
          >
            <Link to={`/crypto/${currency.id}`}>
              <Card
                style={{ backgroundColor: currency.color }}
                className="text-white"
                title={`${currency.rank}. ${currency.name}`}
                extra={<img src={currency.iconUrl} className="crypto-image" />}
              >
                <p>Price : ${millify(currency.price)}</p>
                <p>Market Cap: ${millify(currency.price)}</p>
                <p>Daily change: ${millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
