const productos = [
    {
        "id": "urbana-01",
        "titulo": "urbana 01",
        "imagen": "./IMG/urbana1.jpg",
        "categoria": {
            "nombre": "urbanas",
            "id": "urbanas"
        },
        "precio": 7000
    },
    {
        "id": "urbana-02",
        "titulo": "urbana 02",
        "imagen": "./IMG/urbana2.jpg",
        "categoria": {
            "nombre": "urbanas",
            "id": "urbanas"
        },
        "precio": 7000
    },
    {
        "id": "urbana-03",
        "titulo": "urbana 03",
        "imagen": "./IMG/urbana3.jpg",
        "categoria": {
            "nombre": "urbanas",
            "id": "urbanas"
        },
        "precio": 7000
    },
    {
        "id": "urbana-04",
        "titulo": "urbana 04",
        "imagen": "./IMG/urbana4.jpg",
        "categoria": {
            "nombre": "urbanas",
            "id": "urbanas"
        },
        "precio": 7000
    },
    {
        "id": "urbana-05",
        "titulo": "urbana 05",
        "imagen": "./IMG/urbana5.jpg",
        "categoria": {
            "nombre": "urbanas",
            "id": "urbanas"
        },
        "precio": 7000
    },
    {
        "id": "oversize-01",
        "titulo": "oversize 01",
        "imagen": "./IMG/oversize1.jpg",
        "categoria": {
            "nombre": "oversizes",
            "id": "oversizes"
        },
        "precio": 8500
    },
    {
        "id": "oversize-02",
        "titulo": "oversize 02",
        "imagen": "./IMG/oversize2.jpg",
        "categoria": {
            "nombre": "oversizes",
            "id": "oversizes"
        },
        "precio": 8500
    },
    {
        "id": "oversize-03",
        "titulo": "oversize 03",
        "imagen": "./IMG/oversize3.jpg",
        "categoria": {
            "nombre": "oversizes",
            "id": "oversizes"
        },
        "precio": 8500
    },
    {
        "id": "oversize-04",
        "titulo": "oversize 04",
        "imagen": "./IMG/oversize4.jpg",
        "categoria": {
            "nombre": "oversizes",
            "id": "oversizes"
        },
        "precio": 8500
    },
    {
        "id": "oversize-05",
        "titulo": "oversize 05",
        "imagen": "./IMG/oversize5.jpg",
        "categoria": {
            "nombre": "oversizes",
            "id": "oversizes"
        },
        "precio": 8500
    },
    {
        "id": "oversize-06",
        "titulo": "oversize 06",
        "imagen": "./IMG/oversize6.jpg",
        "categoria": {
            "nombre": "oversizes",
            "id": "oversizes"
        },
        "precio": 8500
    },
    {
        "id": "musculosas-01",
        "titulo": "musculosas 01",
        "imagen": "./IMG/musculosa1.jpg",
        "categoria": {
            "nombre": "musculosas",
            "id": "musculosas"
        },
        "precio": 6000
    },
    {
        "id": "musculosas-02",
        "titulo": "musculosas 02",
        "imagen": "./IMG/musculosa2.jpg",
        "categoria": {
            "nombre": "musculosas",
            "id": "musculosas"
        },
        "precio": 6000
    },
    {
        "id": "musculosas-03",
        "titulo": "musculosas 03",
        "imagen": "./IMG/musculosa3.jpg",
        "categoria": {
            "nombre": "musculosas",
            "id": "musculosas"
        },
        "precio": 6000
    },
    {
        "id": "musculosas-04",
        "titulo": "musculosas 04",
        "imagen": "./IMG/musculosa4.jpg",
        "categoria": {
            "nombre": "musculosas",
            "id": "musculosas"
        },
        "precio": 6000
    },
    {
        "id": "musculosas-05",
        "titulo": "musculosas 05",
        "imagen": "./IMG/musculosa5.jpg",
        "categoria": {
            "nombre": "musculosas",
            "id": "musculosas"
        },
        "precio": 6000
    }
]

const productosContainer = document.getElementById("productos-container");
const searchInput = document.querySelector('.form-control');
const carritoCantidadElement = document.getElementById('carrito-cantidad');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
let carritoCantidad = 0;


// Función para obtener el carrito desde localStorage
function obtenerCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

// Función para guardar el carrito en localStorage
function guardarCarritoEnLocalStorage(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para cargar el carrito desde localStorage al cargar la página
function cargarCarritoDesdeLocalStorage() {
    const carritoActual = obtenerCarritoDesdeLocalStorage();
    carritoActual.forEach(producto => agregarProductoAlCarritoLista(producto));
    calcularTotal(); // Asegúrate de calcular el total después de cargar el carrito
}

function mostrarProductos(categoria, terminoBusqueda) {
    productosContainer.innerHTML = ""; // Limpiar el contenedor

    // Obtener productos según la categoría seleccionada
    const productosFiltrados = filtrarProductosPorCategoria(productos, categoria);

    // Filtrar productos por término de búsqueda
    const productosBuscados = buscarProductos(productosFiltrados, terminoBusqueda || '');

    // Iterar sobre los productos filtrados y agregar al contenedor
    productosBuscados.forEach(producto => {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.titulo}</h5>
                        <p class="card-text">${producto.categoria.nombre}</p>
                        <p class="card-text">$${producto.precio}</p>
                        <button class="btn btn-primary" onclick="agregarProductoAlCarrito('${producto.id}', '${producto.titulo}', ${producto.precio})">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        `;

        productosContainer.innerHTML += card;
    });
}

function filtrarProductosPorCategoria(productos, categoria) {
    if (categoria === 'urbanas') {
        return productos.filter(producto => producto.categoria.id === 'urbanas');
    } else if (categoria === 'oversize') {
        return productos.filter(producto => producto.categoria.id === 'oversizes');
    } else if (categoria === 'musculosas') {
        return productos.filter(producto => producto.categoria.id === 'musculosas');
    } else {
        return productos;
    }
}

// Función para buscar productos por término
function buscarProductos(productos, termino) {
    return productos.filter(producto =>
        producto.titulo && producto.titulo.toLowerCase().includes(termino.toLowerCase())
    );
}


// Función para agregar un producto al carrito
function agregarProductoAlCarrito(idProducto, nombreProducto, precioProducto, imagenProducto) {
    carritoCantidad++;
    actualizarIconoCarrito();
    const nuevoProducto = { id: idProducto, nombre: nombreProducto, precio: precioProducto, imagen: imagenProducto };
    const carritoActual = obtenerCarritoDesdeLocalStorage();
    carritoActual.push(nuevoProducto);
    guardarCarritoEnLocalStorage(carritoActual);
    agregarProductoAlCarritoLista(nuevoProducto);
}

// Función para agregar un producto al listado del carrito
function agregarProductoAlCarritoLista(producto) {
    const elementoCarrito = document.createElement('li');
    elementoCarrito.innerHTML = `
        <div class="carrito-item">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-imagen">
            <div class="carrito-info">
                <p>${producto.nombre} - $${producto.precio.toFixed(2)}</p>
                <button class="eliminar-producto" data-id="${producto.id}" onclick="eliminarProducto(event)">Eliminar</button>
            </div>
        </div>
    `;

listaCarrito.appendChild(elementoCarrito);
calcularTotal();
}


// Función para eliminar un producto del carrito
function eliminarProducto(e) {
    if (e.target.classList.contains('eliminar-producto')) {
        const productoId = e.target.getAttribute('data-id');
        const productosEnCarrito = document.querySelectorAll('#lista-carrito li');

        productosEnCarrito.forEach((producto) => {
            if (producto.querySelector('.eliminar-producto').getAttribute('data-id') === productoId) {
                producto.remove();
            }
        });

        calcularTotal();
    }
}

// Función para vaciar el carrito
function vaciarCarrito() {
    while (listaCarrito.firstChild) {
        listaCarrito.removeChild(listaCarrito.firstChild);
    }

    carritoCantidad = 0;
    actualizarIconoCarrito();
    calcularTotal();
}

// Función para calcular el total del carrito
function calcularTotal() {
    let total = 0;
    const productosEnCarrito = document.querySelectorAll('#lista-carrito li');

    productosEnCarrito.forEach((producto) => {
        const precio = parseFloat(producto.textContent.split('-')[1].trim().substring(1));
        total += precio;
    });

    totalCarrito.textContent = total.toFixed(2);
}

// Función para actualizar el icono del carrito
function actualizarIconoCarrito() {
    carritoCantidadElement.textContent = carritoCantidad;
}

// Event listeners para el carrito
listaCarrito.addEventListener('click', eliminarProducto);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

// Script para mostrar/ocultar el carrito al hacer clic en el icono NUEVOOOOOOO
document.getElementById('carrito-icon').addEventListener('click', function () {
    var carrito = document.getElementById('carrito');
    carrito.style.display = (carrito.style.display === 'none' || carrito.style.display === '') ? 'block' : 'none';
});

// Llamar a la función para mostrar todos los productos al cargar la página
document.addEventListener("DOMContentLoaded", () => mostrarProductos());

// Llamar a la función para cargar el carrito desde localStorage al cargar la página
document.addEventListener("DOMContentLoaded", cargarCarritoDesdeLocalStorage);


// Agregar evento de cambio al campo de búsqueda
searchInput.addEventListener('input', () => {
    const terminoBusqueda = searchInput.value;
    mostrarProductos('', terminoBusqueda);
});

// Llamar a la función para mostrar todos los productos al cargar la página
document.addEventListener("DOMContentLoaded", () => mostrarProductos());

