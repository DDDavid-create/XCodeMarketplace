class ProductList {
    constructor() {
    this.container = document.getElementById('productList');
    this.loadProducts();
    }async loadProducts() {
        try {
        const products = await api.getAllProducts();
        this.renderProducts(products);
        } catch (error) {
        showToast(error.message, 'error');
        }
        }
        renderProducts(products) {
        this.container.innerHTML = '';
        products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'bg-gray-50 p-4 rounded-lg shadow flex justify-between items-center';
        productElement.innerHTML = `
        <div>
        
        <h3 class="font-semibold text-
        lg">${product.name}</h3>
        
        <p class="text-gray-
        600">${product.description}</p>
        
        <p class="text-green-600 font-
        semibold">$${product.price.toFixed(2)}</p>
        
        </div>
        <div class="space-x-2">
        <button class="edit-btn bg-blue-500 text-white
        px-3 py-1 rounded hover:bg-blue-600">
        Editar
        </button>
        
        <button class="delete-btn bg-red-500 text-white
        
        px-3 py-1 rounded hover:bg-red-600">
        Eliminar
        </button>
        </div>
        `;
        const editBtn = productElement.querySelector('.edit-btn');

const deleteBtn = productElement.querySelector('.delete-btn');

editBtn.addEventListener('click', () =>
this.handleEdit(product));
deleteBtn.addEventListener('click', () =>
this.handleDelete(product.id));
this.container.appendChild(productElement);
});
}
async handleDelete(productId) {
if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
try {
await api.deleteProduct(productId);
showToast('Producto eliminado exitosamente');
this.loadProducts();
} catch (error) {
showToast(error.message, 'error');
}
}
}
handleEdit(product) {
window.productForm.loadProductForEdit(product);
}
}