document.addEventListener("DOMContentLoaded", () => {
  const loginDiv = document.getElementById("loginAdmin");
  const panel = document.getElementById("panelAdmin");
  const user = "admin", pass = "1234";

  document.getElementById("btnLogin").addEventListener("click", () => {
    if (document.getElementById("usuario").value === user && document.getElementById("clave").value === pass) {
      loginDiv.style.display = "none";
      panel.style.display = "block";
      cargarDatos();
    } else {
      alert("Credenciales incorrectas");
    }
  });

  function cargarDatos() {
    fetch("php/obtener_registros.php")
      .then(r => r.json())
      .then(data => {
        const tbody = document.getElementById("tablaAdmin");
        tbody.innerHTML = "";
        let vendidos = 0, pagados = 0, verificados = 0;
        data.forEach((r, i) => {
          vendidos += parseInt(r.cantidad);
          if (r.estado === "Pagado") pagados++;
          if (r.estado === "Verificado") verificados++;
          tbody.innerHTML += `
            <tr>
              <td>${i+1}</td>
              <td>${r.nombre} ${r.apellido}</td>
              <td>${r.whatsapp}</td>
              <td>${r.cantidad}</td>
              <td>${r.numeros}</td>
              <td>${r.estado}</td>
              <td>
                <button onclick="cambiarEstado(${i}, 'Pagado')">Pagado</button>
                <button onclick="cambiarEstado(${i}, 'Verificado')">Verificado</button>
                <button onclick="eliminarRegistro(${i})">Eliminar</button>
              </td>
            </tr>
          `;
        });
        document.getElementById("totalClientes").textContent = data.length;
        document.getElementById("totalTickets").textContent = vendidos;
        document.getElementById("totalPagados").textContent = pagados;
        document.getElementById("totalVerificados").textContent = verificados;
        document.getElementById("totalDisponibles").textContent = 100 - vendidos;
        renderBarraProgreso("barra-progreso", vendidos, 100);
      });
  }

  window.cambiarEstado = (index, estado) => {
    fetch("php/cambiar_estado.php", {
      method: "POST",
      body: JSON.stringify({ index, estado })
    }).then(() => cargarDatos());
  };

  window.eliminarRegistro = (index) => {
    fetch("php/eliminar_registro.php", {
      method: "POST",
      body: JSON.stringify({ index })
    }).then(() => cargarDatos());
  };
});
