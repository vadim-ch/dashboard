import * as React from 'react';
import { DashboardRouteNames } from './index';
import SettingsMenu from '../containers/settings-menu';
import Settings from '../containers/settings';
import Icon from 'antd/lib/icon';
import {Title} from '../components/title';
import DashboardHome from '../containers/dashboard-home';

export const dashboardRoutes = [
  {
    path: DashboardRouteNames.Home,
    exact: true,
    icon: <Icon type="dashboard" theme="outlined" />,
    main: DashboardHome
  },
  {
    path: DashboardRouteNames.Settings,
    icon: <Icon type="setting" theme="outlined" />,
    // menu: SettingsMenu,
    main: Settings
  }
];
