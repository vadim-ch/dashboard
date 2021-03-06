import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const styles = require('./styles.less');

interface IProps {
  title?: JSX.Element | string;
  subtitle?: JSX.Element | string;
  menu?: JSX.Element;
}

export class SubPanel extends React.PureComponent<IProps, {}> {
  public render(): JSX.Element {
    const {menu, title, subtitle} = this.props;
    return (
        <div className={styles.subPanel}>
          {this.props.children}
        </div>
    );
  }
}
