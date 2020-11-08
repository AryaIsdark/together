import React, { useState } from "react";
import * as api from "api/apiFunctions";
import { Divider, Input } from "antd";

const Posts = () => {
  const [data, setData] = useState<any>();

  const translate = async (value: string) => {
    try {
      const response = (await api.translate(value)) as any;
      console.log(response);
      response.data.data.error
        ? setData(response.data?.data.error)
        : setData(
            response.data.data?.results[0]?.lexicalEntries[0]?.entries[0]
              ?.senses[0]?.definitions[0]
          );
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearchOnBlur = (event: any) => {
    translate(event.target.value);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Input
        size={"large"}
        placeholder={"Search for a word"}
        onBlur={handleSearchOnBlur}
      ></Input>

      <Divider></Divider>
      <h3>{data}</h3>
    </div>
  );
};

export default Posts;
