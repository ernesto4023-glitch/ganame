document.addEventListener("DOMContentLoaded", () => {
  const clientes = [
    { nombre: "Juan Pérez", whatsapp: "584121234567", cantidad: 3, numeros: ["2", "5", "10"] },
    { nombre: "María López", whatsapp: "584121112233", cantidad: 2, numeros: ["25", "50"] },
    { nombre: "Carlos Ruiz", whatsapp: "584123334455", cantidad: 1, numeros: ["75"] },
    { nombre: "Ana Torres", whatsapp: "584124445566", cantidad: 1, numeros: ["99"] }
  ];

  const ocupados = new Set(clientes.flatMap(c => c.numeros));
  const cont = document.getElementById("talonario");

  for (let i = 1; i <= 100; i++) {
    const div = document.createElement("div");
    div.className = "ticket" + (ocupados.has(i.toString()) ? " ocupado" : " disponible");
    div.textContent = i;

    if (ocupados.has(i.toString())) {
      div.addEventListener("click", () => {
        const cliente = clientes.find(c => c.numeros.includes(i.toString()));
        document.getElementById("cliente-nombre").textContent = cliente.nombre;
        document.getElementById("cliente-wsp").textContent = cliente.whatsapp;
        document.getElementById("cliente-cantidad").textContent = cliente.cantidad;
        document.getElementById("cliente-numeros").textContent = cliente.numeros.join(", ");
        document.getElementById("overlay").classList.remove("hidden");
      });
    }

    cont.appendChild(div);
  }

  // Cerrar modal con botón
  document.getElementById("cerrar-info").addEventListener("click", () => {
    document.getElementById("overlay").classList.add("hidden");
  });

  // Cerrar modal haciendo clic fuera del contenido
  document.getElementById("overlay").addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      document.getElementById("overlay").classList.add("hidden");
    }
  });

  // Barra de progreso
  renderBarraProgreso("barra-progreso", ocupados.size, 100);
});

function renderBarraProgreso(id, vendidos, total) {
  const barra = document.getElementById(id);
  const porcentaje = ((total - vendidos) / total) * 100;
  barra.innerHTML = `
    <div style="background: lightgray; border-radius: 4px; overflow: hidden;">
      <div style="background: orange; width: ${porcentaje}%; padding: 5px; color: white; text-align:center;">
        ${porcentaje.toFixed(0)}% disponible
      </div>
    </div>
  `;
}
