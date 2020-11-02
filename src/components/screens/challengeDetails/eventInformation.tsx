import React from "react";
import { Descriptions } from "antd";
import moment from "moment";

const EventInformation = ({ data }: { data: any }) => {
  return (
    <Descriptions title="Event information" column={1} bordered>
      <Descriptions.Item label="Price">{data.price}</Descriptions.Item>
      <Descriptions.Item label="Date">
        {moment(data.actionDate).format("YYYY-MM-DD")}
      </Descriptions.Item>
      <Descriptions.Item label="Time">18:00</Descriptions.Item>
      <Descriptions.Item label="Address">Mock Address</Descriptions.Item>
    </Descriptions>
  );
};

export default EventInformation;
