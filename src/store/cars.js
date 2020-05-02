import { createSlice } from "@reduxjs/toolkit";
import storeData from "./data";

// New code for reducers and action types
// Code with createSlice method which will automattically create actionTypes and actions
// console.log("default store data = ", storeData);

const slice = createSlice({
  name: "cars",
  initialState: { carList: storeData },
  reducers: {
    //reduced for booking car
    carBooked: (cars, action) => {
      const index = cars.carList.findIndex(
        (car) => car.id == action.payload.id
      );

      //removing id from action.payload.id before spreading
      delete action["payload"]["id"];

      //mutating store/cars data
      cars["carList"][index].available = false;
      cars["carList"][index].currentBooking = {
        ...action.payload,
      };
    },
  },
});

export const { carBooked } = slice.actions;
export default slice.reducer;
