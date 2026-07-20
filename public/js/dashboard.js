const sesion = JSON.parse(localStorage.getItem("fbshopSesion") || "null");

if (!sesion || sesion.rol !== "administrador") {
  window.location.replace("/login");
} else {
  document.getElementById("nombreAdmin").textContent = sesion.nombre;
  document.getElementById("correoAdmin").textContent = sesion.correo;
  document.getElementById("avatarAdmin").textContent = sesion.nombre.charAt(0).toUpperCase();
}

const usuarios = JSON.parse(localStorage.getItem("fbshopUsuarios") || "[]");
document.getElementById("totalUsuarios").textContent = usuarios.length + 1;

const listaUsuarios = document.getElementById("listaUsuarios");
listaUsuarios.innerHTML = usuarios.length
  ? "<div><strong>Usuarios registrados: " + usuarios.length + "</strong><br>" +
    usuarios.map((u) => u.nombre + " — " + u.correo).join("<br>") + "</div>"
  : "<div><strong>👥 No hay clientes registrados</strong><br>Los nuevos registros aparecerán aquí.</div>";

const titulos = {
  inicio: "Panel administrativo",
  productos: "Productos",
  categorias: "Categorías",
  pedidos: "Pedidos",
  usuarios: "Usuarios",
  reportes: "Reportes",
  configuracion: "Configuración"
};

function abrirVista(nombre) {
  document.querySelectorAll(".module-view").forEach((vista) => vista.classList.remove("active"));
  document.querySelectorAll(".sidebar-menu button").forEach((boton) => boton.classList.remove("active"));

  document.getElementById("view-" + nombre)?.classList.add("active");
  document.querySelector('[data-view="' + nombre + '"]')?.classList.add("active");
  document.getElementById("tituloVista").textContent = titulos[nombre] || "Panel administrativo";
  document.getElementById("sidebar").classList.remove("visible");
}

document.querySelectorAll("[data-view]").forEach((boton) => {
  boton.addEventListener("click", () => abrirVista(boton.dataset.view));
});

document.querySelectorAll("[data-open]").forEach((boton) => {
  boton.addEventListener("click", () => abrirVista(boton.dataset.open));
});

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("visible");
});

document.getElementById("cerrarSesion").addEventListener("click", () => {
  localStorage.removeItem("fbshopSesion");
  window.location.href = "/login";
});
