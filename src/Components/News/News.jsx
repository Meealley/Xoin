import React, { useState } from "react";
import { Select, Typography, Row, Col, Card, Avatar } from "antd";
import moment from "moment";
// import { Link, useActionData } from "react-router-dom";
import { useGetNewsQuery } from "../store/News/CryptoNewsApi";
import Loader from "../Misc/Loader";
import { useGetCryptoQuery } from "../store/Crypto/CryptoApi";

const { Option } = Select;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const { data } = useGetCryptoQuery(100);
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isLoading } = useGetNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });

  if (isLoading) return <Loader />;

  //   console.log(cryptoNews);
  return (
    <>
      <Row gutter={[24, 24]}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-new w-40"
              placeholder="Select a crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(option, input) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => (
                <Option value={coin.name}>{coin.name}</Option>
              ))}
            </Select>
          </Col>
        )}

        {cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <h3>{news.name}</h3>
                  <img
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                  />
                </div>
                <p>
                  {news.description > 70
                    ? `${news.description.substring(0, 70)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt="news"
                    />
                    <Typography.Text>{news.provider[0]?.name}</Typography.Text>
                  </div>
                  <p>{moment(news.datePublished).startOf("ss").fromNow()}</p>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
