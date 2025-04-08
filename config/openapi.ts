import { defineConfig } from '@umijs/openapi';

export default defineConfig({
  requestLibPath: 'src/utils/request.ts',
  schemaPath: 'http://localhost:3000/api-json',
  mock: false,
  projectName: 'learn-english-api',
});
