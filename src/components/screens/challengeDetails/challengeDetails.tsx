import React, { useCallback, useEffect, useState } from "react";
import * as api from "api/apiFunctions";
import { useParams } from "react-router-dom";
import "./style.css";
import { Button, notification } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import * as userSelectors from "store/user/selectors";
import EventInformation from "./eventInformation";
import ChallengeDetailsheader from "./challengeDetailsHeader";
import CompanyInformation from "./companyInformation";

const isBookedByUser = (challengeId: string, userBookings: any) =>
  userBookings.some((booking: any) => booking.challengeId === challengeId);

const ScreenChallengeDetails = () => {
  const loggedInUser = useSelector(userSelectors.data);
  const userBookings = useSelector(userSelectors.bookings);
  const { id }: any = useParams();

  const [isBooking, setIsBooking] = useState(false);
  const [data, setdata] = useState({
    id: "",
    avatar: "",
    createdAt: "",
    actionDate: "",
    price: 0,
    isBooked: false,
    attendees: null,
    companyId: "",
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

  const getData = useCallback(async () => {
    try {
      setStatus("loading");
      const response = await api.getChallenge(id);
      setdata(response.data);
      setAttendees(response.data && response.data.attendees);
      setStatus("data");
    } catch (err) {
      setStatus("error");
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

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
      <div className={"section event-information"}>
        <EventInformation data={data} />
      </div>
      <div className={"section organizer-information"}>
        <CompanyInformation companyId={data.companyId} />
      </div>
    </div>
  );
};

export default ScreenChallengeDetails;
