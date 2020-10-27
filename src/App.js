import React, { Suspense, useEffect } from "react";
import "antd/dist/antd.css";
import "./App.css";
import Routes from "router/Routes";
import { useTranslation } from "react-i18next";
import AppMenu from "components/structures/menu/menu";
import { useDispatch } from "react-redux";
import * as actions from "store/user/actions";

const App = () => {
  const { t } = useTranslation("preload", { useSuspense: false });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.loadData("3"));
    dispatch(actions.loadBookings({ userId: "3" }));
  }, [dispatch]);

  return (
    <div className="App">
      <Suspense fallback={t("loading...")}>
        <Routes />
        <AppMenu />
      </Suspense>
    </div>
  );
};

export default App;
