import React, { useContext, useState } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";
import { useDispatch, useSelector } from "react-redux";
import { API_ENDPOINT } from "../../utils/varibaleLocal";
import {
  addToCart,
  addToCartAsync,
  removeFromCart,
  removeFromCartAsync,
} from "../../context/slices/cartSlice";
import { getToken } from "../../utils/localStorage";

const FoodItem = ({ image, name, price, desc, id }) => {
  // const [itemCount, setItemCount] = useState(0);
  // const { cartItems, addToCart, removeFromCart, url } =
  //   useContext(StoreContext);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={API_ENDPOINT + "/images/" + image}
          alt=""
        />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => dispatch(addToCartAsync(id))}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="food-item-counter">
            <img
              src={assets.remove_icon_red}
              onClick={() => dispatch(removeFromCartAsync(id))}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              src={assets.add_icon_green}
              onClick={() => dispatch(addToCartAsync(id))}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p> <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-item-desc">{desc}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
