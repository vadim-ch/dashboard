import * as React from 'react';
import { Link } from 'react-router-dom';

export const RouteNames = {
  Home: '/',
  Login: '/login',
  LoginRequest: '/login-request',
  Register: '/register',
  Search: '/search'
};

export const DashboardRouteNames = {
  Home: '/',
  Cabinets: '/cabinets',
  Messages: '/messenger',
  Settings: '/settings'
};

export const SettingsRouteNames = {
  Main: '/profile',
  Notifications: '/notifications',
  Specialization: '/specialization',
  Account: '/account'
};

export const CabinetsRouteNames = {
  Active: '',
  Old: '/old',
  New: '/new',
  WithId: '/:id',
  Favorites: '/favorites'
};
