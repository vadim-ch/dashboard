import * as React from 'react';
import { DashboardRouteNames } from './index';
import Search from '../containers/search';
import SettingsMenu from '../containers/settings-menu';
import Settings from '../containers/settings';
import Icon from 'antd/lib/icon';
import {Title} from '../components/title';

export const dashboardRoutes = [
  {
    path: DashboardRouteNames.Home,
    exact: true,
    title: <Title>Поиск</Title>,
    icon: <Icon type="dashboard" theme="outlined" />,
    menu: () => 'Меню поиска',
    main: Search
  },
  {
    path: DashboardRouteNames.Settings,
    title: <Title>Настройки</Title>,
    icon: <Icon type="setting" theme="outlined" />,
    menu: SettingsMenu,
    main: Settings
  }
];
