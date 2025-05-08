//Initialize two default elements inside the cart. JSON.parse is used to convert the stored string in JSON stringify to an actual array (process of deserialize)
export const cart = JSON.parse(localStorage.getItem('cart')) ||
[{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 2
},{
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1
}]; 

//Using local storage to retain the saved cart when reloading page
function savetoStorage(){
    // store cart as a string as key value 'cart'
    localStorage.setItem('cart', JSON.stringify(cart));
}

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

    //save to local browser storage
    savetoStorage();
}

export function removeFromCart(productId){
    const idx = cart.findIndex(i => i.productId === productId)
    if (idx !== -1) {
        // splice(1st,2nd) deletes '2nd' elements starting at index '1st' 
        cart.splice(idx, 1); 
    }
    //save to local browser storage
    savetoStorage();
}

