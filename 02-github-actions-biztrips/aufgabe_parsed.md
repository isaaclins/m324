# GitHub Actions Biz Trips - Strukturierte Anforderungen

## Ziel

Migration der bestehenden GitLab CI/CD Pipeline zu GitHub Actions für das `biztrips-2023` React-Projekt.

## Akzeptanzkriterien

- [ ] GitHub Actions Workflow-Datei erstellt unter `biztrips-2023/.github/workflows/ci.yml`
- [ ] Workflow wird bei Push auf `main` Branch ausgelöst
- [ ] Workflow wird bei Pull Requests ausgelöst
- [ ] Test-Stage führt `npm test` erfolgreich aus
- [ ] Build-Stage führt `npm run build` erfolgreich aus
- [ ] Node.js Version 18 wird verwendet
- [ ] Build-Artefakte werden gespeichert
- [ ] Lösung ist dokumentiert in `loesung.md`

## Technische Anforderungen

| Aspekt          | Anforderung                  |
| --------------- | ---------------------------- |
| Runtime         | Node.js 18                   |
| Package Manager | npm                          |
| Test-Befehl     | `npm test`                   |
| Build-Befehl    | `npm run build`              |
| Trigger         | Push auf main, Pull Requests |
| Artefakte       | `build/` Ordner              |

## Bestehende GitLab CI/CD Struktur

```yaml
stages:
  - test
  - build
  - deploy

test project:
  stage: test
  image: node:18
  script:
    - npm install
    - npm test

build project:
  stage: build
  image: node:18
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - build/

deploy project:
  stage: deploy
  image: node:18
  script:
    - npm install -g netlify-cli
    - netlify deploy --dir=build --prod
```

## Referenzen

- GitLab CI/CD: `biztrips-2023/.gitlab-ci.yml`
- GitHub Actions Syntax: https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions
