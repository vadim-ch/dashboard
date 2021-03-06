import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { dashboardRoutes } from '../../router/routes';
import { HeadWrapper } from '../head-wrapper';

const styles = require('./styles.less');

interface IProps {
  title?: JSX.Element | string;
  subtitle?: JSX.Element | string;
  menu?: JSX.Element;
}

export class DashboardContainer extends React.PureComponent<IProps, {}> {
  public render(): JSX.Element {
    const {menu, title, subtitle} = this.props;
    return (
        <div className={styles.container}>
          {this.props.children}
        </div>
    );
  }
}
