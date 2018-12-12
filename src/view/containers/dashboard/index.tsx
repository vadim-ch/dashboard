import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isAuthenticated } from '../../../store/reducers/domain/account/selectors';
import { State } from '../../../store/reducers/index';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import Row from 'antd/lib/row';
import notification from 'antd/lib/notification';
import { getCabinets, isCabinetsPending } from '../../../store/reducers/domain/cabinets/selectors';
import { GetAllCabinetsResponseType } from '../../../api/requests/cabinet/get-all-cabinets';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar';
import { dashboardRoutes } from '../../router/routes';
import { getProfile } from '../../../store/actions/user/get-profile-action';
import { DashboardRouteNames, RouteNames, SettingsRouteNames } from '../../router';
import { push } from 'connected-react-router';

const styles = require('./styles.less');

export interface IStateProps {
  isAuthenticated: boolean;
  cabinetsPending: boolean;
  cabinets: GetAllCabinetsResponseType;
  isPasswordExist: boolean;
}

export interface IDispatchProps {
  actions: {
    getProfile: typeof getProfile;
    push: typeof push;
  };
}

type IPropsComponents = IStateProps & IDispatchProps;

class Dashboard extends React.PureComponent<IPropsComponents, void> {
  public componentDidMount(): void {
    this.props.actions.getProfile();
    if (!this.props.isPasswordExist) {
      const args = {
        message: 'Задайте пароль',
        description:
            <span>Необходимо <a
                  onClick={() =>
                      this.props.actions.push(`${DashboardRouteNames.Settings}${SettingsRouteNames.Account}`)}>
                задать пароль
              </a></span>,
        duration: 0
      };
      notification.open(args);
    }
  }

  public render(): JSX.Element {
    const {cabinetsPending, cabinets} = this.props;
    // const { from } = this.props['location'].state || { from: { pathname: '/' } };
    // if (this.props.isAuthenticated) {
    //   return <Redirect to={from} />;
    // }

    return (
        <React.Fragment>
          <main className={styles.main}>
            <aside className={styles.sidebar}>
              <Sidebar/>
            </aside>
            <section className={styles.content}>
              <Switch>
                {
                  dashboardRoutes.map((route, index) => (
                      <Route
                          key={index}
                          path={route.path}
                          exact={route.exact}
                          component={route.main}
                      />
                  ))
                }
              </Switch>
            </section>
          </main>
        </React.Fragment>
    );
  }
}

const mapStateToProps = (state: State): IStateProps => {
  return {
    isAuthenticated: isAuthenticated(state),
    cabinetsPending: isCabinetsPending(state),
    cabinets: getCabinets(state).list,
    isPasswordExist: state.domainState.account.isPasswordExist
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators({
    getProfile,
    push
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(Dashboard as any));
