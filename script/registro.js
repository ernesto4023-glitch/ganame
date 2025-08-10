document.addEventListener("DOMContentLoaded", () => {
  const cantidadInput = document.getElementById("cantidad");
  const totalPagar = document.getElementById("totalPagar");
  const precio = 190;

  // Botones de suma
  document.querySelectorAll(".btn-suma").forEach(btn => {
    btn.addEventListener("click", () => {
      cantidadInput.value = Math.max(2, parseInt(cantidadInput.value) + parseInt(btn.dataset.suma));
      totalPagar.textContent = cantidadInput.value * precio;
    });
  });

  // Evitar que bajen de 2 tickets
  cantidadInput.addEventListener("input", () => {
    if (cantidadInput.value < 2) cantidadInput.value = 2;
    totalPagar.textContent = cantidadInput.value * precio;
  });

  // Click en imágenes de banco
  document.querySelectorAll(".img-banco").forEach(img => {
    img.addEventListener("click", () => {
      document.getElementById("info-banco").textContent = img.dataset.info;
      document.getElementById("info-banco").hidden = false;
    });
  });

  // FORMULARIO: abrir WhatsApp directamente
  document.getElementById("formRegistro").addEventListener("submit", (e) => {
    e.preventDefault();
    const datos = Object.fromEntries(new FormData(e.target).entries());

    const mensajeWsp = `Hola mi nombre es ${datos.nombre} he comprado ${datos.cantidad} tickets para confirmar mi compra y enviar el comprobante de pago`;
// Aquí pones TU número con el código de país, sin el "+"
const miNumero = "584246311409"; 

window.open(`https://wa.me/${miNumero}?text=${encodeURIComponent(mensajeWsp)}`, "_blank");

  });
});
