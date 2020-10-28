import React, { useEffect, useState } from "react";
import * as api from "api/apiFunctions";
import { useParams } from "react-router-dom";
import "./style.css";
import { Avatar, Button, Descriptions, notification } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import * as userSelectors from "store/user/selectors";

const isBookedByUser = (challengeId: string, userBookings: any) =>
  userBookings.some((booking: any) => booking.challengeId === challengeId);

const EvenInformation = ({ data }: { data: any }) => {
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

export const Attendees = ({ data }: { data: any }) => {
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
          <Attendees data={attendees} />
        </div>
      </div>
    </div>
  );
};

const ScreenChallengeDetails = () => {
  const loggedInUser = useSelector(userSelectors.data);
  const userBookings = useSelector(userSelectors.bookings);
  const { id }: string = useParams();

  const [isBooking, setIsBooking] = useState(false);
  const [data, setdata] = useState({
    id: "",
    avatar: "",
    createdAt: "",
    actionDate: "",
    price: 0,
    isBooked: false,
    attendees: null,
  });
  const isAlreadyBooked = isBookedByUser(data.id, userBookings);
  const [attendees, setAttendees] = useState([]);
  const [status, setStatus] = useState("");

  const updateChallengeAttendees = async () => {
    try {
      const response = await api.updateChallenge(data.id, {
        attendees: [...attendees, loggedInUser],
      });
      setAttendees(response.data.attendees);
    } catch (err) {}
  };
  const handleOnBookingClick = async () => {
    try {
      setIsBooking(true);
      await api.postBooking({
        challengeId: data.id,
        userId: loggedInUser.id,
      });
      notification.success({
        message: "Thanks for booking!",
        placement: "bottomRight",
      });
      setdata({ ...data, isBooked: true });
      updateChallengeAttendees();
    } catch (err) {
      notification.error({
        message: "unable to book",
        placement: "bottomRight",
      });
    } finally {
      setIsBooking(false);
    }
  };

  const getData = async () => {
    try {
      setStatus("loading");
      const response = await api.getChallenge(id);
      setdata(response.data);
      setAttendees(response.data && response.data.attendees);
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
    <div className={"challenge-details"}>
      <div className={"booking"}>
        <div>{moment(data.createdAt).fromNow()}</div>
        {!isAlreadyBooked && !data.isBooked ? (
          <Button
            loading={isBooking}
            size={"large"}
            onClick={handleOnBookingClick}
            type={"primary"}
          >
            Book
          </Button>
        ) : (
          <Button type={"danger"}>Cancel Booking</Button>
        )}
      </div>
      <ChallengeDetailsheader data={data} attendees={attendees} />
      <div className={"event-information"}>
        <EvenInformation data={data} />
      </div>
    </div>
  );
};

export default ScreenChallengeDetails;
