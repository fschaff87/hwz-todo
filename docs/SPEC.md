# SPEC: Was die App können muss

Diese Datei füllt /spec. Ein ausgefülltes Beispiel steht in docs/PROMPTS.md unter «Beispiel einer SPEC».

## Ziel

Eine Liste für meine Aufgaben, die Freude macht und schnell ist.

## Muss

- Aufgabe mit Titel anlegen (Enter oder Plus-Knopf).
- Aufgabe abhaken und wieder öffnen.
- Aufgabe löschen, mit «Rückgängig».
- Zähler «erledigt/gesamt» als Fortschrittsring.
- Leerer Zustand mit Illustration, wenn keine offenen Aufgaben da sind.

## Look

Aurora

## Nicht

- Kein Login, kein Server. Die Daten bleiben im Browser (localStorage).

## Fertig, wenn

1. Leere Eingabe
   - Gegeben: Das Eingabefeld ist leer oder enthält nur Leerzeichen.
   - Wenn: Ich Enter drücke.
   - Dann: Es kommt keine Aufgabe dazu und das Feld schüttelt sich kurz.
2. 200 Zeichen
   - Gegeben: Ich tippe einen Titel mit mehr als 200 Zeichen ohne Leerzeichen.
   - Wenn: Ich Enter drücke.
   - Dann: Die Aufgabe hat höchstens 200 Zeichen und der Text bricht in der Karte um.
3. Erledigt bleibt erhalten
   - Gegeben: Ich habe eine Aufgabe abgehakt.
   - Wenn: Ich die Seite neu lade.
   - Dann: Ist die Aufgabe weiterhin abgehakt und kein Text geht verloren.

## Features

(leer)
