import { CartState, DeliveryOptions, RecurringDelivery } from "@/app/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
} as CartState;

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        product: {
          id: string;
          title: string;
          price: number;
          image: string;
          apiID: string;
        };
        quantity: number;
        type: {
          deliveryOption: DeliveryOptions;
          subscribeTime: RecurringDelivery;
        };
      }>
    ) => {
      const addedItem = state.items.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (addedItem) {
        addedItem.quantity += action.payload.quantity;
        state.totalPrice += +addedItem.product.price * action.payload.quantity;
      } else {
        state.items.push(action.payload);
        state.totalPrice +=
          +action.payload.product.price * action.payload.quantity;
      }
    },
    decreaseItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(
        (item) => item.product.id === action.payload
      );
      const decreaseItem = state.items[index];
      state.totalPrice -= +decreaseItem.product.price;
      if (decreaseItem.quantity > 1) {
        decreaseItem.quantity--;
      } else {
        state.items.splice(index, 1);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const index = state.items.findIndex(
        (item) => item.product.id === action.payload
      );
      const removeItem = state.items[index];
      state.totalPrice -= +removeItem.product.price * removeItem.quantity;
      state.items.splice(index, 1);
    },
    resetCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, decreaseItem, resetCart } = cart.actions;
export default cart.reducer;
