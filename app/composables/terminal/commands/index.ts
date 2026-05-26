import type { CommandRegistry } from '../types';
import { aboutCommand } from './about';
import { clearCommand } from './clear';
import { echoCommand } from './echo';
import { fastfetchCommand } from './fastfetch';
import { helpCommand } from './help';
import { quizCommand } from './quiz';

/**
 * Registry of all available terminal commands.
 *
 * To add a new command:
 * 1. Create a new file in this directory (e.g., 'mycommand.ts')
 * 2. Export a command object with name, description, and execute function
 * 3. Import and add it to this registry
 */
export const commands: CommandRegistry = {
  help: helpCommand,
  fastfetch: fastfetchCommand,
  clear: clearCommand,
  echo: echoCommand,
  about: aboutCommand,
  quiz: quizCommand,
};
