# Terminal Module

Ein modulares, erweiterbares Terminal-System für das Portfolio, basierend auf xterm.js.

## Struktur

```
composables/
├── useTerminal.ts              # Haupt-Composable
└── terminal/
    ├── types.ts                # TypeScript Type Definitionen
    ├── prompt.ts               # Prompt-Generator (quick-term style)
    ├── input-handler.ts        # Input-Verarbeitung und Tastatur-Handler
    └── commands/
        ├── index.ts            # Command Registry
        ├── help.ts             # Help Command
        ├── fastfetch.ts        # System Info Command
        ├── clear.ts            # Clear Screen Command
        ├── echo.ts             # Echo Command
        └── about.ts            # About Command
```

## Neuen Befehl hinzufügen

### 1. Neue Command-Datei erstellen

Erstelle eine neue Datei in `composables/terminal/commands/`, z.B. `mycommand.ts`:

```typescript
import type { Command } from '../types';

export const myCommand: Command = {
  name: 'mycommand',
  description: 'Description of what this command does',
  execute: (args, term) => {
    // Deine Command-Logik hier
    term.writeln('\r\nHello from mycommand!');
    term.write('\r\n');
  },
};
```

### 2. Command registrieren

Füge den neuen Command in `composables/terminal/commands/index.ts` hinzu:

```typescript
import { myCommand } from './mycommand';

export const commands: CommandRegistry = {
  help: helpCommand,
  fastfetch: fastfetchCommand,
  clear: clearCommand,
  echo: echoCommand,
  about: aboutCommand,
  mycommand: myCommand,  // <-- Hier hinzufügen
};
```

Das war's! Der neue Befehl ist jetzt verfügbar.

## Command API

### Command Type

```typescript
type Command = {
  name: string                                    // Command Name
  description: string                             // Kurze Beschreibung (für help)
  execute: (args: string[], terminal: Terminal) => void  // Ausführungs-Funktion
}
```

### Verfügbare Terminal-Methoden

```typescript
// Text ausgeben
term.write('text')          // Ohne Zeilenumbruch
term.writeln('text')        // Mit Zeilenumbruch

// Terminal steuern
term.clear()                // Bildschirm löschen

// ANSI Farben verwenden
term.write('\x1B[32mGrüner Text\x1B[0m')     // Grün
term.write('\x1B[31mRoter Text\x1B[0m')      // Rot
term.write('\x1B[33mGelber Text\x1B[0m')     // Gelb
term.write('\x1B[36mCyan Text\x1B[0m')       // Cyan
term.write('\x1B[1;35mMagenta Bold\x1B[0m')  // Bold Magenta
```

## ANSI Color Codes (One Dark Theme)

Die folgenden Farben sind im Terminal verfügbar:

- `\x1B[30m` - Schwarz
- `\x1B[31m` - Rot (`#e06c75`)
- `\x1B[32m` - Grün (`#98c379`)
- `\x1B[33m` - Gelb (`#d19a66`)
- `\x1B[34m` - Blau (`#61afef`)
- `\x1B[35m` - Magenta (`#c678dd`)
- `\x1B[36m` - Cyan (`#56b6c2`)
- `\x1B[37m` - Weiß (`#b6c2d9`)
- `\x1B[1;3Xm` - Bold (X = Farbnummer)
- `\x1B[0m` - Reset

## Features

- ✅ Command History (↑/↓ Pfeiltasten)
- ✅ Tab-Completion
- ✅ Backspace Support
- ✅ Ctrl+C (Zeile löschen)
- ✅ Ctrl+L (Bildschirm löschen)
- ✅ One Dark Color Theme
- ✅ Victor Mono Schriftart
- ✅ Modulare Command-Struktur

## Beispiele

### Command mit Argumenten

```typescript
export const greetCommand: Command = {
  name: 'greet',
  description: 'Greet a user by name',
  execute: (args, term) => {
    const name = args[0] || 'stranger';
    term.writeln(`\r\nHello, ${name}!`);
    term.write('\r\n');
  },
};
```

### Command mit mehrzeiliger Ausgabe

```typescript
export const listCommand: Command = {
  name: 'list',
  description: 'List items',
  execute: (args, term) => {
    term.writeln('\r\n\x1B[1;33mMy Items:\x1B[0m\r\n');
    const items = ['Item 1', 'Item 2', 'Item 3'];
    items.forEach((item, i) => {
      term.writeln(`  \x1B[32m${i + 1}.\x1B[0m ${item}`);
    });
    term.write('\r\n');
  },
};
```

### Command mit ASCII Art

```typescript
export const logoCommand: Command = {
  name: 'logo',
  description: 'Show ASCII logo',
  execute: (args, term) => {
    const logo = [
      '  ____  ',
      ' / __ \\ ',
      '| |  | |',
      '| |__| |',
      ' \\____/ ',
    ];
    term.write('\r\n');
    logo.forEach(line => {
      term.writeln(`  \x1B[36m${line}\x1B[0m`);
    });
    term.write('\r\n');
  },
};
```
