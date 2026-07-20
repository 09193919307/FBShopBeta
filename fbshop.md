![](data:image/png;base64...)![Universidad Politécnica de Pachuca](data:image/png;base64...)

**Primer avance**

**CompanyFB**

|  |
| --- |
| SFTW\_09\_02 |
| Mendoza García Johann Jehudiel  Piña Ruiz Iris Berenice  Reyes Magos Cristhian |
| Ingeniería en Software, Universidad Politécnica de Pachuca |
| Arquitectura Orientada a Servicios |
| Jazmin Rodriguez Flores |
| 09/07/2026 |

Índice de Contenido

[1. Introducción 4](#_Toc234484653)

[2. Descripción general y alcance del proyecto 4](#_Toc234484654)

[2.1 Objetivo general 4](#_Toc234484655)

[2.2 Objetivos específicos 4](#_Toc234484656)

[2.3 Alcance del primer avance 4](#_Toc234484657)

[3. Casos de uso, historias de usuario y requisitos 5](#_Toc234484658)

[3.1 Actores del sistema 5](#_Toc234484659)

[3.2 Casos de uso principales 5](#_Toc234484660)

[3.3 Requisitos funcionales 5](#_Toc234484661)

[3.4 Requisitos no funcionales 5](#_Toc234484662)

[3.5 Historias de usuario valoradas 6](#_Toc234484663)

[Resumen de puntos de historia 10](#_Toc234484664)

[4. Base de datos NoSQL para productos 10](#_Toc234484665)

[4.1 Colección principal: productos 10](#_Toc234484666)

[4.2 Campos de la colección productos 10](#_Toc234484667)

[4.3 Justificación de uso NoSQL 11](#_Toc234484668)

[5. Base de datos relacional completa 12](#_Toc234484669)

[5.1 Tabla: usuarios 12](#_Toc234484670)

[5.2 Tabla: categorias 12](#_Toc234484671)

[5.3 Tabla: productos 12](#_Toc234484672)

[5.4 Tabla: pedidos 13](#_Toc234484673)

[5.5 Tabla: detalle\_pedido 13](#_Toc234484674)

[5.6 Tabla: pagos 13](#_Toc234484675)

[5.7 Relaciones principales 13](#_Toc234484676)

[6. Metodología Scrum 13](#_Toc234484677)

[6.1 Roles Scrum 13](#_Toc234484678)

[6.2 Product Backlog 13](#_Toc234484679)

[6.3 Sprint propuesto 14](#_Toc234484680)

[6.4 Gráfica de quemado 14](#_Toc234484681)

[6.5 Tablero Trello 16](#_Toc234484682)

[6.6 Tarjetas sugeridas para Trello 16](#_Toc234484683)

[7. Organización en Drive, GitHub y Trello 16](#_Toc234484684)

[7.1 Google Drive 16](#_Toc234484685)

[7.2 GitHub 16](#_Toc234484686)

[7.3 Comandos sugeridos para Git 16](#_Toc234484687)

[8. Arquitectura propuesta del sistema 17](#_Toc234484688)

[8.1 Flujo general 17](#_Toc234484689)

[9. Herramientas utilizadas 17](#_Toc234484690)

[10. Conclusión 17](#_Toc234484691)

[Anexo A. Evidencias recomendadas para entregar 17](#_Toc234484692)

[11. Anexo de evidencias: Trello, GitHub, Docker y Render 18](#_Toc234484693)

[11.1 Repositorio GitHub del proyecto FBShop 18](#_Toc234484694)

[Archivos clave esperados en GitHub 18](#_Toc234484695)

[Comandos utilizados para evidenciar GitHub 18](#_Toc234484696)

[11.2 Evidencia de Docker 18](#_Toc234484697)

[Comandos sugeridos para comprobar Docker 18](#_Toc234484698)

[11.3 Tablero Trello para Scrum 19](#_Toc234484699)

[Tarjetas con checklist sugerido 19](#_Toc234484700)

[Capturas obligatorias de Trello 19](#_Toc234484701)

[11.4 Evidencia de Render 19](#_Toc234484702)

[11.5 Checklist final de entrega 20](#_Toc234484703)

# 1. Introducción

El presente documento corresponde al primer avance del proyecto FBShop, una plataforma web orientada a la venta y visualización de productos en línea. El proyecto busca integrar una arquitectura funcional basada en frontend, backend, base de datos, control de versiones y despliegue en la nube.

FBShop se plantea como una solución académica de comercio electrónico que permite consultar productos, mostrar información relevante al usuario y preparar la estructura necesaria para futuras funciones como carrito de compras, administración de inventario, pedidos y gestión de usuarios.

Durante este primer avance se definen los requisitos del sistema, las historias de usuario, los casos de uso, la propuesta de base de datos NoSQL para productos, el diseño de una base de datos relacional completa y la metodología de trabajo mediante Scrum.

# 2. Descripción general y alcance del proyecto

## 2.1 Objetivo general

Desarrollar una plataforma web de ventas que permita mostrar productos mediante una interfaz clara y conectarse con un servicio backend para consultar información desde una API, utilizando buenas prácticas de desarrollo, documentación, control de versiones y despliegue.

## 2.2 Objetivos específicos

|  |  |
| --- | --- |
| **Objetivo** | **Descripción** |
| Diseñar una interfaz web | Crear una página visualmente clara para mostrar la tienda y sus productos. |
| Crear un backend funcional | Desarrollar una API para consultar productos y preparar operaciones de administración. |
| Diseñar bases de datos | Proponer una base NoSQL para productos y una base relacional completa. |
| Usar control de versiones | Mantener el código fuente organizado mediante GitHub. |
| Aplicar Scrum | Organizar el trabajo mediante historias de usuario, tareas y tablero Trello. |
| Documentar evidencias | Guardar capturas, avances y recursos en Google Drive. |

## 2.3 Alcance del primer avance

|  |  |
| --- | --- |
| **Elemento** | **Estado** |
| Definición de requisitos | Propuesto |
| Historias de usuario | Propuestas y valoradas |
| Casos de uso | Definidos |
| Base de datos NoSQL | Diseñada para productos |
| Base de datos relacional | Diseñada de forma completa |
| Metodología Scrum | Definida |
| Tablero Trello | Propuesto |
| GitHub | Considerado para control de versiones |
| Drive | Considerado para evidencias |

# 3. Casos de uso, historias de usuario y requisitos

## 3.1 Actores del sistema

|  |  |
| --- | --- |
| **Actor** | **Descripción** |
| Usuario visitante | Persona que ingresa a la página para consultar productos. |
| Cliente | Usuario que podrá visualizar productos y realizar compras en una etapa futura. |
| Administrador | Persona encargada de registrar, editar, eliminar o desactivar productos. |
| Desarrollador | Encargado de construir, desplegar y mantener el sistema. |

## 3.2 Casos de uso principales

|  |  |  |  |
| --- | --- | --- | --- |
| **ID** | **Caso de uso** | **Actor principal** | **Descripción** |
| CU-01 | Visualizar página principal | Usuario visitante | El usuario ingresa al sitio y visualiza la pantalla principal de FBShop. |
| CU-02 | Consultar productos | Usuario visitante / Cliente | El usuario observa los productos disponibles en la tienda. |
| CU-03 | Consultar API de productos | Sistema / Desarrollador | El sistema obtiene los productos desde un endpoint del backend. |
| CU-04 | Registrar producto | Administrador | El administrador agrega nuevos productos al catálogo. |
| CU-05 | Actualizar producto | Administrador | El administrador modifica información de un producto existente. |
| CU-06 | Eliminar producto | Administrador | El administrador elimina o desactiva productos del catálogo. |
| CU-07 | Desplegar aplicación | Desarrollador | El desarrollador publica el proyecto en un servicio en la nube. |

## 3.3 Requisitos funcionales

|  |  |  |
| --- | --- | --- |
| **Clave** | **Requisito funcional** | **Prioridad** |
| RF-01 | El sistema debe mostrar una página principal de FBShop. | Alta |
| RF-02 | El sistema debe mostrar una lista de productos disponibles. | Alta |
| RF-03 | El sistema debe consumir una API para obtener los productos. | Alta |
| RF-04 | El sistema debe permitir registrar productos. | Alta |
| RF-05 | El sistema debe permitir editar productos existentes. | Media |
| RF-06 | El sistema debe permitir eliminar o desactivar productos. | Media |
| RF-07 | El sistema debe manejar categorías de productos. | Media |
| RF-08 | El sistema debe preparar la estructura para pedidos o compras. | Media |
| RF-09 | El sistema debe estar disponible mediante despliegue en la nube. | Alta |
| RF-10 | El sistema debe estar versionado en GitHub. | Alta |

## 3.4 Requisitos no funcionales

|  |  |  |
| --- | --- | --- |
| **Clave** | **Requisito no funcional** | **Descripción** |
| RNF-01 | Usabilidad | La interfaz debe ser sencilla, clara y fácil de navegar. |
| RNF-02 | Rendimiento | La API debe responder de forma rápida al consultar productos. |
| RNF-03 | Escalabilidad | La estructura debe permitir agregar nuevas funciones en el futuro. |
| RNF-04 | Seguridad | Las contraseñas deberán almacenarse cifradas en futuras etapas. |
| RNF-05 | Disponibilidad | El sistema deberá poder publicarse en internet. |
| RNF-06 | Mantenibilidad | El código debe estar organizado y documentado. |
| RNF-07 | Compatibilidad | La plataforma debe funcionar en navegadores modernos. |
| RNF-08 | Portabilidad | El proyecto debe poder ejecutarse mediante Docker. |

## 3.5 Historias de usuario valoradas

A continuación se presentan las 12 historias de usuario del proyecto FBShop con el formato solicitado: título, rol, necesidad, beneficio, criterios de aceptación y puntos de historia.

|  |  |  |
| --- | --- | --- |
| **Historia de Usuario 1** | | |
| **Título** | Visualizar página principal | |
| **CÓMO:** | Usuario visitante | |
| **QUIERO:** | Ver una página principal atractiva de FBShop | |
| **PARA:** | Conocer la tienda, sus productos y su propósito | |
| **Criterios de aceptación** | **CA1. Cargar página principal**   * CUANDO el usuario ingrese al sitio, ENTONCES deberá visualizar el nombre de FBShop, menú y contenido principal.   **CA2. Mostrar diseño correcto**   * CUANDO se abra la página, ENTONCES deberá mostrarse correctamente en navegador. | |
| **Puntos de historia** | **5** |

|  |  |  |
| --- | --- | --- |
| **Historia de Usuario 2** | | |
| **Título** | Consultar catálogo de productos | |
| **CÓMO:** | Usuario visitante | |
| **QUIERO:** | Visualizar los productos disponibles | |
| **PARA:** | Conocer qué artículos puedo comprar | |
| **Criterios de aceptación** | **CA1. Mostrar productos**   * CUANDO el usuario entre al catálogo, ENTONCES deberá ver los productos disponibles.   **CA2. Mostrar información básica**   * CUANDO se carguen los productos, ENTONCES cada producto deberá mostrar nombre, precio, imagen y descripción breve. | |
| **Puntos de historia** | **8** |

|  |  |  |
| --- | --- | --- |
| **Historia de Usuario 3** | | |
| **Título** | Consultar detalles de producto | |
| **CÓMO:** | Usuario visitante | |
| **QUIERO:** | Ver la información completa de un producto | |
| **PARA:** | Decidir si me interesa comprarlo | |
| **Criterios de aceptación** | **CA1. Abrir detalle del producto**   * CUANDO el usuario seleccione un producto, ENTONCES deberá mostrarse su información completa.   **CA2. Mostrar datos completos**   * CUANDO se abra el detalle, ENTONCES deberá mostrar nombre, precio, descripción, categoría, imagen y disponibilidad. | |
| **Puntos de historia** | **8** |

|  |  |  |
| --- | --- | --- |
| **Historia de Usuario 4** | | |
| **Título** | Consumir API de productos | |
| **CÓMO:** | Sistema | |
| **QUIERO:** | Obtener los productos desde una API | |
| **PARA:** | Mostrar información actualizada desde el backend | |
| **Criterios de aceptación** | **CA1. Obtener productos**   * CUANDO el frontend solicite los productos, ENTONCES la API deberá responder con datos en formato JSON.   **CA2. Mostrar respuesta correcta**   * CUANDO la API responda, ENTONCES los productos deberán mostrarse en la página. | |
| **Puntos de historia** | **8** |

|  |  |  |
| --- | --- | --- |
| **Historia de Usuario 5** | | |
| **Título** | Registrar productos | |
| **CÓMO:** | Administrador | |
| **QUIERO:** | Agregar nuevos productos al sistema | |
| **PARA:** | Mantener actualizado el catálogo de FBShop | |
| **Criterios de aceptación** | **CA1. Capturar producto**   * CUANDO el administrador registre un producto, ENTONCES deberá ingresar nombre, precio, descripción, categoría, stock e imagen.   **CA2. Guardar producto**   * CUANDO se envíe el formulario, ENTONCES el producto deberá almacenarse correctamente. | |
| **Puntos de historia** | **13** |

|  |  |  |
| --- | --- | --- |
| **Historia de Usuario 6** | | |
| **Título** | Editar productos | |
| **CÓMO:** | Administrador | |
| **QUIERO:** | Modificar la información de un producto existente | |
| **PARA:** | Corregir datos o actualizar precios y existencias | |
| **Criterios de aceptación** | **CA1. Seleccionar producto**   * CUANDO el administrador elija un producto, ENTONCES deberá poder ver sus datos actuales.   **CA2. Actualizar información**   * CUANDO el administrador guarde los cambios, ENTONCES la información deberá actualizarse correctamente. | |
| **Puntos de historia** | **8** |

|  |  |  |
| --- | --- | --- |
| **Historia de Usuario 7** | | |
| **Título** | Eliminar o desactivar productos | |
| **CÓMO:** | Administrador | |
| **QUIERO:** | Eliminar o desactivar productos del catálogo | |
| **PARA:** | Evitar mostrar productos agotados o no disponibles | |
| **Criterios de aceptación** | **CA1. Desactivar producto**   * CUANDO el administrador desactive un producto, ENTONCES ya no deberá aparecer como disponible.   **CA2. Confirmar acción**   * CUANDO se elimine o desactive un producto, ENTONCES el sistema deberá solicitar confirmación. | |
| **Puntos de historia** | **8** |

|  |  |  |
| --- | --- | --- |
| **Historia de Usuario 8** | | |
| **Título** | Gestionar categorías | |
| **CÓMO:** | Administrador | |
| **QUIERO:** | Crear y administrar categorías de productos | |
| **PARA:** | Organizar mejor el catálogo de la tienda | |
| **Criterios de aceptación** | **CA1. Crear categoría**   * CUANDO el administrador registre una categoría, ENTONCES deberá guardarse con nombre y descripción.   **CA2. Asociar productos**   * CUANDO se registre un producto, ENTONCES deberá poder asignarse a una categoría. | |
| **Puntos de historia** | **5** |

|  |  |  |
| --- | --- | --- |
| **Historia de Usuario 9** | | |
| **Título** | Agregar productos al carrito | |
| **CÓMO:** | Cliente | |
| **QUIERO:** | Agregar productos a un carrito de compras | |
| **PARA:** | Preparar una compra con varios artículos | |
| **Criterios de aceptación** | **CA1. Agregar producto**   * CUANDO el cliente presione “Agregar al carrito”, ENTONCES el producto deberá añadirse al carrito.   **CA2. Mostrar cantidad**   * CUANDO se agreguen productos, ENTONCES el carrito deberá mostrar la cantidad total de artículos. | |
| **Puntos de historia** | **13** |

|  |  |  |
| --- | --- | --- |
| **Historia de Usuario 10** | | |
| **Título** | Visualizar carrito de compras | |
| **CÓMO:** | Cliente | |
| **QUIERO:** | Ver los productos agregados al carrito | |
| **PARA:** | Revisar mi compra antes de continuar | |
| **Criterios de aceptación** | **CA1. Mostrar carrito**   * CUANDO el cliente abra el carrito, ENTONCES deberá ver los productos agregados.   **CA2. Calcular total**   * CUANDO existan productos en el carrito, ENTONCES el sistema deberá mostrar subtotal y total de compra. | |
| **Puntos de historia** | **8** |

|  |  |  |
| --- | --- | --- |
| **Historia de Usuario 11** | | |
| **Título** | Desplegar proyecto con Docker | |
| **CÓMO:** | Desarrollador | |
| **QUIERO:** | Ejecutar FBShop mediante Docker | |
| **PARA:** | Facilitar la instalación, ejecución y despliegue del proyecto | |
| **Criterios de aceptación** | **CA1. Crear contenedor**   * CUANDO se ejecute Docker, ENTONCES el proyecto deberá levantarse correctamente.   **CA2. Acceder al sistema**   * CUANDO el contenedor esté activo, ENTONCES el sitio deberá abrirse desde el navegador. | |
| **Puntos de historia** | **5** |

|  |  |  |
| --- | --- | --- |
| **Historia de Usuario 12** | | |
| **Título** | Publicar proyecto en línea | |
| **CÓMO:** | Desarrollador | |
| **QUIERO:** | Desplegar FBShop en Render | |
| **PARA:** | Tener el sistema disponible mediante una URL pública | |
| **Criterios de aceptación** | **CA1. Desplegar servicio**   * CUANDO se realice el despliegue en Render, ENTONCES el servicio deberá quedar en estado activo.   **CA2. Abrir URL pública**   * CUANDO el usuario ingrese a la URL del proyecto, ENTONCES deberá visualizar correctamente FBShop. | |
| **Puntos de historia** | **5** |

### Resumen de puntos de historia

|  |  |
| --- | --- |
| **Historia** | **Puntos** |
| HU-01 Visualizar página principal | 5 |
| HU-02 Consultar catálogo de productos | 8 |
| HU-03 Consultar detalles de producto | 8 |
| HU-04 Consumir API de productos | 8 |
| HU-05 Registrar productos | 13 |
| HU-06 Editar productos | 8 |
| HU-07 Eliminar o desactivar productos | 8 |
| HU-08 Gestionar categorías | 5 |
| HU-09 Agregar productos al carrito | 13 |
| HU-10 Visualizar carrito de compras | 8 |
| HU-11 Desplegar proyecto con Docker | 5 |
| HU-12 Publicar proyecto en línea | 5 |

**Total de puntos estimados: 94 puntos de historia.**

# 4. Base de datos NoSQL para productos

Para el primer parcial se propone una base de datos NoSQL enfocada principalmente en el almacenamiento de productos. Este enfoque es útil porque permite trabajar con documentos flexibles, lo cual facilita agregar atributos diferentes dependiendo del tipo de producto.

Por ejemplo, un producto de ropa puede manejar talla y color, mientras que un producto electrónico puede manejar marca, modelo o garantía.

## 4.1 Colección principal: productos

Ejemplo de documento JSON para la colección productos:

{
 "id": "prod\_001",
 "nombre": "Playera FBShop",
 "descripcion": "Playera casual de algodón con diseño moderno.",
 "categoria": "Ropa",
 "precio": 299.99,
 "stock": 25,
 "imagenes": ["playera-1.png", "playera-2.png"],
 "atributos": {
 "talla": ["CH", "M", "G"],
 "color": ["Blanco", "Negro"],
 "material": "Algodón"
 },
 "estado": "disponible",
 "fecha\_creacion": "2026-07-09",
 "fecha\_actualizacion": "2026-07-09"
}

## 4.2 Campos de la colección productos

|  |  |  |
| --- | --- | --- |
| **Campo** | **Tipo** | **Descripción** |
| id | String | Identificador único del producto. |
| nombre | String | Nombre comercial del producto. |
| descripcion | String | Información detallada del producto. |
| categoria | String | Categoría a la que pertenece. |
| precio | Number | Precio de venta. |
| stock | Number | Cantidad disponible. |
| imagenes | Array | Lista de imágenes del producto. |
| atributos | Object | Características variables del producto. |
| estado | String | Disponible, agotado o inactivo. |
| fecha\_creacion | Date | Fecha en la que se registró. |
| fecha\_actualizacion | Date | Fecha de última modificación. |

## 4.3 Justificación de uso NoSQL

El uso de una base NoSQL permite mayor flexibilidad en el catálogo de productos. Esto es importante porque no todos los productos tienen las mismas características. Además, permite una consulta rápida de documentos y facilita el crecimiento del sistema en futuras versiones.

**5. Base de datos relacional completa**

Además de la base NoSQL propuesta para productos, se diseña una base de datos relacional completa para organizar entidades como usuarios, categorías, productos, pedidos, detalles de pedido y pagos. Esta base de datos permite mantener integridad en la información mediante relaciones entre tablas.

## 5.1 Tabla: usuarios

|  |  |  |  |
| --- | --- | --- | --- |
| **Campo** | **Tipo** | **Llave** | **Descripción** |
| id\_usuario | INT | PK | Identificador único del usuario. |
| nombre | VARCHAR(100) |  | Nombre completo. |
| correo | VARCHAR(100) | UNIQUE | Correo electrónico. |
| password | VARCHAR(255) |  | Contraseña cifrada. |
| telefono | VARCHAR(20) |  | Teléfono del usuario. |
| direccion | TEXT |  | Dirección del cliente. |
| rol | ENUM |  | cliente / administrador. |
| fecha\_registro | DATETIME |  | Fecha de creación. |

## 5.2 Tabla: categorias

|  |  |  |  |
| --- | --- | --- | --- |
| **Campo** | **Tipo** | **Llave** | **Descripción** |
| id\_categoria | INT | PK | Identificador de categoría. |
| nombre | VARCHAR(100) |  | Nombre de la categoría. |
| descripcion | TEXT |  | Descripción de la categoría. |
| estado | BOOLEAN |  | Activa o inactiva. |

## 5.3 Tabla: productos

|  |  |  |  |
| --- | --- | --- | --- |
| **Campo** | **Tipo** | **Llave** | **Descripción** |
| id\_producto | INT | PK | Identificador del producto. |
| id\_categoria | INT | FK | Relación con categorías. |
| nombre | VARCHAR(150) |  | Nombre del producto. |
| descripcion | TEXT |  | Descripción del producto. |
| precio | DECIMAL(10,2) |  | Precio de venta. |
| stock | INT |  | Existencias disponibles. |
| imagen | VARCHAR(255) |  | Ruta de imagen. |
| estado | ENUM |  | disponible / agotado / inactivo. |
| fecha\_creacion | DATETIME |  | Fecha de creación. |
| fecha\_actualizacion | DATETIME |  | Última modificación. |

## 5.4 Tabla: pedidos

|  |  |  |  |
| --- | --- | --- | --- |
| **Campo** | **Tipo** | **Llave** | **Descripción** |
| id\_pedido | INT | PK | Identificador del pedido. |
| id\_usuario | INT | FK | Usuario que realiza el pedido. |
| fecha\_pedido | DATETIME |  | Fecha del pedido. |
| total | DECIMAL(10,2) |  | Total de la compra. |
| estado | ENUM |  | pendiente / pagado / cancelado / enviado. |

## 5.5 Tabla: detalle\_pedido

|  |  |  |  |
| --- | --- | --- | --- |
| **Campo** | **Tipo** | **Llave** | **Descripción** |
| id\_detalle | INT | PK | Identificador del detalle. |
| id\_pedido | INT | FK | Relación con pedido. |
| id\_producto | INT | FK | Producto comprado. |
| cantidad | INT |  | Cantidad comprada. |
| precio\_unitario | DECIMAL(10,2) |  | Precio del producto al momento de compra. |
| subtotal | DECIMAL(10,2) |  | Cantidad por precio unitario. |

## 5.6 Tabla: pagos

|  |  |  |  |
| --- | --- | --- | --- |
| **Campo** | **Tipo** | **Llave** | **Descripción** |
| id\_pago | INT | PK | Identificador del pago. |
| id\_pedido | INT | FK | Pedido relacionado. |
| metodo\_pago | VARCHAR(50) |  | Tarjeta, transferencia o efectivo. |
| monto | DECIMAL(10,2) |  | Monto pagado. |
| estado\_pago | ENUM |  | pendiente / aprobado / rechazado. |
| fecha\_pago | DATETIME |  | Fecha del pago. |

## 5.7 Relaciones principales

|  |  |
| --- | --- |
| **Relación** | **Descripción** |
| usuarios 1:N pedidos | Un usuario puede realizar varios pedidos. |
| categorias 1:N productos | Una categoría puede tener varios productos. |
| pedidos 1:N detalle\_pedido | Un pedido puede contener varios productos. |
| productos 1:N detalle\_pedido | Un producto puede aparecer en varios pedidos. |
| pedidos 1:1 pagos | Un pedido puede tener un pago asociado. |

# 6. Metodología Scrum

Para el desarrollo del proyecto FBShop se utilizará la metodología Scrum, debido a que permite organizar el trabajo en ciclos cortos llamados sprints, priorizar funcionalidades y revisar constantemente el avance. Scrum facilita la división del proyecto en historias de usuario, tareas concretas y entregables verificables.

## 6.1 Roles Scrum

|  |  |  |
| --- | --- | --- |
| **Rol** | **Responsable** | **Función** |
| Product Owner | Equipo del proyecto | Define los requisitos y prioridades. |
| Scrum Master | Equipo del proyecto | Organiza el trabajo y da seguimiento al avance. |
| Development Team | Equipo del proyecto | Desarrolla frontend, backend, base de datos y documentación. |

## 6.2 Product Backlog

|  |  |  |  |
| --- | --- | --- | --- |
| **ID** | **Elemento del backlog** | **Prioridad** | **Puntos** |
| PB-01 | HU-01 Visualizar página principal | Alta | 5 |
| PB-02 | HU-02 Consultar catálogo de productos | Alta | 8 |
| PB-03 | HU-03 Consultar detalles de producto | Alta | 8 |
| PB-04 | HU-04 Consumir API de productos | Alta | 8 |
| PB-05 | HU-05 Registrar productos | Alta | 13 |
| PB-06 | HU-06 Editar productos | Media | 8 |
| PB-07 | HU-07 Eliminar o desactivar productos | Media | 8 |
| PB-08 | HU-08 Gestionar categorías | Media | 5 |
| PB-09 | HU-09 Agregar productos al carrito | Alta | 13 |
| PB-10 | HU-10 Visualizar carrito de compras | Alta | 8 |
| PB-11 | HU-11 Desplegar proyecto con Docker | Media | 5 |
| PB-12 | HU-12 Publicar proyecto en línea | Alta | 5 |

## 6.3 Sprint propuesto

|  |  |  |
| --- | --- | --- |
| **Sprint** | **Actividades** | **Entregable** |
| Sprint 1 | Requisitos, HU, CU, diseño de BD y planeación. | Primer avance documentado. |
| Sprint 2 | Desarrollo de backend y API de productos. | API funcional. |
| Sprint 3 | Desarrollo de frontend y conexión con API. | Interfaz conectada. |
| Sprint 4 | Docker, pruebas, despliegue y reporte final. | Proyecto publicado y documentado. |

## 6.4 Gráfica de quemado

La gráfica de quemado permite observar la cantidad de trabajo restante durante el sprint. Para este avance se consideran 94 puntos de historia, tomando como base las 12 historias de usuario definidas para FBShop.

![](data:image/png;base64...)

|  |  |  |
| --- | --- | --- |
| **Día** | **Trabajo restante ideal** | **Trabajo restante real** |
| Día 1 | 94 | 94 |
| Día 2 | 78 | 85 |
| Día 3 | 62 | 66 |
| Día 4 | 46 | 48 |
| Día 5 | 22 | 25 |
| Día 6 | 0 | 0 |

Interpretación: la línea ideal representa el avance planeado, mientras que la línea real representa el avance obtenido. Si la línea real está por encima de la ideal, significa que el equipo lleva un ligero retraso; si está por debajo, significa que el equipo avanza más rápido de lo planeado.

**6.5 Tablero Trello**

<https://trello.com/invite/b/6a46916da13abb35e5be0489/ATTI0dc4bd8668cb854f9dc296715fe0e01732ECA697/companyfb>

Para organizar el trabajo se propone crear un tablero en Trello con el nombre: FBShop - Scrum.

|  |  |
| --- | --- |
| **Lista** | **Descripción** |
| Product Backlog | Contiene todas las tareas e historias pendientes del proyecto. |
| Sprint Backlog | Contiene las tareas seleccionadas para el sprint actual. |
| En proceso | Actividades que se están desarrollando. |
| En revisión | Actividades terminadas que requieren validación. |
| Hecho | Actividades completadas. |

## 6.6 Tarjetas sugeridas para Trello

|  |  |
| --- | --- |
| **Tarjeta** | **Lista inicial** |
| Definir requisitos funcionales y no funcionales | Hecho |
| Crear historias de usuario | Hecho |
| Diseñar casos de uso | Hecho |
| Diseñar base de datos NoSQL | Hecho |
| Diseñar base de datos relacional | Hecho |
| Crear estructura del proyecto | En proceso |
| Crear API de productos | En proceso |
| Diseñar interfaz principal | En proceso |
| Configurar Docker | Sprint Backlog |
| Subir proyecto a GitHub | Sprint Backlog |
| Crear evidencias para Drive | Sprint Backlog |
| Desplegar en Render | Product Backlog |

# 7. Organización en Drive, GitHub y Trello

## 7.1 Google Drive

<https://drive.google.com/drive/folders/1WGp_8Bc64eH9jrTkymBwNfJgwap_a29n?usp=sharing>

Se creará una carpeta principal en Google Drive llamada: FBShop - Primer avance. Dentro de esta carpeta se organizarán los siguientes archivos y evidencias:

|  |  |
| --- | --- |
| **Carpeta / Archivo** | **Contenido** |
| 01\_Documentacion | Documento del primer avance. |
| 02\_Capturas | Evidencias del sistema, Trello, GitHub y despliegue. |
| 03\_BaseDeDatos | Diagramas, tablas y modelos de datos. |
| 04\_Trello | Capturas del tablero Scrum. |
| 05\_GitHub | Capturas del repositorio y commits. |
| 06\_Despliegue | Evidencias de Render o servicio en la nube. |

## 7.2 GitHub

<https://github.com/09193919307/FBShopBeta.git>

GitHub será utilizado como herramienta de control de versiones para mantener el historial de cambios del proyecto. El repositorio propuesto es FBShopBeta.

|  |  |
| --- | --- |
| **Elemento** | **Descripción** |
| Código fuente | Archivos del frontend y backend. |
| README.md | Descripción del proyecto e instrucciones. |
| package.json | Dependencias del proyecto. |
| Dockerfile | Archivo para crear el contenedor. |
| .gitignore | Archivos excluidos del repositorio. |
| Capturas o documentación | Evidencias opcionales del avance. |

## 7.3 Comandos sugeridos para Git

git add .
git commit -m "Definición inicial de requisitos y estructura del proyecto"
git commit -m "Creación de API básica de productos"
git commit -m "Diseño inicial de interfaz principal de FBShop"
git commit -m "Configuración de Docker para despliegue"
git push origin main

# 8. Arquitectura propuesta del sistema

La arquitectura de FBShop se divide en tres capas principales: frontend, backend y base de datos. Esta separación facilita el mantenimiento del sistema, mejora la organización del código y permite que cada parte pueda evolucionar de forma independiente.

|  |  |
| --- | --- |
| **Capa** | **Descripción** |
| Frontend | Interfaz web que visualiza productos y permite interacción con el usuario. |
| Backend | Servicio encargado de procesar solicitudes y entregar información mediante API. |
| Base de datos | Almacena productos, usuarios, pedidos y demás información del sistema. |

## 8.1 Flujo general

**Usuario → Interfaz web FBShop → API Backend → Base de datos → Respuesta JSON → Interfaz web**

# 9. Herramientas utilizadas

|  |  |
| --- | --- |
| **Herramienta** | **Uso** |
| HTML / CSS / JavaScript | Desarrollo de interfaz web. |
| Node.js | Backend del proyecto. |
| Express | Creación de API. |
| Docker | Contenerización del proyecto. |
| GitHub | Control de versiones. |
| Render | Despliegue en la nube. |
| Trello | Organización Scrum. |
| Google Drive | Almacenamiento de evidencias. |
| Base de datos NoSQL | Almacenamiento flexible de productos. |
| Base de datos relacional | Organización estructurada de usuarios, pedidos y pagos. |

# 10. Conclusión

En este primer avance del proyecto FBShop se establecieron los elementos principales para iniciar el desarrollo de una plataforma web de ventas. Se definieron los casos de uso, requisitos funcionales y no funcionales, así como 12 historias de usuario valoradas que permiten organizar el trabajo mediante Scrum.

También se diseñó una propuesta de base de datos NoSQL para productos, considerando la flexibilidad necesaria para manejar diferentes tipos de artículos. Además, se planteó una base de datos relacional completa para gestionar usuarios, categorías, productos, pedidos, detalles de compra y pagos.

Finalmente, se definió una estructura de trabajo con Trello, GitHub y Google Drive, permitiendo organizar tareas, controlar versiones y documentar evidencias del avance. Con esto, el proyecto FBShop cuenta con una base sólida para continuar con el desarrollo, pruebas y despliegue en futuras etapas.

# Anexo A. Evidencias recomendadas para entregar

* Captura de la carpeta de Google Drive creada.

![](data:image/png;base64...)

* Captura del repositorio de GitHub con el nombre del proyecto.

![](data:image/png;base64...)

* Captura del tablero Trello con listas y tarjetas.

![](data:image/png;base64...)

* Captura de la interfaz principal de FBShop.

![](data:image/jpeg;base64...)

* Captura de la API de productos funcionando.

![](data:image/jpeg;base64...)![](data:image/jpeg;base64...)![](data:image/jpeg;base64...)

* Captura del despliegue en Render si ya está disponible.

[FBShop | Tu tienda en línea](https://fbshopbeta-omhf.onrender.com/)

![](data:image/png;base64...)

# 11. Anexo de evidencias: Trello, GitHub, Docker y Render

Este anexo complementa el primer avance con la parte práctica solicitada en clase: creación del tablero Trello, uso del repositorio GitHub del proyecto FBShop y evidencia de que el proyecto fue preparado con Docker para su despliegue.

## 11.1 Repositorio GitHub del proyecto FBShop

Como el proyecto FBShop ya fue trabajado previamente con Docker, en esta sección se documenta el repositorio existente como evidencia de control de versiones. El repositorio concentra el código fuente, la configuración de dependencias y los archivos necesarios para ejecutar el servicio en un contenedor.

|  |  |
| --- | --- |
| **Elemento** | **Descripción / evidencia** |
| Nombre del repositorio | FBShopBeta |
| URL del repositorio | https://github.com/09193919307/FBShopBeta |
| Rama principal | main |
| Tecnología principal | Node.js + Express |
| Contenerización | Dockerfile configurado para ejecutar el proyecto |
| Despliegue relacionado | Render usando Docker |
| Evidencia requerida | Captura del repositorio mostrando nombre, archivos, rama main y commits |

### Archivos clave esperados en GitHub

|  |  |
| --- | --- |
| **Archivo / carpeta** | **Función dentro del proyecto** |
| package.json | Define scripts, nombre del proyecto y dependencias como Express. |
| Dockerfile | Permite construir la imagen Docker para ejecutar FBShop. |
| src / app / index.js | Contiene la lógica principal del servidor y rutas de la API. |
| public / views | Contiene recursos de interfaz o archivos estáticos del sitio. |
| README.md | Describe el proyecto, instalación, ejecución local y despliegue. |
| .gitignore | Evita subir archivos innecesarios como node\_modules. |

### Comandos utilizados para evidenciar GitHub

git status
git add .
git commit -m "Primer avance: documentación, Docker y estructura FBShop"
git push origin main

*En el reporte final se recomienda agregar una captura después de ejecutar git status y otra captura del repositorio en GitHub con el commit más reciente.*

## 11.2 Evidencia de Docker

Docker permite empaquetar FBShop con sus dependencias para que pueda ejecutarse de forma similar en cualquier equipo o servicio de despliegue. Esto demuestra portabilidad y facilita la publicación en Render.

|  |  |
| --- | --- |
| **Elemento Docker** | **Descripción** |
| Imagen base | Node.js en versión ligera para ejecutar el backend. |
| Instalación de dependencias | Se instalan las dependencias declaradas en package.json. |
| Puerto expuesto | El servicio expone el puerto utilizado por Express. |
| Comando de inicio | Ejecuta el script principal del servidor. |
| Resultado esperado | El contenedor inicia y la API responde correctamente. |

### Comandos sugeridos para comprobar Docker

docker build -t fbshopbeta .
docker run -p 3000:3000 fbshopbeta
docker ps
curl http://localhost:3000/api/productos

*Si el proyecto usa otro puerto, se debe ajustar el comando docker run. La evidencia ideal es una captura de la terminal mostrando el contenedor activo y otra del navegador abriendo la API o la página principal.*

## 11.3 Tablero Trello para Scrum

El tablero Trello permite representar visualmente el avance del proyecto bajo Scrum. Para este primer avance se deben crear listas, tarjetas y checklist relacionadas con las historias de usuario, GitHub, Docker, base de datos y documentación.

|  |  |
| --- | --- |
| **Lista de Trello** | **Tarjetas recomendadas** |
| Product Backlog | HU-01 Visualizar página principal; HU-02 Consultar catálogo; HU-03 Detalle de producto; HU-04 Consumir API; HU-05 Registrar productos; HU-06 Editar productos; HU-07 Eliminar/desactivar productos; HU-08 Gestionar categorías; HU-09 Agregar al carrito; HU-10 Visualizar carrito; HU-11 Docker; HU-12 Publicar en línea. |
| Sprint Backlog | Diseñar requisitos; crear CU/HU; diseñar BD NoSQL; diseñar BD relacional; preparar evidencias. |
| En proceso | Actualizar GitHub; verificar Docker; ordenar capturas; documentar metodología Scrum. |
| En revisión | Revisar documento Word; validar tablas de BD; revisar gráfica de quemado. |
| Hecho | Repositorio creado; Docker configurado; primer avance redactado; estructura Scrum definida. |

### Tarjetas con checklist sugerido

|  |  |
| --- | --- |
| **Tarjeta** | **Checklist interno** |
| Repositorio GitHub | Crear repo / verificar repo existente; subir código; confirmar rama main; tomar captura del repositorio. |
| Docker FBShop | Verificar Dockerfile; construir imagen; ejecutar contenedor; tomar captura de terminal. |
| Base de datos NoSQL | Definir colección productos; agregar ejemplo JSON; documentar campos. |
| Base relacional | Definir tablas usuarios, categorías, productos, pedidos, detalle\_pedido y pagos. |
| Gráfica de quemado | Definir puntos de historia; registrar avance ideal; registrar avance real; insertar gráfica. |
| Documentación final | Agregar portada; insertar tablas; anexar evidencias; revisar ortografía. |

### Capturas obligatorias de Trello

* Captura del tablero completo con las listas Product Backlog, Sprint Backlog, En proceso, En revisión y Hecho.
* Captura de al menos una tarjeta abierta con checklist visible.
* Captura de las tarjetas de GitHub y Docker en la lista correspondiente.
* Captura de tarjetas terminadas en la lista Hecho.

## 11.4 Evidencia de Render

El proyecto FBShopBeta fue preparado para despliegue en Render usando Docker. Esta evidencia permite demostrar que el servicio puede ejecutarse fuera del entorno local y estar disponible mediante una URL pública.

|  |  |
| --- | --- |
| **Elemento** | **Evidencia** |
| Servicio | FBShopBeta |
| Tipo de despliegue | Docker |
| Rama usada | main |
| Estado esperado | Live |
| URL pública | https://fbshopbeta.onrender.com |
| Captura recomendada | Pantalla de Render con el servicio en Live y navegador mostrando la página publicada. |

## 11.5 Checklist final de entrega

|  |  |
| --- | --- |
| **Evidencia** | **Estado sugerido** |
| Documento Word del primer avance | Completo |
| Repositorio GitHub FBShopBeta | Completo / capturar pantalla |
| Dockerfile y ejecución Docker | Completo / capturar terminal |
| Tablero Trello Scrum | Crear y capturar pantalla |
| Carpeta Google Drive | Crear y subir evidencias |
| Gráfica de quemado | Incluida en documento |
| Render en línea | Capturar si se solicita evidencia de despliegue |