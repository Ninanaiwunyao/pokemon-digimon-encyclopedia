import React from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  return <h1>Detail Page for ID: {id}</h1>;
};

export default Detail;
