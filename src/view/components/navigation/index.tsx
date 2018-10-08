import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RouteNames } from '../../router';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Dropdown from 'antd/lib/dropdown';
import Avatar from 'antd/lib/avatar';

const styles = require('./styles.less');

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export interface IProps {
  navList: Array<any>;
  currentUser: string;
  isAuthenticated: boolean;
  logoutHandler: () => void;
}

export class Navigation extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {navList, currentUser, isAuthenticated, logoutHandler} = this.props;
    // const menu = (
    //     <Menu>
    //       <Menu.Item key="sessions">
    //         <Link to={RouteNames.Sessions}>
    //           <Icon type="calendar"/>
    //           Мои сеансы
    //         </Link>
    //       </Menu.Item>
    //       <Menu.Item key="settings">
    //         <Link to={RouteNames.Settings}>
    //           <Icon type="setting"/>
    //           Настройки
    //         </Link>
    //       </Menu.Item>
    //       <Menu.Item key="logout" onClick={logoutHandler}>
    //         <Icon type="logout"/>Выйти
    //       </Menu.Item>
    //     </Menu>);
    return (
        <nav className={styles.nav}>
          <Button className={styles.registerButton} size="large">
            <Link to={RouteNames.Register}>
              Зарегистрироваться
            </Link>
          </Button>
          <div className={styles.accountMenu}>
            <Button type="primary" className={styles.searchButton} size="large">
              <Link to={RouteNames.Login}>
                Войти
              </Link>
            </Button>
          </div>
        </nav>
    );
  }
}
