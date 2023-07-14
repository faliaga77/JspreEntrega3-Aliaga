// PRODUCTOS
const productos = [
    // PELICULAS
    {
        id: "avatar-01",
        titulo: "Avatar",
        imagen: "./img/avatar.jpg",
        categoria: {
            nombre: "Peliculas",
            id: "peliculas"
        },
        precio: 1700
    },
    {
        id: "batman-02",
        titulo: "Batman",
        imagen: "./img/batmanDnR.jpg",
        categoria: {
            nombre: "Peliculas",
            id: "peliculas"
        },
        precio: 1700
    },
    {
        id: "interestelar-03",
        titulo: "Interestelar",
        imagen: "./img/interestelar.webp",
        categoria: {
            nombre: "Peliculas",
            id: "peliculas"
        },
        precio: 1700
    },

    // PELICULAS RETRO
    {
        id: "bladerunner-01",
        titulo: "Bladerunner",
        imagen: "./img/blade-runner.jpg",
        categoria: {
            nombre: "Peliculas Retro",
            id: "peliculas-retro"
        },
        precio: 1700
    },
    {
        id: "alien-02",
        titulo: "Alien",
        imagen: "./img/Pelicula-ALIEN.jpg",
        categoria: {
            nombre: "Peliculas Retro",
            id: "peliculas-retro"
        },
        precio: 1700
    },

    {
        id: "star-wars-03",
        titulo: "Star Wars",
        imagen: "./img/star-wars.webp",
        categoria: {
            nombre: "Peliculas Retro",
            id: "peliculas-retro"
        },
        precio: 1700
    },
    {
        id: "losMinions-01",
        titulo: "Los Minions",
        imagen: "./img/los-minions.jpg",
        categoria: {
            nombre: "Peliculas Infantiles",
            id: "peliculas-infantiles"
        },
        precio: 1700
    },

    //Snacks
    {
        id: "pochoclosBolsa-01",
        titulo: "Pochoclos Bolsa",
        imagen: "./img/pochoclos-bolsa.jpg",
        categoria: {
            nombre: "Snacks",
            id: "snaks"
        },
        precio: 950
    },
    {
        id: "pochoclos-grandes-02",
        titulo: "Pochoclos Grandes",
        imagen: "./img/pochoclos-grandes.jpg",
        categoria: {
            nombre: "Snacks",
            id: "snacks"
        },
        precio: 1100
    },
    {
        id: "doritos-03",
        titulo: "Doritos",
        imagen: "./img/doritos.webp",
        categoria: {
            nombre: "Snacks",
            id: "snacks"
        },
        precio: 850
    },
    {
        id: "hamletChocolate-04",
        titulo: "Hamlet chocolate",
        imagen: "./img/hamlet-chocolate.webp",
        categoria: {
            nombre: "Snacks",
            id: "snacks"
        },
        precio: 450
    },
    {
        id: "chupetines-05",
        titulo: "Chupetines",
        imagen: "./img/chupetines-algodon.jpg",
        categoria: {
            nombre: "Snacks",
            id: "snacks"
        },
        precio: 350
    },
    {
        id: "pastillitas-06",
        titulo: "Pastillitas",
        imagen: "./img/pastillitas.webp",
        categoria: {
            nombre: "Snack",
            id: "snacks"
        },
        precio: 500
    },

    {
        id: "bandeja-nachos-07",
        titulo: "Bandeja Nachos",
        imagen: "./img/bandeja-nachos.jpg",
        categoria: {
            nombre: "Snack",
            id: "snacks"
        },
        precio: 1900
    },
    {
        id: "combo-nachos-08",
        titulo: "Combo nachois",
        imagen: "./img/combo-nachos.jpg",
        categoria: {
            nombre: "Snacks",
            id: "snacks"
        },
        precio: 2200
    },
    {
        id: "pochoclos-combo-grande-09",
        titulo: "Pochoclos grandes",
        imagen: "./img/combo-pochoclo-gaseosa-grande.webp",
        categoria: {
            nombre: "Snacks",
            id: "snacks"
        },
        precio: 2200
    },
    {
        id: "pochoclos-combo-chico-10",
        titulo: "Pochoclos",
        imagen: "./img/combo-pochoclo-gaseosa.avif",
        categoria: {
            nombre: "Snacks",
            id: "snacks"
        },
        precio: 1800
    }

];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
             <h3 class="producto-titulo">${producto.titulo}</h3>
            <p class="producto-precio">$${producto.precio}</p>
            <button class="producto-agregar" id="${producto.id}">comprar</button>
            </div> 
            `;

        contenedorProductos.append(div);

    })

    actualizarBotonesAgregar()
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });

}


let productosEnCarrito;

const productosEnCarritoLS = JSON.parse(localStorage.getItem("productos-en-carrito"));

if (productosEnCarritoLS) {
    productosEnCarrito = productosEnCarritoLS;
    actualizarNumerito();

} else {
    productosEnCarrito = [];
}



function agregarAlCarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if (productosEnCarrito.some(producto => producto.id === idBoton)) {

      const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
      productosEnCarrito[index].cantidad++;


    } else {

        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);


    }

   actualizarNumerito();

   localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;  
    
}