import type { Terminal } from '@xterm/xterm';

export type Command = {
  name: string
  description: string
  execute: (args: string[], terminal: Terminal) => void
};

export type CommandRegistry = Record<string, Command>;
