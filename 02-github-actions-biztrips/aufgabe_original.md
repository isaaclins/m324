# GitHub Actions Biz Trips

## Aufgabenstellung

Erstellen Sie eine GitHub Actions CI/CD Pipeline für das `biztrips-2023` React-Projekt.

### Ausgangslage

Das Projekt `biztrips-2023` ist eine React-Anwendung mit folgenden Eigenschaften:

- React 18 mit Create React App
- JSON-Server als Mock-API
- Jest-Tests vorhanden (calculator.test.js, App.test.js)
- Bestehende GitLab CI/CD Konfiguration (`.gitlab-ci.yml`)

### Anforderungen

1. **Migrieren Sie die bestehende GitLab CI/CD Pipeline zu GitHub Actions**
2. Die Pipeline soll folgende Stages enthalten:
   - **Test**: Ausführen der Unit-Tests mit `npm test`
   - **Build**: Erstellen des Production-Builds mit `npm run build`
   - **Deploy**: Deployment (optional, z.B. zu Netlify)
3. Die Pipeline soll bei Push auf `main` und bei Pull Requests ausgelöst werden
4. Verwenden Sie Node.js 18 als Runtime

### Referenzen

- Bestehende GitLab CI/CD: `biztrips-2023/.gitlab-ci.yml`
- Projekt: `biztrips-2023/`
- GitHub Actions Dokumentation: https://docs.github.com/en/actions

### Lieferobjekte

- `.github/workflows/ci.yml` im `biztrips-2023` Ordner
- Dokumentation der Lösung in `loesung.md`
