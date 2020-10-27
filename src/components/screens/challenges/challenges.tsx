import React, { useEffect, useState } from "react";
import * as api from "api/apiFunctions";
import { useHistory } from "react-router-dom";
import "./challenges.css";

const ChallengeCard = ({ data }: { data: any }) => {
  const history = useHistory();

  const handleOnClick = () => history.push(`/challenges/${data.id}`);

  return (
    <div
      onClick={handleOnClick}
      className={"challenge-item"}
      style={{ backgroundImage: `url(${data.image})` }}
    >
      <div className={"challenge-item-title"}>{data.title}</div>
      <div className={"challenge-item-date"}>{data.actionData}</div>
      <div className={"challenge-item-price"}>{data.price}</div>
    </div>
  );
};

const ScreenChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [status, setStatus] = useState("");
  const getData = async () => {
    try {
      setStatus("loading");
      const response = await api.getChallenges();
      setChallenges(response.data);
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
    <div className={"card-view-container"}>
      {challenges.map((item) => (
        <ChallengeCard data={item} />
      ))}
    </div>
  );
};

export default ScreenChallenges;
