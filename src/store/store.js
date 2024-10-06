import { createStore } from "vuex";

// Import images dynamically using Vite's import.meta.glob
const images = import.meta.glob('../assets/*.png');

const store = createStore({
  state: {
    cartItemCount: 0, // Holds the count of items in the cart
    cartItems: [],
    items: [
      {
        id: 1,
        name: "Waffle",
        desc: "Waffle with Berries",
        price: "6.50",
        url: images['../assets/image-waffle-desktop-modified.png'],
        url2: images['../assets/image-waffle-mobile-modified.png'],
        url4: images['../assets/image-waffle-tablet-modified.png'],
        url3: images['../assets/image-waffle-thumbnail-modified.png'],
      },
      {
        id: 2,
        name: "Crème Brûlée",
        desc: "Vanilla Bean Crème Brûlée",
        price: "7.00",
        url: images['../assets/image-creme-brulee-desktop-modified.png'],
        url2: images['../assets/image-creme-brulee-mobile-modified.png'],
        url4: images['../assets/image-creme-brulee-tablet-modified.png'],
        url3: images['../assets/image-creme-brulee-thumbnail-modified.png'],
      },
      // other items...
    ],
  },
  mutations: {
    resetCart(state) {
      state.cartItems = [];
      state.cartItemCount = 0;
    },
    addToCart(state, payload) {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity++;
      } else {
        const itemToAdd = { ...payload, quantity: 1 };
        state.cartItems.push(itemToAdd);
      }
      state.cartItemCount++;
    },

    removeItem(state, payload) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );

      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity--;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
        state.cartItemCount--;
      }
    },

    rem(state, payload) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );
      state.cartItemCount -= state.cartItems[itemIndex].quantity;
      state.cartItems.splice(itemIndex, 1);
    },
  },

  actions: {
    addToCart(context, payload) {
      context.commit("addToCart", payload);
    },
    removeItem(context, payload) {
      context.commit("removeItem", payload);
    },
    rem(context, payload) {
      context.commit("rem", payload);
    },
  },
});

export default store;
