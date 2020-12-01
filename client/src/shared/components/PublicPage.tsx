import React from "react";
import ShowRouter from "./ShowRouter";
import { publicRouter } from "@routers/publicRouter";

interface Props {}

const PublicPage: React.FC<Props> = ({}) => {
  return (
    <>
      <ShowRouter routers={publicRouter} />
    </>
  );
};

export default PublicPage;
