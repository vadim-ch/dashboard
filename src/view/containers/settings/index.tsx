import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  getCurrentUserId,
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
import SpecializationSettings from './specialization';
import AccountSettings from './account';
import { HeadWrapper } from '../../components/head-wrapper';
import { dashboardRoutes } from '../../router/routes';
import {getCurrentUsername} from '../../../store/reducers/domain/profile/selectors';
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
  private formRef: any;
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
          <HeadWrapper mode="justify">
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
            <Button type="primary" onClick={() => this.formRef.submitForm()}>
              Сохранить
            </Button>
          </HeadWrapper>
        </DashboardContainer>

        <Switch>
          <Redirect
              exact
              from={`${DashboardRouteNames.Settings}`}
              to={`${DashboardRouteNames.Settings}${SettingsRouteNames.Main}`}
          />
          <Route
            path={`${DashboardRouteNames.Settings}${SettingsRouteNames.Main}`}
            component={props => <MainSettings {...props} wrappedComponentRef={this.saveFormRef}/>}
          />
          <Route
            path={`${DashboardRouteNames.Settings}${SettingsRouteNames.Account}`}
            component={props => <AccountSettings {...props} wrappedComponentRef={this.saveFormRef}/>}
          />
          <Route
            path={`${DashboardRouteNames.Settings}${SettingsRouteNames.Notifications}`}
            component={NotificationSettings}
          />
          <Route
            path={`${DashboardRouteNames.Settings}${SettingsRouteNames.Specialization}`}
            component={props => <SpecializationSettings {...props} wrappedComponentRef={this.saveFormRef}/>}
          />
        </Switch>
      </React.Fragment>
    );
  }

  private saveFormRef = (formRef: any) => {
    this.formRef = formRef;
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
