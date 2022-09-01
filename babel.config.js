module.exports = {
	plugins: ['@babel/plugin-transform-modules-commonjs'],
	presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
// module.exports = { presets: ['@babel/preset-env'] };
