import React, { Suspense, type ReactNode } from 'react';

const modules = import.meta.glob('@/page/**/index.tsx');

export const loadPageComponent = (
  componentName: string | React.FC
): ReactNode => {
  if (typeof componentName === 'function') {
    return React.createElement(componentName);
  }

  const filePath = `/src/page/${componentName}/index.tsx`;
  const importer = modules[filePath];

  if (!importer) {
    return <div>页面 "{componentName}" 不存在</div>;
  }

  const LazyComp = React.lazy(() =>
    importer().then((mod) => ({ default: (mod as any).default }))
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComp />
    </Suspense>
  );
};
