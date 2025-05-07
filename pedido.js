document.addEventListener("DOMContentLoaded", () => 
    {  
    const contenedor = document.getElementById("lista-pedidos");  // Se muestran los pedidos
    const totalElemPedido = document.getElementById("total-pedido");  // Se muestra el total del pedido
    const subtotalBoleta = document.getElementById("subtotal-boleta");  // Se muestra el subtotal
    const envioBoleta = document.getElementById("envio-boleta");  // Se muestra el costo de envío en la boleta
    const totalBoletaFinal = document.getElementById("total-boleta-final");  // Se muestra el total final en la boleta
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];  // Carga los pedidos guardados en el localStorage, si no hay pedidos

    //Se muestra en el formulario los datos del cliente
    const mostrarFormularioBtn = document.getElementById("mostrar-formulario-btn");  
    const formularioDatosCliente = document.getElementById("formulario-datos-cliente");  
    const confirmarPedidoFinalBtn = document.getElementById("confirmar-pedido-final-btn");  
    const boletaFinalContainer = document.getElementById("boleta-final-container");  
    const boletaProductos = document.getElementById("boleta-productos");  
    const boletaSubtotal = document.getElementById("boleta-subtotal");  
    const boletaEnvio = document.getElementById("boleta-envio");  
    const boletaTotalFinal = document.getElementById("boleta-total-final"); 

    //Se obtiene los datos del cliente
    const boletaNombreCliente = document.getElementById("boleta-nombre-cliente");  
    const boletaDireccionCliente = document.getElementById("boleta-direccion-cliente");  
    const boletaTelefonoCliente = document.getElementById("boleta-telefono-cliente");  
    const boletaEmailCliente = document.getElementById("boleta-email-cliente");  

    // Función para renderizar los pedidos en el contenedor
    function renderPedidos() {
        contenedor.innerHTML = '';  // Limpia el contenido del contenedor de pedidos
        let subtotal = 0;  // Inicializa el subtotal

        if (pedidos.length === 0) {  // Si no hay productos en el pedido
            contenedor.innerHTML = "<p>No hay productos en tu pedido.</p>";  // Muestra un mensaje indicando que no hay productos
            totalElemPedido.textContent = '';  // Limpia el texto del total
            subtotalBoleta.textContent = 'S/ 0.00';  // Muestra el subtotal como 0.00
            envioBoleta.textContent = 'S/ 0.00';  // Muestra el costo de envío como 0.00
            totalBoletaFinal.textContent = 'S/ 0.00';  // Muestra el total final como 0.00
            return;
        }

        pedidos.forEach((item, index) => {  
               
            const div = document.createElement('div');          
            div.classList.add('pedido-item');          
            div.innerHTML = `
                <span>${item.nombre} - S/ ${item.precio.toFixed(2)}</span>
                <div class="cantidad-selector">
                    <button class="cantidad-btn menos-cantidad" data-index="${index}">&#9660;</button>
                    <span class="cantidad-numero">${item.cantidad}</span>
                    <button class="cantidad-btn mas-cantidad" data-index="${index}">&#9650;</button>
                </div>
                <button class="eliminar-btn" data-index="${index}">Eliminar</button>
            `;
        
            contenedor.appendChild(div);          
            subtotal += item.precio * item.cantidad;  
            // Calcula el subtotal sumando el precio de cada producto por su cantidad
        });

        const envio = 5.00;  // Define el costo de envío
        const totalFinal = subtotal + envio;  // Calcula el total final sumando el subtotal y el costo de envío

        totalElemPedido.textContent = `Subtotal: S/ ${subtotal.toFixed(2)}`;  // Muestra el subtotal
        subtotalBoleta.textContent = `S/ ${subtotal.toFixed(2)}`;  // Muestra el subtotal en la boleta
        envioBoleta.textContent = `S/ ${envio.toFixed(2)}`;  // Muestra el costo de envío en la boleta
        totalBoletaFinal.textContent = `S/ ${totalFinal.toFixed(2)}`;  // Muestra el total final en la boleta
    }

    // Evento para manejar las interacciones en el contenedor de pedidos
    contenedor.addEventListener('click', (e) => 
        {
        if (e.target.classList.contains('eliminar-btn')) // Si se hace clic en el botón de eliminar
            {  
            const index = e.target.getAttribute('data-index');  // Obtiene el índice del producto
            pedidos.splice(index, 1);  // Elimina el producto de los pedidos
            localStorage.setItem('pedidos', JSON.stringify(pedidos));  // Guarda los pedidos actualizados en el localStorage
            renderPedidos();  // Vuelve a renderizar los pedidos
        } else if (e.target.classList.contains('mas-cantidad')) {  // Si se hace clic en el botón de aumentar cantidad
            const index = parseInt(e.target.getAttribute('data-index'));  // Obtiene el índice del producto
            pedidos[index].cantidad++;  // Aumenta la cantidad del producto
            localStorage.setItem('pedidos', JSON.stringify(pedidos));  // Guarda los pedidos actualizados en el localStorage
            renderPedidos();  // Vuelve a renderizar los pedidos
        } else if (e.target.classList.contains('menos-cantidad')) {  // Si se hace clic en el botón de disminuir cantidad
            const index = parseInt(e.target.getAttribute('data-index'));  // Obtiene el índice del producto
            if (pedidos[index].cantidad > 1) {  // Si la cantidad es mayor a 1
                pedidos[index].cantidad--;  // Disminuye la cantidad del producto
                localStorage.setItem('pedidos', JSON.stringify(pedidos));  // Guarda los pedidos actualizados en el localStorage
                renderPedidos();  // Vuelve a renderizar los pedidos
            }
        }
    });

    mostrarFormularioBtn.addEventListener('click', () => {  // Evento para mostrar el formulario de datos de cliente
        formularioDatosCliente.style.display = 'block';  // Muestra el formulario
    });

    confirmarPedidoFinalBtn.addEventListener('click', () => {  // Evento para confirmar el pedido final
        const nombre = document.getElementById('nombre').value;  // Obtiene el nombre del cliente
        const direccion = document.getElementById('direccion').value;  // Obtiene la dirección de envío
        const telefono = document.getElementById('telefono').value;  // Obtiene el teléfono del cliente
        const email = document.getElementById('email').value;  // Obtiene el correo electrónico del cliente

        if (nombre && direccion && telefono && email) {  // Si todos los campos están completos
            boletaNombreCliente.textContent = nombre;  // Muestra el nombre del cliente en la boleta
            boletaDireccionCliente.textContent = direccion;  // Muestra la dirección del cliente en la boleta
            boletaTelefonoCliente.textContent = telefono;  // Muestra el teléfono del cliente en la boleta
            boletaEmailCliente.textContent = email;  // Muestra el correo electrónico del cliente en la boleta

            boletaProductos.innerHTML = '';  // Limpia el contenido de los productos en la boleta
            let subtotalBoletaFinal = 0;  // Inicializa el subtotal de la boleta
            pedidos.forEach(item => {  // Itera sobre cada producto en los pedidos
                const p = document.createElement('p');  // Crea un nuevo párrafo para cada producto
                p.textContent = `${item.nombre} x ${item.cantidad} - S/ ${(item.precio * item.cantidad).toFixed(2)}`;  // Muestra el nombre y precio del producto
                boletaProductos.appendChild(p);  // Añade el párrafo a la boleta
                subtotalBoletaFinal += item.precio * item.cantidad;  // Calcula el subtotal de la boleta
            });

            const envioFinal = 5.00;  // Define el costo de envío final
            const totalFinalBoleta = subtotalBoletaFinal + envioFinal;  // Calcula el total final de la boleta

            boletaSubtotal.textContent = `S/ ${subtotalBoletaFinal.toFixed(2)}`;  // Muestra el subtotal en la boleta
            boletaEnvio.textContent = `S/ ${envioFinal.toFixed(2)}`;  // Muestra el costo de envío en la boleta
            boletaTotalFinal.textContent = `S/ ${totalFinalBoleta.toFixed(2)}`;  // Muestra el total final en la boleta

            formularioDatosCliente.style.display = 'none';  // Oculta el formulario de datos de cliente
            boletaFinalContainer.style.display = 'block';  // Muestra la boleta final
        } else {
            alert('Por favor, completa todos tus datos de envío.');  // Muestra un alerta si faltan datos
        }
    });

    renderPedidos();  // Renderiza los pedidos al cargar la página
});
