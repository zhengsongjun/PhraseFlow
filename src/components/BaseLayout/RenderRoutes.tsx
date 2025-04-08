import { loadPageComponent } from '@/utils/loadPageComponent';
import React, { useMemo } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

interface MyRouteObject extends Omit<RouteObject, 'element' | 'children'> {
  element?: string | React.FC; // element 支持字符串或函数组件
  children?: MyRouteObject[];
}

/**
 * 将父路由的 `element` 和子路由的 `element` 拼接成完整路径
 * @param routes 路由配置
 * @param parentElementName 父路由的 `element` 名
 */
export function createRoutes(
  routes: MyRouteObject[],
  parentElementName = ''
): RouteObject[] {
  return routes.map((route) => {
    const { element: customElement, children: customChildren, ...rest } = route;

    // 拼接父子 element 名
    let mergedElementName: string | React.FC | undefined = customElement;
    if (typeof customElement === 'string' && parentElementName) {
      mergedElementName = parentElementName + '/' + customElement;
    }

    // 加载对应的组件
    const elementNode = loadPageComponent(mergedElementName ?? '');

    // 递归处理子路由
    const children = customChildren
      ? createRoutes(
          customChildren,
          typeof mergedElementName === 'string' ? mergedElementName : ''
        )
      : undefined;

    return {
      ...rest, // 保留其它属性如 path、caseSensitive 等
      element: elementNode, // 最终渲染的组件
      children, // 子路由
    } as RouteObject; // 强制转换为 RouteObject 类型
  });
}

/**
 * 渲染路由配置
 * @param routes 路由配置
 */
export function RenderRoutes(data: {
  routes: MyRouteObject[];
}): React.ReactElement | null {
  // 使用 useMemo 缓存 realRoutes，避免不必要的重新渲染
  const realRoutes = useMemo(() => {
    return createRoutes(data.routes); // 转换路由配置
  }, [data.routes]); // 只有在 routes 变化时重新计算

  return useRoutes(realRoutes); // 使用 useRoutes 渲染路由
}
