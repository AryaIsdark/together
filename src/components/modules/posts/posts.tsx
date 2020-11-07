import React, { useEffect, useState } from "react";
import * as api from "api/apiFunctions";

const Posts = () => {
  const [data, setData] = useState<any>();
  const translate = async () => {
    try {
      const response = await api.translate("comprehensive");
      console.log(response);
      setData(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    translate();
  }, []);

  return <>{JSON.stringify(data)}</>;
};

export default Posts;
