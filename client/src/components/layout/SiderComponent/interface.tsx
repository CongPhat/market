export interface MenuItem {
  name?: object;
  icon?: any;
  path?: string;
  key?: string;
  flgAwesome?: boolean;
  permissionCode?: string;
  activePath?: Array<string>;
  children?: Array<any>;
  exact?: boolean;
}
