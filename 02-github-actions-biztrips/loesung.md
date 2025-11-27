# Lösung: GitHub Actions für Biz Trips

## Zusammenfassung

Die bestehende GitLab CI/CD Pipeline wurde erfolgreich zu GitHub Actions migriert. Die neue Pipeline befindet sich unter `biztrips-2023/.github/workflows/ci.yml` und implementiert alle drei Stages: Test, Build und Deploy.

## Implementierte Pipeline

### Workflow-Struktur

```
┌─────────────────────────────────────────────────────────────────┐
│                    GitHub Actions Pipeline                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   Trigger: Push auf main / Pull Request                         │
│                                                                  │
│   ┌──────────┐      ┌──────────┐      ┌──────────┐             │
│   │   TEST   │ ───► │  BUILD   │ ───► │  DEPLOY  │             │
│   └──────────┘      └──────────┘      └──────────┘             │
│   npm ci            npm ci            npm ci                    │
│   npm test          npm run build     npm run build             │
│                     upload artifacts  netlify deploy            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Jobs

| Job      | Beschreibung                                      | Abhängigkeit |
| -------- | ------------------------------------------------- | ------------ |
| `test`   | Führt Unit-Tests aus                              | -            |
| `build`  | Erstellt Production-Build und speichert Artefakte | test         |
| `deploy` | Deployment zu Netlify (nur bei Push auf main)     | build        |

## Vergleich: GitLab CI vs. GitHub Actions

| Aspekt              | GitLab CI           | GitHub Actions                          |
| ------------------- | ------------------- | --------------------------------------- |
| Konfigurationsdatei | `.gitlab-ci.yml`    | `.github/workflows/ci.yml`              |
| Runner              | `image: node:18`    | `runs-on: ubuntu-latest` + `setup-node` |
| Stages Definition   | `stages:` Block     | `jobs:` mit `needs:`                    |
| Artefakte           | `artifacts: paths:` | `actions/upload-artifact`               |
| Caching             | Manuell             | `cache: 'npm'` in setup-node            |

## Workflow-Datei

Die GitHub Actions Workflow-Datei wurde erstellt unter:

```
biztrips-2023/.github/workflows/ci.yml
```

### Trigger

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

Die Pipeline wird ausgelöst bei:

- Push auf den `main` Branch
- Pull Requests gegen den `main` Branch

### Test-Job

```yaml
test:
  name: Test
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: "18"
        cache: "npm"
    - run: npm ci
    - run: npm test -- --watchAll=false --passWithNoTests
```

**Hinweis**: `--watchAll=false` ist notwendig, da Jest standardmässig im Watch-Modus läuft, was in CI-Umgebungen nicht funktioniert.

### Build-Job

```yaml
build:
  name: Build
  runs-on: ubuntu-latest
  needs: test
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: "18"
        cache: "npm"
    - run: npm ci
    - run: npm run build
    - uses: actions/upload-artifact@v4
      with:
        name: build
        path: build/
        retention-days: 7
```

Die Build-Artefakte werden 7 Tage lang gespeichert und können heruntergeladen werden.

### Deploy-Job

```yaml
deploy:
  name: Deploy
  runs-on: ubuntu-latest
  needs: build
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
```

Der Deploy-Job läuft nur bei direkten Pushes auf `main`, nicht bei Pull Requests.

## Netlify Secrets konfigurieren

Für das Deployment müssen folgende Repository Secrets in GitHub konfiguriert werden:

1. `NETLIFY_AUTH_TOKEN`: Persönlicher Access Token von Netlify
2. `NETLIFY_SITE_ID`: Die Site ID des Netlify-Projekts

**Secrets hinzufügen:**

1. GitHub Repository → Settings → Secrets and variables → Actions
2. "New repository secret" klicken
3. Secrets hinzufügen

## Lokales Testen

```bash
cd biztrips-2023

# Dependencies installieren
npm ci

# Tests ausführen
npm test -- --watchAll=false

# Build erstellen
npm run build
```

## Erfüllte Akzeptanzkriterien

- [x] GitHub Actions Workflow-Datei erstellt unter `biztrips-2023/.github/workflows/ci.yml`
- [x] Workflow wird bei Push auf `main` Branch ausgelöst
- [x] Workflow wird bei Pull Requests ausgelöst
- [x] Test-Stage führt `npm test` erfolgreich aus
- [x] Build-Stage führt `npm run build` erfolgreich aus
- [x] Node.js Version 18 wird verwendet
- [x] Build-Artefakte werden gespeichert (7 Tage)
- [x] Lösung ist dokumentiert

## Vorteile der GitHub Actions Implementation

1. **Moderner Syntax**: Klare YAML-Struktur mit Actions
2. **Integriertes Caching**: npm-Cache durch `setup-node` Action
3. **Artefakt-Management**: Einfaches Hochladen und Herunterladen von Build-Artefakten
4. **Bedingte Ausführung**: `if`-Bedingungen für selektives Deployment
5. **Community Actions**: Grosse Auswahl an vorgefertigten Actions (z.B. Netlify-Deployment)
