import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'

/* ── Iconos SVG inline (sin emojis) ── */
const IconMail = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
    <rect x="2" y="4" width="16" height="12" rx="2"/>
    <path d="M2 7l8 5 8-5"/>
  </svg>
)

const IconLock = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
    <rect x="5" y="9" width="10" height="8" rx="2"/>
    <path d="M7 9V6a3 3 0 0 1 6 0v3"/>
  </svg>
)

const IconEye = ({ open }) => open ? (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
    <path d="M1 10s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z"/>
    <circle cx="10" cy="10" r="2.5"/>
  </svg>
) : (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
    <path d="M2 2l16 16M8.5 8.6A2.5 2.5 0 0 0 10 13a2.5 2.5 0 0 0 1.5-.6"/>
    <path d="M6 6.3C3.7 7.6 2 10 2 10s3.5 6 8 6c1.6 0 3-.5 4.2-1.3M14.5 14.1C16.5 12.7 18 10 18 10s-3.5-6-8-6c-.7 0-1.3.1-2 .3"/>
  </svg>
)

const IconCheck = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" width="13" height="13">
    <path d="M2.5 8l3.5 3.5 7-7"/>
  </svg>
)

export default function Login() {
  const navigate = useNavigate()
  const [correo, setCorreo]       = useState('')
  const [contrasena, setContrasena] = useState('')
  const [verPass, setVerPass]     = useState(false)
  const [recordar, setRecordar]   = useState(false)
  const [msg, setMsg]             = useState({ texto: '', tipo: '' })
  const [loading, setLoading]     = useState(false)

  function mostrar(texto, tipo) { setMsg({ texto, tipo }) }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!correo || !contrasena) {
      mostrar('Completa el correo y la contraseña.', 'error'); return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 680)) // simula latencia de red

    const correoN = correo.trim().toLowerCase()

    if (correoN === 'admin@fbshop.com' && contrasena === 'Admin123') {
      localStorage.setItem('fbshopSesion', JSON.stringify({
        nombre: 'Administrador FBShop', correo: correoN, rol: 'administrador'
      }))
      mostrar('Acceso correcto. Redirigiendo…', 'success')
      setTimeout(() => navigate('/dashboard'), 750)
      return
    }

    const usuarios = JSON.parse(localStorage.getItem('fbshopUsuarios') || '[]')
    const usuario  = usuarios.find(u => u.correo === correoN && u.contrasena === contrasena)

    if (!usuario) {
      setLoading(false)
      mostrar('Correo o contraseña incorrectos.', 'error'); return
    }

    localStorage.setItem('fbshopSesion', JSON.stringify({
      nombre: usuario.nombre, correo: usuario.correo, rol: 'cliente'
    }))
    mostrar('Bienvenido. Redirigiendo…', 'success')
    setTimeout(() => navigate('/'), 750)
  }

  return (
    <main className="auth-layout">

      {/* ── Panel de marca (izquierda) ── */}
      <section className="auth-brand">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="brand-logo-wrap anim-float-up">
          <img src="/logo-fbshop.png" alt="FBShop" className="brand-logo" />
        </div>

        <div className="brand-copy anim-float-up anim-delay-1">
          <div className="brand-tag">
            <span className="tag-dot" />
            Acceso seguro a FBShop
          </div>
          <h1>
            Bienvenido<br />de nuevo a <span className="accent-word">FBShop</span>
          </h1>
          <p>
            Inicia sesión para administrar la tienda, consultar el catálogo
            y continuar con una experiencia rápida y organizada.
          </p>
        </div>

        <ul className="brand-points anim-float-up anim-delay-2">
          {['Acceso para clientes', 'Panel administrativo', 'Diseño adaptable'].map(label => (
            <li key={label}>
              <span className="point-icon"><IconCheck /></span>
              {label}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Panel del formulario (derecha) ── */}
      <section className="auth-panel">
        <div className="auth-card anim-float-up anim-delay-1">
          <div className="auth-top">
            <Link to="/" className="back-link">← Volver a la tienda</Link>
          </div>

          <div className="auth-title">
            <h2>Iniciar sesión</h2>
            <p>Ingresa tu correo electrónico y contraseña.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group anim-float-up anim-delay-2">
              <label htmlFor="correo">Correo electrónico</label>
              <div className="input-wrap">
                <input
                  id="correo"
                  type="email"
                  placeholder="nombre@correo.com"
                  autoComplete="email"
                  value={correo}
                  onChange={e => setCorreo(e.target.value)}
                  required
                />
                <span className="input-icon"><IconMail /></span>
              </div>
            </div>

            <div className="form-group anim-float-up anim-delay-3">
              <label htmlFor="contrasena">Contraseña</label>
              <div className="input-wrap">
                <input
                  id="contrasena"
                  type={verPass ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                  value={contrasena}
                  onChange={e => setContrasena(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setVerPass(v => !v)}
                  aria-label={verPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  <IconEye open={verPass} />
                </button>
              </div>
            </div>

            <div className="form-options anim-float-up anim-delay-3">
              <label className="check">
                <input
                  type="checkbox"
                  id="recordarme"
                  checked={recordar}
                  onChange={e => setRecordar(e.target.checked)}
                />
                <span className="checkmark" />
                Recordarme
              </label>
              <button
                type="button"
                className="link-btn"
                onClick={() => mostrar('La recuperación de contraseña se conectará próximamente.', 'info')}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            {msg.texto && (
              <div className={`message message--${msg.tipo}`} role="alert">
                {msg.texto}
              </div>
            )}

            <button
              type="submit"
              className={`auth-button${loading ? ' loading' : ''}`}
              disabled={loading}
            >
              {loading ? <span className="btn-spinner" /> : 'Iniciar sesión'}
            </button>
          </form>

          <div className="demo-box">
            <strong>Credenciales de demo:</strong><br />
            Admin — <code>admin@fbshop.com</code> / <code>Admin123</code>
          </div>

          <div className="auth-footer">
            ¿Todavía no tienes cuenta?{' '}
            <Link to="/registro">Crear una cuenta</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
