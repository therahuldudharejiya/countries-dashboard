const config = {
    presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-react',
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties',
    ]
};

export default config;