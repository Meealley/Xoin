import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": "351eae25c8mshaaf77aa353b136cp10d464jsn4b74440cc2d0",
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCrypto: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (referenceCurrencyUuid) =>
        createRequest(`/coin/${referenceCurrencyUuid}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ referenceCurrencyUuid, timePeriod }) =>
        createRequest(`/coin?q=${referenceCurrencyUuid}/history/${timePeriod}`),
    }),
  }),
});

export const {
  useGetCryptoQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;

// export const CryptoActions = cryptoApi.reducer;
