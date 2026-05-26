import type { CommandRegistry, TerminalWithSession } from './types';

/**
 * Creates an input handler for the terminal that processes user input,
 * handles command history, and provides tab completion.
 */
export function createInputHandler(
  terminal: TerminalWithSession,
  commands: CommandRegistry,
  promptGetter: () => { prompt: string, inputLineLength: number },
) {
  let currentLine = '';
  const commandHistory: string[] = [];
  let historyIndex = -1;

  const getPromptState = () => {
    const session = terminal.__interactiveSession;
    if (session) {
      return {
        prompt: session.prompt,
        inputLineLength: session.inputLineLength,
      };
    }

    return promptGetter();
  };

  const getInputPrompt = () => {
    const { prompt } = getPromptState();
    return prompt.split('\r\n').pop() || '';
  };

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
    const { inputLineLength } = getPromptState();
    terminal.write(`\r${' '.repeat(inputLineLength + currentLine.length)}\r`);
  };

  /**
   * Navigate through command history
   */
  const navigateHistory = (direction: 'up' | 'down') => {
    if (terminal.__interactiveSession) {
      return;
    }

    if (direction === 'up' && historyIndex > 0) {
      historyIndex--;
      clearLine();
      currentLine = commandHistory[historyIndex] || '';
      terminal.write(getInputPrompt() + currentLine);
    } else if (direction === 'down') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        clearLine();
        currentLine = commandHistory[historyIndex] || '';
        terminal.write(getInputPrompt() + currentLine);
      } else if (historyIndex === commandHistory.length - 1) {
        historyIndex = commandHistory.length;
        clearLine();
        currentLine = '';
        terminal.write(getInputPrompt());
      }
    }
  };

  /**
   * Handle tab completion
   */
  const handleTabCompletion = () => {
    if (terminal.__interactiveSession) {
      return;
    }

    const matches = Object.keys(commands).filter(cmd =>
      cmd.startsWith(currentLine.toLowerCase()),
    );

    if (matches.length === 1) {
      clearLine();
      currentLine = matches[0] ?? '';
      terminal.write(getInputPrompt() + currentLine);
    } else if (matches.length > 1) {
      terminal.writeln(`\r\n${matches.join('  ')}`);
      terminal.write(getInputPrompt() + currentLine);
    }
  };

  /**
   * Handle input data from terminal
   */
  const handleInput = (data: string) => {
    const code = data.charCodeAt(0);

    if (data === '\x03') { // Ctrl+C - Clear current line
      terminal.write('^C\r\n');
      currentLine = '';
      terminal.__interactiveSession?.onCancel?.(terminal);
      terminal.__interactiveSession = undefined;
      terminal.write(getPromptState().prompt);
      return;
    }

    if (data === '\x0C') { // Ctrl+L - Clear screen
      terminal.clear();
      terminal.write(getPromptState().prompt);
      return;
    }

    if (terminal.__interactiveSession?.handleData?.(data, terminal)) {
      return;
    }

    // Enter key
    if (data === '\r' || data === '\n') {
      terminal.write('\r\n');
      if (terminal.__interactiveSession) {
        terminal.__interactiveSession.handleLine(currentLine, terminal);
      } else {
        executeCommand(currentLine);
      }
      currentLine = '';
      terminal.write(getPromptState().prompt);
    } else if (data === '\x7F' || data === '\b') { // Backspace / Delete
      if (currentLine.length > 0) {
        currentLine = currentLine.slice(0, -1);
        terminal.write('\b \b');
      }
    } else if (data === '\x1B[A') { // Arrow Up
      navigateHistory('up');
    } else if (data === '\x1B[B') { // Arrow Down
      navigateHistory('down');
    } else if (data === '\x1B[C' || data === '\x1B[D') { // Arrow Right / Left - Ignore to prevent cursor movement
      // Do nothing
    } else if (data === '\t') { // Tab
      handleTabCompletion();
    } else if (code >= 32 && code < 127) { // Printable characters
      currentLine += data;
      terminal.write(data);
    }
  };

  return { handleInput };
}
