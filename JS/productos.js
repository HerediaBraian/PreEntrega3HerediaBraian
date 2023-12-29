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

function cargarProductos() {
    return new Promise((resolve, reject) => {
        fetch("../JS/productos.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error al cargar los productos. Código de estado: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => resolve(data)) 
            .catch((error) => {
                console.error("Error al cargar productos:", error);
                reject(error);
            });
    });
}

function obtenerCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

function guardarCarritoEnLocalStorage(carrito) {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

async function cargarCarritoDesdeLocalStorage() {
    try {
        const productos = await cargarProductos();
        const carritoActual = obtenerCarritoDesdeLocalStorage();
        if (carritoActual.length > 0 && productos.length > 0) {
            listaCarrito.innerHTML = '';

            carritoActual.forEach(producto => {
                const productoEnLista = productos.find(p => JSON.stringify(p) === JSON.stringify(producto));

                if (productoEnLista) {
                    agregarProductoAlCarritoLista(producto);
                }
            });

            calcularTotal();
        }
    } catch (error) {
        console.error('Error al cargar el carrito desde localStorage:', error);
    }
}



async function mostrarProductos(categoria, terminoBusqueda) {
    try {
        const productos = await cargarProductos();

        productosContainer.innerHTML = ''; 

        const productosFiltrados = filtrarProductosPorCategoria(productos, categoria);
        const productosBuscados = buscarProductos(productosFiltrados, terminoBusqueda || '');

        productosBuscados.forEach(producto => {
            const card = `
            <div class="col-md-4 mb-4">
                <div class="card h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.titulo}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.titulo}</h5>
                        <p class="card-text">${producto.categoria.nombre}</p>
                        <p class="card-text">$${producto.precio}</p>
                        <button class="btn btn-primary" onclick="agregarProductoAlCarrito('${producto.id}', '${producto.titulo}', ${producto.precio}, '${producto.imagen}')">Agregar al carrito</button>
                    </div>
                </div>
            </div>
            `;

            productosContainer.innerHTML += card;
        });
    } catch (error) {
        console.error("Error al cargar y mostrar productos:", error);
    }
}

function filtrarProductosPorCategoria(productos, categoria) {
    return categoria ? productos.filter(producto => producto.categoria.id === categoria) : productos;
}

function buscarProductos(productos, termino) {
    return productos.filter(producto =>
        producto.titulo && producto.titulo.toLowerCase().includes(termino.toLowerCase())
    );
}

function mostrarMensajeAgregado() {
    const mensaje = document.createElement('div');
    mensaje.textContent = '¡Tu producto fue agregado!';
    mensaje.classList.add('mensaje-agregado');
    document.body.appendChild(mensaje);

    mensaje.style.position = 'fixed';
    mensaje.style.top = '10px';
    mensaje.style.left = '50%';
    mensaje.style.transform = 'translateX(-50%)';
    mensaje.style.padding = '10px';
    mensaje.style.backgroundColor = 'lightblue';
    mensaje.style.border = '1px solid #ccc';
    mensaje.style.borderRadius = '5px';

    setTimeout(() => {
        mensaje.remove();
    }, 1500);
}



function agregarProductoAlCarrito(idProducto, nombreProducto, precioProducto, imagenProducto) {
    carritoCantidad++;
    actualizarIconoCarrito();
    const nuevoProducto = { id: idProducto, nombre: nombreProducto, precio: precioProducto, imagen: imagenProducto };
    const carritoActual = obtenerCarritoDesdeLocalStorage();
    carritoActual.push(nuevoProducto);
    guardarCarritoEnLocalStorage(carritoActual);
    agregarProductoAlCarritoLista(nuevoProducto);
    mostrarMensajeAgregado();
}


function agregarProductoAlCarritoLista(producto) {
    const productosEnCarrito = listaCarrito.querySelectorAll('.carrito-item');
    let productoExistente = null;

    productosEnCarrito.forEach((item) => {
        const idExistente = item.querySelector('.eliminar-producto').getAttribute('data-id');
        if (idExistente === producto.id) {
            productoExistente = item;
        }
    });

    if (productoExistente) {
        // Actualizar la cantidad 
        const cantidadElemento = productoExistente.querySelector('.cantidad-producto');
        const cantidadActual = parseInt(cantidadElemento.textContent, 10);
        cantidadElemento.innerHTML = `<strong>${cantidadActual + 1}</strong>`;

        const precioElemento = productoExistente.querySelector('.precio-total');
        const precioActual = parseFloat(precioElemento.textContent);
        precioElemento.textContent = (precioActual + producto.precio).toFixed(2);
    } else {
        // Agregar un nuevo elemento al carrito 
        const elementoCarrito = document.createElement('li');
        const precioTotal = (producto.precio * 1).toFixed(2); 
        elementoCarrito.innerHTML = `
            <div class="carrito-item">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-imagen">
                <div class="carrito-info">
                    <p>${producto.nombre} - $${producto.precio.toFixed(2)}</p>
                    <button class="eliminar-producto" data-id="${producto.id}" onclick="eliminarProducto(event)">Eliminar</button>
                    <span class="cantidad-producto">1</span>
                    <span class="precio-total">${precioTotal}</span>
                </div>
            </div>
        `;
        elementoCarrito.querySelector('.carrito-imagen').style.width = '70px'; 
        elementoCarrito.querySelector('.carrito-imagen').style.borderRadius = '50%';
        listaCarrito.appendChild(elementoCarrito);
    }

    calcularTotal();
}


document.addEventListener("DOMContentLoaded", async () => {
    await mostrarProductos();
    cargarCarritoDesdeLocalStorage();
});

document.getElementById('carrito-icon').addEventListener('click', function () {
    let carrito = document.getElementById('carrito');
    carrito.style.display = (carrito.style.display === 'none' || carrito.style.display === '') ? 'block' : 'none';
});

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

function vaciarCarrito() {
    listaCarrito.innerHTML = '';
    carritoCantidad = 0;
    actualizarIconoCarrito();
    calcularTotal();
}

function formatearNumero(numero) {
    return new Intl.NumberFormat('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 3 }).format(numero);
}

function calcularTotal() {
    let total = 0;
    const productosEnCarrito = document.querySelectorAll('#lista-carrito .carrito-item');

    productosEnCarrito.forEach((producto) => {
        const cantidad = parseInt(producto.querySelector('.cantidad-producto').textContent, 10);
        const precioTotal = parseFloat(producto.querySelector('.precio-total').textContent);
        total += precioTotal;
    });

    totalCarrito.textContent = formatearNumero(total);
}



function actualizarIconoCarrito() {
    carritoCantidadElement.textContent = carritoCantidad;
}

listaCarrito.addEventListener('click', eliminarProducto);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
searchInput.addEventListener('input', () => {
    const terminoBusqueda = searchInput.value;
    mostrarProductos('', terminoBusqueda);
});


