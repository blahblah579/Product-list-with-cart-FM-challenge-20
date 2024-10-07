import { createStore } from "vuex";

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
        url: "/image-waffle-desktop-modified.png",
        url2: "/image-waffle-mobile-modified.png",
        url4: "/image-waffle-tablet-modified.png",
        url3: "/image-waffle-thumbnail-modified.png",
      },
      {
        id: 2,
        name: "Crème Brûlée",
        desc: "Vanilla Bean Crème Brûlée",
        price: "7.00",
        url: "/image-creme-brulee-desktop-modified.png",
        url2: "/image-creme-brulee-mobile-modified.png",
        url4: "/image-creme-brulee-tablet-modified.png",
        url3: "/image-creme-brulee-thumbnail-modified.png",
      },
      {
        id: 3,
        name: "Macaron",
        desc: "Macaron Mix of Five",
        price: "8.00",
        url: "/image-macaron-desktop-modified.png",
        url2: "/image-macaron-mobile-modified.png",
        url4: "/image-macaron-tablet-modified.png",
        url3: "/image-macaron-thumbnail-modified.png",
      },
      {
        id: 4,
        name: "Tiramisu",
        desc: "Classic Tiramisu",
        price: "5.50",
        url: "/image-tiramisu-desktop-modified.png",
        url2: "/image-tiramisu-mobile-modified.png",
        url4: "/image-tiramisu-tablet-modified.png",
        url3: "/image-tiramisu-thumbnail-modified.png",
      },
      {
        id: 5,
        name: "Baklava",
        desc: "Pistachio Baklava",
        price: "4.00",
        url: "/image-baklava-desktop-modified.png",
        url2: "/image-baklava-mobile-modified.png",
        url4: "/image-baklava-tablet-modified.png",
        url3: "/image-baklava-thumbnail-modified.png",
      },
      {
        id: 6,
        name: "Pie",
        desc: "Lemon Meringue Pie",
        price: "5.00",
        url: "/image-meringue-desktop-modified.png",
        url2: "/image-meringue-mobile-modified.png",
        url4: "/image-meringue-tablet-modified.png",
        url3: "/image-meringue-thumbnail-modified.png",
      },
      {
        id: 7,
        name: "Cake",
        desc: "Red Velvet Cake",
        price: "4.50",
        url: "/image-cake-desktop-modified.png",
        url2: "/image-cake-mobile-modified.png",
        url4: "/image-cake-tablet-modified.png",
        url3: "/image-cake-thumbnail-modified.png",
      },
      {
        id: 8,
        name: "Brownie",
        desc: "Salted Caramel Brownie",
        price: "5.50",
        url: "/image-brownie-desktop-modified.png",
        url2: "/image-brownie-mobile-modified.png",
        url4: "/image-brownie-tablet-modified.png",
        url3: "/image-brownie-thumbnail-modified.png",
      },
      {
        id: 9,
        name: "Panna Cotta",
        desc: "Vanilla Panna Cotta",
        price: "6.50",
        url: "/image-panna-cotta-desktop-modified.png",
        url2: "/image-panna-cotta-mobile-modified.png",
        url4: "/image-panna-cotta-tablet-modified.png",
        url3: "/image-panna-cotta-thumbnail-modified.png",
      },
    ],
  },
  mutations: {
    resetCart(state) {
      state.cartItems = [];
      state.cartItemCount = 0;
    },
    // Add an item to the cart
    addToCart(state, payload) {
      // Check if the item already exists in the cart
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );

      // If the item exists in the cart
      if (existingItemIndex !== -1) {
        // Increase the quantity by 1
        state.cartItems[existingItemIndex].quantity++;
      } else {
        // If it does not exist, add it to the cart with quantity set to 1
        const itemToAdd = { ...payload, quantity: 1 }; // Set quantity to 1 when adding the item
        state.cartItems.push(itemToAdd);
      }

      // Increment cart item count
      state.cartItemCount++;
    },

    // Remove an item from the cart
    removeItem(state, payload) {
      // Find the index of the item in cartItems
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );

      // If the item exists in the cart
      if (itemIndex !== -1) {
        // Check if quantity is greater than 1
        if (state.cartItems[itemIndex].quantity > 1) {
          // Decrease the quantity by 1
          state.cartItems[itemIndex].quantity--;
        } else {
          // If quantity is 1, remove the item from cartItems
          state.cartItems.splice(itemIndex, 1);
        }

        // Decrement cart item count
        state.cartItemCount--;
      }
    },
    rem(state, payload) {
      // Find the index of the item in cartItems
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === payload.id
      );
      state.cartItemCount -= state.cartItems[itemIndex].quantity;
      state.cartItems.splice(itemIndex, 1);
    },
  },

  actions: {
    // Dispatch addToCart mutation
    addToCart(context, payload) {
      context.commit("addToCart", payload);
    },

    // Dispatch removeItem mutation
    removeItem(context, payload) {
      context.commit("removeItem", payload);
    },
    rem(context, payload) {
      context.commit("rem", payload);
    },
  },
});

export default store;
