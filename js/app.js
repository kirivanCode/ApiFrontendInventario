// URL de las APIs
const apiProductUrl = "http://apigod.com/api/productos";
const apiProviderUrl = "http://apigod.com/api/proveedores";
const apiCompraUrl = "http://apigod.com/api/compras"; 
const apiClientUrl = "http://apigod.com/api/clientes"; 
const apiSaleUrl = "http://apigod.com/api/ventas";

// Obtener elementos del DOM para productos
const productForm = document.getElementById("productForm");
const productList = document.getElementById("productList");
const productIdInput = document.getElementById("productId");
const nombreInput = document.getElementById("nombre");
const descripcionInput = document.getElementById("descripcion");
const stockInput = document.getElementById("stock");
const precioInput = document.getElementById("precio"); // Añadido para el precio

// Obtener elementos del DOM para proveedores
const providerForm = document.getElementById("providerForm");
const providerList = document.getElementById("providerList");
const providerIdInput = document.getElementById("providerId");
const providerNombreInput = document.getElementById("providerNombre");
const providerEmailInput = document.getElementById("providerEmail");
const providerTelefonoInput = document.getElementById("providerTelefono");







const clientForm = document.getElementById("clientForm");
const clientList = document.getElementById("clientList");
const clientIdInput = document.getElementById("clientId");
const clientNameInput = document.getElementById("clientName");
const clientEmailInput = document.getElementById("clientEmail");
const clientPhoneInput = document.getElementById("clientPhone");


// Obtener elementos del DOM para el formulario de compras
const compraForm = document.getElementById("purchaseForm");
const compraList = document.getElementById("compraList");
const compraIdInput = document.getElementById("purchaseId");
const productoCompraSelect = document.getElementById("purchaseProduct");
const proveedorCompraSelect = document.getElementById("purchaseProvider");
const cantidadCompraInput = document.getElementById("purchaseQuantity");
const precioCompraInput = document.getElementById("purchasePrice");


const saleForm = document.getElementById("saleForm");
const saleList = document.getElementById("saleList");
const saleIdInput = document.getElementById("saleId");
const saleProductSelect = document.getElementById("saleProduct");
const saleClientSelect = document.getElementById("saleClient");
const saleQuantityInput = document.getElementById("saleQuantity");
const salePriceInput = document.getElementById("salePrice");



document.addEventListener("DOMContentLoaded", () => {
    fetchSales();
    loadProductsAndClients2();
    fetchClients2();
    fetchSales();
    fetchCompras();
    loadProductsAndProviders(); // Asegúrate de que esto esté aquí
});


document.addEventListener("DOMContentLoaded", () => {
    loadProductsAndProviders2();
    fetchCompras();
});


// Función para obtener compras
function fetchCompras() {
    fetch(apiCompraUrl)
        .then(response => response.json())
        .then(data => {
            compraList.innerHTML = ""; // Limpiar la tabla
            data.forEach(compra => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${compra.id}</td>
                    <td>${compra.producto_id}</td>
                    <td>${compra.proveedor_id}</td>
                    <td>${compra.cantidad}</td>
                    <td>${compra.precio_compra }</td>
                    <td class="text-center">
                        <div class="d-flex justify-content-center gap-2">
                            <button 
                                class="btn btn-outline-primary btn-sm d-flex align-items-center gap-1" 
                                onclick="editCompra(${compra.id})" 
                                title="Editar"
                            >
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                            <button 
                                class="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" 
                                onclick="deleteCompra(${compra.id})" 
                                title="Eliminar"
                            >
                                <i class="bi bi-trash"></i> Eliminar
                            </button>
                        </div>
                    </td>

                `;
                compraList.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching compras:', error));
}

// Función para cargar productos y proveedores
function loadProductsAndProviders2() {
    // Cargar productos
    fetch(apiProductUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const option = document.createElement("option");
                option.value = product.id;
                option.textContent = product.nombre;
                productoCompraSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    // Cargar proveedores
    fetch(apiProviderUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(provider => {
                const option = document.createElement("option");
                option.value = provider.id;
                option.textContent = provider.nombre;
                proveedorCompraSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching providers:', error));
}

// Función para manejar el envío del formulario
compraForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const compraData = {
        id: compraIdInput.value,
        producto_id: productoCompraSelect.value,
        proveedor_id: proveedorCompraSelect.value,
        cantidad: cantidadCompraInput.value,
        precio_compra: precioCompraInput.value
    };

    if (compraData.id) {
        updateCompra(compraData);
    } else {
        createCompra(compraData);
    }
});

// Función para crear una nueva compra
function createCompra(compraData) {
    fetch(apiCompraUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(compraData)
    })
    .then(response => response.json())
    .then(() => {
        fetchCompras();
        resetPurchaseForm();
    })
    .catch(error => console.error('Error creating compra:', error));
}

// Función para actualizar una compra existente
function updateCompra(compraData) {
    fetch(`${apiCompraUrl}/${compraData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(compraData)
    })
    .then(response => response.json())
    .then(() => {
        fetchCompras();
        resetPurchaseForm();
    })
    .catch(error => console.error('Error updating compra:', error));
}

// Función para eliminar una compra
function deleteCompra(id) {
    fetch(`${apiCompraUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        fetchCompras();
    })
    .catch(error => console.error('Error deleting compra:', error));
}

// Función para editar una compra
function editCompra(id) {
    fetch(`${apiCompraUrl}/${id}`)
        .then(response => response.json())
        .then(compra => {
            compraIdInput.value = compra.id;
            productoCompraSelect.value = compra.producto_id;
            proveedorCompraSelect.value = compra.proveedor_id;
            cantidadCompraInput.value = compra.cantidad;
            precioCompraInput.value = compra.precio_compra;
        })
        .catch(error => console.error('Error fetching compra for edit:', error));
}

// Función para reiniciar el formulario de compras
function resetPurchaseForm() {
    compraIdInput.value = "";
    productoCompraSelect.value = "";
    proveedorCompraSelect.value = "";
    cantidadCompraInput.value = "";
    precioCompraInput.value = "";
}






// Función para obtener clientes
function fetchClients2() {
    fetch(apiClientUrl)
        .then(response => response.json())
        .then(data => {
            clientList.innerHTML = ""; // Limpiar la tabla
            data.forEach(client => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${client.id}</td>
                    <td>${client.nombre}</td>
                    <td>${client.email}</td>
                    <td>${client.telefono}</td>
                    <td class="text-center">
                        <div class="d-flex justify-content-center gap-2">
                            <button 
                                class="btn btn-outline-primary btn-sm d-flex align-items-center gap-1" 
                                onclick="editClient(${client.id})" 
                                title="Editar"
                            >
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                            <button 
                                class="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" 
                                onclick="deleteClient(${client.id})" 
                                title="Eliminar"
                            >
                                <i class="bi bi-trash"></i> Eliminar
                            </button>
                        </div>
                    </td>

                `;
                clientList.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching clients:', error));
}

// Función para manejar el envío del formulario
clientForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const clientData = {
        id: clientIdInput.value,
        nombre: clientNameInput.value,
        email: clientEmailInput.value,
        telefono: clientPhoneInput.value
    };

    if (clientData.id) {
        updateClient(clientData);
    } else {
        createClient(clientData);
    }
});

// Función para crear un nuevo cliente
function createClient(clientData) {
    fetch(apiClientUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientData)
    })
    .then(response => response.json())
    .then(() => {
        fetchClients2();
        resetClientForm();
    })
    .catch(error => console.error('Error creating client:', error));
}

// Función para actualizar un cliente existente
function updateClient(clientData) {
    fetch(`${apiClientUrl}/${clientData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clientData)
    })
    .then(response => response.json())
    .then(() => {
        fetchClients2();
        resetClientForm();
    })
    .catch(error => console.error('Error updating client:', error));
}

// Función para eliminar un cliente
function deleteClient(id) {
    fetch(`${apiClientUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        fetchClients2();
    })
    .catch(error => console.error('Error deleting client:', error));
}

// Función para editar un cliente
function editClient(id) {
    fetch(`${apiClientUrl}/${id}`)
        .then(response => response.json())
        .then(client => {
            clientIdInput.value = client.id;
            clientNameInput.value = client.nombre;
            clientEmailInput.value = client.email;
            clientPhoneInput.value = client.telefono;
        })
        .catch(error => console.error('Error fetching client for edit:', error));
}

// Función para reiniciar el formulario de clientes
function resetClientForm() {
    clientIdInput.value = "";
    clientNameInput.value = "";
    clientEmailInput.value = "";
    clientPhoneInput.value = "";
}



// Función para obtener ventas
// Función para obtener ventas
function fetchSales() {
    fetch(apiSaleUrl)
        .then(response => response.json())
        .then(data => {
            saleList.innerHTML = ""; // Limpiar la tabla
            data.forEach(sale => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${sale.id}</td>
                    <td>${sale.producto_id}</td>
                    <td>${sale.cliente_id}</td>
                    <td>${sale.cantidad}</td>
                    <td>${sale.precio_venta}</td>
                   <td class="text-center">
                        <div class="d-flex justify-content-center gap-2">
                            <button 
                                class="btn btn-outline-primary btn-sm d-flex align-items-center gap-1" 
                                onclick="editSale(${sale.id})" 
                                title="Editar"
                            >
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                            <button 
                                class="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" 
                                onclick="deleteSale(${sale.id})" 
                                title="Eliminar"
                            >
                                <i class="bi bi-trash"></i> Eliminar
                            </button>
                        </div>
                    </td>

                `;
                saleList.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching sales:', error));
}

// Función para cargar productos y clientes
function loadProductsAndClients2() {
    // Cargar productos
    fetch(apiProductUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const option = document.createElement("option");
                option.value = product.id;
                option.textContent = product.nombre;
                saleProductSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching products:', error));

    // Cargar clientes
    fetch(apiClientUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(client => {
                const option = document.createElement("option");
                option.value = client.id;
                option.textContent = client.nombre;
                saleClientSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching clients:', error));
}

// Función para manejar el envío del formulario
saleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const saleData = {
        id: saleIdInput.value,
        producto_id: saleProductSelect.value,
        cliente_id: saleClientSelect.value,
        cantidad: saleQuantityInput.value,
        precio_venta: salePriceInput.value
    };

    if (saleData.id) {
        updateSale(saleData);
    } else {
        createSale(saleData);
    }
});

// Función para crear una nueva venta
function createSale(saleData) {
    fetch(apiSaleUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(saleData)
    })
    .then(response => response.json())
    .then(() => {
        fetchSales();
        resetSaleForm();
    })
    .catch(error => console.error('Error creating sale:', error));
}

// Función para actualizar una venta existente
function updateSale(saleData) {
    fetch(`${apiSaleUrl}/${saleData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(saleData)
    })
    .then(response => response.json())
    .then(() => {
        fetchSales();
        resetSaleForm();
    })
    .catch(error => console.error('Error updating sale:', error));
}

// Función para eliminar una venta
function deleteSale(id) {
    fetch(`${apiSaleUrl}/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        fetchSales();
    })
    .catch(error => console.error('Error deleting sale:', error));
}

// Función para editar una venta
function editSale(id) {
    fetch(`${apiSaleUrl}/${id}`)
        .then(response => response.json())
        .then(sale => {
            saleIdInput.value = sale.id;
            saleProductSelect.value = sale.producto_id;
            saleClientSelect.value = sale.cliente_id;
            saleQuantityInput.value = sale.cantidad;
            salePriceInput.value = sale.precio_venta;
        })
        .catch(error => console.error('Error fetching sale for edit:', error));
}

// Función para reiniciar el formulario de ventas
function resetSaleForm() {
    saleIdInput.value = "";
    saleProductSelect.value = "";
    saleClientSelect.value = "";
    saleQuantityInput.value = "";
    salePriceInput.value = "";
}


// Cargar compras y productos/proveedores al iniciar



function loadProductsAndProviders() {
    fetchProducts(); // Asegúrate de que esta función esté bien definida
    fetchProviders(); // Asegúrate de que esta función esté bien definida
}
// Función para obtener productos
function fetchProducts() {
    fetch(apiProductUrl)
        .then(response => response.json())
        .then(data => {
            productList.innerHTML = "";
            data.forEach(producto => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${producto.id}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.estado || '-'}</td>
                    <td>
                        <span class="badge ${producto.stock > 0 ? 'bg-success' : 'bg-danger'}">
                            ${producto.stock}
                        </span>
                    </td>
                    <td>
                        <div class="d-flex justify-content-center gap-2">
                            <button 
                                class="btn btn-outline-primary btn-sm d-flex align-items-center gap-1" 
                                onclick="editProduct(${producto.id})" 
                                title="Editar"
                            >
                                <i class="bi bi-pencil"></i> Editar
                            </button>
                            <button 
                                class="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" 
                                onclick="deleteProduct(${producto.id})" 
                                title="Eliminar"
                            >
                                <i class="bi bi-trash"></i> Eliminar
                            </button>
                        </div>
                    </td>

                `;
                productList.appendChild(row);
            });
        })
        .catch(error => showAlert('Error al cargar los productos', 'danger'));
}

// Función para obtener proveedores
function fetchProviders() {
    fetch(apiProviderUrl)
        .then(response => response.json())
        .then(data => {
            providerList.innerHTML = "";
            data.forEach(provider => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${provider.id}</td>
                    <td>${provider.nombre}</td>
                    <td>${provider.email}</td>
                    <td>${provider.telefono}</td>
                    <td>
                            <div class="d-flex justify-content-center gap-2">
                                <button 
                                    class="btn btn-outline-primary btn-sm d-flex align-items-center gap-1" 
                                    onclick="editProvider(${provider.id})" 
                                    title="Editar"
                                >
                                    <i class="bi bi-pencil"></i> Editar
                                </button>
                                <button 
                                    class="btn btn-outline-danger btn-sm d-flex align-items-center gap-1" 
                                    onclick="deleteProvider(${provider.id})" 
                                    title="Eliminar"
                                >
                                    <i class="bi bi-trash"></i> Eliminar
                                </button>
                            </div>
                        </td>

                `;
                providerList.appendChild(row);
            });
        })
        .catch(error => showAlert('Error al cargar los proveedores', 'danger'));
}



// Función para mostrar alertas
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 3000);
}

// Función para resetear el formulario de productos
function resetProductForm() {
    productForm.reset();
    productIdInput.value = "";
    document.querySelector('button[type="submit"]').textContent = " Guardar Producto";
}

// Función para guardar o actualizar un producto
productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = productIdInput.value;
    const nombre = nombreInput.value.trim();
    const estado = descripcionInput.value.trim();
    const stock = stockInput.value;
    const precio = precioInput.value; // Añadido para el precio

    const productData = { nombre, estado, stock, precio }; // Incluido precio

    const url = id ? `${apiProductUrl}/${id}` : apiProductUrl;
    const method = id ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData)
    })
        .then(response => response.json())
        .then(() => {
            showAlert(id ? 'Producto actualizado correctamente' : 'Producto creado correctamente');
            fetchProducts();
            resetProductForm();
        })
        .catch(error => showAlert('Error al guardar el producto', 'danger'));
});

// Función para editar un producto
function editProduct(id) {
    fetch(`${apiProductUrl}/${id}`)
        .then(response => response.json())
        .then(product => {
            productIdInput.value = product.id;
            nombreInput.value = product.nombre;
            descripcionInput.value = product.estado; // Cambiado a estado
            stockInput.value = product.stock;
            precioInput.value = product.precio; // Añadido para el precio

            document.querySelector('button[type="submit"]').innerHTML = '<i class="bi bi-save"></i> Actualizar Producto';
            productForm.scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => showAlert('Error al cargar el producto para editar', 'danger'));
}

// Función para eliminar un producto
function deleteProduct(id) {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
        fetch(`${apiProductUrl}/${id}`, { method: "DELETE" })
            .then(() => {
                showAlert('Producto eliminado correctamente');
                fetchProducts();
            })
            .catch(error => showAlert('Error al eliminar el producto', 'danger'));
    }
}

// Función para resetear el formulario de proveedores
function resetProviderForm() {
    providerForm.reset();
    providerIdInput.value = "";
}

// Función para guardar o actualizar un proveedor
providerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = providerIdInput.value;
    const nombre = providerNombreInput.value.trim();
    const email = providerEmailInput.value.trim();
    const telefono = providerTelefonoInput.value.trim();

    const providerData = { nombre, email, telefono };

    const url = id ? `${apiProviderUrl}/${id}` : apiProviderUrl;
    const method = id ? "PUT" : "POST";

    fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(providerData)
    })
        .then(response => response.json())
        .then(() => {
            showAlert(id ? 'Proveedor actualizado correctamente' : 'Proveedor creado correctamente');
            fetchProviders();
            resetProviderForm();
        })
        .catch(error => showAlert('Error al guardar el proveedor', 'danger'));
});

// Función para editar un proveedor
function editProvider(id) {
    fetch(`${apiProviderUrl}/${id}`)
        .then(response => response.json())
        .then(provider => {
            providerIdInput.value = provider.id;
            providerNombreInput.value = provider.nombre;
            providerEmailInput.value = provider.email;
            providerTelefonoInput.value = provider.telefono;
        })
        .catch(error => showAlert('Error al cargar el proveedor para editar', 'danger'));
}

// Función para eliminar un proveedor
function deleteProvider(id) {
    if (confirm("¿Estás seguro de eliminar este proveedor?")) {
        fetch(`${apiProviderUrl}/${id}`, { method: "DELETE" })
            .then(() => {
                showAlert('Proveedor eliminado correctamente');
                fetchProviders();
            })
            .catch(error => showAlert('Error al eliminar el proveedor', 'danger'));
    }
}

