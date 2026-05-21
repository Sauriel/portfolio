import type { Terminal } from '@xterm/xterm';
import type { CommandRegistry } from './types';

/**
 * Creates an input handler for the terminal that processes user input,
 * handles command history, and provides tab completion.
 */
export function createInputHandler(
  terminal: Terminal,
  commands: CommandRegistry,
  promptGetter: () => { prompt: string, inputLineLength: number },
) {
  let currentLine = '';
  const commandHistory: string[] = [];
  let historyIndex = -1;

  /**
   * Execute a command from user input
   */
  const executeCommand = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) {
      return;
    }

    // Add to history
    if (commandHistory[commandHistory.length - 1] !== trimmed) {
      commandHistory.push(trimmed);
    }
    historyIndex = commandHistory.length;

    // Parse command and arguments
    const parts = trimmed.split(/\s+/);
    const cmdName = parts[0]?.toLowerCase() ?? '';
    const args = parts.slice(1);

    // Execute command
    const command = commands[cmdName];
    if (command) {
      command.execute(args, terminal);
    } else {
      terminal.writeln(`\r\n\x1B[31mCommand not found:\x1B[0m ${cmdName}`);
      terminal.writeln(`Type \x1B[33mhelp\x1B[0m to see available commands.\r\n`);
    }
  };

  /**
   * Clear the current input line
   */
  const clearLine = () => {
    const { inputLineLength } = promptGetter();
    terminal.write(`\r${' '.repeat(inputLineLength + currentLine.length)}\r`);
  };

  /**
   * Navigate through command history
   */
  const navigateHistory = (direction: 'up' | 'down') => {
    const { prompt, inputLineLength } = promptGetter();

    if (direction === 'up' && historyIndex > 0) {
      historyIndex--;
      clearLine();
      currentLine = commandHistory[historyIndex] || '';
      // Write only the input line part of the prompt
      const inputPrompt = prompt.split('\r\n')[1] || '';
      terminal.write(inputPrompt + currentLine);
    } else if (direction === 'down') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        clearLine();
        currentLine = commandHistory[historyIndex] || '';
        const inputPrompt = prompt.split('\r\n')[1] || '';
        terminal.write(inputPrompt + currentLine);
      } else if (historyIndex === commandHistory.length - 1) {
        historyIndex = commandHistory.length;
        clearLine();
        currentLine = '';
        const inputPrompt = prompt.split('\r\n')[1] || '';
        terminal.write(inputPrompt);
      }
    }
  };

  /**
   * Handle tab completion
   */
  const handleTabCompletion = () => {
    const { prompt, inputLineLength } = promptGetter();
    const matches = Object.keys(commands).filter(cmd =>
      cmd.startsWith(currentLine.toLowerCase()),
    );

    if (matches.length === 1) {
      clearLine();
      currentLine = matches[0] ?? '';
      const inputPrompt = prompt.split('\r\n')[1] || '';
      terminal.write(inputPrompt + currentLine);
    } else if (matches.length > 1) {
      terminal.writeln(`\r\n${matches.join('  ')}`);
      const inputPrompt = prompt.split('\r\n')[1] || '';
      terminal.write(inputPrompt + currentLine);
    }
  };

  /**
   * Handle input data from terminal
   */
  const handleInput = (data: string) => {
    const code = data.charCodeAt(0);
    const { prompt } = promptGetter();

    // Enter key
    if (data === '\r' || data === '\n') {
      terminal.write('\r\n');
      executeCommand(currentLine);
      currentLine = '';
      terminal.write(prompt);
    }
    // Backspace / Delete
    else if (data === '\x7F' || data === '\b') {
      if (currentLine.length > 0) {
        currentLine = currentLine.slice(0, -1);
        terminal.write('\b \b');
      }
    }
    // Arrow Up
    else if (data === '\x1B[A') {
      navigateHistory('up');
    }
    // Arrow Down
    else if (data === '\x1B[B') {
      navigateHistory('down');
    }
    // Arrow Right / Left - Ignore to prevent cursor movement
    else if (data === '\x1B[C' || data === '\x1B[D') {
      // Do nothing
    }
    // Tab
    else if (data === '\t') {
      handleTabCompletion();
    }
    // Ctrl+C - Clear current line
    else if (data === '\x03') {
      terminal.write('^C\r\n');
      currentLine = '';
      terminal.write(prompt);
    }
    // Ctrl+L - Clear screen
    else if (data === '\x0C') {
      terminal.clear();
      terminal.write(prompt);
    }
    // Printable characters
    else if (code >= 32 && code < 127) {
      currentLine += data;
      terminal.write(data);
    }
  };

  return { handleInput };
}
