import type { Command } from '../types';

export const helpCommand: Command = {
  name: 'help',
  description: 'Show available commands',
  execute: (args, term) => {
    term.writeln('\r\n\x1B[1;33mAvailable Commands:\x1B[0m\r\n');
    
    // Get all available commands from the registry
    const commands = (term as any).__commandRegistry as Record<string, Command>;
    Object.values(commands).forEach((cmd) => {
      term.writeln(`  \x1B[32m${cmd.name.padEnd(15)}\x1B[0m ${cmd.description}`);
    });
    term.write('\r\n');
  },
};
