/**
 * Generates a quick-term style prompt with two lines.
 * Returns both the full prompt and the length of the input line.
 */
export function createPrompt() {
  const username = 'sauriel';
  const path = ['~', 'portfolio'];

  // Colors
  const reset = '\x1B[0m';
  const cyan = '\x1B[36m';
  const magenta = '\x1B[35m';
  const gray = '\x1B[90m';
  const white = '\x1B[37m';

  // First line with user, and path
  const firstLine = `${gray}╭─${reset} ${cyan}${username}${reset}  ${magenta}${path.join('/')}${reset}`;

  // Second line with input prompt
  const inputLine = `${gray}╰─${reset} ${white}$${reset} `;
  const inputLineLength = 4; // "╰─ $ " visible length

  const fullPrompt = `${firstLine}\r\n${inputLine}`;

  return {
    prompt: fullPrompt,
    inputLineLength,
  };
}
