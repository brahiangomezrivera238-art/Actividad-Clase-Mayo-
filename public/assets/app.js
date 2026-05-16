const listaProductos = document.getElementById('lista-productos');
const formulario = document.getElementById('producto-form');

// 1. FUNCIÓN PARA CARGAR PRODUCTOS (GET)
async function cargarProductos() {
    try {
        const respuesta = await fetch('/api/productos'); // Petición a tu API
        const productos = await respuesta.json(); // Convertir respuesta a datos legibles
        
        listaProductos.innerHTML = ''; // Limpiar la tabla antes de llenar

        productos.forEach(prod => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${prod.nombre}</td>
                <td>$${prod.precio.toLocaleString()}</td>
                <td><span class="${prod.disponible ? 'badge-ok' : 'badge-no'}">
                    ${prod.disponible ? 'Disponible' : 'Agotado'}
                </span></td>
                <td><button onclick="eliminarProducto(${prod.id})" style="background-color:red">X</button></td>
            `;
            listaProductos.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar:", error);
    }
}

// 2. FUNCIÓN PARA AGREGAR PRODUCTO (POST)
formulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitar que la página se recargue

    const nuevoProducto = {
        nombre: document.getElementById('nombre').value,
        precio: parseInt(document.getElementById('precio').value)
    };

    try {
        const respuesta = await fetch('/api/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevoProducto) // Convertir el objeto a texto para enviarlo
        });

        if (respuesta.ok) {
            formulario.reset(); // Limpiar el formulario
            cargarProductos(); // Refrescar la lista automáticamente
        }
    } catch (error) {
        console.error("Error al guardar:", error);
    }
});

// Cargar los productos apenas abra la página
window.onload = cargarProductos;