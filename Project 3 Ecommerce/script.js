document.addEventListener('DOMContentLoaded', () => {
    const products = [
        {id: 1, name: 'Product 1', price: 10.99},
        {id: 2, name: 'Product 2', price: 19.99},
        {id: 3, name: 'Product 3', price: 29.99},
        {id: 4, name: 'Product 4', price: 39.99},
        {id: 5, name: 'Product 5', price: 49.99},
        {id: 6, name: 'Product 6', price: 59.99},
        {id: 7, name: 'Product 7', price: 69.99},
        {id: 8, name: 'Product 8', price: 79.99},
        {id: 9, name: 'Product 9', price: 89.99},
        {id: 10, name: 'Product 10', price: 99.99},
    ];
    const cart = [];

    const productContainer = document.getElementById('product-list');
    const cartContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartTotal = document.getElementById('cart-total');
    const totalPrice = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add to Cart</button>

        `;
        productContainer.appendChild(productDiv);
    });
    //code for just adding a special place to click
    productContainer.addEventListener('click',(e)=>{
        if(e.target.tagName ==='BUTTON'){
            
            // console.log(e.target.dataset.id)
            const productId =parseInt(e.target.dataset.id)//// `dataset` maps all `data-*` attributes to properties (e.g., `data-id="3"` → `element.dataset.id === "3"`)

            // const productId =parseInt(e.target.getAttribute('data-id'))
            const product =products.find(product => product.id === productId)
            // addtocart(product)
            console.log(product)
        }
    })
});
