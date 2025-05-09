// Module linkage, only works with live-server
import {cart, addToCart} from '../data/cart.js';
import {products,loadProducts} from '../data/products.js';
import {formatCurrency} from "./utils/money.js";

// Can call this function becuz Hoisting
loadProducts(renderProductsGrid);

function renderProductsGrid(){
    let productsHTML = '';

    // Generate HTML for all products by looping through product in products
    products.forEach((product) => {
    const html = `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                src= ${product.image}>
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                $${formatCurrency(product.priceCents)}
            </div>

            <div class="product-quantity-container">
                <select>
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                </select>
            </div>

            <!--Polymorphism (the ability of using a method on some object w/o having to know the specific class an onject belongs to. i.e. no if statement for checks-->
            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart">
                <img src="images/icons/checkmark.png">
                Added
            </div>
        
            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
                Add to Cart
            </button>
        </div>
    `;  

    productsHTML += html;

    });

    // Copy everything from productsHTML variable and display it on screen
    document.querySelector(".products-grid").innerHTML = productsHTML;

    // Linear check for total item number to display on cart icon after every add to cart call
    function updateCart(){
        let cartQuantity = 0;
        
        cart.forEach((cartItem) =>{
            cartQuantity += cartItem.quantity;
        });

        document.querySelector(".cart-quantity").innerHTML = cartQuantity;
    }

    document.querySelectorAll(".js-add-to-cart").forEach((button) => {
        button.addEventListener("click", () => {
            const productId = button.dataset.productId;
            addToCart(productId);
            updateCart();
        });
    });

}
