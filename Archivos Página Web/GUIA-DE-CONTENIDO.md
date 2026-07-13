# Guía de contenido pendiente — Sincronizados S.A.

La página ya tiene la estructura de los 7 módulos del curso. Esta guía indica
**qué evidencia falta subir en cada módulo**, con qué formato y dónde ponerla.
Los bloques punteados ("En preparación") de cada página desaparecen cuando
reemplazas el bloque por el contenido real.

## Reglas generales para las evidencias

- **Pantallazos:** exporta en PNG a 1600–1920 px de ancho, con la interfaz en
  zoom legible. Recorta paneles vacíos. Nombra los archivos en minúsculas y sin
  espacios (ej. `scada-overview.png`).
- **Diagramas:** exporta SIEMPRE en PDF vectorial (no foto del diagrama).
- **Videos:** súbelos a YouTube (no en modo Kids, formato horizontal) y pega el
  enlace desde ⚙ Admin → *Videos de módulos*. Un video por módulo.
- **Dónde guardar:** crea una carpeta de imágenes por módulo dentro de
  `Archivos Página Web/images/` (ej. `images/scada/`), y los PDF en las
  carpetas del repositorio (`Diagramas P&ID/`, `Análisis de Proceso/`, etc.).
  Luego añade la ficha del documento en `data/site-data.js` (sección
  `documentos`).

## Pendientes por módulo

### 01 · Introducción a la automatización
- Diagrama propio de la **arquitectura ISA-95** del proyecto (niveles, hardware
  por nivel, redes y protocolos EtherNet/IP e OPC-UA). PDF o PNG.
- Ya está: P&ID de Estación de Calidad y Shrinkwrap.

### 02 · Gestión y evaluación de la producción
- **Pantallazos del modelo Plant Simulation** (vista 2D/3D de cada línea).
- **Resultados OEE antes/después**: tabla o gráfico comparativo (Takt, OEE, MLT).
- Escenarios simulados: cambio de producto, fallas y set-up.

### 03 · Planeación y evaluación de proyectos
- **Propuesta de valor / oferta comercial** (1 página PDF).
- Actualizar el KPI "Tiempos antes/después" del inicio cuando salga de la simulación.

### 04 · Celda de manufactura robotizada
- **Pantallazos de RobotStudio**: layout de la celda, robot, transportadores.
- **Video corto** del ciclo de paletizado simulado.
- **Patrón de paletizado** por producto (esquema).
- **Matriz de riesgos** con mitigaciones (tabla PDF).

### 05 · Digital Factory
- **Pantallazos de la escena Factory I/O** (o NX MCD) de la línea completa.
- **Tabla de mapeo E/S** entre el gemelo y Logix Emulate (pantallazo o Excel).
- Video de la validación en lazo cerrado.
- Si usan NX: capturas del modelo 3D y de la conexión de señales
  (valor agregado del curso: llevar puntos de RobotStudio a NX).

### 06 · Controladores industriales
- **Grafcet nivel 1 y nivel 2** en PDF.
- **Pantallazos del Ladder en Studio 5000** (rutinas principales, no todo el código).
- **Tabla de tags** del controlador (Excel o pantallazo).
- Video corto de la validación en Logix Emulate.

### 07 · SCADA
- **Pantallazos de las pantallas HMI en Ignition**: overview, detalle de línea,
  alarmas, tendencias y pantalla de recetas/cambio de producto.
- **Diagrama de comunicación OPC** (Ignition ↔ Logix Emulate).
- Video de la validación integrada con el gemelo digital.

### Proceso de aprendizaje
- Completar las **reflexiones individuales** de los 6 integrantes
  (⚙ Admin → pestaña del integrante → editar). Clasificarlas por módulo.
- Enriquecer las reflexiones grupales (gestión y trabajo colaborativo) con
  hechos concretos: qué salió bien, qué se corrigió, qué recomendarían.

### Valor agregado (opcional, suma puntos)
- MES con Power BI (dashboard con datos del PLC).
- Analítica local con Python sobre datos del PLC.
- Puntos de RobotStudio llevados a NX.

## Administración de la página

- Botón **⚙ Admin** (abajo a la derecha). Usuario `admin`, contraseña
  `Sincronizados2026` (cámbiala desde el panel).
- Desde el panel puedes: editar integrantes y fotos, añadir/editar reflexiones,
  configurar los videos de YouTube por módulo.
- **Publicar cambios:** ⚙ Admin → *Descargar datos* → reemplaza
  `data/site-data.js` en el repositorio.
