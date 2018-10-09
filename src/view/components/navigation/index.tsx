import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RouteNames } from '../../router';
import Button from 'antd/lib/button';

const styles = require('./styles.less');

export interface IProps {}

export class Navigation extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
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
