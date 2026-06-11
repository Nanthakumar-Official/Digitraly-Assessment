import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./features/TaskSlice";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),

  devTools: true,
});

export default store;
