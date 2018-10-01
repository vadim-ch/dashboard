import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getCurrentUsername, isAuthenticated } from '../../store/reducers/domain/account/selectors';
import { State } from '../../store/reducers/index';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router-dom'
import { Header } from '../components/header';
import { privateRoute } from '../router/utils';
import Home from './home';
import Login from './login';
import Register from './register';
import Settings from './settings';
import { isAppLoaded } from '../../store/reducers/application/ui-state/selectors';
import('./styles.css');

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
    return (
        isAppLoaded ? (
            <React.Fragment>
              <Header currentUser={currentUsername} isAuthenticated={isAuthenticated}/>
              {isAuthenticated ? <button onClick={() => this.props.actions.logout()}>Выйти</button> : null}
              {isAuthenticated ? <button onClick={() => this.props.actions.refreshToken()}>refresh</button> : null}
              <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/register' component={Register}/> : null
                {/*<Route path='/editor/:slug' component={Editor} />*/}
                {/*<Route path='/editor' component={Editor} />*/}
                {/*<Route path='/article/:id' component={Article} />*/}
                {/*<Route path='/settings' component={Settings} />*/}
                {/*<Route path='/@:username/favorites' component={ProfileFavorites} />*/}
                {/*<Route path='/@:username' component={Profile} />*/}
                {privateRoute(Settings, {path: '/settings'}, isAuthenticated)}
              </Switch>
              {/*<Route exact path={RouteNames.Home} component={Home}/>*/}
              {/*<Route path={RouteNames.Account} component={Account}/>*/}
              {/*<Route path={RouteNames.HowItWork} component={HowItWork}/>*/}
              {/*<Route path={RouteNames.Pricing} component={Pricing}/>*/}
              {/*<Route path={RouteNames.Contacts} component={Contacts}/>*/}
              {/*{this.privateRoute(Application, {path: RouteNames.Application})}*/}
            </React.Fragment>
        ) : <div>Loading</div>
    );
  }
}

const mapStateToProps = (state: State): IStateProps => {
  return {
    isAuthenticated: isAuthenticated(state),
    isAppLoaded: isAppLoaded(state),
    currentUsername: getCurrentUsername(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators<any, any>(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(App as any));
