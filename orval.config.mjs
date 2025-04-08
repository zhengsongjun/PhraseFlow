import orval from 'orval';

console.log("生成代码中，🚀");
export default orval.defineConfig({
  api: {
    input: 'http://localhost:3000/api-docs-json', // 确保这个URL是正确的并且API服务正在运行
    output: {
      target: 'src/services/api/index.ts',  // 确保路径是正确的
      schemas: 'src/services/api/model',    // 确保路径是正确的
      client: 'axios',  // 使用axios作为HTTP客户端库
    },
    override: {
      mutator: {
        path: 'src/utils/request.ts',  // 确保路径是正确的
        name: 'request',  // 自定义请求函数的名字
      },
    },
  },
});



