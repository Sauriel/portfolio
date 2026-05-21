import type { Command } from '../types';

export const aboutCommand: Command = {
  name: 'about',
  description: 'About this portfolio',
  execute: (args, term) => {
    term.writeln('\r\n\x1B[1;35m╔════════════════════════════════════════╗\x1B[0m');
    term.writeln('\x1B[1;35m║\x1B[0m     \x1B[1mWelcome to Sauriel\'s Portfolio\x1B[0m    \x1B[1;35m║\x1B[0m');
    term.writeln('\x1B[1;35m╚════════════════════════════════════════╝\x1B[0m\r\n');
    term.writeln('This is an interactive terminal built with');
    term.writeln('xterm.js and Nuxt. Type \x1B[32mhelp\x1B[0m to see all');
    term.writeln('available commands.\r\n');
  },
};
