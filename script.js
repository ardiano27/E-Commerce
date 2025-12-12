// Data Produk (Menggunakan gambar placeholder untuk demo)
const productsData = [
    {
        id: 1,
        name: "Sakarias Armchair",
        category: "chair",
        price: 392,
        rating: 5,
        image: "images/ceper chair.jpeg" // Contoh URL gambar kursi
    },
    {
        id: 2,
        name: "Antri Chair",
        category: "chair",
        price: 299,
        rating: 5,
        image: "images/antri chair.jpeg"
    },
    {
        id: 3,
        name: "Anjay Chair",
        category: "chair",
        price: 519,
        rating: 5,
        image: "images/brown chair woy.jpeg"
    },
    {
        id: 4,
        name: "Nyantuy Chair",
        category: "chair",
        price: 921,
        rating: 5,
        image: "images/modern chair.jpeg"
    },
    // Dummy Data untuk kategori lain agar tab berfungsi
    {
        id: 5,
        name: "Comfy Bed",
        category: "beds",
        price: 850,
        rating: 4,
        image: "https://www.ikea.com/us/en/images/products/songesand-bed-frame-brown__0638590_pe699026_s5.jpg?f=s"
    },
    {
        id: 6,
        name: "Modern Sofa",
        category: "sofa",
        price: 1200,
        rating: 5,
        image: "https://www.ikea.com/us/en/images/products/landskrona-sofa-gunnared-dark-gray-wood__0602115_pe680184_s5.jpg?f=s"
    }
];

// State
let cartCount = 0;
let currentCategory = 'chair';

// DOM Elements
const productsContainer = document.getElementById('productsContainer');
const tabButtons = document.querySelectorAll('.tab-btn');
const cartBadge = document.querySelector('.cart-badge');
const searchInput = document.getElementById('searchInput');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(currentCategory);
});

// Tab Switching Logic
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        tabButtons.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');
        
        // Update category and render
        currentCategory = btn.dataset.category;
        renderProducts(currentCategory);
    });
});

// Render Products Function
function renderProducts(category) {
    // Filter products
    const filteredProducts = productsData.filter(p => p.category === category);
    
    // Clear container
    productsContainer.innerHTML = '';
    
    // Generate HTML
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">No products found in this category.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        // Generate Star Rating
        const stars = '★'.repeat(product.rating) + '☆'.repeat(5 - product.rating);
        
        productCard.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="card-content">
                <p class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <h3 class="product-title">${product.name}</h3>
                <div class="rating">${stars}</div>
                <div class="card-footer">
                    <span class="price">$${product.price}</span>
                    <button class="add-btn" onclick="addToCart(${product.id})">+</button>
                </div>
            </div>
        `;
        
        // Animation Entry
        productCard.style.opacity = '0';
        productCard.style.transform = 'translateY(20px)';
        productsContainer.appendChild(productCard);
        
        // Trigger reflow
        requestAnimationFrame(() => {
            productCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            productCard.style.opacity = '1';
            productCard.style.transform = 'translateY(0)';
        });
    });
}

// Add to Cart Logic
window.addToCart = function(id) {
    cartCount++;
    cartBadge.textContent = cartCount;
    
    // Simple bounce animation for badge
    cartBadge.style.transform = 'scale(1.5)';
    setTimeout(() => {
        cartBadge.style.transform = 'scale(1)';
    }, 200);
    
    alert('Product added to cart!'); // Ganti dengan notifikasi yang lebih bagus jika perlu
}

// Simple Search Filter (Bonus)
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    if(searchTerm === "") {
        renderProducts(currentCategory);
        return;
    }

    const searchResults = productsData.filter(p => 
        p.name.toLowerCase().includes(searchTerm)
    );
    
    productsContainer.innerHTML = '';
    
    if (searchResults.length === 0) {
        productsContainer.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">No products found.</p>';
        return;
    }

    searchResults.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <div class="card-img-wrapper"><img src="${product.image}" alt="${product.name}"></div>
            <div class="card-content">
                <p class="product-category">${product.category}</p>
                <h3 class="product-title">${product.name}</h3>
                <div class="card-footer"><span class="price">$${product.price}</span></div>
            </div>`;
        productsContainer.appendChild(productCard);
    });
});