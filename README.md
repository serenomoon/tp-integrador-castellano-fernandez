# 🛒 Kiosco de Autoservicio - TP Integrador

Trabajo Práctico Integrador para la materia **Programación III** de la Universidad Tecnológica Nacional (UTN). 

Este proyecto implementa un sistema de autoservicio interactivo de indumentaria urbana, compuesto por un **Frontend cliente** interactivo y un **Backend administrador** con panel en HTML/EJS y una API RESTful en formato JSON conectada a una base de datos MySQL/MariaDB.

---

## 👥 Integrantes
*   **Axel Castellano**
*   **Saulo Fernández**

---

## 🛠️ Tecnologías Utilizadas
*   **Runtime**: Node.js (v18+)
*   **Servidor**: Express.js
*   **Base de Datos**: MySQL / MariaDB (usando driver nativo `mysql2/promise`)
*   **Motor de Vistas**: EJS (para el Back-Office del Administrador)
*   **Gestión de Dependencias**: `npm` / `pnpm` / `yarn`

---

## 📂 Estructura del Proyecto

```text
├── backend/                  # Servidor Express, API y Panel Admin
│   ├── src/
│   │   ├── api/
│   │   │   ├── config/       # Variables de entorno
│   │   │   └── database/     # Conexión y scripts de base de datos (schema.sql)
│   │   └── views/            # Vistas EJS de administración
│   ├── index.js              # Punto de entrada de Express
│   └── package.json
├── frontend/                 # Interfaz estática del Kiosco (Cliente)
├── .gitignore
├── roadmap_axel.md           # Plan de trabajo individual de Axel
└── roadmap_saulo.md          # Plan de trabajo individual de Saulo
```

---

## 🚀 Instalación y Configuración Local

Siga estos pasos para levantar el entorno de desarrollo local:

### 1. Requisitos Previos
Tener un servidor local de **MySQL** o **MariaDB** instalado y corriendo en su sistema.

### 2. Configurar la Base de Datos
1. Inicie sesión en la consola de MySQL/MariaDB:
   ```bash
   mysql -u root -p
   ```
2. Cree la base de datos para el proyecto:
   ```sql
   CREATE DATABASE tp_autoservicio;
   exit;
   ```
3. Inyecte el esquema de tablas desde la raíz del proyecto:
   ```bash
   mysql -u root -p tp_autoservicio < backend/src/api/database/schema.sql
   ```

### 3. Configurar el Servidor Backend
1. Ingrese a la carpeta del backend:
   ```bash
   cd backend
   ```
2. Instale las dependencias necesarias:
   ```bash
   npm install
   ```
   *(También puede usar `pnpm install` o `yarn install` si los tiene instalados)*.
3. Cree un archivo **`.env`** en la carpeta `backend/` basado en la siguiente configuración estándar:
   ```env
   PORT=3000
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=tu_contraseña_de_mysql
   DB_NAME=tp_autoservicio
   ```

### 4. Arrancar en Modo Desarrollo
Ejecute el siguiente comando dentro de la carpeta `backend/` para iniciar el servidor con reinicios automáticos mediante `nodemon`:
```bash
npm run dev
```

El servidor web estará disponible en: **http://localhost:3000**

---

## 🔍 Verificación del Entorno
Para comprobar que la base de datos y Express están sincronizados correctamente, ingrese a la siguiente ruta de prueba desde el navegador:

👉 **[http://localhost:3000/test-db](http://localhost:3000/test-db)**

Debería recibir una respuesta JSON estructurada como la siguiente:
```json
{
  "status": "success",
  "message": "¡Conexión a MariaDB exitosa!",
  "result": 2
}
```
