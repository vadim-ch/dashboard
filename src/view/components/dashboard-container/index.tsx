import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { dashboardRoutes } from '../../router/routes';
import { HeadContainer } from '../head-container';

const styles = require('./styles.less');

interface IProps {
  title?: JSX.Element | string;
  subtitle?: JSX.Element | string;
  menu?: JSX.Element;
}

export class DashboardContainer extends React.PureComponent<IProps, {}> {
  public render(): JSX.Element {
    const {menu, title, subtitle} = this.props;
    if (menu) {
      return (
          <div className={styles.extendContainer}>
            <div className={styles.panel}>
              {title ? (
                  <HeadContainer>
                    {title}
                  </HeadContainer>
              ) : null}
              <div className={styles.menu}>
                {menu}
              </div>
            </div>
            <div className={styles.main}>
              {this.props.children}
            </div>
            {/*{title ? (*/}
            {/*<Row>*/}
            {/*<Col xs={24} sm={24} md={6} lg={5} xl={5} xxl={4}>*/}
            {/*{title}*/}
            {/*</Col>*/}
            {/*{subtitle ? (*/}
            {/*<Col xs={0} sm={0} md={18} lg={19} xl={19} xxl={20}>*/}
            {/*{subtitle}*/}
            {/*</Col>*/}
            {/*) : null}*/}
            {/*</Row>*/}
            {/*) : null}*/}
            {/*<Row>*/}
            {/*<Col xs={24} sm={24} md={6} lg={5} xl={5} xxl={4}>*/}
            {/*{menu}*/}
            {/*</Col>*/}
            {/*<Col xs={0} sm={0} md={18} lg={19} xl={19} xxl={20}>*/}
            {/*<div className={styles.container}>*/}
            {/*{this.props.children}*/}
            {/*</div>*/}
            {/*</Col>*/}
            {/*</Row>*/}
          </div>
      );
    }
    return (
        <div className={styles.container}>
          {this.props.children}
        </div>
    );
  }
}
