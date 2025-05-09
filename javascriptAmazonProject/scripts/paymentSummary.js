import {cart} from "../data/cart.js";
import { addOrders } from "../data/orders.js";
import {getProduct} from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

export function paymentSummary(){
    let tot = 0;
    cart.forEach((item)=> {
        const p = getProduct(item.productId);
        tot += (p.priceCents * item.quantity);
    });

    const tax = 0.1 *tot;
    const totWithTax = 1.1 * tot;

    const paymentSummaryHTML = `
    <div class="payment-summary-title">
        Order Summary
    </div>

    <div class="payment-summary-row">
        <div>Items (3):</div>
        <div class="payment-summary-money">$${formatCurrency(tot)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$4.99</div>
    </div>

    <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">${formatCurrency(tot + 499)}</div>
    </div>

    <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(tax)}</div>
    </div>

    <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totWithTax)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
        Place your order
    </button>
    `
    document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

    document.querySelector(".js-place-order").addEventListener('click', async ()=>{
        try{
            // Sending a POST request to the backend, hence want a second parameter
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart:cart
                })
            });

            const order = await response.json();
            addOrders(order);
        } catch(error){
            console.log('error');
        }
        
        // Open to a new tab after clicking on order button
        window.location.href = './orders.html';
    })
}