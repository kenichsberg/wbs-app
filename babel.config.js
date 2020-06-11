module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo'], 
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      ['@babel/preset-react'], 
      ['@babel/preset-typescript']
    ],
    env: {
      test: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                modules: 'commonjs'
              }
            }
          ]
        ],
      },
    },
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json'
          ],
          alias: {
            '@components': './src/components',
            '@Screens': './src/Screens'
          }
        },
        'transform-export-extensions'
      ]
    ]
  };
};
