import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  getCurrentUserId,
  getCurrentUsername,
  isAuthenticated
} from '../../../store/reducers/domain/account/selectors';
import { State } from '../../../store/reducers/index';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import Button from 'antd/lib/button';
import { DashboardRouteNames, SettingsRouteNames } from '../../router';
import { DashboardContainer } from '../../components/dashboard-container';
import SettingsMenu from './settings-menu';
import { Title } from '../../components/title';
import MainSettings from './main';
import NotificationSettings from './notification';
import { HeadWrapper } from '../../components/head-wrapper';
import { dashboardRoutes } from '../../router/routes';
export interface IStateProps {
  isAuthenticated: boolean;
  currentUserId: string;
  currentUsername: string;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

class Settings extends React.PureComponent<IPropsComponents, {}> {
  constructor(props: IPropsComponents) {
    super(props);
  }

  public componentWillReceiveProps(props: IPropsComponents): void {
    // this.setState({firstName: props.currentUsername});
  }

  public render(): JSX.Element {
    const { isAuthenticated } = this.props;
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

        <Switch>
          <Route
            exact={true}
            path={`${DashboardRouteNames.Settings}${SettingsRouteNames.Main}`}
            component={MainSettings}
          />
          <Route
            path={`${DashboardRouteNames.Settings}${SettingsRouteNames.Notifications}`}
            component={NotificationSettings}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: State): IStateProps => {
  return {
    isAuthenticated: isAuthenticated(state),
    currentUsername: getCurrentUsername(state),
    currentUserId: getCurrentUserId(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators<any, any>(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(Settings as any));