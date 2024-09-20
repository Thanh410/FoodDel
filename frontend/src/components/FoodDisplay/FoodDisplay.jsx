import React, { useContext, useEffect } from "react";
import "./FoodDisplay.css";
import FoodItem from "../FoodItem/FoodItem";
import { StoreContext } from "../../Context/StoreContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchFoodList } from "../../context/slices/cartSlice";

const FoodDisplay = ({ category }) => {
  // const { food_list } = useContext(StoreContext);
  const { foodList } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFoodList());
  }, []);
  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {foodList.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item._id}
                image={item.image}
                name={item.name}
                desc={item.description}
                price={item.price}
                id={item._id}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
