import type { Command, TerminalWithSession } from '../types';
import animeMangaQuestionsRaw from '../../../data/terminal/quiz/anime-manga.json';
import classicGamesQuestionsRaw from '../../../data/terminal/quiz/classic-games.json';
import generalGeekQuestionsRaw from '../../../data/terminal/quiz/general-geek.json';
import german90sCultureQuestionsRaw from '../../../data/terminal/quiz/german-90s-culture.json';
import starTrekQuestionsRaw from '../../../data/terminal/quiz/star-trek.json';
import legendsQuestionsRaw from '../../../data/terminal/quiz/star-wars-legends.json';
import webdevQuestionsRaw from '../../../data/terminal/quiz/webdev.json';

type QuizQuestion = {
  question: string
  options: [string, string, string, string]
  correctIndex: number
  explanation?: string
};

type QuizThemeKey = 'anime' | 'games' | 'germany90s' | 'general' | 'legends' | 'startrek' | 'webdev';

type QuizTheme = {
  key: QuizThemeKey
  label: string
  aliases: string[]
  questions: QuizQuestion[]
};

type ParsedQuizInput = {
  mode: '10' | '20' | 'all'
  themes: QuizTheme[]
};

const quizThemes: QuizTheme[] = [
  {
    key: 'anime',
    label: 'Anime/Manga',
    aliases: ['anime', 'manga', 'anime-manga', 'otaku', 'shonen'],
    questions: animeMangaQuestionsRaw as QuizQuestion[],
  },
  {
    key: 'general',
    label: 'General Geek',
    aliases: ['general', 'geek'],
    questions: generalGeekQuestionsRaw as QuizQuestion[],
  },
  {
    key: 'germany90s',
    label: 'German 90s Culture',
    aliases: ['germany90s', 'german-90s', 'germany-90s', '90s-de'],
    questions: german90sCultureQuestionsRaw as QuizQuestion[],
  },
  {
    key: 'webdev',
    label: 'Web Design/Dev',
    aliases: ['webdev', 'web', 'frontend'],
    questions: webdevQuestionsRaw as QuizQuestion[],
  },
  {
    key: 'games',
    label: 'Classic Games',
    aliases: ['games', 'game', 'retro', 'classic-games'],
    questions: classicGamesQuestionsRaw as QuizQuestion[],
  },
  {
    key: 'legends',
    label: 'Star Wars Legends',
    aliases: ['legends', 'sw-legends', 'star-wars-legends'],
    questions: legendsQuestionsRaw as QuizQuestion[],
  },
  {
    key: 'startrek',
    label: 'Star Trek',
    aliases: ['startrek', 'star-trek', 'trek'],
    questions: starTrekQuestionsRaw as QuizQuestion[],
  },
];

const allThemeKeys = quizThemes.map(theme => theme.key);
const themeAliasMap = quizThemes.reduce<Record<string, QuizThemeKey>>((acc, theme) => {
  theme.aliases.forEach((alias) => {
    acc[alias] = theme.key;
  });

  return acc;
}, {});

function printThemesHelp(term: TerminalWithSession) {
  term.writeln('\r\n\x1B[1;33mAvailable Quiz Themes:\x1B[0m');
  quizThemes.forEach((theme) => {
    term.writeln(`  \x1B[32m${theme.key.padEnd(10)}\x1B[0m ${theme.label} (${theme.questions.length} questions)`);
  });

  term.writeln('\r\n\x1B[1;33mExamples:\x1B[0m');
  term.writeln('  \x1B[36mquiz 20 webdev\x1B[0m');
  term.writeln('  \x1B[36mquiz all legends\x1B[0m');
  term.writeln('  \x1B[36mquiz 20 germany90s\x1B[0m');
  term.writeln('  \x1B[36mquiz 10 -legends\x1B[0m');
  term.writeln('  \x1B[36mquiz all anime\x1B[0m');
  term.writeln('  \x1B[36mquiz all startrek\x1B[0m');
  term.writeln('  \x1B[36mquiz all webdev games -general\x1B[0m\r\n');
}

function resolveQuestionCount(selection: '10' | '20' | 'all', totalQuestions: number) {
  if (selection === 'all') {
    return {
      count: totalQuestions,
      label: `all (${totalQuestions} questions)`,
    };
  }

  const requestedCount = Number.parseInt(selection, 10);
  return {
    count: Math.min(requestedCount, totalQuestions),
    label: selection,
  };
}

function renderQuestion(
  terminal: TerminalWithSession,
  question: QuizQuestion,
  questionNumber: number,
  totalQuestions: number,
) {
  terminal.writeln(`\x1B[1;36mQuestion ${questionNumber}/${totalQuestions}:\x1B[0m ${question.question}`);
  question.options.forEach((option, index) => {
    terminal.writeln(`  \x1B[33m${index + 1}.\x1B[0m ${option}`);
  });
  terminal.writeln('\x1B[90mAnswer with 1-4 or type exit to quit.\x1B[0m');
}

function startQuizGameplay(
  term: TerminalWithSession,
  mode: '10' | '20' | 'all',
  themes: QuizTheme[],
) {
  const selectedThemeLabels = themes.map(theme => theme.label).join(', ');
  const questionPool = themes.flatMap(theme => theme.questions);
  const quizMode = resolveQuestionCount(mode, questionPool.length);

  const questions = pickRandomQuestions(questionPool, quizMode.count)
    .map(shuffleAnswerOptions);

  if (questions.length === 0) {
    term.writeln('\r\n\x1B[31mNo quiz questions available.\x1B[0m\r\n');
    return;
  }

  let currentQuestionIndex = 0;
  let score = 0;

  term.__interactiveSession = {
    prompt: '\x1B[35mquiz>\x1B[0m ',
    inputLineLength: 6,
    onCancel: (terminal) => {
      terminal.writeln('\x1B[33mQuiz cancelled.\x1B[0m\r\n');
    },
    handleLine: (input, terminal) => {
      const normalizedInput = input.trim().toLowerCase();

      if (!normalizedInput) {
        terminal.writeln('\x1B[31mPlease choose 1, 2, 3, or 4.\x1B[0m');
        return;
      }

      if (normalizedInput === 'exit' || normalizedInput === 'quit' || normalizedInput === 'q') {
        terminal.writeln(`\x1B[33mQuiz ended early. Score: ${score}/${questions.length}.\x1B[0m\r\n`);
        terminal.__interactiveSession = undefined;
        return;
      }

      const selectedOption = Number.parseInt(normalizedInput, 10) - 1;
      if (Number.isNaN(selectedOption) || selectedOption < 0 || selectedOption > 3) {
        terminal.writeln('\x1B[31mInvalid answer. Please choose 1, 2, 3, or 4.\x1B[0m');
        return;
      }

      const currentQuestion = questions[currentQuestionIndex];
      if (!currentQuestion) {
        terminal.__interactiveSession = undefined;
        return;
      }

      if (selectedOption === currentQuestion.correctIndex) {
        score++;
        terminal.writeln('\x1B[32mCorrect!\x1B[0m');
      } else {
        const correctAnswer = currentQuestion.options[currentQuestion.correctIndex];
        terminal.writeln(`\x1B[31mWrong.\x1B[0m Correct answer: ${currentQuestion.correctIndex + 1}. ${correctAnswer}`);
      }

      if (currentQuestion.explanation) {
        terminal.writeln(`\x1B[90m${currentQuestion.explanation}\x1B[0m`);
      }

      currentQuestionIndex++;

      if (currentQuestionIndex >= questions.length) {
        terminal.writeln(`\r\n\x1B[1;33mQuiz finished!\x1B[0m Score: \x1B[32m${score}/${questions.length}\x1B[0m`);

        if (score === questions.length) {
          terminal.writeln('\x1B[36mPerfect run. Certified geek status unlocked.\x1B[0m\r\n');
        } else if (score >= 7) {
          terminal.writeln('\x1B[36mStrong result. Your geek reflexes are in good shape.\x1B[0m\r\n');
        } else {
          terminal.writeln('\x1B[36mRespectable attempt. A rerun might improve the score.\x1B[0m\r\n');
        }

        terminal.__interactiveSession = undefined;
        return;
      }

      terminal.write('\r\n');
      renderQuestion(terminal, questions[currentQuestionIndex]!, currentQuestionIndex + 1, questions.length);
    },
  };

  term.writeln('\r\n\x1B[1;33mGeek Quiz\x1B[0m');
  term.writeln(`\x1B[90mMode: ${quizMode.label} | Themes: ${selectedThemeLabels}\x1B[0m`);
  term.writeln(`\x1B[90mPool: ${questionPool.length} available | ${questions.length} random questions, 4 answers each.\x1B[0m\r\n`);
  renderQuestion(term, questions[0]!, 1, questions.length);
}

function startInteractiveQuizSetup(term: TerminalWithSession) {
  const countOptions: Array<'10' | '20' | 'all'> = ['10', '20', 'all'];
  const selectedThemeKeys = new Set<QuizThemeKey>(allThemeKeys);
  let countIndex = 0;
  let themeIndex = 0;
  let step: 'count' | 'themes' = 'count';
  let renderedLineCount = 0;

  const clearRenderedLines = () => {
    for (let index = 0; index < renderedLineCount; index++) {
      term.write('\x1B[1A');
      term.write('\r\x1B[2K');
    }
    renderedLineCount = 0;
  };

  const renderWizard = () => {
    const lines: string[] = [];
    lines.push('\x1B[1;33mQuiz Setup\x1B[0m');

    if (step === 'count') {
      lines.push('\x1B[36mStep 1/2: How many questions?\x1B[0m');
      countOptions.forEach((option, index) => {
        const selectedMarker = index === countIndex ? '>' : ' ';
        const suffix = option === 'all' ? ` (${quizThemes.flatMap(theme => theme.questions).length})` : '';
        lines.push(` ${selectedMarker} ${option}${suffix}`);
      });
      lines.push('\x1B[90mUse Up/Down to navigate, Enter to continue.\x1B[0m');
    } else {
      lines.push('\x1B[36mStep 2/2: Select themes\x1B[0m');
      quizThemes.forEach((theme, index) => {
        const cursor = index === themeIndex ? '>' : ' ';
        const checked = selectedThemeKeys.has(theme.key) ? 'x' : ' ';
        lines.push(` ${cursor} [${checked}] ${theme.key.padEnd(10)} ${theme.label} (${theme.questions.length})`);
      });
      lines.push('\x1B[90mUse Up/Down to navigate, Space to toggle, Enter to start.\x1B[0m');
    }

    clearRenderedLines();
    lines.forEach(line => term.writeln(line));
    renderedLineCount = lines.length;
  };

  term.__interactiveSession = {
    prompt: '\x1B[35mquiz-setup>\x1B[0m ',
    inputLineLength: 12,
    onCancel: (terminal) => {
      terminal.writeln('\x1B[33mQuiz setup cancelled.\x1B[0m\r\n');
    },
    handleData: (data, terminal) => {
      if (data === '\x1B[A') {
        if (step === 'count') {
          countIndex = (countIndex - 1 + countOptions.length) % countOptions.length;
        } else {
          themeIndex = (themeIndex - 1 + quizThemes.length) % quizThemes.length;
        }
        renderWizard();
        return true;
      }

      if (data === '\x1B[B') {
        if (step === 'count') {
          countIndex = (countIndex + 1) % countOptions.length;
        } else {
          themeIndex = (themeIndex + 1) % quizThemes.length;
        }
        renderWizard();
        return true;
      }

      if (step === 'themes' && data === ' ') {
        const activeTheme = quizThemes[themeIndex];
        if (!activeTheme) {
          return true;
        }

        if (selectedThemeKeys.has(activeTheme.key)) {
          if (selectedThemeKeys.size === 1) {
            terminal.writeln('\x1B[31mAt least one theme must stay selected.\x1B[0m');
          } else {
            selectedThemeKeys.delete(activeTheme.key);
          }
        } else {
          selectedThemeKeys.add(activeTheme.key);
        }

        renderWizard();
        return true;
      }

      if (data === '\r' || data === '\n') {
        if (step === 'count') {
          step = 'themes';
          renderWizard();
          return true;
        }

        const selectedThemes = quizThemes.filter(theme => selectedThemeKeys.has(theme.key));
        const selectedMode = countOptions[countIndex] ?? '10';
        clearRenderedLines();
        terminal.__interactiveSession = undefined;
        startQuizGameplay(terminal, selectedMode, selectedThemes);
        return true;
      }

      // Prevent random character echo during menu navigation.
      return true;
    },
    handleLine: () => {
      // Menu mode is handled via handleData.
    },
  };

  term.writeln('');
  renderWizard();
}

function parseQuizInput(args: string[]) {
  if (args.length === 1 && ['themes', 'topic', 'topics'].includes(args[0]?.toLowerCase() ?? '')) {
    return {
      listThemes: true,
    };
  }

  let mode: '10' | '20' | 'all' = '10';
  let modeWasSet = false;
  const themeTokens: string[] = [];

  for (const rawArg of args) {
    const token = rawArg.trim().toLowerCase();
    if (!token) {
      continue;
    }

    if (token === 'all' || token === 'alle') {
      if (modeWasSet) {
        return {
          error: 'Please use only one quiz size: 10, 20, or all.',
        };
      }

      mode = 'all';
      modeWasSet = true;
      continue;
    }

    if (token === '10' || token === '20') {
      if (modeWasSet) {
        return {
          error: 'Please use only one quiz size: 10, 20, or all.',
        };
      }

      mode = token;
      modeWasSet = true;
      continue;
    }

    themeTokens.push(token);
  }

  const includeThemes = new Set<QuizThemeKey>();
  const excludeThemes = new Set<QuizThemeKey>();

  for (const tokenRaw of themeTokens) {
    let token = tokenRaw;
    let isExclude = false;

    if (token.startsWith('+') || token.startsWith('-')) {
      isExclude = token.startsWith('-');
      token = token.slice(1);
    }

    const themeKey = themeAliasMap[token];
    if (!themeKey) {
      return {
        error: `Unknown theme \"${tokenRaw}\". Use \"quiz themes\" to list available themes.`,
      };
    }

    if (isExclude) {
      excludeThemes.add(themeKey);
    } else {
      includeThemes.add(themeKey);
    }
  }

  const selectedThemeSet = includeThemes.size > 0
    ? new Set(includeThemes)
    : new Set(allThemeKeys);

  excludeThemes.forEach((themeKey) => {
    selectedThemeSet.delete(themeKey);
  });

  const themes = quizThemes.filter(theme => selectedThemeSet.has(theme.key));

  if (themes.length === 0) {
    return {
      error: 'No themes left after filtering. Adjust your include/exclude options.',
    };
  }

  const parsed: ParsedQuizInput = {
    mode,
    themes,
  };

  return {
    parsed,
  };
}

function pickRandomQuestions(questions: QuizQuestion[], amount: number) {
  const shuffled = [...questions];

  for (let index = shuffled.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = shuffled[index];
    const swapValue = shuffled[swapIndex];

    if (!current || !swapValue) {
      continue;
    }

    shuffled[index] = swapValue;
    shuffled[swapIndex] = current;
  }

  return shuffled.slice(0, Math.min(amount, shuffled.length));
}

function shuffleAnswerOptions(question: QuizQuestion): QuizQuestion {
  const indexedOptions = question.options.map((option, index) => ({
    option,
    originalIndex: index,
  }));

  for (let index = indexedOptions.length - 1; index > 0; index--) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = indexedOptions[index];
    const swapValue = indexedOptions[swapIndex];

    if (!current || !swapValue) {
      continue;
    }

    indexedOptions[index] = swapValue;
    indexedOptions[swapIndex] = current;
  }

  const shuffledOptions = indexedOptions.map(({ option }) => option) as [string, string, string, string];
  const shuffledCorrectIndex = indexedOptions.findIndex(
    ({ originalIndex }) => originalIndex === question.correctIndex,
  );

  return {
    ...question,
    options: shuffledOptions,
    correctIndex: shuffledCorrectIndex,
  };
}

export const quizCommand: Command = {
  name: 'quiz',
  description: 'Play a geek quiz with interactive setup or quick args',
  execute: (args, term) => {
    if (args.length === 0) {
      startInteractiveQuizSetup(term);
      return;
    }

    const input = parseQuizInput(args);

    if ('listThemes' in input && input.listThemes) {
      printThemesHelp(term);
      return;
    }

    if ('error' in input) {
      term.writeln(`\r\n\x1B[31m${input.error}\x1B[0m`);
      term.writeln('\x1B[90mUsage: quiz [10|20|all] [themes...]\x1B[0m');
      term.writeln('\x1B[90mPrefix a theme with - to exclude it.\x1B[0m');
      term.writeln('\x1B[90mRun \"quiz themes\" for a list of available themes.\x1B[0m\r\n');
      return;
    }

    const { parsed } = input;
    if (!parsed) {
      term.writeln('\r\n\x1B[31mCould not parse quiz options.\x1B[0m\r\n');
      return;
    }

    startQuizGameplay(term, parsed.mode, parsed.themes);
  },
};
