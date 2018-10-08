import * as React from 'react';
import { PageContainer } from '../page-container';
import { Link, Redirect } from 'react-router-dom';
import { RouteNames } from '../../router';
import { Navigation } from '../navigation';

const styles = require('./styles.less');

export interface IProps {
  currentUser: string;
  isAuthenticated: boolean;
  logoutHandler: () => void;
}

const navList = [
  {route: RouteNames.Search, text: 'Поиск специалиста'}
];
const authenticatedNavList = [
  ...navList,
  {route: RouteNames.Sessions, text: 'Сессии'},
  {route: RouteNames.Settings, text: 'Настройки'}
];
const unAuthenticatedNavList = [
  ...navList,
  {route: RouteNames.Login, text: 'Вход'},
  {route: RouteNames.Register, text: 'Регистрация'}
];

export class Header extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {currentUser, isAuthenticated, logoutHandler} = this.props;
    return (
        <header className={styles.header}>
          <PageContainer>
            <div className={styles.headerWrapper}>
              <div className={styles.brand}><Link to={RouteNames.Home}>Concordia</Link></div>
              <div className={styles.menu}>
                <Navigation
                    navList={isAuthenticated ? authenticatedNavList : unAuthenticatedNavList}
                    currentUser={currentUser}
                    isAuthenticated={isAuthenticated}
                    logoutHandler={logoutHandler}
                />
              </div>
            </div>
          </PageContainer>
        </header>
    );
  }
}
