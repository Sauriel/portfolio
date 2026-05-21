import type { Command } from '../types';

export const fastfetchCommand: Command = {
  name: 'fastfetch',
  description: 'Display system information',
  execute: (args, term) => {
    const logo = [
      '        #####           ',
      '       #######          ',
      '       ##O#O##          ',
      '       #VVVVV#          ',
      '     ##  VVV  ##        ',
      '    #          ##       ',
      '   #            ##      ',
      '  #            ###      ',
      ' ##           ####      ',
      ' ##         #####       ',
      '  ##############        ',
      '   ############         ',
      '     ########           ',
    ];

    const info = [
      ['OS', 'Portfolio Linux'],
      ['Host', 'Sauriel\'s Portfolio'],
      ['Kernel', '6.9.0-portfolio'],
      ['Uptime', '42 days, 13 hours'],
      ['Packages', '1337 (npm), 42 (system)'],
      ['Shell', 'zsh 5.9'],
      ['Resolution', '1920x1080'],
      ['Terminal', 'xterm.js'],
      ['CPU', 'Intel Core i9-13900K (32) @ 5.8GHz'],
      ['GPU', 'NVIDIA GeForce RTX 4090'],
      ['Memory', '2048MiB / 65536MiB'],
    ];

    term.write('\r\n');
    const maxLogoWidth = Math.max(...logo.map(line => line.length));

    logo.forEach((line, i) => {
      // Logo in cyan
      term.write(`  \x1B[36m${line}\x1B[0m`);

      // Add spacing between logo and info
      const padding = ' '.repeat(maxLogoWidth - line.length + 4);
      term.write(padding);

      // Info
      if (i < info.length) {
        const [key, value] = info[i]!;
        term.write(`\x1B[1;34m${key}\x1B[0m: ${value}`);
      }
      term.write('\r\n');
    });

    // Color bar
    term.write('\r\n  ');
    const colors = ['40', '41', '42', '43', '44', '45', '46', '47'];
    colors.forEach((color) => {
      term.write(`\x1B[${color}m   \x1B[0m`);
    });
    term.write('\r\n\r\n');
  },
};
