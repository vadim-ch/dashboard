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

const styles = require('./styles.less');

export interface IStateProps {
  isAuthenticated: boolean;
  cabinetsPending: boolean;
  cabinets: GetAllCabinetsResponseType;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

class Dashboard extends React.PureComponent<IPropsComponents, void> {
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
              <Row>
                <Col xs={24} sm={24} md={6} lg={5} xl={5} xxl={4}>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {dashboardRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.menu}
                        />
                    ))}
                  </ul>
                </Col>
                <Col xs={0} sm={0} md={18} lg={19} xl={19} xxl={20}>
                  <Switch>
                    {dashboardRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.main}
                        />
                    ))}
                  </Switch>
                </Col>
              </Row>
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
  actions: bindActionCreators<any, any>(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(Dashboard as any));
