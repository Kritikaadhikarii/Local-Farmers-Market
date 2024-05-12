import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import farm from "../../../images/farmm.jpg";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[60vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage: `url(${farm})`,
        backgroundSize: "cover",
        zIndex: -1, // for fixing bugs and ensuring image doesnt imterup
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Best Collection for <br /> Farm Products
        </h1>
        <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
        Local Farmers Market App aims to bridge the gap between consumers and local producers, offering a seamless platform for discovering and purchasing fresh, locally sourced goods. Through intuitive features like online ordering, we want to empower our community to support local farmers and artisans while fostering a sense of connection and belonging.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} mt-5`}>
            <span className="text-[#fff] font-[Poppins] text-[18px]">
              Shop Now
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
