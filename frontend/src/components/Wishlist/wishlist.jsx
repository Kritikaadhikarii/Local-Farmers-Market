import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import styles from "../../styles/styles";
import { AiOutlineHeart } from "react-icons/ai";

const Wishlist = ({ setOpenWishlist }) => {
    const cartData = [
        {
          name: "Potato",
          description: "Red potato",
          price: 999,
        },
        {
          name: "Potato",
          description: "Red potato",
          price: 459,
        },
        {
          name: "Potato",
          description: "Red potato",
          price: 569,
        },
      ];
      
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[30%] 300px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <div className="w-full h-screen">
          {/* Close button */}
          <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenWishlist(false)}
            />
          </div>
          {/* Item length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">4 items</h5>
          </div>
          {/* Cart Single Items */}
          <br />
          <div className="w-full border-t">
            {cartData.map((i, index) => (
              <CartSingle key={index} data={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data }) => {
  const [value] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="border-b p-4 flex justify-between items-center">
      <div className="w-full flex items-center">
        <RxCross1 className="cursor pointer" />
        <img
          src="https://www.alimentarium.org/sites/default/files/media/image/2017-02/AL027-01_pomme_de_terre_0_0.jpg"
          alt=""
          className="w-[130px] h-[80px] ml-2"
        />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart" />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
