module.exports = {
  extends: ['@concepta/eslint-config/nest'],
  parserOptions: {
    tsconfigRootDir: __dirname,
  },
  rules: {
    "@darraghor/nestjs-typed/param-decorator-name-matches-route-param": "off"
  }
};
