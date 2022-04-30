import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { getTotals } from "./features/cartSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./storage"

// const initialStore = {
//   cartReducer: {
//     cartItems: () => {
//       if (typeof window !== "undefined") {
//         if (localStorage.getItem("cartItems")) {
//           return JSON.parse(localStorage.getItem("cartItems"));
//         } else {
//           return [];
//         }
//       }
//     },
//   },
// };

const persistConfig = {
  key: "cartStore",
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    // cart: cartReducer,
    cart: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
export { persistor };

// store.dispatch(getTotals());
