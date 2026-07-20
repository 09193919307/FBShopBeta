const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const productos = [
  {
    id: 1,
    nombre: "Playera FBShop",
    precio: 299,
    categoria: "Ropa",
    descripcion: "Playera de algodón con diseño cómodo, fresco y moderno.",
    imagen:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    disponible: true,
    destacado: true
  },
  {
    id: 2,
    nombre: "Tenis deportivos",
    precio: 899,
    categoria: "Calzado",
    descripcion: "Tenis ligeros, cómodos y perfectos para el uso diario.",
    imagen:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    disponible: true,
    destacado: true
  },
  {
    id: 3,
    nombre: "Mochila urbana",
    precio: 549,
    categoria: "Accesorios",
    descripcion: "Mochila resistente con amplio espacio y estilo urbano.",
    imagen:
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=900&q=85",
    disponible: true,
    destacado: false
  },
  {
    id: 4,
    nombre: "Gorra clásica",
    precio: 249,
    categoria: "Accesorios",
    descripcion: "Gorra ajustable con un diseño casual para cualquier ocasión.",
    imagen:
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85",
    disponible: true,
    destacado: false
  },
  {
    id: 5,
    nombre: "Sudadera premium",
    precio: 699,
    categoria: "Ropa",
    descripcion: "Sudadera suave, abrigadora y con acabados de alta calidad.",
    imagen:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85",
    disponible: true,
    destacado: true
  },
  {
    id: 6,
    nombre: "Reloj urbano",
    precio: 1099,
    categoria: "Accesorios",
    descripcion: "Reloj elegante con un diseño minimalista y contemporáneo.",
    imagen:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=85",
    disponible: true,
    destacado: false
  }
];

app.get("/", (req, res) => {
  const productosJSON = JSON.stringify(productos).replace(/</g, "\\u003c");

  const tarjetas = productos
    .map(
      (producto) => `
        <article
          class="producto"
          data-id="${producto.id}"
          data-nombre="${producto.nombre.toLowerCase()}"
          data-categoria="${producto.categoria.toLowerCase()}"
        >
          <div class="producto-imagen">
            <img
              src="${producto.imagen}"
              alt="${producto.nombre}"
              loading="lazy"
            >

            <span class="etiqueta-categoria">
              ${producto.categoria}
            </span>

            ${
              producto.destacado
                ? '<span class="etiqueta-destacado">Destacado</span>'
                : ""
            }
          </div>

          <div class="producto-contenido">
            <div class="producto-encabezado">
              <h3>${producto.nombre}</h3>

              <span class="disponibilidad">
                ${producto.disponible ? "Disponible" : "Agotado"}
              </span>
            </div>

            <p class="descripcion">
              ${producto.descripcion}
            </p>

            <div class="producto-pie">
              <div>
                <small>Precio</small>
                <strong>$${producto.precio.toLocaleString("es-MX")} MXN</strong>
              </div>

              <button
                type="button"
                class="boton-agregar"
                onclick="agregarAlCarrito(${producto.id})"
                ${producto.disponible ? "" : "disabled"}
              >
                <span>Agregar</span>
                <span aria-hidden="true">＋</span>
              </button>
            </div>
          </div>
        </article>
      `
    )
    .join("");

  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      >

      <meta
        name="description"
        content="FBShop, tienda en línea de ropa, calzado y accesorios."
      >

      <title>FBShop | Tu tienda en línea</title>

      <link
        rel="icon"
        type="image/png"
        href="/logo-fbshop.png"
      >

      <style>
        :root {
          --azul-oscuro: #071630;
          --azul: #11449b;
          --azul-claro: #2e6ee7;
          --amarillo: #ffb000;
          --amarillo-claro: #ffc94f;
          --blanco: #ffffff;
          --fondo: #f4f7fc;
          --texto: #15213a;
          --texto-secundario: #68748b;
          --verde: #169d55;
          --borde: #dfe6f2;
          --sombra: 0 18px 48px rgba(17, 48, 105, 0.12);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          scroll-behavior: smooth;
        }

        body {
          min-height: 100vh;
          overflow-x: hidden;
          background: var(--fondo);
          color: var(--texto);
          font-family: Arial, Helvetica, sans-serif;
        }

        body.carrito-abierto {
          overflow: hidden;
        }

        button,
        input,
        textarea {
          font: inherit;
        }

        button,
        a {
          -webkit-tap-highlight-color: transparent;
        }

        nav {
          position: sticky;
          top: 0;
          z-index: 1000;
          display: flex;
          min-height: 84px;
          align-items: center;
          justify-content: space-between;
          gap: 25px;
          padding: 10px 7%;
          background: rgba(7, 22, 48, 0.96);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 9px 28px rgba(0, 0, 0, 0.18);
          backdrop-filter: blur(14px);
        }

        .logo-container {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          text-decoration: none;
          overflow: hidden;
        }

        .logo-img {
          display: block;
          width: 230px;
          height: 68px;
          object-fit: cover;
          object-position: left center;
        }

        .navegacion {
          display: flex;
          align-items: center;
          gap: 28px;
          list-style: none;
        }

        .navegacion a {
          position: relative;
          padding: 10px 0;
          color: #e8efff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          transition: color 0.25s ease;
        }

        .navegacion a::after {
          position: absolute;
          right: 0;
          bottom: 3px;
          left: 0;
          height: 3px;
          border-radius: 99px;
          background: var(--amarillo);
          content: "";
          transform: scaleX(0);
          transition: transform 0.25s ease;
        }

        .navegacion a:hover {
          color: var(--amarillo-claro);
        }

        .navegacion a:hover::after {
          transform: scaleX(1);
        }

        .acciones-nav {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .boton-login-nav {
          display: inline-flex;
          min-height: 44px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 16px;
          border: 1px solid rgba(255, 255, 255, 0.32);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          color: white;
          text-decoration: none;
          font-size: 13px;
          font-weight: 900;
          transition: 0.25s ease;
        }

        .boton-login-nav:hover {
          border-color: var(--amarillo);
          background: rgba(255, 176, 0, 0.12);
          color: var(--amarillo-claro);
          transform: translateY(-2px);
        }

        .boton-carrito {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 12px 17px;
          border: none;
          border-radius: 12px;
          background: var(--amarillo);
          color: var(--azul-oscuro);
          box-shadow: 0 8px 20px rgba(255, 176, 0, 0.25);
          font-size: 14px;
          font-weight: 900;
          cursor: pointer;
          transition:
            transform 0.25s ease,
            background 0.25s ease;
        }

        .boton-carrito:hover {
          background: var(--amarillo-claro);
          transform: translateY(-2px);
        }

        .contador-carrito {
          display: grid;
          min-width: 23px;
          height: 23px;
          place-items: center;
          padding: 0 6px;
          border-radius: 999px;
          background: var(--azul-oscuro);
          color: white;
          font-size: 12px;
        }

        .hero {
          position: relative;
          display: grid;
          min-height: 650px;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          gap: 60px;
          overflow: hidden;
          padding: 80px 7%;
          color: white;
          background:
            radial-gradient(
              circle at 87% 20%,
              rgba(78, 139, 255, 0.9),
              transparent 32%
            ),
            radial-gradient(
              circle at 54% 90%,
              rgba(41, 99, 213, 0.55),
              transparent 37%
            ),
            linear-gradient(
              135deg,
              #06142e 0%,
              #0c347c 52%,
              #2f6ee5 100%
            );
        }

        .hero::before,
        .hero::after {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          content: "";
        }

        .hero::before {
          top: -180px;
          right: -120px;
          width: 480px;
          height: 480px;
        }

        .hero::after {
          right: 26%;
          bottom: -290px;
          width: 520px;
          height: 520px;
        }

        .hero-texto,
        .hero-visual {
          position: relative;
          z-index: 2;
        }

        .hero-etiqueta {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-bottom: 23px;
          padding: 9px 15px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.1);
          color: #ffd36f;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.4px;
        }

        .hero-etiqueta::before {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--amarillo);
          box-shadow: 0 0 14px var(--amarillo);
          content: "";
        }

        .hero h1 {
          max-width: 760px;
          margin-bottom: 25px;
          font-size: clamp(48px, 6.3vw, 88px);
          font-weight: 900;
          letter-spacing: -3px;
          line-height: 0.98;
        }

        .hero h1 span {
          color: var(--amarillo);
        }

        .hero-descripcion {
          max-width: 650px;
          margin-bottom: 31px;
          color: #dbe7ff;
          font-size: 18px;
          line-height: 1.8;
        }

        .hero-botones {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-bottom: 36px;
        }

        .boton-principal,
        .boton-secundario {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 51px;
          padding: 0 23px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 900;
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .boton-principal {
          background: var(--amarillo);
          color: var(--azul-oscuro);
          box-shadow: 0 13px 28px rgba(255, 176, 0, 0.22);
        }

        .boton-secundario {
          border: 1px solid rgba(255, 255, 255, 0.5);
          background: rgba(255, 255, 255, 0.06);
          color: white;
        }

        .boton-principal:hover,
        .boton-secundario:hover {
          transform: translateY(-4px);
        }

        .hero-confianza {
          display: flex;
          flex-wrap: wrap;
          gap: 21px;
          color: #dbe7ff;
          font-size: 13px;
          font-weight: 700;
        }

        .hero-confianza span {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .hero-confianza strong {
          color: var(--amarillo-claro);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
        }

        .tarjeta-principal {
          position: relative;
          width: min(430px, 100%);
          padding: 32px;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 32px;
          background: rgba(255, 255, 255, 0.13);
          box-shadow: 0 38px 80px rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(18px);
        }

        .tarjeta-principal::before {
          position: absolute;
          top: -18px;
          right: -18px;
          width: 88px;
          height: 88px;
          border-radius: 24px;
          background: var(--amarillo);
          opacity: 0.92;
          content: "";
          transform: rotate(12deg);
        }

        .hero-logo {
          position: relative;
          z-index: 2;
          display: block;
          width: 100%;
          height: 185px;
          margin: 0 auto 24px;
          padding: 0;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.95);
          object-fit: cover;
          object-position: center;
        }

        .tarjeta-principal h2 {
          margin-bottom: 10px;
          font-size: 29px;
        }

        .tarjeta-principal p {
          margin-bottom: 25px;
          color: #dbe7ff;
          line-height: 1.65;
        }

        .resumen-tarjeta {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 11px;
        }

        .dato {
          padding: 15px 9px;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.11);
          text-align: center;
        }

        .dato strong {
          display: block;
          margin-bottom: 5px;
          color: var(--amarillo-claro);
          font-size: 20px;
        }

        .dato span {
          color: #dbe7ff;
          font-size: 11px;
        }

        section {
          padding: 88px 7%;
        }

        .encabezado-seccion {
          max-width: 760px;
          margin: 0 auto 48px;
          text-align: center;
        }

        .subtitulo {
          display: inline-block;
          margin-bottom: 9px;
          color: var(--azul-claro);
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 1.8px;
          text-transform: uppercase;
        }

        .encabezado-seccion h2 {
          margin-bottom: 13px;
          font-size: clamp(34px, 4.5vw, 49px);
          letter-spacing: -1.5px;
        }

        .encabezado-seccion p {
          color: var(--texto-secundario);
          line-height: 1.75;
        }

        .beneficios {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-top: -40px;
          padding-top: 0;
        }

        .beneficio {
          position: relative;
          z-index: 10;
          padding: 28px 23px;
          border: 1px solid #e8edf6;
          border-radius: 22px;
          background: white;
          box-shadow: var(--sombra);
          transition: transform 0.25s ease;
        }

        .beneficio:hover {
          transform: translateY(-7px);
        }

        .beneficio-icono {
          display: grid;
          width: 53px;
          height: 53px;
          place-items: center;
          margin-bottom: 17px;
          border-radius: 15px;
          background: #eaf1ff;
          font-size: 25px;
        }

        .beneficio h3 {
          margin-bottom: 9px;
          font-size: 18px;
        }

        .beneficio p {
          color: var(--texto-secundario);
          font-size: 14px;
          line-height: 1.6;
        }

        .categorias-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .categoria {
          position: relative;
          min-height: 250px;
          overflow: hidden;
          padding: 31px;
          border-radius: 25px;
          color: white;
          box-shadow: var(--sombra);
          cursor: pointer;
          transition:
            transform 0.28s ease,
            box-shadow 0.28s ease;
        }

        .categoria:hover {
          transform: translateY(-8px);
          box-shadow: 0 24px 55px rgba(17, 48, 105, 0.2);
        }

        .categoria:nth-child(1) {
          background: linear-gradient(135deg, #0b367d, #2669dd);
        }

        .categoria:nth-child(2) {
          background: linear-gradient(135deg, #151d34, #34476e);
        }

        .categoria:nth-child(3) {
          background: linear-gradient(135deg, #d68500, #ffb000);
        }

        .categoria-icono {
          margin-bottom: 28px;
          font-size: 64px;
        }

        .categoria h3 {
          margin-bottom: 9px;
          font-size: 27px;
        }

        .categoria p {
          max-width: 310px;
          color: rgba(255, 255, 255, 0.82);
          line-height: 1.6;
        }

        .categoria-enlace {
          position: absolute;
          right: 28px;
          bottom: 24px;
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.17);
          font-size: 21px;
        }

        #productos {
          background: #edf2fa;
        }

        .herramientas-productos {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 30px;
        }

        .buscador {
          position: relative;
          width: min(460px, 100%);
        }

        .buscador span {
          position: absolute;
          top: 50%;
          left: 17px;
          color: #6f7b90;
          transform: translateY(-50%);
        }

        .buscador input {
          width: 100%;
          height: 51px;
          padding: 0 18px 0 47px;
          border: 1px solid var(--borde);
          border-radius: 13px;
          outline: none;
          background: white;
          box-shadow: 0 8px 24px rgba(22, 50, 101, 0.06);
          transition:
            border 0.25s ease,
            box-shadow 0.25s ease;
        }

        .buscador input:focus {
          border-color: var(--azul-claro);
          box-shadow: 0 0 0 4px rgba(46, 110, 231, 0.11);
        }

        .filtros {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 9px;
        }

        .filtro {
          padding: 10px 15px;
          border: 1px solid var(--borde);
          border-radius: 999px;
          background: white;
          color: var(--texto);
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition: 0.25s ease;
        }

        .filtro:hover,
        .filtro.activo {
          border-color: var(--azul);
          background: var(--azul);
          color: white;
        }

        .productos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 25px;
        }

        .producto {
          overflow: hidden;
          border: 1px solid rgba(211, 220, 235, 0.8);
          border-radius: 25px;
          background: white;
          box-shadow: 0 13px 36px rgba(23, 52, 105, 0.09);
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .producto:hover {
          transform: translateY(-8px);
          box-shadow: 0 23px 50px rgba(23, 52, 105, 0.17);
        }

        .producto.oculto {
          display: none;
        }

        .producto-imagen {
          position: relative;
          height: 255px;
          overflow: hidden;
          background: #dce6f6;
        }

        .producto-imagen img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.55s ease;
        }

        .producto:hover .producto-imagen img {
          transform: scale(1.07);
        }

        .etiqueta-categoria,
        .etiqueta-destacado {
          position: absolute;
          top: 16px;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 900;
        }

        .etiqueta-categoria {
          left: 16px;
          background: rgba(6, 22, 49, 0.89);
          color: white;
        }

        .etiqueta-destacado {
          right: 16px;
          background: var(--amarillo);
          color: var(--azul-oscuro);
        }

        .producto-contenido {
          padding: 23px;
        }

        .producto-encabezado {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 11px;
        }

        .producto h3 {
          font-size: 21px;
          line-height: 1.25;
        }

        .disponibilidad {
          flex-shrink: 0;
          padding: 6px 9px;
          border-radius: 999px;
          background: #e6f8ee;
          color: var(--verde);
          font-size: 10px;
          font-weight: 900;
        }

        .descripcion {
          min-height: 66px;
          margin-bottom: 20px;
          color: var(--texto-secundario);
          font-size: 14px;
          line-height: 1.6;
        }

        .producto-pie {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 17px;
        }

        .producto-pie small {
          display: block;
          margin-bottom: 4px;
          color: #8490a3;
          font-size: 11px;
        }

        .producto-pie strong {
          display: block;
          color: var(--azul);
          font-size: 21px;
        }

        .boton-agregar {
          display: flex;
          min-height: 43px;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 0 14px;
          border: none;
          border-radius: 11px;
          background: var(--azul);
          color: white;
          font-size: 13px;
          font-weight: 900;
          cursor: pointer;
          transition:
            transform 0.25s ease,
            background 0.25s ease;
        }

        .boton-agregar:hover {
          background: #0d3a85;
          transform: translateY(-2px);
        }

        .sin-resultados {
          display: none;
          padding: 45px 20px;
          border: 2px dashed #ced8e8;
          border-radius: 20px;
          color: var(--texto-secundario);
          text-align: center;
        }

        .sin-resultados.visible {
          display: block;
        }

        .nosotros {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          align-items: center;
          gap: 65px;
        }

        .nosotros-visual {
          position: relative;
          min-height: 480px;
          overflow: hidden;
          border-radius: 32px;
          background:
            linear-gradient(
              rgba(5, 20, 47, 0.14),
              rgba(5, 20, 47, 0.65)
            ),
            url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85")
            center/cover;
          box-shadow: 0 28px 60px rgba(23, 52, 105, 0.23);
        }

        .nosotros-distintivo {
          position: absolute;
          right: 24px;
          bottom: 24px;
          left: 24px;
          padding: 22px;
          border: 1px solid rgba(255, 255, 255, 0.23);
          border-radius: 20px;
          background: rgba(7, 22, 48, 0.67);
          color: white;
          backdrop-filter: blur(12px);
        }

        .nosotros-distintivo strong {
          display: block;
          margin-bottom: 6px;
          color: var(--amarillo-claro);
          font-size: 24px;
        }

        .nosotros-texto .subtitulo {
          margin-bottom: 15px;
        }

        .nosotros-texto h2 {
          margin-bottom: 20px;
          font-size: clamp(36px, 4vw, 51px);
          letter-spacing: -1.7px;
        }

        .nosotros-texto > p {
          margin-bottom: 25px;
          color: var(--texto-secundario);
          line-height: 1.8;
        }

        .lista-beneficios {
          display: grid;
          gap: 14px;
        }

        .lista-beneficios li {
          display: flex;
          align-items: flex-start;
          gap: 13px;
          list-style: none;
          font-weight: 700;
          line-height: 1.5;
        }

        .lista-beneficios span {
          display: grid;
          width: 25px;
          height: 25px;
          flex-shrink: 0;
          place-items: center;
          border-radius: 50%;
          background: #e8f0ff;
          color: var(--azul);
          font-size: 13px;
        }

        .contacto {
          color: white;
          background:
            radial-gradient(
              circle at 15% 20%,
              rgba(46, 110, 231, 0.55),
              transparent 28%
            ),
            linear-gradient(135deg, #06142d, #0c357e);
        }

        .contacto-contenedor {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          align-items: center;
          gap: 60px;
        }

        .contacto h2 {
          margin: 11px 0 18px;
          font-size: clamp(36px, 4.5vw, 52px);
        }

        .contacto-texto > p {
          margin-bottom: 28px;
          color: #d6e3ff;
          line-height: 1.8;
        }

        .dato-contacto {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-top: 14px;
          color: #e8efff;
          font-weight: 700;
        }

        .dato-contacto span {
          display: grid;
          width: 39px;
          height: 39px;
          place-items: center;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.11);
        }

        .formulario {
          display: grid;
          gap: 14px;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.09);
          box-shadow: 0 28px 65px rgba(0, 0, 0, 0.24);
          backdrop-filter: blur(14px);
        }

        .grupo-doble {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 13px;
        }

        .formulario input,
        .formulario textarea {
          width: 100%;
          padding: 14px 15px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 11px;
          outline: none;
          background: rgba(255, 255, 255, 0.08);
          color: white;
          transition:
            border 0.25s ease,
            background 0.25s ease;
        }

        .formulario input:focus,
        .formulario textarea:focus {
          border-color: var(--amarillo);
          background: rgba(255, 255, 255, 0.12);
        }

        .formulario input::placeholder,
        .formulario textarea::placeholder {
          color: #bfcdeb;
        }

        .formulario textarea {
          min-height: 135px;
          resize: vertical;
        }

        .formulario button {
          min-height: 48px;
          border: none;
          border-radius: 11px;
          background: var(--amarillo);
          color: var(--azul-oscuro);
          font-weight: 900;
          cursor: pointer;
          transition:
            transform 0.25s ease,
            background 0.25s ease;
        }

        .formulario button:hover {
          background: var(--amarillo-claro);
          transform: translateY(-2px);
        }

        footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 29px 7%;
          background: #030b1a;
          color: #aebbd1;
          font-size: 13px;
        }

        .footer-marca {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .footer-marca img {
          width: 135px;
          height: 42px;
          object-fit: cover;
          object-position: center;
        }

        .footer-enlaces {
          display: flex;
          gap: 18px;
        }

        .footer-enlaces a {
          color: #aebbd1;
          text-decoration: none;
        }

        .footer-enlaces a:hover {
          color: var(--amarillo-claro);
        }

        .fondo-carrito {
          position: fixed;
          inset: 0;
          z-index: 1999;
          visibility: hidden;
          background: rgba(1, 7, 18, 0.63);
          opacity: 0;
          backdrop-filter: blur(4px);
          transition:
            opacity 0.3s ease,
            visibility 0.3s ease;
        }

        .fondo-carrito.visible {
          visibility: visible;
          opacity: 1;
        }

        .panel-carrito {
          position: fixed;
          top: 0;
          right: 0;
          z-index: 2000;
          display: flex;
          width: min(430px, 100%);
          height: 100vh;
          flex-direction: column;
          background: white;
          box-shadow: -18px 0 50px rgba(0, 0, 0, 0.24);
          transform: translateX(105%);
          transition: transform 0.35s ease;
        }

        .panel-carrito.visible {
          transform: translateX(0);
        }

        .carrito-encabezado {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 23px;
          border-bottom: 1px solid var(--borde);
        }

        .carrito-encabezado h2 {
          font-size: 24px;
        }

        .cerrar-carrito {
          display: grid;
          width: 39px;
          height: 39px;
          place-items: center;
          border: none;
          border-radius: 11px;
          background: #eef2f8;
          color: var(--texto);
          font-size: 20px;
          cursor: pointer;
        }

        .contenido-carrito {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }

        .carrito-vacio {
          display: grid;
          min-height: 370px;
          place-items: center;
          color: var(--texto-secundario);
          text-align: center;
        }

        .carrito-vacio span {
          display: block;
          margin-bottom: 13px;
          font-size: 65px;
        }

        .item-carrito {
          display: grid;
          grid-template-columns: 72px 1fr auto;
          align-items: center;
          gap: 13px;
          margin-bottom: 14px;
          padding: 13px;
          border: 1px solid var(--borde);
          border-radius: 16px;
        }

        .item-carrito img {
          width: 72px;
          height: 72px;
          border-radius: 12px;
          object-fit: cover;
        }

        .item-carrito h4 {
          margin-bottom: 5px;
          font-size: 14px;
        }

        .item-carrito p {
          color: var(--azul);
          font-size: 13px;
          font-weight: 900;
        }

        .eliminar-item {
          display: grid;
          width: 32px;
          height: 32px;
          place-items: center;
          border: none;
          border-radius: 9px;
          background: #fff0f0;
          color: #c63939;
          cursor: pointer;
        }

        .carrito-resumen {
          padding: 20px;
          border-top: 1px solid var(--borde);
          background: #f8fafe;
        }

        .fila-total {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          font-size: 17px;
          font-weight: 900;
        }

        .fila-total strong {
          color: var(--azul);
          font-size: 23px;
        }

        .finalizar-compra {
          width: 100%;
          min-height: 48px;
          border: none;
          border-radius: 12px;
          background: var(--amarillo);
          color: var(--azul-oscuro);
          font-weight: 900;
          cursor: pointer;
        }

        .toast {
          position: fixed;
          right: 25px;
          bottom: 25px;
          z-index: 3000;
          max-width: 350px;
          padding: 15px 18px;
          border-radius: 13px;
          background: #071630;
          color: white;
          box-shadow: 0 19px 45px rgba(0, 0, 0, 0.27);
          font-size: 14px;
          font-weight: 700;
          opacity: 0;
          pointer-events: none;
          transform: translateY(25px);
          transition:
            opacity 0.3s ease,
            transform 0.3s ease;
        }

        .toast.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 1050px) {
          .navegacion {
            display: none;
          }

          .hero {
            min-height: auto;
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-texto {
            margin: 0 auto;
          }

          .hero-botones,
          .hero-confianza {
            justify-content: center;
          }

          .beneficios,
          .productos-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .nosotros,
          .contacto-contenedor {
            grid-template-columns: 1fr;
          }

          .herramientas-productos {
            align-items: stretch;
            flex-direction: column;
          }

          .filtros {
            justify-content: flex-start;
          }
        }

        @media (max-width: 720px) {
          nav {
            padding-right: 5%;
            padding-left: 5%;
          }

          .logo-img {
            width: 165px;
            height: 54px;
          }

          .boton-carrito .texto-carrito {
            display: none;
          }

          section,
          .hero {
            padding-right: 5%;
            padding-left: 5%;
          }

          .hero {
            padding-top: 60px;
            padding-bottom: 70px;
          }

          .hero h1 {
            font-size: 49px;
            letter-spacing: -2px;
          }

          .tarjeta-principal {
            padding: 23px;
          }

          .beneficios {
            grid-template-columns: 1fr;
            margin-top: 0;
            padding-top: 60px;
          }

          .categorias-grid,
          .productos-grid {
            grid-template-columns: 1fr;
          }

          .producto-imagen {
            height: 280px;
          }

          .grupo-doble {
            grid-template-columns: 1fr;
          }

          footer {
            align-items: flex-start;
            flex-direction: column;
          }

          .footer-enlaces {
            flex-wrap: wrap;
          }

          .toast {
            right: 15px;
            bottom: 15px;
            left: 15px;
            max-width: none;
          }
        }

        @media (max-width: 420px) {
          .hero h1 {
            font-size: 43px;
          }

          .hero-botones a {
            width: 100%;
          }

          .resumen-tarjeta {
            grid-template-columns: 1fr;
          }

          .producto-pie {
            align-items: stretch;
            flex-direction: column;
          }

          .boton-agregar {
            width: 100%;
          }
        }
      </style>
    </head>

    <body>
      <nav>
        <a href="#inicio" class="logo-container">
          <img
            src="/logo-fbshop.png"
            alt="Logo de FBShop"
            class="logo-img"
          >
        </a>

        <ul class="navegacion">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#categorias">Categorías</a></li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>

        <div class="acciones-nav">
          <a href="/login" class="boton-login-nav" id="botonSesion">
            <span aria-hidden="true"></span>
            <span id="textoSesion">Iniciar sesión</span>
          </a>

          <button
            type="button"
            class="boton-carrito"
            onclick="abrirCarrito()"
          >
            <span aria-hidden="true"></span>
            <span class="texto-carrito">Mi carrito</span>
            <span class="contador-carrito" id="contadorCarrito">0</span>
          </button>
        </div>
      </nav>

      <main>
        <section class="hero" id="inicio">
          <div class="hero-texto">
            <div class="hero-etiqueta">
              Nueva colección disponible
            </div>

            <h1>
              Todo tu estilo en un solo lugar: <span>FBShop</span>
            </h1>

            <p class="hero-descripcion">
              Explora ropa, calzado y accesorios seleccionados para acompañarte
              en cada momento. Una experiencia de compra moderna, rápida y
              sencilla desde cualquier dispositivo.
            </p>

            <div class="hero-botones">
              <a href="#productos" class="boton-principal">
                Explorar productos
                <span aria-hidden="true">→</span>
              </a>

              <a href="#nosotros" class="boton-secundario">
                Conocer FBShop
              </a>
            </div>

            <div class="hero-confianza">
              <span><strong>✓</strong> Compra sencilla</span>
              <span><strong>✓</strong> Catálogo actualizado</span>
              <span><strong>✓</strong> Atención personalizada</span>
            </div>
          </div>

          <div class="hero-visual">
            <div class="tarjeta-principal">
              <img
                src="/logo-fbshop.png"
                alt="FBShop"
                class="hero-logo"
              >

              <h2>Compra fácil y rápido</h2>

              <p>
                Productos modernos y organizados para que encuentres justo lo
                que necesitas.
              </p>

              <div class="resumen-tarjeta">
                <div class="dato">
                  <strong>${productos.length}</strong>
                  <span>Productos</span>
                </div>

                <div class="dato">
                  <strong>3</strong>
                  <span>Categorías</span>
                </div>

                <div class="dato">
                  <strong>24/7</strong>
                  <span>Disponible</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="beneficios">
          <article class="beneficio">
            <div class="beneficio-icono">🚚</div>
            <h3>Envíos rápidos</h3>
            <p>
              Compra tus productos favoritos desde cualquier dispositivo.
            </p>
          </article>

          <article class="beneficio">
            <div class="beneficio-icono">🔒</div>
            <h3>Compra segura</h3>
            <p>
              Navega y agrega artículos con una experiencia clara y confiable.
            </p>
          </article>

          <article class="beneficio">
            <div class="beneficio-icono">⭐</div>
            <h3>Productos elegidos</h3>
            <p>
              Una selección de ropa, calzado y accesorios para tu estilo.
            </p>
          </article>

          <article class="beneficio">
            <div class="beneficio-icono">💬</div>
            <h3>Atención directa</h3>
            <p>
              Ponte en contacto con nosotros para resolver cualquier duda.
            </p>
          </article>
        </section>

        <section id="categorias">
          <div class="encabezado-seccion">
            <span class="subtitulo">Categorías</span>
            <h2>Encuentra lo que buscas</h2>
            <p>
              Descubre productos organizados según tu estilo y encuentra tus
              favoritos de manera rápida y sencilla.
            </p>
          </div>

          <div class="categorias-grid">
            <article
              class="categoria"
              onclick="seleccionarCategoria('ropa')"
            >
              <div class="categoria-icono">👕</div>
              <h3>Ropa</h3>
              <p>
                Prendas cómodas y modernas para cada momento de tu día.
              </p>
              <span class="categoria-enlace">→</span>
            </article>

            <article
              class="categoria"
              onclick="seleccionarCategoria('calzado')"
            >
              <div class="categoria-icono">👟</div>
              <h3>Calzado</h3>
              <p>
                Diseños urbanos y deportivos con comodidad y personalidad.
              </p>
              <span class="categoria-enlace">→</span>
            </article>

            <article
              class="categoria"
              onclick="seleccionarCategoria('accesorios')"
            >
              <div class="categoria-icono">🎒</div>
              <h3>Accesorios</h3>
              <p>
                Complementos funcionales para darle el toque final a tu estilo.
              </p>
              <span class="categoria-enlace">→</span>
            </article>
          </div>
        </section>

        <section id="productos">
          <div class="encabezado-seccion">
            <span class="subtitulo">Nuestro catálogo</span>
            <h2>Productos destacados</h2>
            <p>
              Busca por nombre o filtra por categoría para encontrar tus
              productos favoritos.
            </p>
          </div>

          <div class="herramientas-productos">
            <label class="buscador">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                id="busquedaProducto"
                placeholder="Buscar un producto..."
                oninput="filtrarProductos()"
              >
            </label>

            <div class="filtros">
              <button
                type="button"
                class="filtro activo"
                data-filtro="todos"
                onclick="cambiarFiltro('todos', this)"
              >
                Todos
              </button>

              <button
                type="button"
                class="filtro"
                data-filtro="ropa"
                onclick="cambiarFiltro('ropa', this)"
              >
                Ropa
              </button>

              <button
                type="button"
                class="filtro"
                data-filtro="calzado"
                onclick="cambiarFiltro('calzado', this)"
              >
                Calzado
              </button>

              <button
                type="button"
                class="filtro"
                data-filtro="accesorios"
                onclick="cambiarFiltro('accesorios', this)"
              >
                Accesorios
              </button>
            </div>
          </div>

          <div class="productos-grid" id="productosGrid">
            ${tarjetas}
          </div>

          <div class="sin-resultados" id="sinResultados">
            <h3>No encontramos productos</h3>
            <p>Prueba con otra palabra o selecciona una categoría diferente.</p>
          </div>
        </section>

        <section id="nosotros">
          <div class="nosotros">
            <div class="nosotros-visual">
              <div class="nosotros-distintivo">
                <strong>FBShop</strong>
                Moda, accesorios y estilo en una experiencia de compra moderna.
              </div>
            </div>

            <div class="nosotros-texto">
              <span class="subtitulo">Sobre nosotros</span>

              <h2>Una tienda creada pensando en ti</h2>

              <p>
                En FBShop creemos que comprar debe ser fácil, rápido y agradable.
                Por eso reunimos productos modernos, prácticos y con estilo en
                un solo lugar para que encuentres justo lo que buscas.
              </p>

              <ul class="lista-beneficios">
                <li>
                  <span>✓</span>
                  Productos seleccionados para ofrecer estilo y comodidad.
                </li>

                <li>
                  <span>✓</span>
                  Navegación simple para que compres sin complicaciones.
                </li>

                <li>
                  <span>✓</span>
                  Variedad en ropa, calzado y accesorios para cada ocasión.
                </li>

                <li>
                  <span>✓</span>
                  Una experiencia pensada para inspirarte y acompañar tu estilo.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section class="contacto" id="contacto">
          <div class="contacto-contenedor">
            <div class="contacto-texto">
              <span class="subtitulo">Contacto</span>

              <h2>Estamos para ayudarte</h2>

              <p>
                Escríbenos si tienes dudas sobre nuestros productos,
                disponibilidad o cualquier aspecto de la tienda.
              </p>

              <div class="dato-contacto">
                <span>✉</span>
                contacto@fbshop.com
              </div>

              <div class="dato-contacto">
                <span>☎</span>
                Atención de lunes a sábado
              </div>
            </div>

            <form
              class="formulario"
              onsubmit="enviarMensaje(event)"
            >
              <div class="grupo-doble">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre"
                  required
                >

                <input
                  type="email"
                  name="correo"
                  placeholder="Tu correo"
                  required
                >
              </div>

              <input
                type="text"
                name="asunto"
                placeholder="Asunto"
                required
              >

              <textarea
                name="mensaje"
                placeholder="Escribe tu mensaje"
                required
              ></textarea>

              <button type="submit">
                Enviar mensaje
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div class="footer-marca">
          <img
            src="/logo-fbshop.png"
            alt="FBShop"
          >

          <span>
            © 2026 FBShop. Tu estilo, tu tienda, tu momento.
          </span>
        </div>

        <div class="footer-enlaces">
          <a href="#inicio">Inicio</a>
          <a href="#productos">Productos</a>
          <a href="#contacto">Contacto</a>
        </div>
      </footer>

      <div
        class="fondo-carrito"
        id="fondoCarrito"
        onclick="cerrarCarrito()"
      ></div>

      <aside
        class="panel-carrito"
        id="panelCarrito"
        aria-label="Carrito de compras"
      >
        <div class="carrito-encabezado">
          <h2>Mi carrito</h2>

          <button
            type="button"
            class="cerrar-carrito"
            onclick="cerrarCarrito()"
            aria-label="Cerrar carrito"
          >
            ×
          </button>
        </div>

        <div class="contenido-carrito" id="contenidoCarrito"></div>

        <div class="carrito-resumen">
          <div class="fila-total">
            <span>Total</span>
            <strong id="totalCarrito">$0 MXN</strong>
          </div>

          <button
            type="button"
            class="finalizar-compra"
            onclick="finalizarCompra()"
          >
            Finalizar compra
          </button>
        </div>
      </aside>

      <div class="toast" id="toast"></div>

      <script>
        const productos = ${productosJSON};

        let carrito = [];
        let filtroActual = "todos";
        let temporizadorToast = null;

        function formatoPrecio(valor) {
          return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            maximumFractionDigits: 0
          }).format(valor);
        }

        function mostrarToast(mensaje) {
          const toast = document.getElementById("toast");

          toast.textContent = mensaje;
          toast.classList.add("visible");

          clearTimeout(temporizadorToast);

          temporizadorToast = setTimeout(function () {
            toast.classList.remove("visible");
          }, 2600);
        }

        function agregarAlCarrito(id) {
          const producto = productos.find(function (item) {
            return item.id === id;
          });

          if (!producto) {
            return;
          }

          carrito.push(producto);

          actualizarCarrito();
          mostrarToast(producto.nombre + " fue agregado al carrito.");
        }

        function eliminarDelCarrito(indice) {
          const eliminado = carrito[indice];

          carrito.splice(indice, 1);
          actualizarCarrito();

          if (eliminado) {
            mostrarToast(eliminado.nombre + " fue eliminado del carrito.");
          }
        }

        function actualizarCarrito() {
          const contador = document.getElementById("contadorCarrito");
          const contenido = document.getElementById("contenidoCarrito");
          const totalElemento = document.getElementById("totalCarrito");

          contador.textContent = carrito.length;

          const total = carrito.reduce(function (acumulado, producto) {
            return acumulado + producto.precio;
          }, 0);

          totalElemento.textContent = formatoPrecio(total);

          if (carrito.length === 0) {
            contenido.innerHTML =
              '<div class="carrito-vacio">' +
                "<div>" +
                  "<span>🛒</span>" +
                  "<h3>Tu carrito está vacío</h3>" +
                  "<p>Agrega alguno de nuestros productos.</p>" +
                "</div>" +
              "</div>";

            return;
          }

          contenido.innerHTML = carrito
            .map(function (producto, indice) {
              return (
                '<article class="item-carrito">' +
                  '<img src="' +
                    producto.imagen +
                    '" alt="' +
                    producto.nombre +
                  '">' +
                  "<div>" +
                    "<h4>" +
                      producto.nombre +
                    "</h4>" +
                    "<p>" +
                      formatoPrecio(producto.precio) +
                    "</p>" +
                  "</div>" +
                  '<button ' +
                    'type="button" ' +
                    'class="eliminar-item" ' +
                    'onclick="eliminarDelCarrito(' +
                      indice +
                    ')" ' +
                    'aria-label="Eliminar producto"' +
                  ">" +
                    "×" +
                  "</button>" +
                "</article>"
              );
            })
            .join("");
        }

        function abrirCarrito() {
          document.body.classList.add("carrito-abierto");
          document.getElementById("panelCarrito").classList.add("visible");
          document.getElementById("fondoCarrito").classList.add("visible");
        }

        function cerrarCarrito() {
          document.body.classList.remove("carrito-abierto");
          document.getElementById("panelCarrito").classList.remove("visible");
          document.getElementById("fondoCarrito").classList.remove("visible");
        }

        function finalizarCompra() {
          if (carrito.length === 0) {
            mostrarToast("Primero agrega productos al carrito.");
            return;
          }

          mostrarToast(
            "Compra simulada correctamente. Productos: " + carrito.length
          );

          carrito = [];
          actualizarCarrito();
          cerrarCarrito();
        }

        function cambiarFiltro(filtro, boton) {
          filtroActual = filtro;

          document.querySelectorAll(".filtro").forEach(function (elemento) {
            elemento.classList.remove("activo");
          });

          if (boton) {
            boton.classList.add("activo");
          }

          filtrarProductos();
        }

        function seleccionarCategoria(categoria) {
          const boton = document.querySelector(
            '[data-filtro="' + categoria + '"]'
          );

          document.getElementById("productos").scrollIntoView({
            behavior: "smooth"
          });

          cambiarFiltro(categoria, boton);
        }

        function filtrarProductos() {
          const busqueda = document
            .getElementById("busquedaProducto")
            .value
            .trim()
            .toLowerCase();

          let visibles = 0;

          document.querySelectorAll(".producto").forEach(function (tarjeta) {
            const nombre = tarjeta.dataset.nombre;
            const categoria = tarjeta.dataset.categoria;

            const coincideBusqueda =
              nombre.includes(busqueda) || categoria.includes(busqueda);

            const coincideFiltro =
              filtroActual === "todos" || categoria === filtroActual;

            const mostrar = coincideBusqueda && coincideFiltro;

            tarjeta.classList.toggle("oculto", !mostrar);

            if (mostrar) {
              visibles++;
            }
          });

          document
            .getElementById("sinResultados")
            .classList
            .toggle("visible", visibles === 0);
        }

        function enviarMensaje(event) {
          event.preventDefault();

          mostrarToast("Tu mensaje fue enviado correctamente.");
          event.target.reset();
        }

        document.addEventListener("keydown", function (event) {
          if (event.key === "Escape") {
            cerrarCarrito();
          }
        });

        function actualizarEstadoSesion() {
          const botonSesion = document.getElementById("botonSesion");
          const textoSesion = document.getElementById("textoSesion");

        if (!botonSesion || !textoSesion) {
          return;
        }

        const sesionGuardada = localStorage.getItem("fbshopSesion");

        if (!sesionGuardada) {
          botonSesion.href = "/login";
          textoSesion.textContent = "Iniciar sesión";
          return;
        }

        try {
         const sesion = JSON.parse(sesionGuardada);

         textoSesion.textContent = sesion.nombre || "Mi cuenta";

        if (sesion.rol === "administrador") {
          botonSesion.href = "/dashboard";
        } else {
          botonSesion.href = "#";

          botonSesion.addEventListener("click", function (event) {
         event.preventDefault();
          mostrarMenuCuenta();
      });
    }
  } catch (error) {
    localStorage.removeItem("fbshopSesion");
    botonSesion.href = "/login";
    textoSesion.textContent = "Iniciar sesión";
  }
}

function mostrarMenuCuenta() {
  const sesion = JSON.parse(
    localStorage.getItem("fbshopSesion") || "null"
  );

  if (!sesion) {
    window.location.href = "/login";
    return;
  }

  const cerrarSesion = confirm(
  "Cuenta iniciada\\n\\n" +
  "Nombre: " + sesion.nombre + "\\n" +
  "Correo: " + sesion.correo + "\\n\\n" +
  "¿Deseas cerrar sesión?"
);

  if (cerrarSesion) {
    localStorage.removeItem("fbshopSesion");

    mostrarToast("Sesión cerrada correctamente.");

    setTimeout(function () {
      window.location.reload();
    }, 700);
  }
}

actualizarEstadoSesion();

        actualizarCarrito();
      </script>
    </body>
    </html>
  `);
});


app.get("/login", (req, res) => {
  res.sendFile(require("path").join(__dirname, "public", "login.html"));
});

app.get("/registro", (req, res) => {
  res.sendFile(require("path").join(__dirname, "public", "registro.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(require("path").join(__dirname, "public", "dashboard.html"));
});

app.get("/api", (req, res) => {
  res.json({
    servicio: "API de FBShop",
    estado: "Disponible",
    descripcion: "Servicio web para consultar el catálogo de productos.",
    rutas: {
      productos: "/api/productos",
      productoPorId: "/api/productos/:id",
      categorias: "/api/categorias"
    }
  });
});

app.get("/api/productos", (req, res) => {
  const categoria = String(req.query.categoria || "").toLowerCase();
  const busqueda = String(req.query.buscar || "").toLowerCase();

  let resultado = [...productos];

  if (categoria) {
    resultado = resultado.filter((producto) => {
      return producto.categoria.toLowerCase() === categoria;
    });
  }

  if (busqueda) {
    resultado = resultado.filter((producto) => {
      return (
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      );
    });
  }

  res.json({
    tienda: "FBShop",
    cantidad: resultado.length,
    productos: resultado
  });
});

app.get("/api/productos/:id", (req, res) => {
  const id = Number(req.params.id);

  const producto = productos.find((item) => item.id === id);

  if (!producto) {
    return res.status(404).json({
      error: true,
      mensaje: "Producto no encontrado"
    });
  }

  return res.json(producto);
});

app.get("/api/categorias", (req, res) => {
  const categorias = [...new Set(productos.map((producto) => producto.categoria))];

  res.json({
    cantidad: categorias.length,
    categorias
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: true,
    mensaje: "La ruta solicitada no existe"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor FBShop corriendo en el puerto ${PORT}`);
});