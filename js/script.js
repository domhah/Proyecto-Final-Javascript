
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarSillones() {

    sillones.forEach((sillon) => {
        const todosSillones = document.getElementById('productos_sillones_inicio');
        let sillones_inicio = document.createElement("div");
        sillones_inicio.classList.add("contenedor_sillones");
        sillones_inicio.innerHTML = `
        <img class="sillon_imagen" src="${sillon.imagen}" alt="${sillon.nombre}">
        <h2 class="sillon_nombre">${sillon.nombre}</h2>
        <p class="sillon_precio">Precio: $ ${sillon.precio}</p>
        <button class="agregar">Agregar al carrito</button>
        `;

        todosSillones.appendChild(sillones_inicio);

        const agregarCarrito = sillones_inicio.querySelector(".agregar");
        agregarCarrito.addEventListener("click", () => {
            let sillonEnCarrito = carrito.find(element => element.codigo === sillon.codigo);
            if (sillonEnCarrito) {
                sillonEnCarrito.cantidad++;
            }
            else {
                carrito.push({
                    codigo: sillon.codigo,
                    nombre: sillon.nombre,
                    precio: sillon.precio,
                    imagen: sillon.imagen,
                    cantidad: sillon.cantidad,
                });
            }

            localStorage.setItem("carrito", JSON.stringify(carrito));

            sillones_inicio.appendChild(agregarCarrito);

            actualizar();
        });

    });


};


function abrirElCarrito() {
    const abrirCarrito = document.getElementById('el_carrito');
    abrirCarrito.addEventListener("click", () => {
        actualizar();
    })
}


function actualizar() {
    const verCarrito = document.getElementById('carrito_sillones');
    verCarrito.innerHTML = "";
    verCarrito.innerHTML = ` 
    <h3>Carrito</h3>`;


    carrito.forEach((sillon) => {
        let productosCarrito = document.createElement("div");
        productosCarrito.classList.add("carrito");
        productosCarrito.innerHTML = `
        <img class="carrito_imagen" src="${sillon.imagen}" alt="${sillon.nombre}">
        <h2 class="carrito_nombre">${sillon.nombre}</h2>
        <p class="carrito_precio">Precio: $ ${sillon.precio}</p>
        <button id="botonresta" class="botonresta">-</button>
        <p id="cantidad" class="carrito_cantidad">Cantidad:${sillon.cantidad}</p>
        <button id="botonsuma" class="botonsuma">+</button>
        <button id=eliminar" class="eliminar">Eliminar</button>
        `;

        restarSillones(productosCarrito, sillon);
        sumarSillones(productosCarrito, sillon);
        eliminarSillones(productosCarrito, sillon);

        verCarrito.appendChild(productosCarrito);
    })

    const total = calcularCarrito();
    const totalapagar = document.createElement("div");

    if (total > 0) {
        totalapagar.innerHTML = `<p class="total">Total: $ ${total}</p>
        <button id="botonformulario" class="botonformulario">Finalizar Compra</button>`;
        verCarrito.appendChild(totalapagar);
        finalizarCompra(totalapagar);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

}

function restarSillones(productosCarrito, sillon) {
    const restarProductos = productosCarrito.querySelector(".botonresta");
    restarProductos.addEventListener("click", () => {
        if
            (sillon.cantidad > 1) {
            sillon.cantidad--;
            actualizar();
        }
        else {
            Swal.fire({
                title: "Error",
                text: "Ya alcanzó el mínimo del producto seleccionado. Por favor elimínelo del carrito para que no se visualice aquí.",
                icon: "error"
            });
        }

    })


}


function sumarSillones(productosCarrito, sillon) {
    const sumarProductos = productosCarrito.querySelector(".botonsuma");
    sumarProductos.addEventListener("click", () => {
        sillon.cantidad++;
        actualizar();
    }
    )
 

}



function eliminarSillones(productosCarrito, sillon) {
    const eliminarProductos = productosCarrito.querySelector(".eliminar");
    eliminarProductos.addEventListener("click", () => {
        carrito = carrito.filter((element) => {
            if (element.nombre !== sillon.nombre) {
                return element;

            }

        });
        actualizar();
    });

}


function calcularCarrito() {
    let total = 0;
    if (carrito.length === 0) {
        Swal.fire({
            title: "Error",
            text: "El carrito está vacío. Agregue productos para que se visualicen aquí.",
            icon: "info"
        });
    }
    else {
        for (let i = 0; i < carrito.length; i++)
            total += carrito[i].precio * carrito[i].cantidad;
        return total;

    }
}


function finalizarCompra(totalapagar) {
    const formulario = document.getElementById('formulario');
    const finalizarPedido = totalapagar.querySelector(".botonformulario");
    finalizarPedido.addEventListener("click", () => {
        formulario.style.display = 'flex';
    });

}

function completarDatos() {
    const formulario_completado = document.getElementById('formulario_completo');
    if (formulario_completado) {
        formulario_completado.addEventListener("submit", (event) => {
            event.preventDefault();

            const nombre = document.getElementById('name').value;
            const apellido = document.getElementById('surname').value;
            const telefono = document.getElementById('phone').value;
            const email = document.getElementById('email').value;

            if (nombre === '' || apellido === '' || telefono === '' || email === '') {
                Swal.fire({
                    title: "Error",
                    text: "Debe completar todos los campos para finalizar la compra",
                    icon: "error"
                });
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Tu compra finalizó con éxito",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    localStorage.clear();
                    location.reload();
                })
            }
        });
    }
}

function realizarCircuito () {
    traerSillones();
    mostrarSillones();
    abrirElCarrito();
    completarDatos();
}

realizarCircuito();