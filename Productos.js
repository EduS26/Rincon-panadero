// Funcion para agregar al carrito y redirige a Pedido.html
function agregarAlPedido(nombre, precio) {
  // Obtener pedidos guardados o inicializar array vacío
  let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

  // Verificar si el producto ya fue añadido
  const existente = pedidos.find(p => p.nombre === nombre);
  if (existente) {
      existente.cantidad += 1;
  } else {
      pedidos.push({ nombre, precio, cantidad: 1 });
  }

  // Guardar en localStorage
  localStorage.setItem('pedidos', JSON.stringify(pedidos));

  // Redirigir
  window.location.href = "Pedido.html";
}

// Filtro por categoría
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabs button');
    const productos = document.querySelectorAll('.producto');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Desactivar el botón activo previamente
            document.querySelector('.tabs button.active').classList.remove('active');
            // Activar el botón actual
            this.classList.add('active');

            const categoria = this.getAttribute('data-categoria');

            productos.forEach(producto => {
                if (categoria === 'todos' || producto.classList.contains(categoria)) {
                    producto.style.display = 'block'; // O el estilo que uses para mostrar
                } else {
                    producto.style.display = 'none';  // O el estilo que uses para ocultar
                }
            });
        });
    });

    // Asegurar que la pestaña "Todos" esté activa al cargar la página
    const todosTab = document.querySelector('.tabs button[data-categoria="todos"]');
    if (todosTab) {
        todosTab.classList.add('active');
    }
});

// Al cargar la página, se activa el filtro por categoría de productos
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabs button'); // Botones de categorías
    const productos = document.querySelectorAll('.producto'); // Todos los productos

    // Recorre cada botón de categoría
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Quita la clase 'active' al botón que estaba activo
            document.querySelector('.tabs button.active').classList.remove('active');
            // Agrega la clase 'active' al botón actual
            this.classList.add('active');

            const categoria = this.getAttribute('data-categoria'); // Obtiene la categoría

            // Muestra u oculta productos según la categoría
            productos.forEach(producto => {
                if (categoria === 'todos' || producto.classList.contains(categoria)) {
                    producto.style.display = 'block'; // Muestra el producto
                } else {
                    producto.style.display = 'none';  // Oculta el producto
                }
            });
        });
    });

    // Al cargar la página, marca el botón "Todos" como activo
    const todosTab = document.querySelector('.tabs button[data-categoria="todos"]');
    if (todosTab) {
        todosTab.classList.add('active');
    }
});

// 👉 Al cargar la página, asigna evento a los botones "Agregar"
document.addEventListener("DOMContentLoaded", () => {
  const botonesAgregar = document.querySelectorAll(".boton-agregar"); // Todos los botones para poder "agregar"

  // Recorre cada botón para asignarle su evento
  botonesAgregar.forEach(boton => {
      boton.addEventListener("click", (e) => {
          // Encuentra el contenedor del producto
          const producto = e.target.closest(".producto");

          // Obtiene el nombre y el precio del producto
          const nombre = producto.querySelector("h3").textContent;
          const precioTexto = producto.querySelector(".precio").textContent.replace("S/", "").trim();
          const precio = parseFloat(precioTexto);

          let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];  // Obtiene el carrito actual desde localStorage

          
          // Verifica si ya existe el producto en el carrito
          const indexExistente = pedidos.findIndex(p => p.nombre === nombre);
          if (indexExistente !== -1) {
              // Si existe, aumenta su cantidad
              pedidos[indexExistente].cantidad += 1;
          } else {
              // Si no existe, lo agrega al carrito
              pedidos.push({ nombre, precio, cantidad: 1 });
          }

          // Guarda el carrito actualizado
          localStorage.setItem("pedidos", JSON.stringify(pedidos));

          
          // Redirige al usuario a la página del carrito
          window.location.href = "Pedido.html";
      });
  });

  function agregarAlPedido(nombre, precio) {
    // Obtenemos los pedidos previos o creamos un array nuevo
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

    // Añadimos el nuevo producto
    pedidos.push({
        nombre: nombre,
        precio: precio,
        cantidad: 1 // puedes permitir modificar cantidad luego si quieres
    });

    // Guardamos en localStorage
    localStorage.setItem('pedidos', JSON.stringify(pedidos));

    // Redirigimos a la página de pedidos
    window.location.href = "Pedido.html";
}
});
