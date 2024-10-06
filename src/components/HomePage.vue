<template>
  <v-container class="pl-14 py-16" fluid>
    <v-row class="px-0 d-flex flex-column flex-sm-row">
      <v-col
        cols="12"
        sm="8"
        class="d-flex flex-wrap pt-0 flex-column flex-sm-row"
      >
        <v-col cols="12" class="py-0 my-2">
          <div class="heading">Desserts</div>
        </v-col>

        <v-col
          class="py-2 px-3 mb-10"
          cols="11"
          sm="6"
          md="4"
          v-for="item in allItems"
          :key="item.id"
        >
          <div class="main" :style="getBackgroundImageStyle(item)">
            <div
              v-if="getCartItem(item.id)"
              class="mb-3 capsule d-flex justify-center align-center"
            >
              <div
                @click="removeItem(item)"
                class="icon-circle d-flex justify-center align-center"
              >
                <v-icon color="" size="large" class=""
                  ><img src="/src/assets/icon-decrement-quantity.svg" alt=""
                /></v-icon>
              </div>

              <span class="quantity mx-10">{{
                getCartItem(item.id).quantity
              }}</span>

              <div
                @click="addToCart(item)"
                class="icon-circle d-flex justify-center align-center"
              >
                <v-icon color="" size="large" class=""
                  ><img src="/src/assets/icon-increment-quantity.svg" alt=""
                /></v-icon>
              </div>
            </div>
            <div
              v-else
              class="mb-3 add-to-cart d-flex justify-center align-center"
            >
              <v-btn
                @click="addToCart(item)"
                class="px-7 py-5 custom-btn text-capitalize d-flex justify-center align-center"
              >
                <v-icon
                  color="red-darken-4"
                  icon="mdi-cart-plus"
                  size="large"
                  class="mr-2"
                ></v-icon>
                Add to Cart
              </v-btn>
            </div>
          </div>

          <div class="details text-black">
            <div class="name">{{ item.name }}</div>
            <div class="desc">{{ item.desc }}</div>
            <div class="price">${{ item.price }}</div>
          </div>
        </v-col>
      </v-col>
      <v-col cols="11" sm="4" md="3" class="cart-display">
        <div v-if="cartItems.length > 0" class="cart-page2 pa-5">
          <div class="heading2">Your Cart ({{ cartItemCount }})</div>

          <v-col
            cols="12 pa-0"
            v-for="cartItem in cartItems"
            :key="cartItem.id"
          >
            <v-col cols="12" class="d-flex pa-0">
              <v-col cols="10" class="px-0 d-flex flex-column">
                <div class="name2">{{ cartItem.desc }}</div>
                <div class="inf0 d-flex align-center">
                  <div class="quant2">{{ cartItem.quantity }}x</div>
                  <div class="price2 mx-3">@ ${{ cartItem.price }}</div>
                  <div class="sum2">
                    ${{ (cartItem.price * cartItem.quantity).toFixed(2) }}
                  </div>
                </div>
              </v-col>
              <v-col cols="2" class="d-flex align-center justify-center">
                <v-icon
                  color="grey"
                  icon="mdi-close-circle-outline"
                  size="medium"
                  @click="rem(cartItem)"
                ></v-icon>
              </v-col>
            </v-col>
            <v-divider></v-divider>
          </v-col>

          <v-col
            cols="12"
            class="d-flex justify-space-between px-0 align-center mt-1"
          >
            <div class="left">Order Total</div>
            <div class="right">${{ totalPrice.toFixed(2) }}</div>
          </v-col>

          <v-col cols="12" class="cnd2">
            <div class="carbon d-flex align-center justify-center">
              <div class="mr-2 img3i d-flex align-center justify-center">
                <img src="/src/assets/icon-carbon-neutral.svg" alt="" />
              </div>
              <div class="text3 ">
                This is a&nbsp;<span class="cn"> carbon-neutral</span>&nbsp;delivery
              </div>
            </div>
          </v-col>

          <v-btn
            block
            flat
            class="text-capitalize btn3 mt-2 py-5"
            @click="confirmOrder"
            >Confirm Order</v-btn
          >
        </div>
        <div v-else>
          <v-col cols="12" class="cart-page">
            <div class="heading2">Your Cart ({{ cartItemCount }})</div>
            <div class="img2 d-flex justify-center mt-7">
              <img src="/src/assets/illustration-empty-cart.svg" alt="" />
            </div>
            <div class="text2 text-center my-5">
              Your added items will appear here
            </div>
          </v-col>
        </div>
      </v-col>
    </v-row>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="dialog" max-width="480px" class="dialog">
      <v-card class="custom-dialog">
        <v-col cols="12" class="d-flex flex-column text-black px-8">
          <div class="img4 mt-5 mb-3">
            <img src="/src/assets/icon-order-confirmed.svg" alt="" />
          </div>
          <div class="heading4">Order Confirmed</div>
          <div class="subheading4 mt-1 mb-7">We hope you enjoy your food!</div>

          <div class="list4">
            <v-col
              cols="12 pa-0"
              v-for="cartItem in cartItems"
              :key="cartItem.id"
            >
              <v-col cols="12" class="d-flex pl-0">
                <v-col
                  cols="12"
                  class="px-0 d-flex justify-center align-center"
                >
                  <div class="details4 d-flex align-center pl-5">
                    <img class="img5" :src="cartItem.url3" alt="" />
                    <div class="nqp d-flex flex-column ml-3">
                      <div class="name4">{{ cartItem.desc }}</div>
                      <div class="quant4">
                        {{ cartItem.quantity }}x
                        <span class="price4 ml-3">@ ${{ cartItem.price }}</span>
                      </div>
                    </div>
                  </div>

                  <v-spacer></v-spacer>
                  <div class="sum4 pr-2">
                    ${{ (cartItem.price * cartItem.quantity).toFixed(2) }}
                  </div>
                </v-col>
              </v-col>
              <v-divider></v-divider>
            </v-col>
            <div
              class="d-flex justify-space-between px-5 mt-5 mb-5 align-center"
            >
              <div class="left4">Order Total</div>
              <div class="right4">${{ totalPrice.toFixed(2) }}</div>
            </div>
          </div>
        </v-col>
        <v-col cols="12" class="px-8 mb-5">
          <v-btn
            block
            flat
            class="text-capitalize btn3 mt-2 py-5"
            @click="startNewOrder"
            >Start New Order</v-btn
          >
        </v-col>
      </v-card>
    </v-dialog>
  </v-container>
</template>
  
<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";

const store = useStore();
const dialog = ref(false);
const windowWidth = ref(window.innerWidth); // Reactive property for window width
const backgroundStyles = ref({}); // Reactive object to hold background styles

// Create computed property to get items from the store
const allItems = computed(() => store.state.items);
const cartItemCount = computed(() => store.state.cartItemCount);

// Function to add an item to the cart
const addToCart = (item) => {
  store.dispatch("addToCart", item);
};

const removeItem = (item) => {
  store.dispatch("removeItem", item);
};

const rem = (item) => {
  store.dispatch("rem", item);
};

// Function to get the cart item by ID
const getCartItem = (id) => {
  return store.state.cartItems.find((cartItem) => cartItem.id === id);
};

// Computed property to get cart items from the store
const cartItems = computed(() => store.state.cartItems);

// Computed property to calculate total price of all items
const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
});

// Function to handle order confirmation
const confirmOrder = () => {
  if (totalPrice.value > 0) {
    dialog.value = true;
  }
};

// Function to reset cart items and count
const startNewOrder = () => {
  store.commit("resetCart"); // Make sure you have this mutation in your store
  dialog.value = false;
};

// Function to get the background image style based on the screen width
const getBackgroundImageStyle = (item) => {
  let imageUrl;
  if (windowWidth.value >= 960) {
    imageUrl = item.url; // Desktop image
  } else if (windowWidth.value >= 600) {
    imageUrl = item.url4; // Tablet image
  } else {
    imageUrl = item.url2; // Mobile image
  }

  return { backgroundImage: `url(${imageUrl})` };
};

// Function to update background styles for all items
const updateBackgroundStyles = () => {
  allItems.value.forEach((item) => {
    backgroundStyles.value[item.id] = getBackgroundImageStyle(item);
  });
};

// Handle window resize event
const handleResize = () => {
  windowWidth.value = window.innerWidth;
  updateBackgroundStyles(); // Update styles on resize
};

// Set up event listener for window resize
onMounted(() => {
  window.addEventListener("resize", handleResize);
  updateBackgroundStyles(); // Initial background style setup
});

// Clean up the event listener on component unmount
onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>
  
<style scoped>
@font-face {
  font-family: f1;
  src: url(/src/assets/RedHatText-Bold.ttf);
}
@font-face {
  font-family: f2;
  src: url(/src/assets/RedHatText-Regular.ttf);
}
@font-face {
  font-family: f3;
  src: url(/src/assets/RedHatText-SemiBold.ttf);
}
.heading {
  color: black;
  font-size: 37px;
  font-family: f1;
}
.main {
  position: relative;
  width: 100%;
  height: 85%;
  padding-bottom: 100%;
  background-size: contain;
  background-position: top;
  background-repeat: no-repeat;
  overflow: hidden;
  border: 2px solid transparent;
  background-color: transparent;
}
.add-to-cart {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0px;
  text-align: center;
}
.custom-btn {
  font-family: f3;
  border: 1px solid hsl(5, 7%, 63%);
  letter-spacing: 0px;
  color: black;
  background-color: hsl(0, 0%, 100%);
  border-radius: 50px;
  padding: 10px 20px;
  text-transform: capitalize;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.custom-btn:hover {
  border: 1px solid hsl(15, 87%, 42%);
  color: hsl(15, 87%, 42%);
  border-radius: 50px;
  padding: 10px 20px;
  text-transform: capitalize;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.capsule {
  border-radius: 50px;
  color: white;
  position: absolute;
  bottom: 0px;
  left: 50%;
  padding: 8px 23px;
  transform: translateX(-50%);
  background-color: hsl(15, 87%, 42%);
}
.total-price {
  margin-top: 16px;
  font-size: 20px;
  font-weight: bold;
}
.icon-circle {
  width: 15px; /* Adjust width as per icon size */
  height: 15px; /* Adjust height as per icon size */
  border-radius: 50%;
  background-color: hsl(15, 87%, 42%); /* Set desired background color */
  border: 1.5px solid hsl(0, 0%, 100%); /* Optional border */
}
.icon-circle img {
  transition: filter 0.3s ease;
}

/* Hover effect on .icon-circle */
.icon-circle:hover {
  background-color: hsl(0, 0%, 100%); /* Hover background color */
  transform: scale(1.1); /* Slightly increase size on hover */
  cursor: pointer;
}

/* Turn image red on hover */
.icon-circle:hover img {
  filter: brightness(0.5) saturate(0.5) hue-rotate(-100deg);
}
.name {
  color: hsl(8, 9%, 54%);
  font-size: 12px;
}
.desc {
  color: hsl(14, 86%, 42%);
  font-size: 14px;
  font-family: f3;
  letter-spacing: -0.5px;
}
.price {
  color: hsl(14, 86%, 42%);
  font-size: 14px;
  letter-spacing: -0.5px;
  font-weight: 500;
}
.cart-page {
  background-color: #fff;
  border-radius: 10px;
}
.cart-page2 {
  background-color: #fff;
  border-radius: 10px;
}
.heading2 {
  color: hsl(14, 86%, 42%);
  font-size: 20px;
  font-family: f1;
}
.text2 {
  color: hsl(10, 19%, 43%);
  font-size: 11px;
  font-family: f1;
}
.name2 {
  font-size: 12px;
  color: hsl(4, 16%, 21%);
  font-family: f3;
}
.quant2 {
  font-size: 12px;
  color: hsl(14, 86%, 42%);
  font-family: f3;
}
.price2 {
  font-family: f3;
  font-size: 12px;
  color: hsl(9, 6%, 57%);
}
.sum2 {
  font-family: f1;
  font-size: 12px;
  color: hsl(10, 19%, 43%);
}
.left {
  font-family: f3;
  font-size: 12px;
  color: hsl(12, 8%, 53%);
}
.right {
  font-family: f1;
  font-size: 20px;
  color: black;
}
.text3 {
  font-size: 11px;
  font-family: f3;
  color: hsl(12, 8%, 53%);
}
.carbon {
  width: 100%;
  background-color: hsl(26, 54%, 97%);
  padding: 10px 10px 10px 10px;
  border-radius: 5px;
}
.cn {
  color: hsl(10, 19%, 43%);
  font-family: f1;
}
.img3 {
  margin-right: 10px;
}
.btn3 {
  background-color: hsl(14, 86%, 42%);
  border-radius: 50px;
  font-family: f2;
  letter-spacing: 0px;
}
.btn3:hover {
  background-color: hsl(14, 85%, 32%);
}
/* Custom styles for v-dialog */
.custom-dialog {
  background-color: #ffffff; /* Change background color */
  border-radius: 15px; /* Change border radius */
}

/* If you want to control border-radius dynamically with a variable */
.custom-dialog {
  border-radius: var(--dialog-border-radius, 15px); /* Fallback to 15px */
}
.heading4 {
  color: black;
  font-size: 35px;
  font-family: f1;
}
.subheading4 {
  color: hsl(12, 8%, 53%);
  font-size: 12px;
  font-family: f2;
}
.list4 {
  background-color: hsl(26, 54%, 97%);
  border-radius: 5px;
}
.img5 {
  border-radius: 5px;
  width: 20%;
  height: 100%;
}
.name4 {
  font-size: 12px;
  color: hsl(4, 16%, 21%);
  font-family: f3;
}
.quant4 {
  font-size: 12px;
  color: hsl(14, 86%, 42%);
  font-family: f3;
}
.price4 {
  font-family: f3;
  font-size: 12px;
  color: hsl(9, 6%, 57%);
}
.sum4 {
  font-family: f1;
  font-size: 12px;
  color: hsl(4, 16%, 21%);
}
.left4 {
  font-family: f3;
  font-size: 12px;
  color: hsl(12, 8%, 53%);
}
.right4 {
  font-family: f1;
  font-size: 20px;
  color: black;
}
.cart-display {
  padding-right: 0px;
  padding-left: 0px;
}
.cnd2 {
  padding-left: 0px;
  padding-right: 0px;
  display: flex;
}
/* For screen sizes 599.5px and below */
@media (max-width: 599.5px) {
  /* Your styles for mobile devices go here */
  .main {
    position: relative;
    width: 100%;
    height: 85%;
    padding-bottom: 72.5%;
    background-size: contain;
    background-position: top;
    background-repeat: no-repeat;
    overflow: hidden;
    border: 2px solid transparent;
  }
  .cnd2 {
    display: block;
  }
  .carbon {
    padding: 10px 40px 10px 40px;
  }
}

/* For screen sizes from 600px to 959.5px */
@media (min-width: 600px) and (max-width: 959.5px) {
  /* Your styles for tablets go here */
  .main {
    height: 90%;
  }
  .cart-display {
    padding-right: 20px;
  }
}
</style>
  