import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { productData } from "../../static/data";
import { IoIosArrowForward } from "react-icons/io";
import {BiMenuAltLeft} from 'react-icons/bi'
import logo from "../../images/logo.png";


const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = productData.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setSearchData(filteredProducts);
  };

  return (
    <div className={`${styles.section}`}>
      <div
        className="hidden 
      800px:h-[50px] 
      800px:my-[20px] 
      800px:flex 
      items-center 
      justify-between"
      >
        <div>
          <Link to="/">
            <img src={logo} alt="logo of farmers market app" style={{ width: '100px', height: '100px' }}/>
          </Link>
        </div>

        {/* now for search box */}
        <div className="w-[50%] relative">
          <input
            type="text"
            placeholder="Search Product..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-[40px] w-full px-2 border-[#83e3a1] border-[2px] rounded-md"
          />

          <AiOutlineSearch
            size={30}
            className="absolute 
            right-2 
            top-1.5 
            cursor-pointer"
          />
          {searchData && searchData.length !== 0 ? (
            <div
              className="absolute 
                min-h-[30vh]
                bg-slate-50
                shadow-sm-2
                z[9]
                p-4"
            >
              {searchData &&
                searchData.map((i, index) => {
                  const d = i.name;
                  const Product_name = d.replace(/\s+/g, "-");
                  return (
                    <Link to={`/product/${Product_name}`} key={index}>
                      <div className="w-full flex items-start-py-3">
                        <img
                          src={i.image_Url[0].url}
                          alt="image"
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : null}
        </div>

        {/* new */}
        <div className={`${styles.button}`}>
          <Link to="/seller">
            <h1
              className="text-[#fff]
            flex items-center"
            >
              Become Seller <IoIosArrowForward className="ml-1" />
            </h1>
          </Link>
        </div>

        {/* neww */}
        {/* <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
                <button
                  className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
                >
                  All Categories
                </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Header;
