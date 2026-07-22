import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './dashboard.css'

/* ── Iconos SVG ── */
const icons = {
  home:    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="17" height="17"><path d="M3 9.5L10 3l7 6.5V18a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M7 19v-7h6v7"/></svg>,
  box:     <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="17" height="17"><path d="M2 6l8-3 8 3v8l-8 3-8-3V6z"/><path d="M2 6l8 3 8-3M10 9v10"/></svg>,
  tag:     <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="17" height="17"><path d="M3 3h6l8 8-6 6-8-8V3z"/><circle cx="7" cy="7" r="1.2" fill="currentColor"/></svg>,
  cart:    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="17" height="17"><path d="M1 1h3l2 9h9l2-6H6"/><circle cx="9" cy="17" r="1.3" fill="currentColor"/><circle cx="15" cy="17" r="1.3" fill="currentColor"/></svg>,
  users:   <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="17" height="17"><circle cx="8" cy="7" r="3"/><path d="M2 18c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M14 4c1.7 0 3 1.3 3 3s-1.3 3-3 3"/><path d="M18 18c0-2.8-1.8-5.1-4-5.8"/></svg>,
  chart:   <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="17" height="17"><rect x="3" y="11" width="3" height="6" rx="1"/><rect x="8.5" y="7" width="3" height="10" rx="1"/><rect x="14" y="3" width="3" height="14" rx="1"/></svg>,
  gear:    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="17" height="17"><circle cx="10" cy="10" r="3"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4"/></svg>,
  store:   <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="17" height="17"><path d="M2 8h16l-1.5 9H3.5L2 8z"/><path d="M6 8V5a4 4 0 0 1 8 0v3"/></svg>,
  logout:  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="17" height="17"><path d="M13 15l4-5-4-5"/><path d="M17 10H8"/><path d="M8 3H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h4"/></svg>,
  menu:    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.9" width="18" height="18"><path d="M3 5h14M3 10h14M3 15h14"/></svg>,
  check:   <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" width="14" height="14"><path d="M2.5 8l3.5 3.5 7-7"/></svg>,
  bell:    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="17" height="17"><path d="M10 2a6 6 0 0 1 6 6c0 3 1.5 4 1.5 5H2.5C2.5 12 4 11 4 8a6 6 0 0 1 6-6z"/><path d="M8 17a2 2 0 0 0 4 0"/></svg>,
  plus:    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M10 4v12M4 10h12"/></svg>,
  edit:    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="15" height="15"><path d="M13.5 3.5l3 3L7 16H4v-3L13.5 3.5z"/></svg>,
  trash:   <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" width="15" height="15"><path d="M4 6h12M8 6V4h4v2M7 10v5M13 10v5M5 6l1 12h8l1-12"/></svg>,
  close:   <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M5 5l10 10M15 5L5 15"/></svg>,
}

const MENU = [
  { id: 'inicio',     label: 'Inicio',      icon: icons.home  },
  { id: 'productos',  label: 'Productos',   icon: icons.box   },
  { id: 'categorias', label: 'Categorías',  icon: icons.tag   },
  { id: 'pedidos',    label: 'Pedidos',     icon: icons.cart  },
  { id: 'usuarios',   label: 'Usuarios',    icon: icons.users },
  { id: 'reportes',   label: 'Reportes',    icon: icons.chart },
]

/* ─────────────────────────────────────────────
   MODAL GENÉRICO
───────────────────────────────────────────── */
function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>{icons.close}</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   MÓDULO PRODUCTOS
───────────────────────────────────────────── */
function ModuloProductos({ categorias }) {
  const [productos, setProductos] = useState([])
  const [cargando,  setCargando]  = useState(true)
  const [modal,     setModal]     = useState(null)   // null | 'crear' | producto
  const [form,      setForm]      = useState({})
  const [msg,       setMsg]       = useState('')
  const [eliminando, setEliminando] = useState(null)

  const fetchProductos = async () => {
    try {
      setCargando(true)
      const res  = await fetch('/api/admin/productos')
      const data = await res.json()
      setProductos(data.productos || [])
    } catch {
      setMsg('Error al cargar los productos.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { fetchProductos() }, [])

  const abrirCrear = () => {
    setForm({ category_id: '', name: '', description: '', price: '', stock: '', image_url: '', status: 'disponible' })
    setModal('crear')
    setMsg('')
  }

  const abrirEditar = (p) => {
    setForm({ category_id: p.category_id, name: p.nombre, description: p.descripcion || '', price: p.precio, stock: p.stock, image_url: p.imagen || '', status: p.status })
    setModal(p)
    setMsg('')
  }

  const cerrar = () => { setModal(null); setMsg('') }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleGuardar = async e => {
    e.preventDefault()
    const editando = modal !== 'crear'
    const url    = editando ? `/api/admin/productos/${modal.id}` : '/api/admin/productos'
    const method = editando ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), stock: parseInt(form.stock, 10) }),
      })
      const data = await res.json()
      if (!res.ok) {
        const errores = data.errors ? Object.values(data.errors).flat().join(' ') : data.message
        setMsg(errores || 'Error al guardar.')
        return
      }
      cerrar()
      fetchProductos()
    } catch {
      setMsg('Error de conexión.')
    }
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return
    setEliminando(id)
    try {
      await fetch(`/api/admin/productos/${id}`, { method: 'DELETE' })
      fetchProductos()
    } catch {
      setMsg('Error al eliminar.')
    } finally {
      setEliminando(null)
    }
  }

  const statusBadge = s => {
    const map = { disponible: '#e8f8ef', agotado: '#fff3d9', inactivo: '#fdecea' }
    return <span style={{ background: map[s] || '#eee', color: '#333', borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>{s}</span>
  }

  return (
    <div className="module-card anim-float-up">
      <div className="module-header">
        <div>
          <h2>Productos</h2>
          <p>Gestiona el catálogo completo de la tienda.</p>
        </div>
        <button className="btn-primary" onClick={abrirCrear}>{icons.plus} Nuevo producto</button>
      </div>

      {msg && <div className="form-error">{msg}</div>}

      {cargando ? (
        <p className="loading-text">Cargando productos…</p>
      ) : productos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{icons.box}</div>
          <strong>Sin productos registrados</strong>
          <small>Crea el primero usando el botón de arriba.</small>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id}>
                  <td>
                    <div className="tabla-producto">
                      {p.imagen && <img src={p.imagen} alt={p.nombre} className="tabla-img" />}
                      <span>{p.nombre}</span>
                    </div>
                  </td>
                  <td>{p.categoria}</td>
                  <td>${Number(p.precio).toFixed(2)}</td>
                  <td>{p.stock}</td>
                  <td>{statusBadge(p.status)}</td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon btn-edit" onClick={() => abrirEditar(p)} title="Editar">{icons.edit}</button>
                      <button className="btn-icon btn-delete" onClick={() => handleEliminar(p.id)} disabled={eliminando === p.id} title="Eliminar">{icons.trash}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal title={modal === 'crear' ? 'Nuevo producto' : `Editar: ${modal.nombre}`} onClose={cerrar}>
          <form onSubmit={handleGuardar} className="admin-form">
            <div className="form-grid-2">
              <div className="form-group">
                <label>Nombre *</label>
                <input name="name" value={form.name} onChange={handleChange} required maxLength={150} />
              </div>
              <div className="form-group">
                <label>Categoría *</label>
                <select name="category_id" value={form.category_id} onChange={handleChange} required>
                  <option value="">— Selecciona —</option>
                  {categorias.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} maxLength={1000} />
            </div>
            <div className="form-grid-3">
              <div className="form-group">
                <label>Precio *</label>
                <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Stock *</label>
                <input name="stock" type="number" min="0" step="1" value={form.stock} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Estado *</label>
                <select name="status" value={form.status} onChange={handleChange} required>
                  <option value="disponible">Disponible</option>
                  <option value="agotado">Agotado</option>
                  <option value="inactivo">Inactivo</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>URL de imagen</label>
              <input name="image_url" type="url" value={form.image_url} onChange={handleChange} placeholder="https://..." />
            </div>
            {msg && <div className="form-error">{msg}</div>}
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={cerrar}>Cancelar</button>
              <button type="submit" className="btn-primary">Guardar</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   MÓDULO CATEGORÍAS
───────────────────────────────────────────── */
function ModuloCategorias({ onCategoriasChange }) {
  const [categorias, setCategorias] = useState([])
  const [cargando, setCargando]     = useState(true)
  const [modal,    setModal]        = useState(null)
  const [form,     setForm]         = useState({})
  const [msg,      setMsg]          = useState('')

  const fetchCategorias = async () => {
    try {
      setCargando(true)
      const res  = await fetch('/api/admin/categorias')
      const data = await res.json()
      const lista = data.categorias || []
      setCategorias(lista)
      onCategoriasChange?.(lista)
    } catch {
      setMsg('Error al cargar las categorías.')
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => { fetchCategorias() }, [])

  const abrirCrear = () => { setForm({ name: '', description: '' }); setModal('crear'); setMsg('') }
  const abrirEditar = c => { setForm({ name: c.name, description: c.description || '' }); setModal(c); setMsg('') }
  const cerrar = () => { setModal(null); setMsg('') }

  const handleChange = e => { const { name, value } = e.target; setForm(f => ({ ...f, [name]: value })) }

  const handleGuardar = async e => {
    e.preventDefault()
    const editando = modal !== 'crear'
    const url    = editando ? `/api/admin/categorias/${modal.id}` : '/api/admin/categorias'
    const method = editando ? 'PUT' : 'POST'

    try {
      const res  = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        const errores = data.errors ? Object.values(data.errors).flat().join(' ') : data.message
        setMsg(errores || 'Error al guardar.')
        return
      }
      cerrar()
      fetchCategorias()
    } catch {
      setMsg('Error de conexión.')
    }
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar esta categoría? Solo se puede si no tiene productos asociados.')) return
    try {
      const res  = await fetch(`/api/admin/categorias/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) { setMsg(data.message); return }
      fetchCategorias()
    } catch {
      setMsg('Error al eliminar.')
    }
  }

  return (
    <div className="module-card anim-float-up">
      <div className="module-header">
        <div>
          <h2>Categorías</h2>
          <p>Organiza los productos en grupos.</p>
        </div>
        <button className="btn-primary" onClick={abrirCrear}>{icons.plus} Nueva categoría</button>
      </div>

      {msg && <div className="form-error">{msg}</div>}

      {cargando ? (
        <p className="loading-text">Cargando categorías…</p>
      ) : categorias.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">{icons.tag}</div>
          <strong>Sin categorías registradas</strong>
          <small>Crea la primera categoría antes de agregar productos.</small>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map(c => (
                <tr key={c.id}>
                  <td><strong>{c.name}</strong></td>
                  <td>{c.description || <span style={{ color: '#aaa' }}>Sin descripción</span>}</td>
                  <td>
                    <span style={{ background: c.is_active ? '#e8f8ef' : '#fdecea', color: '#333', borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>
                      {c.is_active ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-icon btn-edit" onClick={() => abrirEditar(c)} title="Editar">{icons.edit}</button>
                      <button className="btn-icon btn-delete" onClick={() => handleEliminar(c.id)} title="Eliminar">{icons.trash}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modal && (
        <Modal title={modal === 'crear' ? 'Nueva categoría' : `Editar: ${modal.name}`} onClose={cerrar}>
          <form onSubmit={handleGuardar} className="admin-form">
            <div className="form-group">
              <label>Nombre *</label>
              <input name="name" value={form.name} onChange={handleChange} required maxLength={100} />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} maxLength={500} />
            </div>
            {msg && <div className="form-error">{msg}</div>}
            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={cerrar}>Cancelar</button>
              <button type="submit" className="btn-primary">Guardar</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   VISTA PLACEHOLDER
───────────────────────────────────────────── */
function ModuleEmpty({ icon, title, desc }) {
  return (
    <div className="module-card">
      <h2>{title}</h2>
      <p>{desc}</p>
      <div className="module-placeholder">
        <div className="placeholder-inner">
          <span className="placeholder-icon">{icon}</span>
          <strong>{title}</strong>
          <small>Preparado para conectarse con la API del backend.</small>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   DASHBOARD PRINCIPAL
───────────────────────────────────────────── */
const QUICK = [
  { id: 'productos',  label: 'Agregar producto', sub: 'Preparar catálogo',     icon: icons.box   },
  { id: 'pedidos',    label: 'Ver pedidos',       sub: 'Consultar solicitudes', icon: icons.cart  },
  { id: 'usuarios',   label: 'Ver usuarios',      sub: 'Administrar cuentas',   icon: icons.users },
  { id: 'reportes',   label: 'Ver reportes',      sub: 'Consultar resultados',  icon: icons.chart },
]

const ACTIVITY = [
  { icon: icons.check, title: 'Catálogo conectado',       desc: 'Los productos se cargan desde la base de datos.',       time: 'Ahora' },
  { icon: icons.users, title: 'Sesión administrativa',    desc: 'Acceso correcto al panel de control.',                  time: 'Ahora' },
  { icon: icons.gear,  title: 'Módulos habilitados',      desc: 'Productos y categorías con CRUD completo disponible.',  time: 'Hoy'   },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [sesion,      setSesion]     = useState(null)
  const [vista,       setVista]      = useState('inicio')
  const [sidebarOpen, setSidebar]    = useState(false)
  const [usuarios,    setUsuarios]   = useState([])
  const [categorias,  setCategorias] = useState([])

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem('fbshopSesion') || 'null')
    if (!s || s.rol !== 'administrador') {
      navigate('/login', { replace: true }); return
    }
    setSesion(s)
    setUsuarios(JSON.parse(localStorage.getItem('fbshopUsuarios') || '[]'))
  }, [navigate])

  const cerrarSesion = useCallback(() => {
    localStorage.removeItem('fbshopSesion')
    navigate('/login')
  }, [navigate])

  const cambiarVista = useCallback(id => {
    setVista(id)
    setSidebar(false)
  }, [])

  if (!sesion) return null

  const titulos = {
    inicio: 'Panel administrativo', productos: 'Productos', categorias: 'Categorías',
    pedidos: 'Pedidos', usuarios: 'Usuarios', reportes: 'Reportes', configuracion: 'Configuración',
  }

  const STATS = [
    { label: 'Categorías',         value: categorias.length || '—', note: 'Registradas',       icon: icons.tag,   color: '#fff3d9' },
    { label: 'Pedidos pendientes', value: '0',                      note: 'Sin pendientes',     icon: icons.cart,  color: '#e8f8ef' },
    { label: 'Usuarios',           value: (usuarios.length + 1),    note: 'Cuenta activa',      icon: icons.users, color: '#f1eaff' },
  ]

  return (
    <div className="dashboard-layout">

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebar(false)} />}

      {/* ── Sidebar ── */}
      <aside className={`sidebar${sidebarOpen ? ' visible' : ''}`} id="sidebar">
        <a href="/" className="sidebar-logo-wrap">
          <img src="/logo-fbshop.png" alt="FBShop" className="sidebar-logo" />
        </a>

        <div className="admin-profile">
          <div className="avatar">{sesion.nombre.charAt(0).toUpperCase()}</div>
          <div className="admin-info">
            <strong>{sesion.nombre}</strong>
            <span>{sesion.correo}</span>
          </div>
        </div>

        <div className="menu-label">Administración</div>
        <ul className="sidebar-menu">
          {MENU.map(item => (
            <li key={item.id}>
              <button
                className={vista === item.id ? 'active' : ''}
                onClick={() => cambiarVista(item.id)}
              >
                <span className="menu-icon">{item.icon}</span>
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="menu-label">Sistema</div>
        <ul className="sidebar-menu">
          <li>
            <button onClick={() => cambiarVista('configuracion')}>
              <span className="menu-icon">{icons.gear}</span>
              Configuración
            </button>
          </li>
          <li>
            <Link to="/">
              <span className="menu-icon">{icons.store}</span>
              Ver tienda
            </Link>
          </li>
        </ul>
      </aside>

      {/* ── Contenido principal ── */}
      <main className="dashboard-main">

        {/* Topbar */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="menu-toggle" onClick={() => setSidebar(s => !s)} aria-label="Abrir menú">
              {icons.menu}
            </button>
            <div>
              <h1>{titulos[vista] || 'Panel administrativo'}</h1>
              <p>Control general de FBShop</p>
            </div>
          </div>

          <div className="topbar-actions">
            <Link to="/" className="store-link">
              {icons.store}
              <span>Ir a la tienda</span>
            </Link>
            <button className="logout-btn" onClick={cerrarSesion}>
              {icons.logout}
              Cerrar sesión
            </button>
          </div>
        </header>

        <div className="content">

          {/* ── Vista: Inicio ── */}
          {vista === 'inicio' && (
            <div className="anim-float-up">
              <div className="welcome">
                <span>Resumen general</span>
                <h2>Bienvenido al panel de FBShop</h2>
                <p>Supervisa productos, categorías, pedidos, usuarios y las funciones principales de la tienda.</p>
                <div className="welcome-circle" />
              </div>

              <div className="stats-grid">
                {STATS.map((s, i) => (
                  <article key={s.label} className="stat-card anim-float-up" style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="stat-top">
                      <div className="stat-icon" style={{ background: s.color }}>{s.icon}</div>
                      <span className="stat-change">{s.note}</span>
                    </div>
                    <small>{s.label}</small>
                    <strong>{s.value}</strong>
                  </article>
                ))}
              </div>

              <div className="dashboard-grid">
                <section className="panel">
                  <div className="panel-header"><h3>Actividad reciente</h3><small>Hoy</small></div>
                  <div className="panel-body">
                    <div className="activity-list">
                      {ACTIVITY.map((a, i) => (
                        <article key={i} className="activity anim-float-up" style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                          <div className="activity-icon">{a.icon}</div>
                          <div><strong>{a.title}</strong><p>{a.desc}</p></div>
                          <time>{a.time}</time>
                        </article>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="panel">
                  <div className="panel-header"><h3>Acciones rápidas</h3></div>
                  <div className="panel-body">
                    <div className="quick-actions">
                      {QUICK.map((q, i) => (
                        <button key={q.id} className="quick-action anim-float-up" style={{ animationDelay: `${0.15 + i * 0.08}s` }} onClick={() => cambiarVista(q.id)}>
                          <span className="qa-icon">{q.icon}</span>
                          <strong>{q.label}</strong>
                          <small>{q.sub}</small>
                        </button>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {vista === 'productos'  && <ModuloProductos categorias={categorias} />}
          {vista === 'categorias' && <ModuloCategorias onCategoriasChange={setCategorias} />}

          {vista === 'pedidos' && (
            <ModuleEmpty icon={icons.cart}  title="Administración de pedidos" desc="Consulta y actualiza el estado de las compras realizadas." />
          )}

          {vista === 'usuarios' && (
            <div className="module-card anim-float-up">
              <h2>Administración de usuarios</h2>
              <p>Consulta las cuentas registradas.</p>
              <div className="users-list">
                {usuarios.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">{icons.users}</div>
                    <strong>Sin clientes registrados</strong>
                    <small>Los nuevos registros aparecerán aquí.</small>
                  </div>
                ) : (
                  usuarios.map((u, i) => (
                    <div key={i} className="user-row anim-float-up" style={{ animationDelay: `${i * 0.07}s` }}>
                      <div className="user-avatar">{u.nombre.charAt(0).toUpperCase()}</div>
                      <div><strong>{u.nombre}</strong><span>{u.correo}</span></div>
                      <span className="user-badge">Cliente</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {vista === 'reportes'      && <ModuleEmpty icon={icons.chart} title="Reportes"      desc="Este espacio permitirá mostrar ventas, productos y actividad general." />}
          {vista === 'configuracion' && <ModuleEmpty icon={icons.gear}  title="Configuración" desc="Personaliza los datos generales de FBShop." />}
        </div>
      </main>
    </div>
  )
}
