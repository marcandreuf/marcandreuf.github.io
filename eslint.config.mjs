import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import * as mdx from 'eslint-plugin-mdx';
import tseslint from 'typescript-eslint';

// Flat config, required by ESLint 9. Replaces the old .eslintrc.js.
//
// Note: eslint-plugin-tailwindcss was dropped here. Its 3.x line peer-depends
// on tailwindcss ^3.4 and resolves the palette through tailwind.config.ts,
// neither of which holds since the move to Tailwind 4. Its only active rule
// for us was no-custom-classname, which was already turned off.
//
// Ordering matters: the astro and mdx configs re-apply their own rule sets, so
// project-wide rule tuning lives in the last block to avoid being overridden.

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      '.github/**',
      '.vscode/**',
      'docs/**',
      'docker/**',
      'scripts/**',
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  ...astro.configs['flat/recommended'],

  {
    ...mdx.flat,
    rules: {
      ...mdx.flat.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  {
    languageOptions: {
      globals: {
        astroHTML: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      // `interface Props extends X {}` is the idiomatic way to name a
      // component's props in Astro.
      '@typescript-eslint/no-empty-object-type': [
        'error',
        { allowInterfaces: 'with-single-extends' },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  {
    // Components imported into MDX are used in JSX the parser does not link
    // back to the import, so unused-vars is all false positives here.
    files: ['**/*.mdx'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  {
    // Blog prose is not code. Non-breaking spaces and similar are legitimate
    // in written content, and reformatting published posts to satisfy a
    // linter would change what readers see.
    files: ['src/content/**'],
    rules: {
      'no-irregular-whitespace': 'off',
    },
  },
];
