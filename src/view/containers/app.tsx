import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isAuthenticated } from '../../store/reducers/domain/account/selectors';
import { State } from '../../store/reducers/index';
import { withRouter } from 'react-router-dom';
import { Header } from '../components/header';
import { privateRoute } from '../router/utils';
import { startApp } from '../../store/actions';
import { logout } from '../../store/actions';
import Home from './home';
import Login from './login';
import LoginRequest from './login-request';
import Register from './register';
import Search from './search';
import Dashboard from './dashboard';
import { isAppLoaded } from '../../store/reducers/application/ui-state/selectors';
import LocaleProvider from 'antd/lib/locale-provider';
import {Helmet} from 'react-helmet';

const styles = require('./styles.less');
import { RouteNames } from '../router';
import { Footer } from '../components/footer';
import {getCurrentUserChars} from '../../store/reducers/domain/profile/selectors';
import ru_RU from 'antd/lib/locale-provider/ru_RU';

export interface IStateProps {
  isAuthenticated: boolean;
  isAppLoaded: boolean;
  currentUsername: string;
}

export interface IDispatchProps {
  actions: {
    startApp: typeof startApp;
    logout: typeof logout;
  };
}

type IPropsComponents = IStateProps & IDispatchProps;

class App extends React.PureComponent<IPropsComponents, void> {
  public componentDidMount(): void {
    this.props.actions.startApp();
  }

  public render(): JSX.Element {
    const {isAuthenticated, isAppLoaded, currentUsername} = this.props;
    // if (!isAppLoaded) {
    //   return <div className={styles.spinWrapper}><Spin size="large"/></div>;
    // }
    if (isAuthenticated) {
      return <Dashboard/>;
    }
    return (
        <LocaleProvider locale={ru_RU}>
          <React.Fragment>
            <Helmet
                htmlAttributes={{'lang': 'ru'}}
                titleTemplate={'Найди своего психолога - %s'}
                defaultTitle={'Найди своего психолога'}
                meta={[
                  {'name': 'yandex-verification', content: '7a0e09fae841aba1'},
                  {'name': 'theme-color', content: '#6accba'},
                  {'name': 'viewport',
                    content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'},
                  {'name': 'description', 'content': 'Найди своего психолога'}
                ]}
            />
            <Header
                currentUser={currentUsername}
                isAuthenticated={isAuthenticated}
                logoutHandler={this.props.actions.logout}
            />
            <main className={styles.main}>
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path={RouteNames.Login} component={Login}/>
                <Route path={RouteNames.LoginRequest} component={LoginRequest}/>
                {/*<Route path={RouteNames.Register} component={Register}/>*/}
                <Route path={RouteNames.Search} component={Search}/>
                {/*<Route path='/editor/:slug' component={Editor} />*/}
                {/*<Route path='/editor' component={Editor} />*/}
                {/*<Route path='/article/:id' component={Article} />*/}
                {/*<Route path='/settings' component={Settings} />*/}
                {/*<Route path='/@:username/favorites' component={ProfileFavorites} />*/}
                {/*<Route path='/@:username' component={Profile} />*/}
                {/*{dashboardRoutes.map((route, index) => {*/}
                {/*return privateRoute(route.main, {path: route.path}, isAuthenticated);*/}
                {/*})}*/}
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
        </LocaleProvider>
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
  actions: bindActionCreators({
    startApp,
    logout
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(App as any));
