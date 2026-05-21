import type { Command } from '../types';

export const echoCommand: Command = {
  name: 'echo',
  description: 'Print text to the terminal',
  execute: (args, term) => {
    term.writeln(`\r\n${args.join(' ')}`);
    term.write('\r\n');
  },
};
