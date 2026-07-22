import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './auth.css'

/* ── Iconos ── */
const IconUser = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" width="18" height="18">
    <circle cx="10" cy="7" r="3.5"/>
    <path d="M2.5 18c0-4 3.4-7 7.5-7s7.5 3 7.5 7"/>
  </svg>
)

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

/* ── Indicador de fortaleza de contraseña ── */
function StrengthBar({ password }) {
  const score = (() => {
    if (!password) return 0
    let s = 0
    if (password.length >= 8) s++
    if (/[A-Z]/.test(password)) s++
    if (/[0-9]/.test(password)) s++
    if (/[^A-Za-z0-9]/.test(password)) s++
    return s
  })()

  const labels = ['', 'Débil', 'Regular', 'Buena', 'Segura']
  const colors = ['', '#c83b3b', '#e8930a', '#2e6ee7', '#169d55']

  if (!password) return null
  return (
    <div className="strength-bar-wrap">
      <div className="strength-bars">
        {[1,2,3,4].map(i => (
          <div key={i} className="strength-seg" style={{
            background: i <= score ? colors[score] : 'var(--borde)',
            transition: 'background 0.3s var(--ease-premium)'
          }} />
        ))}
      </div>
      <span className="strength-label" style={{ color: colors[score] }}>
        {labels[score]}
      </span>
    </div>
  )
}

export default function Registro() {
  const navigate = useNavigate()
  const [form, setForm]           = useState({ nombre: '', correo: '', contrasena: '', confirmar: '' })
  const [verPass, setVerPass]     = useState({ contrasena: false, confirmar: false })
  const [terminos, setTerminos]   = useState(false)
  const [msg, setMsg]             = useState({ texto: '', tipo: '' })
  const [loading, setLoading]     = useState(false)

  const set = field => e => setForm(f => ({ ...f, [field]: e.target.value }))
  const togglePass = field => () => setVerPass(v => ({ ...v, [field]: !v[field] }))

  function mostrar(texto, tipo) { setMsg({ texto, tipo }) }

  async function handleSubmit(e) {
    e.preventDefault()
    const { nombre, correo, contrasena, confirmar } = form
    const correoN = correo.trim().toLowerCase()
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!nombre || !correo || !contrasena || !confirmar) {
      mostrar('Completa todos los campos.', 'error'); return
    }
    if (!re.test(correoN)) {
      mostrar('Ingresa un correo electrónico válido.', 'error'); return
    }
    if (contrasena.length < 8) {
      mostrar('La contraseña debe tener al menos 8 caracteres.', 'error'); return
    }
    if (contrasena !== confirmar) {
      mostrar('Las contraseñas no coinciden.', 'error'); return
    }
    if (!terminos) {
      mostrar('Debes aceptar los términos y condiciones.', 'error'); return
    }

    setLoading(true)
    await new Promise(r => setTimeout(r, 680))

    const usuarios = JSON.parse(localStorage.getItem('fbshopUsuarios') || '[]')
    if (correoN === 'admin@fbshop.com' || usuarios.some(u => u.correo === correoN)) {
      setLoading(false)
      mostrar('Ya existe una cuenta con ese correo.', 'error'); return
    }

    usuarios.push({ nombre: nombre.trim(), correo: correoN, contrasena })
    localStorage.setItem('fbshopUsuarios', JSON.stringify(usuarios))

    mostrar('Cuenta creada. Redirigiendo al login…', 'success')
    setTimeout(() => navigate('/login'), 1200)
  }

  return (
    <main className="auth-layout">

      {/* ── Panel de marca ── */}
      <section className="auth-brand">
        <div className="orb orb-1" />
        <div className="orb orb-2" />

        <div className="brand-logo-wrap anim-float-up">
          <img src="/logo-fbshop.png" alt="FBShop" className="brand-logo" />
        </div>

        <div className="brand-copy anim-float-up anim-delay-1">
          <div className="brand-tag">
            <span className="tag-dot" />
            Únete a nuestra comunidad
          </div>
          <h1>
            Crea tu cuenta<br />en <span className="accent-word">FBShop</span>
          </h1>
          <p>
            Regístrate para guardar tus datos, acceder más rápido y disfrutar
            de una experiencia personalizada dentro de la tienda.
          </p>
        </div>

        <ul className="brand-points anim-float-up anim-delay-2">
          {['Registro sencillo', 'Validación de datos', 'Acceso inmediato'].map(label => (
            <li key={label}>
              <span className="point-icon"><IconCheck /></span>
              {label}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Formulario ── */}
      <section className="auth-panel">
        <div className="auth-card anim-float-up anim-delay-1">
          <div className="auth-top">
            <Link to="/" className="back-link">← Volver a la tienda</Link>
          </div>

          <div className="auth-title">
            <h2>Crear cuenta</h2>
            <p>Completa tus datos para registrarte.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Nombre */}
            <div className="form-group anim-float-up anim-delay-2">
              <label htmlFor="nombre">Nombre completo</label>
              <div className="input-wrap">
                <input
                  id="nombre" type="text" placeholder="Tu nombre completo"
                  autoComplete="name" value={form.nombre} onChange={set('nombre')} required
                />
                <span className="input-icon"><IconUser /></span>
              </div>
            </div>

            {/* Correo */}
            <div className="form-group anim-float-up anim-delay-2">
              <label htmlFor="correo">Correo electrónico</label>
              <div className="input-wrap">
                <input
                  id="correo" type="email" placeholder="nombre@correo.com"
                  autoComplete="email" value={form.correo} onChange={set('correo')} required
                />
                <span className="input-icon"><IconMail /></span>
              </div>
            </div>

            {/* Contraseña */}
            <div className="form-group anim-float-up anim-delay-3">
              <label htmlFor="contrasena">Contraseña</label>
              <div className="input-wrap">
                <input
                  id="contrasena"
                  type={verPass.contrasena ? 'text' : 'password'}
                  placeholder="Mínimo 8 caracteres"
                  autoComplete="new-password"
                  value={form.contrasena} onChange={set('contrasena')} required
                />
                <button type="button" className="password-toggle"
                  onClick={togglePass('contrasena')}
                  aria-label={verPass.contrasena ? 'Ocultar' : 'Mostrar'}>
                  <IconEye open={verPass.contrasena} />
                </button>
              </div>
              <StrengthBar password={form.contrasena} />
            </div>

            {/* Confirmar */}
            <div className="form-group anim-float-up anim-delay-3">
              <label htmlFor="confirmar">Confirmar contraseña</label>
              <div className="input-wrap">
                <input
                  id="confirmar"
                  type={verPass.confirmar ? 'text' : 'password'}
                  placeholder="Repite tu contraseña"
                  autoComplete="new-password"
                  value={form.confirmar} onChange={set('confirmar')} required
                />
                <button type="button" className="password-toggle"
                  onClick={togglePass('confirmar')}
                  aria-label={verPass.confirmar ? 'Ocultar' : 'Mostrar'}>
                  <IconEye open={verPass.confirmar} />
                </button>
              </div>
            </div>

            <div className="form-options anim-float-up anim-delay-4">
              <label className="check">
                <input type="checkbox" id="terminos"
                  checked={terminos} onChange={e => setTerminos(e.target.checked)} />
                <span className="checkmark" />
                Acepto los términos y condiciones
              </label>
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
              {loading ? <span className="btn-spinner" /> : 'Crear cuenta'}
            </button>
          </form>

          <div className="auth-footer">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login">Iniciar sesión</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
