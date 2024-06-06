import React from "react";
import { img_container } from "../../assets/images";

const AppHeader = () => {
  return (
    <div>
      <div className="header">
        <img src={img_container?.frontLogo} alt="front_logo" />
      </div>
    </div>
  );
};

export default AppHeader;
