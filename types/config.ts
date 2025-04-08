export interface AppLayoutConfig {
  title: string;
  logo: string;
  layout: 'mix' | 'side' | 'top';
  contentWidth: 'Fluid' | 'Fixed';
  fixedHeader: boolean;
  fixSiderbar: boolean;
  navTheme: 'light' | 'dark';
  borderRadius?: number;
  colorPrimary?: string;
}

export interface AppThemeConfig {
  colorPrimary: string;
  navTheme: 'light' | 'dark';
  borderRadius?: number;
}

export interface MenuItem {
  path: string;
  name: string;
  icon?: string | React.ReactNode; // 兼容字符串和组件
  element?: React.ReactNode | string;
  disabledShowMenu?: boolean;
  children?: MenuItem[];
}
