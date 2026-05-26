import type { Terminal } from '@xterm/xterm';

export type InteractiveSession = {
  prompt: string
  inputLineLength: number
  handleData?: (data: string, terminal: TerminalWithSession) => boolean
  handleLine: (input: string, terminal: TerminalWithSession) => void
  onCancel?: (terminal: TerminalWithSession) => void
};

export type TerminalWithSession = Terminal & {
  __commandRegistry?: CommandRegistry
  __interactiveSession?: InteractiveSession
};

export type Command = {
  name: string
  description: string
  execute: (args: string[], terminal: TerminalWithSession) => void
};

export type CommandRegistry = Record<string, Command>;
