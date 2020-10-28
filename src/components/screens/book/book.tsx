import React, { useEffect, useState } from "react";
import * as api from "api/apiFunctions";
import { useParams } from "react-router-dom";

const ScreenBook = () => {
  const { id }: any = useParams();
  const [data, setdata] = useState({
    id: "",
    avatar: "",
    createdAt: "",
    actionDate: "",
    price: 0,
    title: "",
  });
  const [status, setStatus] = useState("");

  const getData = async () => {
    try {
      setStatus("loading");
      const response = await api.getChallenge(id);
      setdata(response.data);
      setStatus("data");
    } catch (err) {
      setStatus("error");
    }
  };
  useEffect(() => {
    getData();
  }, []);

  if (status === "loading") return <>loading</>;
  if (status === "error") return <>error</>;
  return (
    <>
      <div>{data.title}</div>
    </>
  );
};

export default ScreenBook;
