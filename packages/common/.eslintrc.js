module.exports = {
  extends: ['@concepta/eslint-config/nest'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
};
