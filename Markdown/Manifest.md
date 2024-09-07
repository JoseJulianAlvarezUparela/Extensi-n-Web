### Explicación de los segmentos de codigo:

- **`manifest_version`**: 
  - Especifica la versión del manifiesto. En este caso, usamos la versión 3, que es la más reciente y proporciona nuevas características, como el uso de *service workers* en lugar de scripts de fondo persistentes.

- **`name`, `version`, `description`**: 
  - Proporcionan información básica sobre la extensión, como su nombre, versión y una breve descripción.

- **`icons`**: 
  - Define los iconos utilizados para la extensión en diferentes tamaños. Estos se muestran en la barra de herramientas del navegador y en otras partes de la interfaz.

- **`action`**: 
  - Configura la acción principal de la extensión, como qué *popup* mostrar cuando el usuario hace clic en el icono de la extensión en la barra de herramientas.

- **`background`**: 
  - Configura un script de servicio que corre en segundo plano, manejando tareas que no necesitan interacción directa con el usuario.

- **`permissions`**: 
  - Lista los permisos necesarios para que la extensión funcione correctamente. Esto incluye permisos para interactuar con las pestañas, interceptar solicitudes web, y almacenar datos localmente.

- **`host_permissions`**: 
  - Define en qué URLs la extensión tiene permiso para actuar. En este caso, `<all_urls>` le da acceso a todas las URLs.

- **`author`**: 
  - Sección personalizada que almacena información sobre el autor de la extensión, útil para documentación interna o propósitos académicos.

- **`content_scripts`**: 
  - Define los scripts que se inyectarán en las páginas web visitadas. Estos scripts se ejecutan en el contexto de la página web, permitiendo manipular el DOM o realizar otras acciones.

- **`web_accessible_resources`**: 
  - Define los recursos dentro de la extensión que pueden ser accedidos por las páginas web, lo que es útil para cargar imágenes, scripts o estilos desde la extensión.

- **`options_page`**: 
  - Especifica una página de opciones donde el usuario puede configurar los ajustes de la extensión.
