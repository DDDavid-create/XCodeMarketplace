// Función para mostrar notificaciones toast
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    
    toast.className = `fixed top-4 right-4 px-6 py-3 rounded shadow-
    lg ${type === 'error' ? 'bg-red-500' : 'bg-green-500'
    } text-white`;
    toast.classList.remove('hidden');
    setTimeout(() => {
    toast.classList.add('hidden');
    }, 3000);
    }
    // Inicializar las clases principales
    window.productForm = new ProductForm();
    window.productList = new ProductList();