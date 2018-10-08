import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getCurrentUserChars, isAuthenticated } from '../../store/reducers/domain/account/selectors';
import { State } from '../../store/reducers/index';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { Header } from '../components/header';
import { privateRoute } from '../router/utils';
import Home from './home';
import Login from './login';
import Register from './register';
import Search from './search';
import Settings from './settings';
import Dashboard from './dashboard';
import { isAppLoaded } from '../../store/reducers/application/ui-state/selectors';

const styles = require('./styles.less');
import { Spin } from 'antd';
import { RouteNames } from '../router';
import { Footer } from '../components/footer';
import { dashboardRoutes } from '../router/routes';

export interface IStateProps {
  isAuthenticated: boolean;
  isAppLoaded: boolean;
  currentUsername: string;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

class App extends React.PureComponent<IPropsComponents, void> {
  public componentWillMount(): void {
    this.props.actions.startApp();
  }

  public render(): JSX.Element {
    const {isAuthenticated, isAppLoaded, currentUsername} = this.props;
    if (!isAppLoaded) {
      return <div className={styles.spinWrapper}><Spin size="large"/></div>;
    }
    if (isAuthenticated) {
      return <Dashboard/>;
    }
    return (
        <React.Fragment>
          <Header
              currentUser={currentUsername}
              isAuthenticated={isAuthenticated}
              logoutHandler={this.props.actions.logout}
          />
          <main className={styles.main}>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route path={RouteNames.Login} component={Login}/>
              <Route path={RouteNames.Register} component={Register}/>
              <Route path={RouteNames.Search} component={Search}/>
              {/*<Route path='/editor/:slug' component={Editor} />*/}
              {/*<Route path='/editor' component={Editor} />*/}
              {/*<Route path='/article/:id' component={Article} />*/}
              {/*<Route path='/settings' component={Settings} />*/}
              {/*<Route path='/@:username/favorites' component={ProfileFavorites} />*/}
              {/*<Route path='/@:username' component={Profile} />*/}
              {dashboardRoutes.map((route, index) => {
                  return privateRoute(route.main, {path: route.path}, isAuthenticated);
              })}
            </Switch>
          </main>
          <Footer/>
          {/*<Route exact path={RouteNames.Home} component={Home}/>*/}
          {/*<Route path={RouteNames.Account} component={Account}/>*/}
          {/*<Route path={RouteNames.HowItWork} component={HowItWork}/>*/}
          {/*<Route path={RouteNames.Pricing} component={Pricing}/>*/}
          {/*<Route path={RouteNames.Contacts} component={Contacts}/>*/}
          {/*{this.privateRoute(Application, {path: RouteNames.Application})}*/}
        </React.Fragment>
    );
  }
}

const mapStateToProps = (state: State): IStateProps => {
  return {
    isAuthenticated: isAuthenticated(state),
    isAppLoaded: isAppLoaded(state),
    currentUsername: getCurrentUserChars(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators<any, any>({
    ...actions
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(App as any));
