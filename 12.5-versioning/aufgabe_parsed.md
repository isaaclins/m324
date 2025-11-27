# 12.5 CI-CD GitHub React AWS - Strukturierte Anforderungen

## Ziele

1. Software strukturiert versionieren (SemVer)
2. CI/CD-Pipeline mit GitHub Actions und AWS ECR aufsetzen
3. Docker-Container für React-Applikation erstellen

## Akzeptanzkriterien

### Teil 1: Versionierung

- [ ] Semantic Versioning im Projekt implementiert
- [ ] Version in `package.json` korrekt formatiert (MAJOR.MINOR.PATCH)
- [ ] Versionierungs-Strategie dokumentiert

### Teil 2: Docker

- [ ] Dockerfile für React-Applikation erstellt
- [ ] Multi-Stage Build verwendet (Build + Production)
- [ ] Image-Grösse optimiert (Alpine/Nginx)
- [ ] Dockerfile folgt Best Practices

### Teil 3: CI/CD Pipeline

- [ ] GitHub Actions Workflow erstellt
- [ ] Workflow baut Docker-Image
- [ ] Workflow tagged Image mit Version/Git-SHA
- [ ] AWS ECR Push konfiguriert (mit Secrets)
- [ ] Pipeline läuft bei Push auf main

### Teil 4: AWS Integration

- [ ] ECR Repository Referenz dokumentiert
- [ ] AWS Credentials als GitHub Secrets
- [ ] ECS Deployment Konzept beschrieben (optional)

## Technische Anforderungen

| Komponente | Technologie    | Version     |
| ---------- | -------------- | ----------- |
| Runtime    | Node.js        | 18          |
| Framework  | React          | 18.x        |
| Container  | Docker         | Multi-Stage |
| Registry   | AWS ECR        | -           |
| CI/CD      | GitHub Actions | v4          |
| Web Server | Nginx          | Alpine      |

## Semantic Versioning Schema

```
MAJOR.MINOR.PATCH

Beispiel: 1.2.3
         │ │ │
         │ │ └── PATCH: Bugfixes
         │ └──── MINOR: Neue Features (abwärtskompatibel)
         └────── MAJOR: Breaking Changes
```

## Docker Multi-Stage Build Konzept

```
┌─────────────────────────────────────────────┐
│ Stage 1: Build                              │
│ - node:18-alpine                            │
│ - npm ci                                    │
│ - npm run build                             │
│ - Output: /app/build                        │
└─────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────┐
│ Stage 2: Production                         │
│ - nginx:alpine                              │
│ - COPY --from=build /app/build              │
│ - Expose Port 80                            │
│ - Minimale Image-Grösse                     │
└─────────────────────────────────────────────┘
```

## CI/CD Pipeline Flow

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Push    │───▶│  Build   │───▶│  Docker  │───▶│  ECR     │
│  main    │    │  React   │    │  Build   │    │  Push    │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                                                      │
                                                      ▼
                                                ┌──────────┐
                                                │  ECS     │
                                                │ (opt.)   │
                                                └──────────┘
```

## Referenzen

- SemVer Spezifikation: https://semver.org/
- Docker Multi-Stage Builds: https://docs.docker.com/build/building/multi-stage/
- AWS ECR: https://docs.aws.amazon.com/ecr/
- GitHub Actions ECR: https://github.com/aws-actions/amazon-ecr-login
