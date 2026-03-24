# Sincronizados S.A.
# Proyecto Integrador – Automatización de una planta de producción Coca-Cola

## Descripción general

Este repositorio documenta el desarrollo de un proyecto integrador para la asignatura **Automatización de Procesos de Manufactura**, enfocado en la propuesta de mejoramiento de una planta física de producción de bebidas tipo Coca-Cola mediante herramientas de automatización, simulación, control industrial y evaluación económica.

El proyecto no se limita a describir el proceso productivo, sino que plantea una **solución de automatización estructurada sobre el papel**, con sustento técnico, simulación digital, arquitectura de control, propuesta de celda robotizada, sistema SCADA y análisis económico de viabilidad.

La propuesta se desarrolla con base en la metodología del curso, integrando herramientas de gestión del proyecto, análisis de proceso, Digital Factory, PLC, SCADA y diseño de celdas robotizadas.


## Objetivo general

Diseñar una propuesta integral de automatización para una planta de producción de bebidas, orientada al mejoramiento del desempeño productivo, la supervisión del proceso, la integración de tecnologías industriales y la evaluación de su viabilidad técnica y económica.


## Objetivos específicos

- Analizar el proceso productivo de una planta de bebidas e identificar sus etapas críticas.
- Definir el alcance del sistema automatizado y sus requerimientos principales.
- Elaborar la arquitectura de automatización del sistema con base en ISA-95.
- Diseñar una propuesta de celda robotizada para una etapa de manipulación o paletizado.
- Desarrollar una representación digital del sistema en **Factory I/O**.
- Implementar la lógica de control industrial mediante **Grafcet** y **Ladder**.
- Diseñar un sistema **SCADA/HMI** para supervisión, alarmas y monitoreo.
- Evaluar económicamente la propuesta mediante costos, flujo de caja e indicadores financieros.


## Alcance del proyecto

Este proyecto aborda una propuesta de automatización para una planta de producción de bebidas, tomando como referencia el flujo industrial típico de:

- preparación del jarabe,
- carbonatación,
- preparación de envases,
- llenado y sellado,
- post-procesamiento,
- identificación,
- empaque,
- paletizado,
- almacenamiento y despacho.

A partir de este proceso, se plantea una solución de mejora enfocada en automatización, monitoreo, integración digital y análisis económico.

**Importante:** el proyecto corresponde a una **propuesta de ingeniería académica**, por lo que su desarrollo se realiza mediante diseño, simulación, modelado, arquitectura de control y validación virtual, y no como implementación física real en planta.

## Metodología de desarrollo

El proyecto fue estructurado a partir del **EDT del proyecto**, que organiza el trabajo en diez bloques principales:

1. Planeación del proyecto  
2. Análisis del proceso productivo  
3. Modelado y simulación del sistema  
4. Identificación de la arquitectura de automatización  
5. Diseño de la celda robotizada  
6. Diseño digital en Factory I/O  
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

### 4. Digital Factory
Se planteó el modelado de una sección de la línea en **Factory I/O**, incluyendo:

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

- interfaz HMI,
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

- **Factory I/O** – modelado y validación virtual de la línea  
- **Studio 5000** – programación de control  
- **Logix Emulate** – emulación del PLC  
- **Ladder** – lógica de control secuencial  
- **Grafcet** – modelado funcional de secuencias  
- **SCADA / HMI** – supervisión del proceso  
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


## Entregables del repositorio

Este repositorio reúne los principales productos del proyecto, entre ellos:

- EDT del proyecto  
- EDT del proceso productivo  
- cronograma y diagrama de Gantt  
- análisis del proceso y layout  
- arquitectura de automatización  
- diseño de la celda robotizada  
- modelado en Factory I/O  
- lógica de control en Ladder  
- propuesta de sistema SCADA  
- evaluación económica  
- informe 
- material de presentación  
