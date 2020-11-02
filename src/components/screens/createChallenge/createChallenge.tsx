import React, { useState } from "react";
import * as api from "api/apiFunctions";
import { Button, Input } from "antd";
import { useHistory } from "react-router-dom";

const ScreenCreateChallenge = () => {
  const history = useHistory();
  const [data, setdata] = useState({
    id: "",
    title: "",
    createdAt: "",
    actionDate: "",
    price: 0,
    companyId: "1",
  });

  const setFormValue = (event: any) => {
    console.log(event);
    setdata({ ...data, [event.target.id]: [event.target.value] });
  };

  const handleSubmit = async () => {
    try {
      const response = await api.createChallenge(data);
      history.push(`/challenges/${response.data.id}`);
    } catch (err) {}
  };

  return (
    <>
      <div>
        <Input id={"title"} placeholder={"Title"} onBlur={setFormValue} />
        <Input
          id={"capacity"}
          placeholder={"Number of guests"}
          onBlur={setFormValue}
        />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </>
  );
};

export default ScreenCreateChallenge;
