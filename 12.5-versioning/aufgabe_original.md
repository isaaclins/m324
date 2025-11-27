# 12.5 CI-CD GitHub React RefCard03 - AWS

## Aufgabenstellung

Basierend auf dem PDF "12.5_CI-CD_GitHub_React_RefCard03-AWS.pdf"

### Teil 1: Software strukturiert versionieren

Implementieren Sie eine strukturierte Versionierung für das `biztrips-2023` React-Projekt nach dem **Semantic Versioning (SemVer)** Standard.

**SemVer Format:** `MAJOR.MINOR.PATCH`

- **MAJOR**: Inkompatible API-Änderungen
- **MINOR**: Neue Features (abwärtskompatibel)
- **PATCH**: Bugfixes (abwärtskompatibel)

### Teil 2: CI-CD mit GitHub, React und AWS ECR

Erstellen Sie eine CI/CD-Pipeline mit GitHub Actions, die:

1. Die React-Applikation baut
2. Ein Docker-Image erstellt
3. Das Image zu AWS ECR (Elastic Container Registry) pusht

### Teil 3: Erweiterung auf AWS ECS (Optional)

Erweitern Sie die Pipeline um ein automatisches Deployment zu AWS ECS (Elastic Container Service).

## Anforderungen

### Versionierung

- Semantic Versioning in `package.json`
- Automatische Version-Tags bei Releases
- Changelog-Dokumentation

### CI/CD Pipeline

- GitHub Actions Workflow
- Docker Multi-Stage Build
- AWS ECR Integration
- Automatisches Tagging basierend auf Git-Tags

### Docker

- Optimiertes Dockerfile für React
- Multi-Stage Build (Build + Nginx)
- Minimale Image-Grösse

## Referenzen

- Projekt: `biztrips-2023/`
- SemVer: https://semver.org/
- AWS ECR: https://aws.amazon.com/ecr/
- AWS ECS: https://aws.amazon.com/ecs/
