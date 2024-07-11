# Newsbot

Diese Übung geht darum, Express und Mongoose zu üben, um mit Daten zu arbeiten.

Die Anwendung ist eine persönliche Job-API. Sie überprüft automatisch Jobanzeigen von der Hackenews-API und speichert sie in einer Mongoose-Datenbank. Damit wird unsere Datenbank von einer Drittanbieter-API gespeist.

## Aufgaben

### Aufgabe 1

- Erstelle `db.js` und exportiere eine asynchrone Funktion namens `connect`
    - Diese Funktion wird von `server.js` aufgerufen

- Die Methode `connect` sollte beginnen, eine Verbindung zu MongoDB Atlas herzustellen
    - Registriere auch deine Mongoose Connection Event Handler
    - Füge `console.log` für mindestens die Ereignisse `error` und `connected` hinzu
    - Hinweis: Gib deine Datenbank-Anmeldedaten nicht weiter, sie sind geheim!
        - Tipp: Verwende Umgebungsvariablen und stelle sicher, dass du sie nicht commitest

### Aufgabe 2

- Untersuche den Data Seeder `data.js`
- Füge hilfreiche Kommentare zum bestehenden Code hinzu
- Am Ende von `refresh()`, speichere die `newData` in Mongoose mit `Job`
    - Beachte den Unterschied zwischen der Verwendung von `originalId` und `_id`
    - Die API verwendet "id", was unser Code in "originalId" übersetzt
    - Unsere MongoDB wird "_id" für die ObjectID verwenden
    - In der Datenbank ist es eine gute Idee, beides zu speichern!

### Aufgabe 3

- Füge einen Endpunkt hinzu, um einen einzelnen Job basierend auf einer vom Benutzer bereitgestellten `originalId` zu löschen
- Stelle sicher, dass du die Endpunkte testest

### Aufgabe 4

- Füge einen Endpunkt hinzu, um alle Jobs aus der Datenbank zu löschen

### **Optionale Bonusaufgabe, wenn du eine Herausforderung suchst**

- Hackernews stellt auch Nachrichtenartikel von seiner API zur Verfügung
- Siehe https://github.com/HackerNews/API für Dokumentation
- Speichere genau wie bei den Jobs eine lokale Kopie der Nachrichtenartikel
- Füge einen Endpunkt hinzu, um alle Nachrichtenartikel aus der Datenbank zu löschen
