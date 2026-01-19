import path from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';
import vitestPlugin from '@vitest/eslint-plugin';
import { globalIgnores } from 'eslint/config';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import testingLibraryPlugin from 'eslint-plugin-testing-library';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const project = [path.resolve(__dirname, 'tsconfig.json')];

export default tseslint.config([
	globalIgnores(['dist', 'node_modules', 'CHANGELOG.md', '.yarn', '.vscode', '.git', '.github', 'coverage', 'build', 'public']),
	{
		settings: {
			'import/resolver': {
				typescript: {
					alwaysTryTypes: true,
					project,
				},
			},
		},
	},
	{
		files: ['**/*.{ts,tsx,mts}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			tseslint.configs.strictTypeChecked,
			tseslint.configs.stylisticTypeChecked,
			reactHooks.configs['recommended-latest'],
			reactRefresh.configs.vite,
			reactPlugin.configs.flat.recommended,
			reactPlugin.configs.flat['jsx-runtime'],
			jsxA11yPlugin.flatConfigs.strict,
			stylisticPlugin.configs.recommended,
			prettierPlugin,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				globals: {
					...globals.browser,
					...globals.serviceworker,
					...vitestPlugin.environments.env.globals,
				},
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			'@typescript-eslint/no-confusing-void-expression': [
				'error',
				{
					ignoreArrowShorthand: true,
				},
			],
			'@typescript-eslint/restrict-template-expressions': 'off',
			'@typescript-eslint/no-unsafe-enum-comparison': 'off',
			// '@typescript-eslint/restrict-template-expressions': [
			// 	'error',
			// 	{
			// 		allowNumber: true,
			// 	},
			// ],
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/restrict-plus-operands': 'off',
			'@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			'@typescript-eslint/no-unnecessary-condition': 'off',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unnecessary-type-conversion': 'off',
			'@typescript-eslint/no-deprecated': 'off',
			'@typescript-eslint/no-unnecessary-type-parameters': 'off',
			'@typescript-eslint/no-unnecessary-optional-chain': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/prefer-find': 'off',
			'@typescript-eslint/no-floating-promises': 'off',
			'@typescript-eslint/prefer-nullish-coalescing': 'off',
			'@typescript-eslint/no-unnecessary-type-arguments': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
			'@typescript-eslint/no-misused-promises': 'off',
			'@typescript-eslint/no-misused-spread': 'off',
			'@typescript-eslint/no-redundant-type-constituents': 'off',
			'@typescript-eslint/require-await': 'off',
			'@typescript-eslint/no-base-to-string': 'off',
			// '@typescript-eslint/no-misused-promises': [
			// 	'error',
			// 	{
			// 		checksVoidReturn: {
			// 			attributes: false,
			// 		},
			// 	},
			// ],
			'@typescript-eslint/consistent-type-imports': [
				'error',
				{
					prefer: 'type-imports',
					fixStyle: 'inline-type-imports',
				},
			],
			'arrow-body-style': [2, 'as-needed'],
			'consistent-return': 0,
			'func-names': ['error', 'as-needed'],
			'import/extensions': 0,
			'import/no-extraneous-dependencies': 0,
			'import/prefer-default-export': 0,
			'jsx-a11y/accessible-emoji': 0,
			'jsx-a11y/no-static-element-interactions': 0,
			'jsx-a11y/anchor-is-valid': [
				'warn',
				{
					aspects: ['invalidHref'],
				},
			],
			'jsx-a11y/href-no-hash': 'off',
			// 'jsx-a11y/label-has-associated-control': 1,
			'jsx-a11y/label-has-associated-control': 0,
			'jsx-a11y/click-events-have-key-events': 0,
			'jsx-a11y/label-has-for': 0,
			'jsx-a11y/alt-text': 0,
			'jsx-a11y/no-noninteractive-element-interactions': 0,
			'jsx-a11y/no-autofocus': 0,
			'jsx-a11y/interactive-supports-focus': 0,
			// 'no-alert': 'error',
			'no-alert': 'off',
			'func-names': 'off',
			// 'no-console': [
			// 	'error',
			// 	{
			// 		allow: ['info', 'warn', 'error',],
			// 	},
			// ],
			'no-console': 'off',
			'no-debugger': 'error',
			'no-param-reassign': 'off',
			// 'no-param-reassign': [
			// 	2,
			// 	{
			// 		props: false,
			// 	},
			// ],
			'no-plusplus': [
				'error',
				{
					allowForLoopAfterthoughts: true,
				},
			],
			'no-restricted-exports': 0,
			'no-shadow': 'off',
			'no-empty': 'off',
			// 'no-shadow': [
			// 	2,
			// 	{
			// 		hoist: 'all',
			// 		allow: ['resolve', 'reject', 'done', 'next', 'err', 'error'],
			// 	},
			// ],
			'no-unused-expressions': [
				2,
				{
					allowShortCircuit: true,
					allowTernary: true,
					allowTaggedTemplates: true,
				},
			],
			'prefer-const': [
				'error',
				{
					destructuring: 'all',
				},
			],
			'radix': 0,
			'react-hooks/rules-of-hooks': 'error',
			// 'react-hooks/exhaustive-deps': 1,
			'react-hooks/exhaustive-deps': 0,
			// 'react-refresh/only-export-components': 'error',
			'react-refresh/only-export-components': 'off',
			'react/display-name': 1,
			'react/forbid-prop-types': 0,
			'react/function-component-definition': [
				2,
				{
					namedComponents: 'arrow-function',
					unnamedComponents: 'arrow-function',
				},
			],
			'react/jsx-filename-extension': [
				1,
				{
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			],
			'react/jsx-props-no-spreading': 0,
			'react/jsx-no-bind': 0,
			// 'react/jsx-no-bind': [
			// 	'warn',
			// 	{
			// 		ignoreDOMComponents: false,
			// 		ignoreRefs: false,
			// 		allowArrowFunctions: false,
			// 		allowFunctions: false,
			// 		allowBind: false,
			// 	},
			// ],
			'react/no-array-index-key': 0,
			'react/no-unescaped-entities': 0,
			'react/no-unknown-property': [
				'error',
				{
					ignore: ['css'],
				},
			],
			'react/prefer-stateless-function': 1,
			// 'react/prop-types': 2,
			'react/prop-types': 0,
			'react/react-in-jsx-scope': 0,
			'react/require-default-props': 0,
			// '@stylistic/indent': ['error', 'tab'],
			'@stylistic/indent': 'off',
			'@stylistic/max-len': 0,
			'@stylistic/no-tabs': 'off',
			'@stylistic/no-trailing-spaces': [
				'error',
				{
					skipBlankLines: true,
				},
			],
			'@stylistic/quote-props': ['error', 'consistent-as-needed'],
			'@stylistic/quotes': [
				2,
				'single',
				{
					avoidEscape: true,
					allowTemplateLiterals: 'never',
				},
			],
			'@stylistic/space-before-function-paren': [
				'error',
				{
					anonymous: 'always',
					named: 'never',
					asyncArrow: 'always',
				},
			],
			'prettier/prettier': [
				'error',
				{},
				{
					usePrettierrc: true,
				},
			],
		},
	},
	{
		plugins: {
			'simple-import-sort': simpleImportSortPlugin,
		},
		rules: {
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'error',
		},
	},
	{
		files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
		...testingLibraryPlugin.configs['flat/react'],
		...vitestPlugin.configs.recommended,
	},
	{
		ignores: ['.pnp.cjs', '.pnp.loader.mjs'],
	},
]);
