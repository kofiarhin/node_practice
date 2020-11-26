

const clearProducts = async() => {
    await fetch("http://localhost:3000/products", {
        method: 'DELETE'
    }).then( response => {
        console.log("products deleted")
        getProducts()
    })
}

clearProducts()

// get products
const getProducts = async() => {

    const products  = await fetch("http://localhost:3000/products").then( response => response.json());
    if(products && products.length > 0 ) {

        return products;
    }
}



const form = document.querySelector("form");

form.addEventListener("submit", (e ) => {
    e.preventDefault();

    // fake data
    const data = {
        name: "iphone12",
        description: 'some details about product',
        price: 20
    }

    fetch("http://localhost:3000/products", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then( response => response.json()).then ( result => {
    
            getProducts()
  })
  .catch( error => {
      console.log(error)
  })
})