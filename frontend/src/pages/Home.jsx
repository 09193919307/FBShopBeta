import React, { useState, useEffect } from "react";
import "../Home.css";

export default function Home() {
  const [productosData, setProductosData] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [filtroActual, setFiltroActual] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [toastMensaje, setToastMensaje] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const formatoPrecio = (valor) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0
    }).format(valor);
  };

  const mostrarToast = (mensaje) => {
    setToastMensaje(mensaje);
    setTimeout(() => {
      setToastMensaje("");
    }, 2600);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito([...carrito, producto]);
    mostrarToast(producto.nombre + " fue agregado al carrito.");
  };

  const eliminarDelCarrito = (indice) => {
    const nuevoCarrito = [...carrito];
    const eliminado = nuevoCarrito.splice(indice, 1)[0];
    setCarrito(nuevoCarrito);
    if (eliminado) {
      mostrarToast(eliminado.nombre + " fue eliminado del carrito.");
    }
  };

  const fetchProductos = async () => {
    try {
      setCargando(true);
      setError(null);
      
      const queryParams = new URLSearchParams();
      if (filtroActual !== "todos") {
        queryParams.append("categoria", filtroActual);
      }
      if (busqueda.trim() !== "") {
        queryParams.append("buscar", busqueda);
      }

      // Conectamos a la nueva API de Laravel
      const response = await fetch(`/api/productos?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error("Error al obtener los productos");
      }
      
      const data = await response.json();
      setProductosData(data.productos);
    } catch (err) {
      setError(err.message);
      setProductosData([]);
    } finally {
      setCargando(false);
    }
  };

  // Se vuelve a hacer fetch si cambia el filtro o la búsqueda.
  // (Para búsquedas es mejor usar un debounce, pero lo mantendremos simple).
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProductos();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [filtroActual, busqueda]);

  const totalCarrito = carrito.reduce((acc, curr) => acc + Number(curr.precio), 0);

  useEffect(() => {
    if (carritoAbierto) {
      document.body.classList.add("carrito-abierto");
    } else {
      document.body.classList.remove("carrito-abierto");
    }
  }, [carritoAbierto]);

  return (
    <>
      <nav>
        <a href="#inicio" className="logo-container">
          <img src="/logo-fbshop.png" alt="Logo de FBShop" className="logo-img" />
        </a>

        <ul className="navegacion">
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#categorias">Categorías</a></li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>

        <div className="acciones-nav">
          <a href="/login" className="boton-login-nav" id="botonSesion">
            <span aria-hidden="true"></span>
            <span id="textoSesion">Iniciar sesión</span>
          </a>

          <button type="button" className="boton-carrito" onClick={() => setCarritoAbierto(true)}>
            <span aria-hidden="true"></span>
            <span className="texto-carrito">Mi carrito</span>
            <span className="contador-carrito" id="contadorCarrito">{carrito.length}</span>
          </button>
        </div>
      </nav>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-texto">
            <div className="hero-etiqueta">Nueva colección disponible</div>
            <h1>Todo tu estilo en un solo lugar: <span>FBShop</span></h1>
            <p className="hero-descripcion">
              Explora ropa, calzado y accesorios seleccionados para acompañarte
              en cada momento. Una experiencia de compra moderna, rápida y sencilla desde cualquier dispositivo.
            </p>
            <div className="hero-botones">
              <a href="#productos" className="boton-principal">
                Explorar productos <span aria-hidden="true">→</span>
              </a>
              <a href="#nosotros" className="boton-secundario">Conocer FBShop</a>
            </div>
            <div className="hero-confianza">
              <span><strong>✓</strong> Compra sencilla</span>
              <span><strong>✓</strong> Catálogo actualizado</span>
              <span><strong>✓</strong> Atención personalizada</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="tarjeta-principal">
              <img src="/logo-fbshop.png" alt="FBShop" className="hero-logo" />
              <h2>Compra fácil y rápido</h2>
              <p>Productos modernos y organizados para que encuentres justo lo que necesitas.</p>
              <div className="resumen-tarjeta">
                <div className="dato">
                  <strong>{productosData.length}</strong>
                  <span>Productos</span>
                </div>
                <div className="dato">
                  <strong>3</strong>
                  <span>Categorías</span>
                </div>
                <div className="dato">
                  <strong>24/7</strong>
                  <span>Disponible</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="beneficios">
          <article className="beneficio">
            <div className="beneficio-icono">🚚</div>
            <h3>Envíos rápidos</h3>
            <p>Compra tus productos favoritos desde cualquier dispositivo.</p>
          </article>
          <article className="beneficio">
            <div className="beneficio-icono">🔒</div>
            <h3>Compra segura</h3>
            <p>Navega y agrega artículos con una experiencia clara y confiable.</p>
          </article>
          <article className="beneficio">
            <div className="beneficio-icono">⭐</div>
            <h3>Productos elegidos</h3>
            <p>Una selección de ropa, calzado y accesorios para tu estilo.</p>
          </article>
          <article className="beneficio">
            <div className="beneficio-icono">💬</div>
            <h3>Atención directa</h3>
            <p>Ponte en contacto con nosotros para resolver cualquier duda.</p>
          </article>
        </section>

        <section id="categorias">
          <div className="encabezado-seccion">
            <span className="subtitulo">Categorías</span>
            <h2>Encuentra lo que buscas</h2>
            <p>Descubre productos organizados según tu estilo y encuentra tus favoritos de manera rápida y sencilla.</p>
          </div>
          <div className="categorias-grid">
            <article className="categoria" onClick={() => setFiltroActual('ropa')}>
              <div className="categoria-icono">👕</div>
              <h3>Ropa</h3>
              <p>Prendas cómodas y modernas para cada momento de tu día.</p>
              <span className="categoria-enlace">→</span>
            </article>
            <article className="categoria" onClick={() => setFiltroActual('calzado')}>
              <div className="categoria-icono">👟</div>
              <h3>Calzado</h3>
              <p>Diseños urbanos y deportivos con comodidad y personalidad.</p>
              <span className="categoria-enlace">→</span>
            </article>
            <article className="categoria" onClick={() => setFiltroActual('accesorios')}>
              <div className="categoria-icono">🎒</div>
              <h3>Accesorios</h3>
              <p>Complementos funcionales para darle el toque final a tu estilo.</p>
              <span className="categoria-enlace">→</span>
            </article>
          </div>
        </section>

        <section id="productos">
          <div className="encabezado-seccion">
            <span className="subtitulo">Nuestro catálogo</span>
            <h2>Productos destacados</h2>
            <p>Busca por nombre o filtra por categoría para encontrar tus productos favoritos.</p>
          </div>
          <div className="herramientas-productos">
            <label className="buscador">
              <span aria-hidden="true">⌕</span>
              <input
                type="search"
                placeholder="Buscar un producto..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </label>
            <div className="filtros">
              <button type="button" className={`filtro ${filtroActual === 'todos' ? 'activo' : ''}`} onClick={() => setFiltroActual('todos')}>Todos</button>
              <button type="button" className={`filtro ${filtroActual === 'ropa' ? 'activo' : ''}`} onClick={() => setFiltroActual('ropa')}>Ropa</button>
              <button type="button" className={`filtro ${filtroActual === 'calzado' ? 'activo' : ''}`} onClick={() => setFiltroActual('calzado')}>Calzado</button>
              <button type="button" className={`filtro ${filtroActual === 'accesorios' ? 'activo' : ''}`} onClick={() => setFiltroActual('accesorios')}>Accesorios</button>
            </div>
          </div>
          
          <div className="productos-grid">
            {cargando ? (
              <p>Cargando catálogo...</p>
            ) : error ? (
              <p style={{color: 'red'}}>{error}</p>
            ) : productosData.length > 0 ? (
              productosData.map((producto) => (
                <article key={producto.id} className="producto">
                  <div className="producto-imagen">
                    <img src={producto.imagen} alt={producto.nombre} loading="lazy" />
                    <span className="etiqueta-categoria">{producto.categoria}</span>
                    {producto.destacado && <span className="etiqueta-destacado">Destacado</span>}
                  </div>
                  <div className="producto-contenido">
                    <div className="producto-encabezado">
                      <h3>{producto.nombre}</h3>
                      <span className="disponibilidad">{producto.disponible ? "Disponible" : "Agotado"}</span>
                    </div>
                    <p className="descripcion">{producto.descripcion}</p>
                    <div className="producto-pie">
                      <div>
                        <small>Precio</small>
                        <strong>{formatoPrecio(producto.precio)}</strong>
                      </div>
                      <button
                        type="button"
                        className="boton-agregar"
                        onClick={() => agregarAlCarrito(producto)}
                        disabled={!producto.disponible}
                      >
                        <span>Agregar</span>
                        <span aria-hidden="true">＋</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : null}
          </div>

          {!cargando && productosData.length === 0 && (
            <div className="sin-resultados">
              <h3>No encontramos productos</h3>
              <p>Prueba con otra palabra, selecciona una categoría diferente o agrega productos al sistema.</p>
            </div>
          )}
        </section>

        <section id="nosotros">
          <div className="nosotros">
            <div className="nosotros-visual">
              <div className="nosotros-distintivo">
                <strong>FBShop</strong> Moda, accesorios y estilo en una experiencia de compra moderna.
              </div>
            </div>
            <div className="nosotros-texto">
              <span className="subtitulo">Sobre nosotros</span>
              <h2>Una tienda creada pensando en ti</h2>
              <p>
                En FBShop creemos que comprar debe ser fácil, rápido y agradable.
                Por eso reunimos productos modernos, prácticos y con estilo en
                un solo lugar para que encuentres justo lo que buscas.
              </p>
              <ul className="lista-beneficios">
                <li><span>✓</span> Productos seleccionados para ofrecer estilo y comodidad.</li>
                <li><span>✓</span> Navegación simple para que compres sin complicaciones.</li>
                <li><span>✓</span> Variedad en ropa, calzado y accesorios para cada ocasión.</li>
                <li><span>✓</span> Una experiencia pensada para inspirarte y acompañar tu estilo.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="contacto" id="contacto">
          <div className="contacto-contenedor">
            <div className="contacto-texto">
              <span className="subtitulo">Contacto</span>
              <h2>Estamos para ayudarte</h2>
              <p>Escríbenos si tienes dudas sobre nuestros productos, disponibilidad o cualquier aspecto de la tienda.</p>
              <div className="dato-contacto"><span>✉</span> contacto@fbshop.com</div>
              <div className="dato-contacto"><span>☎</span> Atención de lunes a sábado</div>
            </div>
            <form className="formulario" onSubmit={(e) => e.preventDefault()}>
              <div className="grupo-doble">
                <input type="text" name="nombre" placeholder="Tu nombre" required />
                <input type="email" name="correo" placeholder="Tu correo" required />
              </div>
              <input type="text" name="asunto" placeholder="Asunto" required />
              <textarea name="mensaje" placeholder="Escribe tu mensaje" required></textarea>
              <button type="submit">Enviar mensaje</button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-marca">
          <img src="/logo-fbshop.png" alt="FBShop" />
          <span>© 2026 FBShop. Tu estilo, tu tienda, tu momento.</span>
        </div>
        <div className="footer-enlaces">
          <a href="#inicio">Inicio</a>
          <a href="#productos">Productos</a>
          <a href="#contacto">Contacto</a>
        </div>
      </footer>

      <div className={`fondo-carrito ${carritoAbierto ? 'visible' : ''}`} onClick={() => setCarritoAbierto(false)}></div>

      <aside className={`panel-carrito ${carritoAbierto ? 'visible' : ''}`} aria-label="Carrito de compras">
        <div className="carrito-encabezado">
          <h2>Mi carrito</h2>
          <button type="button" className="cerrar-carrito" onClick={() => setCarritoAbierto(false)} aria-label="Cerrar carrito">×</button>
        </div>
        <div className="contenido-carrito">
          {carrito.length === 0 ? (
            <div className="carrito-vacio">
              <div className="icono-vacio">🛒</div>
              <p>Tu carrito está vacío</p>
              <button type="button" className="boton-volver" onClick={() => setCarritoAbierto(false)}>Explorar productos</button>
            </div>
          ) : (
            carrito.map((producto, indice) => (
              <article key={indice} className="item-carrito">
                <img src={producto.imagen} alt={producto.nombre} className="item-carrito-imagen" />
                <div className="item-carrito-info">
                  <h4>{producto.nombre}</h4>
                  <span className="item-carrito-precio">{formatoPrecio(producto.precio)}</span>
                </div>
                <button type="button" className="eliminar-item" onClick={() => eliminarDelCarrito(indice)}>🗑</button>
              </article>
            ))
          )}
        </div>
        <div className="carrito-resumen">
          <div className="fila-total">
            <span>Total</span>
            <strong>{formatoPrecio(totalCarrito)}</strong>
          </div>
          <button type="button" className="finalizar-compra" onClick={() => alert("Función no implementada aún.")}>Finalizar compra</button>
        </div>
      </aside>

      <div className={`toast ${toastMensaje ? 'visible' : ''}`}>{toastMensaje}</div>
    </>
  );
}
