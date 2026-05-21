import { Terminal } from '@xterm/xterm';

export function useTerminal(terminalEl: HTMLDivElement) {
  if (!import.meta.client) {
    return;
  }
  const terminal = new Terminal({ allowTransparency: true });
  terminal.open(terminalEl);
  terminal.write('Hello from XTerminal!\r\n');
  terminal.onKey((event) => {
    const char = event.key;
    terminal.write(char);
  });
}
