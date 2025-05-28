module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  // Explicitly add preset-env for Jest if @vue/app doesn't fully cover it
  // This is often needed for Jest to correctly transpile node_modules or ES6 modules in tests
  env: {
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current' // Or specific versions Jest runs on
            },
            // This helps with ES module syntax (import/export)
            modules: 'commonjs' // Transpile ES modules to CommonJS for Jest
          }
        ]
      ]
    }
  }
};
