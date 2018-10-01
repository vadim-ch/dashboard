import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isAuthenticated } from '../../../store/reducers/domain/account/selectors';
import { State } from '../../../store/reducers/index';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom'
import { RouteNames } from '../../router';
import { Link } from 'react-router-dom'

export interface IStateProps {
  isAuthenticated: boolean;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

interface IState {
  username: string;
  email: string;
  password: string;
}

class Register extends React.PureComponent<IPropsComponents, IState> {
  constructor(props: IPropsComponents) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: ''
    };
  }
  public render(): JSX.Element {
    const {isAuthenticated} = this.props;
    const {username, email, password} = this.state;
    return (
        <React.Fragment>
          <h1>Регистрация</h1>
          <Link to={RouteNames.Login}>
            Есть аккаунт
          </Link>
          <form onSubmit={this.submitForm}>
            <fieldset>

              <fieldset className="form-group">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={this.changeUsername} />
              </fieldset>

              <fieldset className="form-group">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.changeEmail} />
              </fieldset>

              <fieldset className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.changePassword} />
              </fieldset>

              <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  /*disabled={this.props.inProgress}*/>
                Войти
              </button>

            </fieldset>
          </form>
        </React.Fragment>
    );
  }

  private changeUsername = (event): void => {
    this.setState({username: event.target.value});
  };

  private changeEmail = (event): void => {
    this.setState({email: event.target.value});
  };

  private changePassword = (event): void => {
    this.setState({password: event.target.value});
  };

  private submitForm = (event): void => {
    event.preventDefault();
    const {username, email, password} = this.state;
    this.props.actions.register(username, email, password);
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(Register));
