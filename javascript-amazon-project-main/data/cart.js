export const cart = []; 

// Helper function to add element into cart: If button clicked: add 1 quantity to the cart if already in cart, else create new element in cart
export function addToCart(productId){
    const exist = cart.find(p => p.productId === productId)
    if(exist){
        exist.quantity += 1;
    }
    else{
        cart.push({
            productId,
            quantity: 1
        });
    }
}

