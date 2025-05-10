import {cart,removeFromCart} from "../data/cart.js";
import {getProduct, loadProducts, loadProductsFetch, products} from "../data/products.js";
import { paymentSummary } from "./paymentSummary.js";
import {formatCurrency} from "./utils/money.js";

// Create a promise class, which runs the inner parameter function immediately 
// resolve() is a builtin input that allows for a "wait()" similarity function in C
// Calling resolve() will now gets us to the .then() section of the Promise class
/*new Promise((resolve)=>{
    loadProducts(()=>{
        // The load product input parameter function only runs after product finished loading
        // giving result a parameter allows for later usage in .then by a 'value' input parameter
        resolve();
    });
}).then(f)*/

// Promise.all includes all promises inside the array as execution prereq for.then to execute
/*Promise.all([
    loadProductsFetch()
]).then(f)*/

//Async Await: better way to represent promises waiting features by wrapping the code inside the function to a larger promise
async function loadPage(){
    //try catch allows catching errors in async function and normal function, used to handle unexpected error
    try{
        // await only works in promises under async function, it waits for this promise to finish before going into the next step inside the function code
        await loadProductsFetch();
        f();
    } catch(error){
        console.log('Error');
    }
    
}

loadPage();

function f(){
    let cartSummaryHTML = '';

    cart.forEach((cartItem)=>{
        const productId = cartItem.productId;

        const matchingProduct = getProduct(productId);

        cartSummaryHTML += `
            <div class="cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                    <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-1">
                    <div>
                        <div class="delivery-option-date">
                        Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                        FREE Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-1">
                    <div>
                        <div class="delivery-option-date">
                        Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                        $4.99 - Shipping
                        </div>
                    </div>
                    </div>
                    <div class="delivery-option">
                    <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-1">
                    <div>
                        <div class="delivery-option-date">
                        Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                        $9.99 - Shipping
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        `
    });

    document.querySelector(".order-summary").innerHTML = cartSummaryHTML;


    document.querySelectorAll(".js-delete-link").forEach((link) => {
        link.addEventListener("click", () => {
            // on each click, obtain the html's elements productID using the data attributes inside html
            const productId = link.dataset.productId;

            // Remove this element from cart array
            removeFromCart(productId);

            //.remove is a DOM method that removes this element in html
            document.querySelector(`.cart-item-container-${productId}`).remove();

            paymentSummary();
        });
    });

    paymentSummary();
}
