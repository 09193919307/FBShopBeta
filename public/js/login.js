const mensaje = document.getElementById("mensajeLogin");

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "message visible " + tipo;
}

document.querySelectorAll(".password-toggle").forEach((boton) => {
  boton.addEventListener("click", () => {
    const campo = document.getElementById(boton.dataset.target);

    campo.type =
      campo.type === "password"
        ? "text"
        : "password";
  });
});

document.getElementById("recuperar").addEventListener("click", (event) => {
  event.preventDefault();

  mostrarMensaje(
    "La recuperación de contraseña se conectará posteriormente al correo.",
    "success"
  );
});

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  const correo = document
    .getElementById("correo")
    .value
    .trim()
    .toLowerCase();

  const contrasena =
    document.getElementById("contrasena").value;

  if (!correo || !contrasena) {
    mostrarMensaje(
      "Completa el correo y la contraseña.",
      "error"
    );

    return;
  }

  if (
    correo === "admin@fbshop.com" &&
    contrasena === "Admin123"
  ) {
    localStorage.setItem(
      "fbshopSesion",
      JSON.stringify({
        nombre: "Administrador FBShop",
        correo,
        rol: "administrador"
      })
    );

    mostrarMensaje(
      "Inicio de sesión correcto. Serás dirigido al panel administrativo.",
      "success"
    );

    setTimeout(function () {
      window.location.href = "/dashboard";
    }, 900);

    return;
  }

  const usuarios = JSON.parse(
    localStorage.getItem("fbshopUsuarios") || "[]"
  );

  const usuario = usuarios.find(function (item) {
    return (
      item.correo === correo &&
      item.contrasena === contrasena
    );
  });

  if (!usuario) {
    mostrarMensaje(
      "El correo o la contraseña son incorrectos.",
      "error"
    );

    return;
  }

  localStorage.setItem(
    "fbshopSesion",
    JSON.stringify({
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: "cliente"
    })
  );

  mostrarMensaje(
    "Inicio de sesión correcto. Serás dirigido a la tienda.",
    "success"
  );

  setTimeout(function () {
    window.location.href = "/";
  }, 900);
});