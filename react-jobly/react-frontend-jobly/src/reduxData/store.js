import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import applicationsReducer from "./applicationsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    applications: applicationsReducer,
  },
});
