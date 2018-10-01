import * as React from 'react';
import { Link, Redirect } from 'react-router-dom'
const styles = require('./styles.css');

export interface IProps {
  navList: Array<any>;
}

export class Navigation extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {navList} = this.props;
    return (
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navList.map(element => (
                <li className={styles.navListItem}>
                  <Link class={styles.navLink} to={element.route}>
                    {element.text}
                  </Link>
                </li>
            ))}
          </ul>
        </nav>
    );
  }
}
