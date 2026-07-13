/* =====================================================================
   Sincronizados S.A. — Datos del sitio
   ---------------------------------------------------------------------
   Este archivo contiene el contenido editable de la web (integrantes,
   reflexiones y documentos). Se puede editar a mano o desde el panel de
   administración de la propia página (botón "Admin" abajo a la derecha).

   Para PUBLICAR los cambios hechos desde el panel:
     1. En el panel de administración pulsa "Descargar datos".
     2. Reemplaza este archivo (data/site-data.js) con el descargado.
     3. Sube el cambio al repositorio (commit + push).

   Cambiar la contraseña de administrador:
     Usa "Cambiar contraseña" en el panel: te dará una nueva línea
     claveHash para pegar aquí abajo. (Usuario y contraseña por defecto:
     usuario "admin", contraseña "Sincronizados2026").
   ===================================================================== */

window.SITE_DATA = {
  /* Config del panel de administración.
     OJO: en un sitio estático esto es solo una barrera cómoda, no
     seguridad real. No guardes aquí información sensible. */
  admin: {
    usuario: "admin",
    // SHA-256 de la contraseña. Por defecto: "Sincronizados2026"
    claveHash: "45ac9bf1c87bebc85eeca0eee24c873599d74e5bb07182307efe2cdbcb1754fe"
  },

  /* Módulos del curso (mismo orden del PDF del proyecto integrador).
     Sirven para clasificar reflexiones y para el editor de videos. */
  modulos: [
    { id: "introduccion", nombre: "01 · Introducción a la automatización" },
    { id: "gestion", nombre: "02 · Gestión y evaluación de la producción" },
    { id: "planeacion", nombre: "03 · Planeación y evaluación de proyectos" },
    { id: "celdas", nombre: "04 · Celda de manufactura robotizada" },
    { id: "digital", nombre: "05 · Digital Factory" },
    { id: "controladores", nombre: "06 · Controladores industriales" },
    { id: "scada", nombre: "07 · SCADA" }
  ],

  /* Enlaces de YouTube del video de cada módulo (deja "" si aún no hay).
     Editables también desde el panel: ⚙ Admin → Videos de módulos. */
  videos: {
    introduccion: "",
    gestion: "",
    planeacion: "",
    celdas: "",
    digital: "",
    controladores: "",
    scada: ""
  },

  /* Integrantes del equipo. La foto puede ser una ruta (images/...)
     o una imagen incrustada (data:image/...) cargada desde el panel. */
  equipo: [
    {
      id: "brayan",
      nombre: "Brayan Yesid Santos Guevara",
      rol: "Integrante del equipo de desarrollo del proyecto Sincronizados.",
      foto: "images/equipoimg/brayan.jpg"
    },
    {
      id: "jorge",
      nombre: "Jorge Emilio Melo Guevara",
      rol: "Integrante del equipo de desarrollo del proyecto Sincronizados.",
      foto: "images/equipoimg/jorge.jpg"
    },
    {
      id: "edgar",
      nombre: "Edgar Esteban Erazo Lagos",
      rol: "Integrante del equipo de desarrollo del proyecto Sincronizados.",
      foto: ""
    },
    {
      id: "santiago",
      nombre: "Santiago Mariño Cortés",
      rol: "Integrante del equipo de desarrollo del proyecto Sincronizados.",
      foto: "images/equipoimg/santiago.png"
    },
    {
      id: "juandavid",
      nombre: "Juan David Medina Perez",
      rol: "Integrante del equipo de desarrollo del proyecto Sincronizados.",
      foto: "images/equipoimg/juandavid.jpg"
    },
    {
      id: "carlos",
      nombre: "Carlos Quintero Quintero Castillo",
      rol: "Integrante del equipo de desarrollo del proyecto Sincronizados.",
      foto: "images/equipoimg/carlos.jpg"
    }
  ],

  /* Reflexiones individuales. Cada una pertenece a un integrante y,
     opcionalmente, a un módulo del proyecto. */
  reflexiones: [
    {
      id: "r-brayan-1",
      integranteId: "brayan",
      moduloId: "controladores",
      texto: "Escribe aquí la reflexión de Brayan: su aporte, aprendizajes, dificultades y balance final del proyecto. Puedes editar este texto desde el panel de administración."
    },
    {
      id: "r-jorge-1",
      integranteId: "jorge",
      moduloId: "gestion",
      texto: "Escribe aquí la reflexión de Jorge sobre la gestión y evaluación de la producción, la coordinación del equipo y los aprendizajes obtenidos."
    },
    {
      id: "r-edgar-1",
      integranteId: "edgar",
      moduloId: "celdas",
      texto: "Escribe aquí la reflexión de Edgar sobre el diseño de celdas robóticas y su experiencia técnica dentro del proyecto."
    },
    {
      id: "r-santiago-1",
      integranteId: "santiago",
      moduloId: "digital",
      texto: "Escribe aquí la reflexión de Santiago sobre las tecnologías aplicadas y su valoración del trabajo colaborativo."
    },
    {
      id: "r-juandavid-1",
      integranteId: "juandavid",
      moduloId: "planeacion",
      texto: "Escribe aquí la reflexión de Juan David sobre la planeación del proyecto, los retos enfrentados y los aprendizajes clave."
    },
    {
      id: "r-carlos-1",
      integranteId: "carlos",
      moduloId: "introduccion",
      texto: "Escribe aquí la reflexión de Carlos sobre el trabajo colaborativo, la organización del equipo y su balance personal."
    }
  ],

  /* Documentos del proyecto, organizados por categoría. Se enlazan desde
     la página; las rutas apuntan a las carpetas del repositorio. */
  documentos: {
    planeacion: [
      {
        titulo: "EDT del proyecto",
        descripcion: "Estructura de desglose del trabajo (EDT) con los paquetes de trabajo del proyecto.",
        archivo: "../Planeaci%C3%B3n/EDT.pdf"
      },
      {
        titulo: "Cronograma",
        descripcion: "Cronograma general de actividades y tiempos del proyecto.",
        archivo: "../Planeaci%C3%B3n/Cronograma.pdf"
      }
    ],
    proceso: [
      {
        titulo: "Diagramas de Análisis de Proceso",
        descripcion: "Compendio de diagramas del análisis del proceso productivo.",
        archivo: "../An%C3%A1lisis%20de%20Proceso/Diagramas%20de%20An%C3%A1lisis%20de%20Proceso.pdf"
      },
      {
        titulo: "Diagramas VSM",
        descripcion: "Mapeo de la cadena de valor (Value Stream Mapping) del proceso.",
        archivo: "../An%C3%A1lisis%20de%20Proceso/Diagramas%20VSM.pdf"
      },
      {
        titulo: "Diagrama de Layout",
        descripcion: "Distribución en planta de las líneas de producción.",
        archivo: "../An%C3%A1lisis%20de%20Proceso/Diagrama%20de%20Layout.pdf"
      },
      {
        titulo: "Diagrama de Operaciones — Lata Monster",
        descripcion: "Diagrama de operaciones de la línea de lata de Monster.",
        archivo: "../An%C3%A1lisis%20de%20Proceso/Diagrama%20de%20Operaciones-%20Lata%20Monster.drawio.pdf"
      },
      {
        titulo: "Diagrama de Operaciones — Botella Plástica Coca-Cola",
        descripcion: "Diagrama de operaciones de la línea de botella plástica de Coca-Cola.",
        archivo: "../An%C3%A1lisis%20de%20Proceso/Diagrama%20de%20Operaciones-Botella%20Plastica%20CocaCola.pdf"
      },
      {
        titulo: "Diagrama de Operaciones — Botella Retornable Coca-Cola",
        descripcion: "Diagrama de operaciones de la línea de botella retornable de Coca-Cola.",
        archivo: "../An%C3%A1lisis%20de%20Proceso/Diagrama%20de%20Operaciones-Botella%20Retornable%20CocaCola.pdf"
      },
      {
        titulo: "Análisis de Indicadores (Excel)",
        descripcion: "Cálculo de indicadores del proceso: takt time, disponibilidad, OEE y capacidad.",
        archivo: "../An%C3%A1lisis%20de%20Proceso/An%C3%A1lisis%20de%20Indicadores.xlsx"
      }
    ],
    pid: [
      {
        titulo: "P&ID — Estación de Calidad",
        descripcion: "Diagrama de tuberías e instrumentación de la estación de control de calidad.",
        archivo: "../Diagramas%20P%26ID/Estacion_Calidad.pdf"
      },
      {
        titulo: "P&ID — Shrinkwrap (empaque)",
        descripcion: "Diagrama de tuberías e instrumentación de la estación de empaque / termoencogido.",
        archivo: "../Diagramas%20P%26ID/Shrinkwrap.pdf"
      }
    ],
    simulacion: [
      {
        titulo: "Simulación — Línea Coca-Cola (.spp)",
        descripcion: "Modelo de la línea de Coca-Cola. Requiere Tecnomatix Plant Simulation para abrirlo.",
        archivo: "../Plant%20Simulation/LineaCocaCola.spp"
      },
      {
        titulo: "Simulación — Proceso de Fluidos (.spp)",
        descripcion: "Modelo del proceso de fluidos. Requiere Tecnomatix Plant Simulation para abrirlo.",
        archivo: "../Plant%20Simulation/ProcesoDeFluidos.spp"
      },
      {
        titulo: "Simulación — Línea Monster (.spp)",
        descripcion: "Modelo de la línea de Monster. Archivo grande (~84 MB); requiere Plant Simulation.",
        archivo: "../Plant%20Simulation/LineaMonster.spp"
      }
    ],
    financiero: [
      {
        titulo: "Análisis Financiero (Excel)",
        descripcion: "Modelo financiero del proyecto: CAPEX, OPEX, flujo de caja e indicadores.",
        archivo: "../An%C3%A1lisis%20Financiero/Analisis_Financiero.xlsx"
      },
      {
        titulo: "Justificación del Análisis Financiero (PDF)",
        descripcion: "Documento de sustento y justificación de la evaluación económica del proyecto.",
        archivo: "../An%C3%A1lisis%20Financiero/Justificacion_Analisis_Financiero.pdf"
      }
    ]
  }
};
