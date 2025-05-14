module.exports = {
    extends: ['eslint:recommended', 'prettier'],
    env: { node: true, es2020: true },
    rules: {},
    ignorePatterns: ['node_modules', 'dist'],
    overrides: [
        {
            files: ['*.tsx'],
            extends: ['plugin:react/recommended']
        },
        {
            files: ['*.ts', '*.tsx'],
            extends: ['plugin:@typescript-eslint/recommended'],
            rules: {
                '@typescript-eslint/member-ordering': 'error'
            }
        }
    ]
};
