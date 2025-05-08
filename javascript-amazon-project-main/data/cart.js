export const cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
},{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
}]; 

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

export function removeFromCart(productId){
    const idx = cart.findIndex(i => i.productId === productId)
    if (idx !== -1) {
        cart.splice(idx, 1); 
    }
}

