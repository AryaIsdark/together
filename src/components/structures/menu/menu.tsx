import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Icon } from "antd";
import { useSelector } from "react-redux";
import * as userSelectors from "store/user/selectors";

const AppMenu = () => {
  const user = useSelector(userSelectors.data);
  return (
    <div className={"menu"}>
      <div className={"menu-item"}>
        <Link to={"/challenges"}>
          <Icon type="home" />
        </Link>
      </div>
      <div className={"menu-item"}>
        <Link to={"/qr"}>
          <Icon type="qrcode" />
        </Link>
      </div>
      <div className={"menu-item"}>
        <Link to={"/settings"}>
          <Icon type="setting" />
        </Link>
      </div>
      <div className={"menu-item"}>
        <Link to={"/profile"}>
          <Avatar src={user.avatar} />
        </Link>
      </div>
    </div>
  );
};

export default AppMenu;
