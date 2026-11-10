# PLAN: Wie die App gebaut wird

Diese Datei füllt /plan aus docs/SPEC.md.

## Stack

Siehe docs/STACK.md. Keine Abweichungen.

## Ordner und Dateien

- `package.json`, `.npmrc`, `.prettierrc`, `.prettierignore`, `vite.config.ts`, `tsconfig*.json`, `eslint.config.js`, `vitest.setup.ts`, `components.json`, `index.html`, `src/main.tsx`, `src/index.css`, `src/lib/utils.ts`, `src/App.tsx`, `src/App.test.tsx`, `src/components/ui/*`: Rahmen, siehe «Dateien für Task 1» in docs/STACK.md.
- `src/features/tasks/model.ts`: Typ `Task` und reine Funktionen addTask, toggleTask, removeTask.
- `src/features/tasks/model.test.ts`: Tests für das Modell.
- `src/lib/storage.ts`: localStorage lesen, schreiben, migrieren (Schlüssel `"hwz-todo"`).
- `src/lib/storage.test.ts`: Tests für den Store.
- `src/features/tasks/useTasks.ts`: React-Hook, verbindet model.ts mit storage.ts.
- `src/features/tasks/useTasks.test.ts`: Tests für den Hook.
- `src/features/tasks/components/TaskInput.tsx`: Eingabefeld mit Plus-Knopf (DESIGN.md, Rezept 2).
- `src/features/tasks/components/TaskInput.test.tsx`: Tests für die Eingabe.
- `src/features/tasks/components/TaskCard.tsx`: eine Karte mit Abhaken, Durchstreichen, Konfetti, Löschen (DESIGN.md, Rezept 3).
- `src/features/tasks/components/TaskCard.test.tsx`: Tests für die Karte.
- `src/features/tasks/components/TaskList.tsx`: Liste mit Listen-Animation (DESIGN.md, Rezept 4).
- `src/features/tasks/components/EmptyState.tsx`: leerer Zustand (DESIGN.md, Rezept 5).
- `src/lib/celebrate.ts`: Konfetti-Aufruf, damit er im Test ersetzbar ist.
- `src/lib/theme.ts`: liest Konfetti-Farben aus den CSS-Variablen.
- `src/lib/useHotkey.ts`: Hook, «N» fokussiert die Eingabe (DESIGN.md, Rezept 9).
- `src/components/ProgressRing.tsx`: Fortschrittsring (DESIGN.md, Rezept 1).

## Datenmodell

`localStorage "hwz-todo" = { version: 1, tasks: Task[] }` mit

```ts
export type Task = {
  id: string // crypto.randomUUID()
  title: string // getrimmt, 1 bis 200 Zeichen
  done: boolean
  createdAt: number // Date.now()
}
```

`loadState` gibt bei fehlendem oder kaputtem Inhalt `{ version: 1, tasks: [] }` zurück, ohne Fehler.

## Komponenten

- ProgressRing: zeigt erledigt/gesamt als SVG-Ring mit springender Animation (DESIGN.md, Rezept 1).
- TaskInput: Eingabefeld mit Plus-Knopf, Enter fügt hinzu, leere Eingabe schüttelt (Rezept 2).
- TaskCard: Checkbox, animierte Durchstreichung, Konfetti beim Abhaken, Löschen mit «Rückgängig»-Toast (Rezept 3).
- TaskList: Liste mit ein-/ausgleitenden Karten (Rezept 4).
- EmptyState: Illustration des Looks, wenn keine Aufgaben (Rezept 5).

## Risiken

1. Alte oder kaputte Daten im localStorage: `loadState` fängt das ab und gibt eine leere Liste zurück (AGENTS.md, Regel 9).
2. Browser-Funktionen, die jsdom nicht kennt (matchMedia, ResizeObserver, canvas): gefälscht in `vitest.setup.ts`.
3. Konfetti im Test: `src/lib/celebrate.ts` wird im Test ersetzt.
