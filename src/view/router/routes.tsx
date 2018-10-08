import { DashboardRouteNames } from './index';
import Search from '../containers/search';
import SettingsMenu from '../containers/settings-menu';
import Settings from '../containers/settings';

export const dashboardRoutes = [
  {
    path: DashboardRouteNames.Home,
    exact: true,
    title: 'Рабочий стол',
    menu: () => 'Меню поиска',
    main: Search
  },
  {
    path: DashboardRouteNames.Settings,
    title: 'Настройки',
    menu: SettingsMenu,
    main: Settings
  }
];
