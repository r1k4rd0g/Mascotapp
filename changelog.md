# Changelog

## Próximos Pasos (Box de Ideas)

* Generar un menú de procesos.
* Dar la posibilidad de que cada usuario seleccione cuál es su favorito.
* Evaluar si es mejor tener perfiles separados de usuarios y clientes o mezclarlos.
* Implementar un nivel de seguridad para ciertas acciones (borrar, desactivar).
* Explorar la manera de utilizar el mismo programa con diferentes empresas.

---

## 12/04/2025

**Frontend:**

* Se agregó un footer a la aplicación.
* Se subieron los cambios a las ramas `main` y `dev`.
* Se implementaron `clamps` para mejorar la responsividad del frontend.
* Se actualizó la paleta de colores del frontend para que sea más amigable.
* Se verificó que el programa se visualiza correctamente en tablets.

**Pendientes (Frontend):**

* Hacer que el color primario de la empresa aparezca al hacer hover en el menú.
* Establecer que el color primario sea el fondo al hacer clic en un item del menú.
* Considerar la implementación de una constante de estilo para centralizar los colores de los botones e items del menú.
* Investigar dónde se muestran los mensajes provenientes del backend (ej: al ingresar datos duplicados).

**Próximos Pasos:**

* Una vez finalizada la parte visual, se comenzará con el backend.
* Implementar las tablas de `usuario` y `cliente`, incluyendo permisos y niveles.

---

## 28/03/2025

**Infraestructura:**

* Se desplegó la aplicación en Render y ahora está online.
* Se configuraron dos bases de datos separadas para los entornos de desarrollo (`dev`) y producción (`prod`).
* Se crearon dos URLs distintas, una para `dev` y otra para `prod`.

**Backend:**

* Se desarrolló el proceso de carga para nuevas localidades, incluyendo la validación correspondiente.

**Frontend:**

* Se agregaron tooltips a los iconos para mejorar la usabilidad.
* Se implementó un filtro de búsqueda en las tablas.
* Se agregó paginación a las tablas para facilitar la navegación con grandes conjuntos de datos.

**Pendientes:**

* Generar un `Dockerfile` para el frontend y el entorno de desarrollo (`dev`).
* Continuar trabajando en el backend, enfocándose en el perfil de clientes.

---

## 19/03/2024

**Backend:**

* Se avanzó en la validación de la información ingresada.
* Se corrigió un error que existía en los middlewares y en el Data Access Object (DAO) de la función de actualización (`update`).

**Frontend:**

* Se aplicó validación en los archivos de creación de localidades para evitar el ingreso de ciertos caracteres y números en el campo `name`.
* Se aplicó validación en el formulario modal de edición, específicamente en el campo `name`.

---

## 17/03/2025

**Tablas Genéricas:**

* Se finalizó la migración de la tabla de `país` a la tabla genérica. **(Listo)**

**Validación de Datos:**

* Se definió y registró dónde se debe realizar la validación de la información ingresada y dónde colocar los parámetros de validación. Por ejemplo, se estableció que el nombre de una entidad (país, estado, etc.) no debe contener números. **(Listo)**

---

## 22/02/2025

**Tablas Genéricas:**

* Se trabajó en la creación de un código genérico para la creación de tablas, aplicable a entidades como `departamento`, `ciudad` y `barrio`. **(Actualizado arriba)**
* Se finalizó el código genérico y se probaron las funcionalidades de edición múltiple y puntual. **(Funcionando)**

**Pendientes:**

* Crear las tablas específicas para `ciudad` y `barrio` y verificar su funcionamiento. **(Listo)**
* Verificar que las funciones de edición múltiple y simple desarrolladas previamente sigan funcionando correctamente con el nuevo código genérico. **(Listo)**

---

## 31/01/2025

**Frontend:**

* Se eliminó el botón de colapsar el menú de las opciones del menú, ya que no estaba visualmente agradable. **(Ready)**

**Planificación:**

* Se generó una lista de procesos a implementar.
