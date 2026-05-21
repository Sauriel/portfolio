type CodeFile = {
  name: string
  type: 'typescript' | 'javascript' | 'html' | 'css'
  content: string
};

export type {
  CodeFile,
};
