import { createSlice } from "@reduxjs/toolkit";

// const checkingCart = () => {
//   if(typeof window !== "undefined"){
//     localStorage.getItem("cartItems")
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : []
//   }
// }

const initialState = {
  cartItems: [],
  // localStorage.getItem("cartItems")
  //   ? JSON.parse(localStorage.getItem("cartItems"))
  //   : [],
  shippingDetails: [],
  //  localStorage.getItem("shippingDetails")
  //   ? JSON.parse(localStorage.getItem("shippingDetails"))
  //   : [],
  paymentMethod: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const nextCartITems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );
      state.cartItems = nextCartITems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartITems = state.cartItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartItems = nextCartITems;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart: (state, action) => {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    addShippingDetails: (state, action) => {
      state.shippingDetails = action.payload;
      localStorage.setItem(
        "shippingDetails",
        JSON.stringify(state.shippingDetails)
      );
    },

    addPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem(
        "paymentMethod",
        JSON.stringify(state.paymentMethod)
      );
    },
    resetState: (state, action) => {
      state.paymentMethod = initialState.paymentMethod;
      state.shippingDetails = initialState.shippingDetails;
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
      state.cartItems = initialState.cartItems;
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingDetails");
      localStorage.removeItem("paymentMethod");

    },

    getTotals: (state, action) => {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;
          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  clearCart,
  getTotals,
  addShippingDetails,
  addPaymentMethod,
  resetState,
} = cartSlice.actions;

export default cartSlice.reducer;
