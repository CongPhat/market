import React, { useEffect } from "react";
import ShowRouter from "./ShowRouter";
import { privateRouter } from "@routers/privateRouter";
import DefaultLayout from "@components/layout/DefaultLayout";
import { getUserInfoToken } from "src/services/authentication";
import { ApolloProvider } from "@apollo/client";
import client from "src/apolo";

interface Props {
  privateLogin?: boolean;
}

const PrivatePage: React.FC<Props> = ({}) => {
  return (
    <ApolloProvider client={client}>
      <DefaultLayout>
        <ShowRouter routers={privateRouter} />
      </DefaultLayout>
    </ApolloProvider>
  );
};

export default PrivatePage;
