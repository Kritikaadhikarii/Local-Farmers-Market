import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { categoriesData, productData } from "../../static/data";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import logo from "../../images/logo.png";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../cart/Cart";

const Header = ({activeHeading}) => {
  const {isAuthenticated, user, loading} = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setopenWishlist] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = productData && productData.filter((product) =>
    product.name.toLowerCase().includes(term.toLowerCase())
    );

    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
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
              <img
                src={logo}
                alt="logo of farmers market app"
                style={{ width: "100px", height: "100px" }}
              />
            </Link>
          </div>

          {/* now for search box */}
        <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#85B27D] border-[2px] rounded-md"
            />

            <AiOutlineSearch
              size={30}
              className="absolute 
            right-2 
            top-1.5 
            cursor-pointer"
              color="#85B27D"
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
        </div>
      </div>

      {/* categories */}
      <div
        className={`${ 
          active === true ? "shadow-sm top-0 left-0 z-10" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#85B27D] h-[70px] rounded-full`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
            <button
              className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
            >
              All Categories
            </button>
            <IoIosArrowDown
              size={20}
              className="absolute right-2 top-4 cursor-pointer"
              onClick={() => setDropDown(!dropDown)}
            />
            {dropDown ? (
              <DropDown
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            ) : null}
          </div>

          {/* navitems */}

          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          {/* for heart */}
          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#e89d60] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  3
                </span>
              </div>
            </div>

            {/* for cart */}

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]"
              onClick={() => setOpenCart(true)}>
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  6
                </span>
              </div>
            </div>

            {/* for profile */}
            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    {/* changed */}
                    {/* <img src={`${backend_url}${user.avatar}`} className="w-[35px] h-[35px] rounded-full" alt="" /> */}
                    
                  </Link>
                ) : (
                  <Link to="/profile">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>


                {/* for cart popup */}
                {openCart ? (
                <Cart setOpenCart={setOpenCart} /> )
                : null
                }

          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
