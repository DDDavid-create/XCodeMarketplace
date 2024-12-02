const API_URL = 'http://localhost:3000/api';
const api = {
async getAllProducts() {
try {
const response = await axios.get(`${API_URL}/products`);
return response.data;
} catch (error) {
throw new Error('Error al obtener productos');
}
},
async getProduct(id) {
try {
const response = await
axios.get(`${API_URL}/products/${id}`);
return response.data;
} catch (error) {
throw new Error('Error al obtener el producto');
}
},
async createProduct(productData) {
try {
const response = await axios.post(`${API_URL}/products`,
productData);
return response.data;
} catch (error) {
throw new Error('Error al crear el producto');
}
},
async updateProduct(id, productData) {
try {
const response = await
axios.put(`${API_URL}/products/${id}`, productData);
return response.data;} catch (error) {
    throw new Error('Error al actualizar el producto');
    }
    },
    async deleteProduct(id) {
    try {
    await axios.delete(`${API_URL}/products/${id}`);
    return true;
    } catch (error) {
    throw new Error('Error al eliminar el producto');
    }
    }
    };