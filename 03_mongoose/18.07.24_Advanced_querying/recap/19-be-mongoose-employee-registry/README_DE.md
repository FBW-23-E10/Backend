# Mitarbeiterregister

Diese Übung handelt davon, wie man mit Beziehungen in einer MongoDB-Datenbank arbeitet.

Deine Aufgabe ist es, eine Mitarbeiterregister-API für ein imaginäres Unternehmen zu erstellen. Diese Übung hat viele Aufgaben, aber bleib dran, du schaffst das! 🏋️

## Aufgaben

### Aufgabe 1

- Installiere Express und Mongoose
- Verbinde dich mit MongoDB (verwende Umgebungsvariablen)
- Stelle sicher, dass du weder node_modules noch deine Datenbank-Anmeldedaten commitest

### Aufgabe 2

- Erstelle ein anfängliches `Employee` Schema und Modell, einschließlich:
    - Vollständiger Name (String, erforderlich)
    - Position (String, erforderlich)
    - E-Mail (String, erforderlich, einzigartig)

### Aufgabe 3

- Erstelle ein `Address` Schema und Modell, einschließlich:
    - Straßenname (String, erforderlich)
    - Straßenname und Nummer (String, erforderlich)
    - Postleitzahl (Nummer, erforderlich)
    - Stadt (String, erforderlich)

- Füge dann einen Eintrag in `Employee` namens `contactAddress` hinzu, der `Address` referenziert (erforderlich)
- Ein Mitarbeiter kann eine `contactAddress` haben, eine `contactAddress` kann einen Mitarbeiter haben
- Was für eine Art von Beziehung ist das?
- Recherche: Warum wäre es gut, die Adresse zu trennen?

### Aufgabe 4

- Erstelle ein `Office` Schema und Modell, einschließlich:
    - Straßenname und Nummer (String, erforderlich)
    - Postleitzahl (String, erforderlich)
    - Stadt (String, erforderlich)

- Füge dann einen Eintrag in `Employee` namens `office` hinzu, der `Office` referenziert (erforderlich)
- Ein Mitarbeiter kann ein `office` haben, ein `Office` kann mehrere Mitarbeiter haben 🦐

### Aufgabe 5

- Erstelle ein `Role` Schema und Modell, einschließlich:
    - Name (String, erforderlich)
    - Mitarbeiter (Array von ObjectIds)

- Füge dann einen Eintrag in `Employee` namens `roles` hinzu, der `Role` referenziert (erforderlich)
    - Ein Mitarbeiter kann mehrere Rollen haben
    - Eine Rolle kann mehrere Mitarbeiter haben

### Aufgabe 6

- Erstelle für Tests ein Seeder-Skript, das Folgendes einfügt:
    - 5 Rollen: Entwickler, Manager, Marketing, HR, Management
    - 3 Büros
    - 15 Mitarbeiter, alle in einem Büro, mit einzigartigen Adressen und einer Mischung aus Rollen

### Aufgabe 7

- Erstelle und teste eine kleine API mit nur GET-Endpunkten

- `GET /employee` - gibt alle Mitarbeiter zurück (keine Referenzdaten enthalten)
- `GET /employee?full=true` - gibt alle Mitarbeiter zurück, einschließlich Adresse, Büro und Rollen

- `GET /role` - gibt alle Rollen zurück (keine Referenzdaten enthalten)
- `GET /role?full=true` - gibt Rollen zurück und beinhaltet Mitarbeiter, die die Rollen haben
- `GET /role/:id/employees` - gibt alle Mitarbeiter zurück, die die gegebene Rolle haben

- `GET /office` - gibt alle Büros zurück (keine Referenzdaten enthalten)
- `GET /office/:id/employees` - gibt alle Mitarbeiter zurück, die das gegebene Büro haben
