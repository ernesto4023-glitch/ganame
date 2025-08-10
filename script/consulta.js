document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("tablaConsulta");
  const buscar = document.getElementById("buscar");

  function renderTabla(data) {
    tbody.innerHTML = "";
    data.forEach((r, i) => {
      tbody.innerHTML += `
        <tr>
          <td>${i+1}</td>
          <td>${r.nombre} ${r.apellido}</td>
          <td>${r.whatsapp}</td>
          <td>${r.cantidad}</td>
          <td>${r.numeros}</td>
          <td>${r.estado}</td>
          <td>${r.cantidad * 190}</td>
        </tr>
      `;
    });
  }

  fetch("php/obtener_registros.php")
    .then(r => r.json())
    .then(data => {
      renderTabla(data);
      buscar.addEventListener("input", () => {
        const val = buscar.value.toLowerCase();
        renderTabla(data.filter(r => (r.nombre+" "+r.apellido).toLowerCase().includes(val) || r.whatsapp.includes(val)));
      });
    });
});
