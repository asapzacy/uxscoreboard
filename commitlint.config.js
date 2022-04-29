module.exports = {
  rules: {
    'type-enum': [
      2,
      'always',
      ['app', 'build', 'ci', 'dev', 'docs', 'feat', 'fix']
    ]
  },
  extends: ['@commitlint/config-conventional']
}
