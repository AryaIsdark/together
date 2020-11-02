import React, { useEffect, useState, useCallback } from "react";
import * as api from "api/apiFunctions";
import { Avatar } from "antd";

const CompanyInformation = ({ companyId }: { companyId: string }) => {
  const [status, setStatus] = useState("");
  const [data, setData] = useState({
    name: "",
    avatar: "",
    address: "",
    city: "",
    country: "",
  });

  const getData = useCallback(async () => {
    try {
      setStatus("loading");
      const response = await api.getCompany(companyId);
      setData(response.data);
      setStatus("data");
    } catch (err) {
      setStatus("error");
    }
  }, [companyId]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (status === "loading") return <>loading</>;
  if (status === "error") return <>error</>;

  return (
    <>
      <div>
        <h3>Organizer</h3>
        <div className={"organizer-content"}>
          <Avatar src={data.avatar} />
          <div>{data.name}</div>
        </div>
      </div>
    </>
  );
};

export default CompanyInformation;
