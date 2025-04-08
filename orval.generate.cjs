// orval.generate.cjs
const path = require('path');

module.exports = {
  api: {
    // 用本地文件 swagger.json 作示例
    input: 'http://127.0.0.1:3000/api-docs-json',
    output: {
      target: './src/services/api/index.ts',
      schemas: './src/services/api/model',
      // 必须是 'axios'，因为 orval@7.x 没'custom'
      client: 'axios',
      // 自定义模板
      templates: {
        client: path.join(__dirname, 'templates', 'client.hbs'),
        function: path.join(__dirname, 'templates', 'function.hbs'),
      },
    },
    override: {
      mutator: {
        path: './src/utils/request.ts',
        name: 'request',
      },
      operations: {
        '*': {
          useMutator: true,
          // 返回 T
          responseType: '{type}',
        },
      },
    },
  },
};
