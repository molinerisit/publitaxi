# ORCHESTRATOR.md

Este archivo define cómo los agentes deben ejecutar el desarrollo del proyecto Publitaxi.

Los agentes deben seguir las fases en orden.

---

# Fase 1 – Setup del proyecto

Crear proyecto Next.js.

Requisitos:

Next.js App Router  
Typescript  
TailwindCSS

Configurar estructura base.

---

# Fase 2 – Landing Page

Crear landing simple con estas secciones:

Hero  
Cómo funciona  
Registro taxistas  
Registro empresas  
Footer

La página debe ser mobile-first.

---

# Fase 3 – Registro de taxistas

Crear formulario ultra simple.

Campos:

Nombre  
Teléfono  
Patente  
Zona de trabajo  
Foto del taxi  
Espacios disponibles

Checkbox:

puertas  
luneta  
techo

Guardar en Supabase.

---

# Fase 4 – Registro de empresas

Formulario:

Empresa  
Nombre contacto  
Email  
Teléfono  
Presupuesto aproximado  
Mensaje

Guardar en Supabase.

---

# Fase 5 – Página de confirmación

Después del registro mostrar:

Gracias por registrarte.

Te contactaremos cuando haya campañas disponibles.

---

# Fase 6 – Panel Admin

Crear ruta:

/admin

Mostrar:

tabla taxistas registrados  
tabla empresas interesadas

Ordenar por fecha.

---

# Fase 7 – Optimización móvil

Verificar:

botones grandes  
tipografía legible  
formulario corto  
tiempo de carga rápido

---

# Reglas de ejecución

No agregar funcionalidades extra.

No agregar autenticación compleja.

No agregar pagos.

El objetivo es validar el mercado.

---

# Entregables

Landing funcional

Formularios guardando datos

Panel admin básico