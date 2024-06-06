import React, { useState } from "react";
import Header from "../Common/AppHeader/header";

const Defaultlayout = () => {
  const [menuToggle, setMenuToggle] = useState(false);

  const commonProps = {
    menuToggle: menuToggle,
    setMenuToggle: setMenuToggle,
  };

  return (
    <div>
      <Header commonProps={commonProps} />
    </div>
  );
};

export default Defaultlayout;
