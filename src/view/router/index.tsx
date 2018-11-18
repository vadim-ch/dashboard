import * as React from 'react';
import { Link } from 'react-router-dom';

export const RouteNames = {
  Home: '/',
  Login: '/login',
  Register: '/register',
  Search: '/search',
};

export const DashboardRouteNames = {
  Home: '/',
  Cabinets: '/cabinets',
  Messages: '/messenger',
  Settings: '/settings'
};

export const SettingsRouteNames = {
  Main: '',
  Notifications: '/notifications',
  Specialization: '/specialization'
};

export const CabinetsRouteNames = {
  Active: '',
  Old: '/old',
  New: '/new',
  WithId: '/:id',
  Favorites: '/favorites'
};
