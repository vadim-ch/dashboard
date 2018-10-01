import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getCurrentUserId, getCurrentUsername, isAuthenticated } from '../../../store/reducers/domain/account/selectors';
import { State } from '../../../store/reducers/index';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom'

export interface IStateProps {
  isAuthenticated: boolean;
  currentUserId: string;
  currentUsername: string;
}

export interface IDispatchProps {
  actions: any;
}

interface IState {
  username: string;
}

type IPropsComponents = IStateProps & IDispatchProps;

class Settings extends React.PureComponent<IPropsComponents, IState> {
  constructor(props: IPropsComponents) {
    super(props);
    this.state = {
      username: ''
    };
  }

  public componentWillReceiveProps(props: IPropsComponents): void {
    this.setState({username: props.currentUsername})
  }

  public render(): JSX.Element {
    const {isAuthenticated} = this.props;
    const {username} = this.state;
    return (
        <React.Fragment>
          <h1>Настройки профиля</h1>
          <form onSubmit={this.submitForm}>
            <fieldset>

              <fieldset className="form-group">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={this.changeUsername} />
              </fieldset>

              <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  /*disabled={this.props.inProgress}*/>
                Изменить
              </button>

            </fieldset>
          </form>
        </React.Fragment>
    );
  }

  private changeUsername = (event): void => {
    this.setState({username: event.target.value});
  };

  private submitForm = (event): void => {
    event.preventDefault();
    const {username} = this.state;
    const {currentUserId} = this.props;
    this.props.actions.updateUser(currentUserId, username);
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
