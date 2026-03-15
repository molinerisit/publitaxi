# AGENTS.md

## Proyecto

Publitaxi

Plataforma simple que conecta:

TAXISTAS  
que quieren ganar dinero colocando publicidad en su taxi

EMPRESAS  
que quieren publicitar en taxis

Ciudad inicial: Rosario, Argentina.

El objetivo del proyecto es validar rápidamente el mercado con un MVP.

NO se busca construir el producto final aún.

---

# Objetivo del MVP

Crear una landing web optimizada para celular donde:

1. Taxistas puedan registrarse en menos de 60 segundos.
2. Empresas puedan solicitar publicidad.
3. El administrador pueda ver los registros.

---

# Principios de desarrollo

Prioridades del proyecto:

1 Simplicidad  
2 Velocidad de desarrollo  
3 Experiencia móvil excelente  
4 Formularios muy cortos  
5 Carga rápida

Nunca agregar funcionalidades innecesarias.

---

# Stack tecnológico

Frontend

Next.js  
React  
TailwindCSS

Backend

Supabase

Usar Supabase para:

database  
storage  
api  
auth si es necesario

---

# Estructura del proyecto

/app

/page.tsx  
/layout.tsx  

/components

HeroSection.tsx  
HowItWorks.tsx  
DriverForm.tsx  
CompanyForm.tsx  
Footer.tsx  

/lib

supabaseClient.ts  

/styles

globals.css  

---

# Base de datos

Tabla: taxi_drivers

id  
name  
phone  
plate_number  
zone  
taxi_model  
photo_url  
ad_spaces  
created_at

---

Tabla: companies

id  
company_name  
contact_name  
email  
phone  
budget  
campaign_duration  
notes  
created_at

---

Tabla: campaign_requests

id  
company_id  
driver_id  
status  
message  
created_at

---

# Espacios publicitarios disponibles

Los taxistas pueden ofrecer:

puertas  
luneta  
techo

Esto se guarda como array en ad_spaces.

---

# Flujo taxista

Landing

↓

Botón:

REGISTRAR MI TAXI

↓

Formulario corto

↓

Confirmación

---

# Flujo empresa

Landing

↓

Botón

QUIERO PUBLICITAR

↓

Formulario

↓

Lead guardado

---

# Panel Admin (MVP)

Página protegida.

Listar:

taxistas registrados  
empresas interesadas

---

# Métricas del MVP

Objetivo inicial:

100 taxis registrados  
10 empresas interesadas

---

# Fase 2 (si el MVP funciona)

Marketplace completo.

matching empresa-taxista

pagos

campañas

estadísticas

geolocalización

---

# Regla clave

Optimizar todo para taxistas usando celular.