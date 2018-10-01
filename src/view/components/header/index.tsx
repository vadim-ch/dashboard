import * as React from 'react';
import { PageContainer } from '../page-container';
import { Link, Redirect } from 'react-router-dom'
import { RouteNames } from '../../router';
import { Navigation } from '../navigation';
const styles = require('./styles.css');

export interface IProps {
  currentUser: string;
  isAuthenticated: boolean;
}

const navList = [
  {route: RouteNames.Home, text: 'На главную'},
];
const authenticatedNavList = [
  ...navList,
  {route: RouteNames.Settings, text: 'Настройки'},
];
const unAuthenticatedNavList = [
  ...navList,
  {route: RouteNames.Login, text: 'Вход'},
  {route: RouteNames.Register, text: 'Регистрация'},
];

export class Header extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {currentUser, isAuthenticated} = this.props;
    return (
        <header>
          <PageContainer>
            <div className={styles.headerWrapper}>
              <div className={styles.brand}>Concordia<div>для специалистов</div></div>
              <div className={styles.menu}>
                <div className={styles.username}>{currentUser}</div>
                <Navigation navList={isAuthenticated ? authenticatedNavList : unAuthenticatedNavList}/>
              </div>
            </div>
          </PageContainer>
        </header>
    );
  }
}
