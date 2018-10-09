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

export class Header extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
        <header className={styles.header}>
          <PageContainer>
            <div className={styles.headerWrapper}>
              <div className={styles.brand}><Link to={RouteNames.Home}>Concordia</Link></div>
              <div className={styles.menu}>
                <Navigation/>
              </div>
            </div>
          </PageContainer>
        </header>
    );
  }
}
