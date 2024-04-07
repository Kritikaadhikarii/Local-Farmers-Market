import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addTocart, removeFromCart } from "../../redux/actions/cart";
// import { toast } from "react-toastify";
const Cart = ({ setOpenCart }) => {
    const cartData = [
        {
            name: "Potato",
            description: "red potato",
            price: 999,
        },
        {
            name: "Potato",
            description: "red potato",
            price: 459,
        },
        {
            name: "Potato",
            description: "red potato",
            price: 569,
        },    
    ]

  // const { cart } = useSelector((state) => state.cart);
  // const dispatch = useDispatch();

  // const removeFromCartHandler = (data) => {
  //   dispatch(removeFromCart(data));
  // };

  // const totalPrice = cart.reduce(
  //   (acc, item) => acc + item.qty * item.discountPrice,
  //   0
  // );

  // const quantityChangeHandler = (data) => {
  //   dispatch(addTocart(data));
  // };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
        <div className="fixed top-0 right-0 h-full w-[30%] 300px:w=[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        <div className="w-full h-screen">
           {/* flex items-center justify-center */}
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenCart(false)}
              />
            </div>
             {/* Item length */}
             <div className={`${styles.noramlFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  4 items
                </h5>
              </div>
              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {
                cartData &&cartData.map((i, index) => (
                    <CartSingle key={index} data={i}
                      // quantityChangeHandler={quantityChangeHandler}
                      // removeFromCartHandler={removeFromCartHandler}
                    />
                  ))}
              </div>
          </div>

              {/* checkout buttons */}
          <div className="px-5 mb-3">
              <Link to="/checkout">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#cf0b0b] rounded-[5px]`}
                >
                  <h1 className="text-[#fff] text-[18px] font-[600]">
                    Checkout Now (USD$1080)
                  </h1>
                </div>
               </Link>
          </div>
        


        </div>
    </div>
  )
}  

const CartSingle = ({data}) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;
  return (
    <div className="border-b p-4 flex justify-between items-center">
      <div className="w-full flex items-center ">
        <div>
          <div
              className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex}     justify-center cursor-pointer`}
              onClick={() => setValue(value+1)}>
              <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
              className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
              onClick={() =>setValue (value === 1?1: value-1)}>
             <HiOutlineMinus size={16} color="#7d879c"/>
        </div>
        </div>
        <img src="https://www.alimentarium.org/sites/default/files/media/image/2017-02/AL027-01_pomme_de_terre_0_0.jpg" alt=""
          className="w-[130px] h-[80px] ml-2"
         />
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
           <h4 className="font-[400] text-[15px] text-[#00000082]">
             ${data.price} * {value}</h4>
             <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
               US${totalPrice}
             </h4>
        </div>
      </div>
      <RxCross1 className="cursor-pointer"/>
    </div>
  );
};

export default Cart