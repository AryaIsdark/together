import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "store/user/actions";
import * as selectors from "store/user/selectors";

const ScreenProfile = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectors.data);
  const bookings = useSelector(selectors.bookings);

  useEffect(() => {
    dispatch(actions.loadBookings({ userId: loggedInUser.id }));
  }, [dispatch, loggedInUser]);

  return (
    <>
      <div>{JSON.stringify(bookings)}</div>
    </>
  );
};

export default ScreenProfile;
