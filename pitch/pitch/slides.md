---
theme: seriph
layout: cover
title: Architektur und Frameworks
subtitle: Monolith vs Microservices · Node.js vs Spring Boot
class: text-center
---

<div v-motion :initial="{ y: 30, opacity: 0 }" :enter="{ y: 0, opacity: 1 }" class="text-xl opacity-80">Kurz. Klar. Entscheidungsorientiert.</div>

---

## Einleitung

<v-clicks>

- Vergleich zweier Artikel zu Architektur und Frameworks
- Ziel: Welche Option passt zu welchem Projekt

</v-clicks>

---

## Betrachtung

<v-clicks>

- Auswahl nach Anforderungen, Zielen und Kosten
- Faktoren: Größe, Skalierung, Team, Komplexität, Domäne
- Ziel: einfach halten; Komplexität nur bei echtem Bedarf

</v-clicks>

---

## Architektur: Kernaussagen

<v-clicks>

- Monolith: einfach, schnell, gut für kleine Teams
- Microservices: unabhängig skalieren, Technologie frei wählen
- Entscheidung nach Größe, Last, Team und Kosten

</v-clicks>

---

## Beispiel Amazon Prime Video

<v-clicks>

- Wechsel zurück zum Monolithen, um Komplexität zu senken
- Rund 90% geringere Infrastrukturkosten

</v-clicks>

---

## Frameworks: Kernaussagen

<v-clicks>

- Node.js: schnell bei I/O und Echtzeit, JavaScript überall
- Spring Boot: stark für Unternehmensdomänen, gutes Microservices-Setup
- Beide können Microservices unterstützen

</v-clicks>

---

## Grenzen

<v-clicks>

- Node.js: nicht ideal für CPU-lastige Jobs und sehr große Dateien
- Spring Boot: schwerer und langsamer im Start

</v-clicks>

---

## Quick Guide

<v-clicks>

- I/O und Echtzeit → Node.js
- Datenbankzentriert und komplex → Spring Boot
- Ein Team, kleines Projekt → Monolith
- Viele unabhängige Deployments → Microservices

</v-clicks>

---

## Reflexion & Stellungnahme

<v-clicks>

- Es gibt keine Einheitslösung
- Für kleine Projekte: Monolith und Node.js
- Für komplexe Systeme: Microservices und Spring Boot
- Entscheide nach klaren Zielen und messbaren Effekten

</v-clicks>

<Notes>
Pragmatisch bleiben. Einfach starten. Komplexität nur hinzufügen, wenn sie Nutzen bringt.
</Notes>
