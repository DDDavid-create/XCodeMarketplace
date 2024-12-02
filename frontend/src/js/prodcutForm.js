class ProductForm {
    constructor() {
    this.form = document.getElementById('productForm');
    this.idInput = document.getElementById('productId');
    this.nameInput = document.getElementById('productName');
    this.priceInput = document.getElementById('productPrice');
    this.descriptionInput =
    document.getElementById('productDescription');
    this.form.addEventListener('submit',
    this.handleSubmit.bind(this));
    this.resetForm();
    }
    async handleSubmit(event) {
    event.preventDefault();
    const productData = {
    name: this.nameInput.value,
    price: parseFloat(this.priceInput.value),
    description: this.descriptionInput.value
    };try {
        if (this.idInput.value) {
        // Actualizar producto existente
        await api.updateProduct(this.idInput.value,
        productData);
        showToast('Producto actualizado exitosamente');
        } else {
        // Crear nuevo producto
        await api.createProduct(productData);
        showToast('Producto creado exitosamente');
        }
        this.resetForm();
        // Actualizar lista de productos
        window.productList.loadProducts();
        } catch (error) {
        showToast(error.message, 'error');
        }
        }
        resetForm() {
        this.form.reset();
        this.idInput.value = '';
        }
        loadProductForEdit(product) {
        this.idInput.value = product.id;
        this.nameInput.value = product.name;
        this.priceInput.value = product.price;
        this.descriptionInput.value = product.description;
        }
        }