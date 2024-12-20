
document.addEventListener("DOMContentLoaded", () => {
    // Get references to necessary DOM elements
    const cartIcon = document.getElementById("cart-icon");
    const cartCountElement = document.querySelector(".cart-count");
    const cartSection = document.querySelector(".cart-section");
    const productCards = document.querySelectorAll(".product-card");
    const categories = document.querySelectorAll("nav ul li");
    const tyresContainer = document.querySelectorAll(".tyres-container");
    const batteriesContainer = document.querySelectorAll(".batteries-container");
    const filtersContainer = document.querySelectorAll(".filters-container");

    let cartCount = 0; // Keeps track of the number of items in the cart
    let totalCartPrice = 0; // Tracks the total price of all items in the cart
    let cartItems = []; // Stores cart items in an array
    
    // Initially, show the tyres-container by default
    tyresContainer.forEach(container => container.style.display = 'grid');
    batteriesContainer.forEach(container => container.style.display = 'none');
    filtersContainer.forEach(container => container.style.display = 'none');

    // Function to handle the category click
    categories.forEach(category => {
        category.addEventListener('click', () => {
            if (category.id === 'tyres') {
                tyresContainer.forEach(container => container.style.display = 'grid');
                batteriesContainer.forEach(container => container.style.display = 'none');
                filtersContainer.forEach(container => container.style.display = 'none');
            } else if (category.id === 'batteries') {
                tyresContainer.forEach(container => container.style.display = 'none');
                batteriesContainer.forEach(container => container.style.display = 'grid');
                filtersContainer.forEach(container => container.style.display = 'none');
            } else if (category.id === 'filters') {
                tyresContainer.forEach(container => container.style.display = 'none');
                batteriesContainer.forEach(container => container.style.display = 'none');
                filtersContainer.forEach(container => container.style.display = 'grid');
            }
        });
    });

    // Displays a toast notification with a message for 3 seconds.
    const showToast = (message) => {
        const toast = document.createElement("div");
        toast.innerText = message;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.backgroundColor = "#00FF00"; // Luminous green
        toast.style.color = "white";
        toast.style.padding = "10px 20px";
        toast.style.borderRadius = "5px";
        toast.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
        toast.style.zIndex = "1000";
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    // Updates the cart UI
    const updateCartUI = () => {
        cartSection.innerHTML = '';

        cartItems.forEach(item => {
            const cartItemElement = document.createElement("div");
            cartItemElement.className = "cart-item";
            cartItemElement.innerHTML = `
                <p id="item">${item.name} - KSH${item.price}</p>
                <button class="delete-btn" data-id="${item.id}">Remove</button>
                 <a href="index.html" id="arrow">
                  <div id="back-arrow">←</div>
                </a>
               <h1>Your Cart</h1>
            `;
            cartSection.appendChild(cartItemElement);

            cartItemElement.querySelector(".delete-btn").addEventListener("click", () => {
                deleteCartItem(item.id);
            });
        });

        // Add checkout button
        if (cartItems.length > 0) {
            const checkoutButton = document.createElement("button");
            checkoutButton.className = "checkout";
            checkoutButton.innerText = "Checkout";
            cartSection.appendChild(checkoutButton);
          //checkout button event listener
            checkoutButton.addEventListener("click", () => {
                checkoutOrder();
                checkoutButton.style.backgroundColor = "rgb(3, 36, 81)";
            });
        }
        //Updates total price and cart count
        const totalPriceElement = document.querySelector(".total-price");
        totalCartPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
        cartCount = cartItems.length;
        cartCountElement.innerText = cartCount;

        if (!totalPriceElement) {
            const totalPrice = document.createElement("p");
            totalPrice.className = "total-price";
            totalPrice.innerText = `Total Price: KSH${totalCartPrice}`;
            cartSection.appendChild(totalPrice);
        } else {
            totalPriceElement.innerText = `Total Price: KSH${totalCartPrice}`;
        }
    };

    // Adds a product to the cart
    const addToCart = (product, id) => {
        const productName = product.querySelector("p").innerText;
        const productPriceText = product.querySelector(".price").innerText;
        const productPrice = parseInt(productPriceText.replace(/[^0-9]/g, ""), 10);

        const cartItem = { id, name: productName, price: productPrice };
        cartItems.push(cartItem);

        updateCartUI();
        showToast("Item successfully added to cart");
    };

    const deleteCartItem = (id) => {
        cartItems = cartItems.filter(item => item.id !== id);
        updateCartUI();
        showToast("Item removed from cart");
    };

    const checkoutOrder = () => {
        const order = {
            product: cartItems,
            totalPrice: totalCartPrice,
            timestamp: new Date().toISOString()
        };

        fetch('http://localhost:3000/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(order)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            showToast("Order successfully placed!");
            console.log('Order Data:', data);
        })
        .catch(error => {
            showToast("Failed to place order. Please try again.");
            console.error('Error:', error);
        });
    };

    productCards.forEach((card, index) => {
        const addButton = card.querySelector("button");
        addButton.addEventListener("click", () => {
            addButton.style.backgroundColor = "rgb(3, 36, 81)";
            addToCart(card, index + 1);
        });
    });

    cartIcon.addEventListener("click", () => {
        document.querySelectorAll("body > *").forEach(section => {
            if (!section.classList.contains("cart-section")) {
                section.style.display = "none";
            }
        });
        cartSection.style.display = "block";
    });
});
