import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import drizzle from 'eslint-plugin-drizzle'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends('@rocketseat/eslint-config/node', 'plugin:drizzle/all'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      drizzle,
    },

    rules: {
      'simple-import-sort/imports': 'error',
    },
  },
]
