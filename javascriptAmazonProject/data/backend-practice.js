// Setups for sending an HTTP request to the backend 
const xhr = new XMLHttpRequest();

// We wait for load event, which stands for when the response4 has loaded
xhr.addEventListener('load',() =>{
    // saving the response
    JSON.parse(xhr.response);
});

// Set up a HTTP request by open(method, destination)
xhr.open('GET','https://supersimplebackend.dev');

// Actually sends this request
xhr.send();

