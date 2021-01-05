// variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso); // al presionar "agregar al carrito"
    carrito.addEventListener('click', eliminarCurso) // elimina cursos del carrito
}

// funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');
        // elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); // iterar sobre el carrito y mostrar su HTML
        console.log(articulosCarrito);

    }
}

// leer contenido del html donde se dio click y extraer la info del curso
function leerDatosCurso(curso) {
    // crear objeto con contenido de curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id); // revisar si un elemento ya existe en el carrito
    if (existe) articulosCarrito.forEach(curso => {
        if (curso.id === infoCurso.id) curso.cantidad++; // se actualiza la cantidad
    })
    else articulosCarrito = [...articulosCarrito, infoCurso] // se agrega el nuevo curso


    // console.log(articulosCarrito);
    carritoHTML();
}

// mostrar carrito de compras en el HTML
function carritoHTML() {
    // limpiar HTML
    limpiarHTML();
    // recorrer el carrito y generar HTML
    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, cantidad, id } = curso
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> x </a>
            </td>


        `;
        // agregar el HTML del carrito
        contenedorCarrito.appendChild(row)
    })
}

// eliminar cursos de tbody
function limpiarHTML() {
    // forma lenta
    // contenedorCarrito.innerHTML = '';
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}