function renderBarraProgreso(containerId, vendidos, total) {
  const cont = document.getElementById(containerId);
  if (!cont) return;

  cont.innerHTML = `
    <div class="barra-container">
      <div class="barra" id="barra" style="width:${(vendidos/total)*100}%">
        ${Math.round((vendidos/total)*100)}%
      </div>
    </div>
  `;
}
