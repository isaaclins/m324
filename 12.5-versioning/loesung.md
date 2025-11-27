# Lösung: 12.5 CI-CD GitHub React AWS

## Zusammenfassung

Diese Lösung implementiert eine vollständige CI/CD-Pipeline für das `biztrips-2023` React-Projekt mit:

- Semantic Versioning (SemVer)
- Docker Multi-Stage Build
- GitHub Actions für AWS ECR
- Optionales ECS Deployment

## Teil 1: Semantic Versioning

### Was ist SemVer?

Semantic Versioning ist ein Versionierungsschema im Format `MAJOR.MINOR.PATCH`:

```
1.2.3
│ │ │
│ │ └── PATCH: Bugfixes (abwärtskompatibel)
│ └──── MINOR: Neue Features (abwärtskompatibel)
└────── MAJOR: Breaking Changes (nicht abwärtskompatibel)
```

### Implementierung in package.json

```json
{
  "name": "biztrips-2023",
  "version": "1.0.0",
  ...
}
```

### Versionierung in der Pipeline

Die GitHub Actions Pipeline nutzt automatische Tags:

- Git-Tag `v1.2.3` → Docker-Tag `1.2.3`
- Branch `main` → Docker-Tag `main`
- Commit-SHA → Docker-Tag `abc1234`

## Teil 2: Docker Multi-Stage Build

### Dockerfile

Das Dockerfile verwendet einen Multi-Stage Build:

**Stage 1 (Build):**

- Basis: `node:18-alpine`
- Dependencies installieren
- React-App bauen

**Stage 2 (Production):**

- Basis: `nginx:alpine`
- Nur Build-Artefakte kopieren
- Minimale Image-Grösse (~25MB)

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --silent
COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Vorteile Multi-Stage Build

| Aspekt         | Single-Stage    | Multi-Stage    |
| -------------- | --------------- | -------------- |
| Image-Grösse   | ~1GB            | ~25MB          |
| Sicherheit     | Node.js Runtime | Nur Nginx      |
| Build-Tools    | Im Image        | Nicht im Image |
| Angriffsfläche | Gross           | Minimal        |

## Teil 3: GitHub Actions Pipeline

### Pipeline-Struktur

```
┌──────────┐    ┌──────────┐    ┌──────────┐
│  Test    │───▶│  Build   │───▶│  Deploy  │
│          │    │  + Push  │    │  (ECS)   │
└──────────┘    └──────────┘    └──────────┘
```

### Workflow-Datei

Erstellt unter: `biztrips-2023/.github/workflows/aws-ecr.yml`

### Jobs

1. **test**: Unit-Tests ausführen
2. **build-and-push**: Docker-Image bauen und zu ECR pushen
3. **deploy-ecs**: Optional zu ECS deployen

### AWS Secrets konfigurieren

Folgende GitHub Secrets müssen gesetzt werden:

| Secret                  | Beschreibung   |
| ----------------------- | -------------- |
| `AWS_ACCESS_KEY_ID`     | AWS Access Key |
| `AWS_SECRET_ACCESS_KEY` | AWS Secret Key |

**Secrets hinzufügen:**

1. Repository → Settings → Secrets and variables → Actions
2. "New repository secret" klicken
3. Name und Wert eingeben

## Teil 4: AWS ECR Setup

### ECR Repository erstellen

```bash
# AWS CLI
aws ecr create-repository \
    --repository-name biztrips-2023 \
    --region eu-central-1

# Repository URI
123456789012.dkr.ecr.eu-central-1.amazonaws.com/biztrips-2023
```

### ECR Lifecycle Policy (optional)

```json
{
  "rules": [
    {
      "rulePriority": 1,
      "description": "Keep last 10 images",
      "selection": {
        "tagStatus": "any",
        "countType": "imageCountMoreThan",
        "countNumber": 10
      },
      "action": {
        "type": "expire"
      }
    }
  ]
}
```

## Teil 5: AWS ECS Setup (Optional)

### ECS Cluster erstellen

```bash
aws ecs create-cluster --cluster-name biztrips-cluster
```

### Task Definition

```json
{
  "family": "biztrips-task",
  "containerDefinitions": [
    {
      "name": "biztrips",
      "image": "123456789012.dkr.ecr.eu-central-1.amazonaws.com/biztrips-2023:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "hostPort": 80
        }
      ],
      "memory": 512,
      "cpu": 256
    }
  ]
}
```

### Service erstellen

```bash
aws ecs create-service \
    --cluster biztrips-cluster \
    --service-name biztrips-service \
    --task-definition biztrips-task \
    --desired-count 1
```

## Erstellte Dateien

| Datei                                         | Beschreibung                |
| --------------------------------------------- | --------------------------- |
| `biztrips-2023/Dockerfile`                    | Multi-Stage Docker Build    |
| `biztrips-2023/nginx.conf`                    | Nginx Konfiguration für SPA |
| `biztrips-2023/.github/workflows/aws-ecr.yml` | CI/CD Pipeline              |

## Lokales Testen

### Docker Image lokal bauen

```bash
cd biztrips-2023

# Image bauen
docker build -t biztrips-2023:local .

# Container starten
docker run -p 8080:80 biztrips-2023:local

# Öffne http://localhost:8080
```

### Pipeline lokal testen (mit act)

```bash
# GitHub Actions lokal ausführen
act -j test
```

## Erfüllte Akzeptanzkriterien

### Teil 1: Versionierung

- [x] Semantic Versioning dokumentiert
- [x] Version-Format erklärt (MAJOR.MINOR.PATCH)
- [x] Automatisches Tagging in Pipeline

### Teil 2: Docker

- [x] Dockerfile erstellt
- [x] Multi-Stage Build implementiert
- [x] Nginx für Production
- [x] Image-Grösse optimiert

### Teil 3: CI/CD Pipeline

- [x] GitHub Actions Workflow erstellt
- [x] Test → Build → Push Flow
- [x] AWS ECR Integration
- [x] Automatisches Tagging

### Teil 4: AWS Integration

- [x] ECR Push konfiguriert
- [x] ECS Deployment (optional) dokumentiert
- [x] Secrets-Konfiguration erklärt

## Architektur-Diagramm

```
┌─────────────────────────────────────────────────────────────────┐
│                        GitHub Repository                         │
│                                                                  │
│   ┌──────────────┐                                              │
│   │ Push/Tag     │                                              │
│   └──────┬───────┘                                              │
└──────────┼───────────────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────────────────────┐
│                      GitHub Actions                              │
│                                                                  │
│   ┌──────────┐    ┌──────────────┐    ┌──────────────┐         │
│   │  Test    │───▶│ Docker Build │───▶│  ECR Push    │         │
│   │  npm     │    │ Multi-Stage  │    │              │         │
│   └──────────┘    └──────────────┘    └──────┬───────┘         │
└──────────────────────────────────────────────┼──────────────────┘
                                               │
                                               ▼
┌──────────────────────────────────────────────────────────────────┐
│                         AWS Cloud                                │
│                                                                  │
│   ┌──────────────┐         ┌──────────────┐                     │
│   │   AWS ECR    │────────▶│   AWS ECS    │                     │
│   │  (Registry)  │         │  (Optional)  │                     │
│   └──────────────┘         └──────────────┘                     │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

## Referenzen

- [Semantic Versioning](https://semver.org/)
- [Docker Multi-Stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [AWS ECR](https://docs.aws.amazon.com/ecr/)
- [AWS ECS](https://docs.aws.amazon.com/ecs/)
- [GitHub Actions for AWS](https://github.com/aws-actions)
