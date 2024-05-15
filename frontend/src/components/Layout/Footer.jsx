import React from "react";
import logo from "../../images/logo.png";

const Footer = () => {
  return (
    <div className="bg-[#000] text-white text-center py-16">
      <ul>
        <img
          src={logo}
          alt="Local Farmers Market Logo"
          style={{ width: "150px", height: "auto", margin: "0 auto" }}
        />
        <p>From farms, to your doorstep!</p>
      </ul>

      <div>
        <div>© 2024 Local Farmers Market. All rights reserved.</div>
        <div>Developed by: Group E</div>
      </div>
    </div>
  );
};

export default Footer;
