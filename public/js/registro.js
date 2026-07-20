const mensaje = document.getElementById("mensajeRegistro");

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "message visible " + tipo;
}

document.querySelectorAll(".password-toggle").forEach((boton) => {
  boton.addEventListener("click", () => {
    const campo = document.getElementById(boton.dataset.target);
    campo.type = campo.type === "password" ? "text" : "password";
  });
});

document.getElementById("registroForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim().toLowerCase();
  const contrasena = document.getElementById("contrasena").value;
  const confirmar = document.getElementById("confirmar").value;
  const terminos = document.getElementById("terminos").checked;
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!nombre || !correo || !contrasena || !confirmar) {
    mostrarMensaje("Completa todos los campos obligatorios.", "error");
    return;
  }

  if (!correoValido.test(correo)) {
    mostrarMensaje("Ingresa un correo electrónico válido.", "error");
    return;
  }

  if (contrasena.length < 8) {
    mostrarMensaje("La contraseña debe tener al menos 8 caracteres.", "error");
    return;
  }

  if (contrasena !== confirmar) {
    mostrarMensaje("Las contraseñas no coinciden.", "error");
    return;
  }

  if (!terminos) {
    mostrarMensaje("Debes aceptar los términos y condiciones.", "error");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem("fbshopUsuarios") || "[]");

  if (correo === "admin@fbshop.com" || usuarios.some((item) => item.correo === correo)) {
    mostrarMensaje("Ya existe una cuenta con ese correo.", "error");
    return;
  }

  usuarios.push({ nombre, correo, contrasena });
  localStorage.setItem("fbshopUsuarios", JSON.stringify(usuarios));

  mostrarMensaje("Cuenta creada correctamente. Ahora puedes iniciar sesión.", "success");
  event.target.reset();
  setTimeout(() => window.location.href = "/login", 1200);
});
