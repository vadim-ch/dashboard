import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isAuthenticated } from '../../../store/reducers/domain/account/selectors';
import { State } from '../../../store/reducers/index';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import { getCabinets, isCabinetsPending } from '../../../store/reducers/domain/cabinets/selectors';
import { GetAllCabinetsResponseType } from '../../../api/requests/cabinet/get-all-cabinets';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar';
import { dashboardRoutes } from '../../router/routes';
import Login from '../login';
import Home from '../home';
import { DashboardRouteNames, RouteNames } from '../../router';
import Register from '../register';
import Search from '../search';
import DashboardHome from '../dashboard-home';
import { updateProfile } from '../../../store/actions/user/update-profile-action';
import { getProfile } from '../../../store/actions/user/get-profile-action';

const styles = require('./styles.less');

export interface IStateProps {
  isAuthenticated: boolean;
  cabinetsPending: boolean;
  cabinets: GetAllCabinetsResponseType;
}

export interface IDispatchProps {
  actions: {
    getProfile: typeof getProfile;
  };
}

type IPropsComponents = IStateProps & IDispatchProps;

class Dashboard extends React.PureComponent<IPropsComponents, void> {
  public componentDidMount(): void {
    this.props.actions.getProfile();
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
    cabinets: getCabinets(state).list
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators({
    getProfile
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(Dashboard as any));
