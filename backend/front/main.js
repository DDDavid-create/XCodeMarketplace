// Function to add product to cart
const addToCart = async (productId) => {
    const response = await fetch(`${apiUrl}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity: 1 })
    });

    if (response.ok) {
        alert('Item added to cart');
        loadCart();
    } else {
        alert('Failed to add item to cart');
    }
};
document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const productForm = document.getElementById('product-form');
    const productsDiv = document.getElementById('products');
    const cartDiv = document.getElementById('cart-items');

    let token = '';

    const apiUrl = 'http://localhost:3000/api';

    // Handle login
    loginBtn.addEventListener('click', async () => {
        const username = authForm.username.value;
        const password = authForm.password.value;

        const response = await fetch(`${apiUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();
            token = data.token;
            document.getElementById('add-product').style.display = 'block';
            document.getElementById('cart').style.display = 'block';
        } else {
            alert('Invalid credentials');
        }
    });

    // Handle registration
    registerBtn.addEventListener('click', async () => {
        const username = authForm.username.value;
        const password = authForm.password.value;

        const response = await fetch(`${apiUrl}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            alert('User registered. Please log in.');
        } else {
            alert('Registration failed');
        }
    });

    // Handle adding product
    productForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', productForm.title.value);
        formData.append('description', productForm.description.value);
        formData.append('price', productForm.price.value);
        formData.append('image', productForm.image.files[0]);

        const response = await fetch(`${apiUrl}/products`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (response.ok) {
            alert('Product added');
            loadProducts();
        } else {
            alert('Failed to add product');
        }
    });

    // Function to load products
    const loadProducts = async () => {
        const response = await fetch(`${apiUrl}/products`);
        const products = await response.json();

        productsDiv.innerHTML = products.map(product => `
            <div class="product">
                <img src="${apiUrl.replace('/api', '')}/${product.imageUrl}" alt="Product Image">
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <p><strong>Price:</strong> $${product.price}</p>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `).join('');
    };


    // Function to load cart items
    const loadCart = async () => {
        const response = await fetch(`${apiUrl}/cart`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const cartItems = await response.json();

        cartDiv.innerHTML = cartItems.map(item => `
            <div class="cart-item">
                <img src="${apiUrl.replace('/api', '')}/${item.imageUrl}" alt="Product Image">
                <div class="cart-item-info">
                    <h3>${item.title}</h3>
                    <p><strong>Quantity:</strong> ${item.quantity}</p>
                </div>
            </div>
        `).join('');
    };

    // Initial load
    loadProducts();
});
