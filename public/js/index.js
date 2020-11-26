const url = window.location.pathname.split('/')[1];
const result = document.querySelector("#result")

if(url == "products.html") {

     renderProducts()
}


async function renderProducts() {

    const products = await fetch("http://localhost:3000/products").then(response => response.json());

    if(products && products.length > 0 ) {
        
    }
}