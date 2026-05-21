import { Terminal } from '@xterm/xterm';
import { commands } from './terminal/commands';
import { createInputHandler } from './terminal/input-handler';
import { createPrompt } from './terminal/prompt';

/**
 * Initialize and configure an interactive terminal instance.
 *
 * Features:
 * - Command execution with argument parsing
 * - Command history (↑/↓ arrow keys)
 * - Tab completion
 * - Keyboard shortcuts (Ctrl+C, Ctrl+L)
 *
 * @param terminalEl - The HTML element to render the terminal into
 */
export function useTerminal(terminalEl: HTMLDivElement) {
  if (!import.meta.client) {
    return;
  }

  // Initialize terminal with One Dark theme
  const terminal = new Terminal({
    allowTransparency: true,
    cursorBlink: true,
    fontSize: 14,
    fontFamily: '"Victor Mono", "Menlo", Monaco, monospace',
    theme: {
      background: '#181c35',
      foreground: '#e6edf3', // --text-primary
      cursor: '#bb86fc', // --accent-purple
      cursorAccent: '#0b1020',
      selectionBackground: 'rgba(187, 134, 252, 0.3)',
      selectionForeground: '#e6edf3',
      black: '#0b1020',
      red: '#e06c75', // --code-variable
      green: '#98c379', // --code-string
      yellow: '#d19a66', // --code-number
      blue: '#61afef', // --code-function
      magenta: '#c678dd', // --code-keyword
      cyan: '#56b6c2', // --info
      white: '#b6c2d9', // --text-secondary
      brightBlack: '#5c6370', // --code-comment
      brightRed: '#ff6b81', // --danger
      brightGreen: '#7ee787', // --success
      brightYellow: '#f2cc60', // --warning
      brightBlue: '#6ea8fe', // --accent-blue
      brightMagenta: '#bb86fc', // --accent-purple
      brightCyan: '#63f2ff', // --accent-cyan
      brightWhite: '#e6edf3', // --text-primary
    },
  });

  terminal.open(terminalEl);

  // Store command registry for help command access
  (terminal as any).__commandRegistry = commands;

  // Display welcome message
  terminal.writeln('\x1B[1;32mWelcome to the Portfolio Terminal!\x1B[0m');
  terminal.writeln('Type \x1B[33mhelp\x1B[0m to see available commands.\r\n');

  // Show initial prompt
  const { prompt } = createPrompt();
  terminal.write(prompt);

  // Set up input handling with dynamic prompt
  const { handleInput } = createInputHandler(terminal, commands, createPrompt);
  terminal.onData(handleInput);
}
