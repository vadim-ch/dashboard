import * as React from 'react';
import { DashboardRouteNames } from './index';
import Settings from '../containers/settings';
import Icon from 'antd/lib/icon';
import DashboardHome from '../containers/dashboard-home';
import Cabinets from '../containers/cabinets';

export const dashboardRoutes = [
  {
    path: DashboardRouteNames.Home,
    exact: true,
    title: 'Рабочий стол',
    icon: <Icon type="dashboard" theme="outlined" />,
    main: DashboardHome
  },
  {
    path: DashboardRouteNames.Cabinets,
    title: 'Кабинеты',
    icon: <Icon type="schedule" theme="outlined" />,
    main: Cabinets
  },
  {
    path: DashboardRouteNames.Messages,
    title: 'Кабинеты',
    icon: <Icon type="message" theme="outlined" />,
    main: () => 'Сообщения'
  },
  {
    path: DashboardRouteNames.Settings,
    title: 'Настройки',
    icon: <Icon type="setting" theme="outlined" />,
    main: Settings
  }
];
