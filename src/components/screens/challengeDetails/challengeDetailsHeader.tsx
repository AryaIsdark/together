import React from "react";
import { Avatar } from "antd";

const AttendeesView = ({ data }: { data: any }) => {
  return (
    <>
      {data &&
        data.map((item: any) => <Avatar src={item.avatar} key={item.id} />)}
    </>
  );
};

const ChallengeDetailsheader = ({
  data,
  attendees,
}: {
  data: any;
  attendees: any;
}) => {
  return (
    <div style={{ backgroundImage: `url(${data.image})` }} className={"header"}>
      <div className={"overlay"}>
        <div className={"title-and-description"}>
          <div className={"title-container"}>{data.title}</div>
          <div className={"description-container"}>{data.description}</div>
        </div>
        <div className={"attendees-container"}>
          <AttendeesView data={attendees} />
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailsheader;
