import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isAuthenticated } from '../../../store/reducers/domain/account/selectors';
import { State } from '../../../store/reducers/index';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import { PageContainer } from '../../components/page-container';
import { DashboardContainer } from '../../components/dashboard-container';
import { Title } from '../../components/title';
import NotificationSettings from '../settings/notification';
import { DashboardRouteNames, SettingsRouteNames } from '../../router';
import MainSettings from '../settings/main';
import { HeadWrapper } from '../../components/head-wrapper';
import { dashboardRoutes } from '../../router/routes';

const styles = require('./styles.less');

export interface IStateProps {
  isAuthenticated: boolean;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

class DashboardHome extends React.PureComponent<IPropsComponents, void> {
  public render(): JSX.Element {
    return (
      <React.Fragment>
        <DashboardContainer>
          <HeadWrapper mode="left">
            <Title>
              <Switch>
                {
                  dashboardRoutes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={() => route.title}
                    />
                  ))
                }
              </Switch>
            </Title>
          </HeadWrapper>
        </DashboardContainer>

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: State): IStateProps => {
  return {
    isAuthenticated: isAuthenticated(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators<any, any>(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(DashboardHome as any));
