
# Torque Titan Spare Parts - An automobiles spareparts store e-commerce website

Torque Titan Spare Parts is an e-commerce website dedicated to providing high-quality automobile spare parts. The website is designed to deliver a seamless shopping experience with a user-friendly interface and dynamic features.

## Features

### 1. Product Gallery
- A visually appealing gallery showcasing a wide variety of automobile spare parts.
- Customers can navigate through different categories to find the products they need.
- Toggling visibility is used for seamless navigation through categories.

### 2. Add to Cart
- Each product has an **Add to Cart** button.
  - When clicked:
    - The button changes its background color to indicate the action was successful.
    - A toast notification appears to confirm that the item was successfully added to the cart.
    - The cart count dynamically updates to reflect the number of items in the cart.
    - Cart items are stored in an array using the array push() method when the add-to-cart buttons are clicked then added to 'Your Cart' section.

### 3. Dynamic Cart Section
- Customers can view their cart by clicking the cart icon.
- Features include:
  - Customers can delete items they added to the cart.
  - The total price updates dynamically as items are added or removed.
  - Upon removing an item, a toast notification confirms that the item was successfully removed.

### 4. Checkout
- Customers can proceed to checkout after reviewing their cart:That is done by clicking check out button
which will change background colour,also the customers will receive a toast notification alerting them of the success of their checkout.
- Their cart items will be sent as an order to the json-server running locally.

### 5. Responsiveness
 - The website uses media queries to ensure responsiveness on different screen sizes.

## Installation

To run this project locally, follow these steps:
1. Fork then clone the repository to your local pc.
2. Install json-server if not yet installed in your pc(npm install -g json-server).
3. Navigate to the project folder of the local repository.
4. Activate the json-server(json-server --watch db.json).
5. Navigate to VS Code and open the `index.html` file in your preferred browser.

## How to use
1. Navigate through the Product Gallery to explore the available spare parts.
2. Add items to your cart using the Add to Cart button:
3. Observe the button color change to confirm the action.
4. A toast notification will appear indicating the item was successfully added to the cart.
5. Click the Cart Icon to view your selected items:
6. Items in the cart are dynamically listed.
7. The total price is displayed and updates dynamically as you add or remove items.
8. Remove items from the cart if necessary:Click the delete button beneath an item to remove it.
9. A toast notification will confirm the item was successfully removed.
10. Once you're satisfied with your selections, click the Checkout button to complete your purchase..
11.Clicking the checkout button will send your order to the json-server.

## API Documentation
- **Base URL**: http://localhost:3000/order
- **methods**: POST
 
