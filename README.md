# Sincronizados S.A.
# Proyecto Integrador – Automatización de una planta de producción Coca-Cola

## Descripción general

Este repositorio documenta el desarrollo de un proyecto integrador para la asignatura **Automatización de Procesos de Manufactura**, enfocado en la propuesta de mejoramiento de una planta física de producción de bebidas tipo Coca-Cola mediante herramientas de automatización, simulación, control industrial y evaluación económica.

Dado su proposito de integrar distintos ejes temáticos abordados a los largo de la carrera, el proyecto parte de la descripción del proceso productivo para posteriormente plantear una **solución de automatización estructurada**, con sustento técnico, simulación digital, arquitectura de control, propuesta de celda robotizada, sistema SCADA y análisis económico de viabilidad. 

Bajo dicha premisa, el proyecto es transversal entre distintos niveles de la piramide de automatización establecida por norma **ISA95**; partiendo por el nivel 0, donde se busca compreder y analizar las distintas estaciones de la planta para identificar cuellos de botella y posibles puntos de mejora, buscando determinar aquellos que sean ideoneos de cambio o automatización. Posteriormente, a partir de la  ya mencionada propuesta de mejora, se contempla el desarrollo de la lógica de control necesaria para la implmentación del proceso mejorado en concordancia con el nivel 1 de la piramide, y de la misma manera, se pretende construir de un sistema SCADA corresponiendte al nivel 2 de automatización. 

Adicionalmente, la propuesta se desarrolla con base en la metodología del curso e integra herramientas de gestión del proyecto, análisis de proceso, gemelos digitales, PLC, SCADA y diseño de celdas robotizadas.

## Objetivo general

Diseñar una propuesta integral de automatización para una planta de producción de bebidas, orientada al mejoramiento del desempeño productivo, la supervisión del proceso, la integración de tecnologías industriales y la evaluación de su viabilidad técnica y económica.


## Objetivos específicos

- Analizar el proceso productivo de una planta de bebidas e identificar sus etapas críticas.
- Definir el alcance del sistema automatizado y sus requerimientos principales.
- Elaborar la arquitectura de automatización del sistema con base en ISA-95.
- Diseñar una propuesta de celda robotizada para una etapa de manipulación o paletizado.
- Desarrollar una representación digital del sistema en **Siemens NX**.
- Implementar la lógica de control industrial mediante **Grafcet** y **Ladder**.
- Diseñar un sistema **SCADA** para supervisión, alarmas y monitoreo.
- Evaluar económicamente la propuesta mediante costos, flujo de caja e indicadores financieros.


## Alcance del proyecto

En primera instacia, el proyecto considera una planta inicial de referencia con un flujo industrial típico de:

- preparación del jarabe,
- carbonatación,
- preparación y saneamiento de envases,
- llenado y sellado,
- post-procesamiento,
- identificación,
- empaque,
- paletizado,
- almacenamiento y despacho.

A partir del análisis y simulación del proceso y sus condiciones iniciales, se plantea una propuesta de mejora en desempeño enfocada en la automatización de los procesos de empaque y paletizado de la planta. Para tal fin, el proyecto contempla la evaluación de inicadores iniciales, el cálculo y propuesta de los indicadores finales esperados y el debido análisis econímico que justifican una implementación hipotética de los desarrollos propuetsos, todo de la mano con simulaciones del proceso mejorado que permitan evaluar la robustez de los ya mencionados desarrollos. 

Con base en la propuesta elaborada, una posterior etapa del proyecto se centra en el diseño y programación de la logíca de control industrial en Ladder, que junto con la construcción de un gemelo digital de algunas de las etapas más significativas del proceso mejorado, permiten una simulación ilustrativa del funcionamiento de la planta posterior a su intervención hipotética. 

Por último, los disntintos desarrollos mencionados anteriormente convergen mediante un sistema de monitoreo y supervisión SCADA, el cual, por medio de una arquitectura de comunicaciones desarrollada por el equipo, permite recoger datos de la simulación y proporcionar al usuario información relevante como alertas, historicos y demás variables de proceso.

## Metodología de desarrollo

El proyecto fue estructurado a partir del **EDT del proyecto**, que organiza el trabajo en diez bloques principales:

1. Planeación del proyecto  
2. Análisis del proceso productivo  
3. Modelado y simulación del sistema  
4. Identificación de la arquitectura de automatización  
5. Diseño de la celda robotizada  
6. Diseño digital en Siemens NX  
7. Diseño del control industrial  
8. Diseño del sistema SCADA  
9. Evaluación económica del proyecto  
10. Documentación y entrega  


## Estructura técnica de la propuesta

### 1. Análisis del proceso productivo
Se estudió el proceso de fabricación de bebidas, identificando materias primas, etapas de transformación, variables de proceso, sensores, actuadores y disposición general de planta.

### 2. Arquitectura de automatización
Se definió una arquitectura jerárquica basada en **ISA-95**, contemplando:

- **Nivel de campo:** sensores y actuadores  
- **Nivel de control:** PLC  
- **Nivel de supervisión:** SCADA/HMI  

También se propuso la selección de hardware, red industrial e instrumentación del proceso.

### 3. Celda robotizada
Se incluyó el diseño conceptual de una celda robotizada para apoyar operaciones de manipulación de materiales, considerando criterios de selección del robot, flujo de materiales, seguridad industrial y simulación.

### 4. Gemelo Digital
Se planteó el modelado de una sección de la línea en **Siemens NX**, incluyendo:

- virtualización de sensores y actuadores,
- mapeo de entradas y salidas,
- enlace con **Studio 5000 / Logix Emulate**,
- validación funcional del sistema.

### 5. Control industrial
Se desarrolló la lógica de automatización mediante:

- análisis secuencial del proceso,
- elaboración de **Grafcet**,
- programación en **Ladder**,
- integración lógica de sensores, actuadores y secuencias operativas.

### 6. Sistema SCADA
Se diseñó una propuesta de supervisión con enfoque en:

- monitoreo de variables,
- visualización de alarmas,
- seguimiento del estado del proceso,
- observación de indicadores operativos.

### 7. Evaluación económica
La propuesta se complementó con una evaluación de viabilidad, incluyendo:

- costos de equipos,
- costos de implementación,
- presupuesto total,
- flujo de caja,
- indicadores como **VPN**, **TIR** y **periodo de retorno**.


## Herramientas y tecnologías utilizadas

- **Plant Simulation** – modelado y validación virtual de la línea  
- **Studio 5000** – programación de control  
- **Logix Emulate** – emulación del PLC  
- **Ladder** – lógica de control secuencial  
- **Grafcet** – modelado funcional de secuencias  
- **SCADA** – supervisión del proceso  
- **RobotStudio** – simulación de celda robotizada  
- **Excel / Project** – cronograma, EDT y evaluación económica  
- **GitHub** – control de versiones y documentación del proyecto  


## Cronograma del proyecto

El desarrollo del proyecto se organizó con base en el EDT y en el calendario académico del curso, incluyendo hitos como:

- planeación y definición del alcance,
- presentación de avance,
- integración de módulos técnicos,
- afinación final,
- sustentación del proyecto.

El cronograma y diagrama de Gantt del repositorio representan la evolución del proyecto desde la planeación hasta la entrega final.


