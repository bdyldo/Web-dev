//A class is an object generator
class Cart{
    cartItems;
    localStorageKey;

    // Code that runs automatically when the class is generated
    constructor(localStorageKey){
        this.localStorageKey = localStorageKey;

        this.loadFromStorage();
    }

    loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) ||
        [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2
        },{
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1
        }]; 
    }

    savetoStorage(){
        // store cart as a string as key value 'cart'
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId){
        const exist = this.cartItems.find(p => p.productId === productId);
        if(exist){
            exist.quantity += 1;
        }
        else{
            this.cartItems.push({
                productId,
                quantity: 1
            });
        }

        //save to local browser storage
        this.savetoStorage();
    }

    removeFromCart(productId){
        const idx = this.cartItems.findIndex(i => i.productId === productId)
        if (idx !== -1) {
            // splice(1st,2nd) deletes '2nd' elements starting at index '1st' 
            this.cartItems.splice(idx, 1); 
        }
        //save to local browser storage
        this.savetoStorage();
    }

}

// The parameter here indicates for what gets inputted inside the constructor function
const cart = Cart('cart-oop');
const busicart = Cart('buscart');
