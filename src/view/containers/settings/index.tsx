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
import { DashboardRouteNames, SettingsRouteNames } from '../../router';

export interface IStateProps {
  isAuthenticated: boolean;
  currentUserId: string;
  currentUsername: string;
}

export interface IDispatchProps {
  actions: any;
}

interface IState {
  firstName: string;
  lastName: string;
}

type IPropsComponents = IStateProps & IDispatchProps;

class Settings extends React.PureComponent<IPropsComponents, IState> {
  constructor(props: IPropsComponents) {
    super(props);
    this.state = {
      firstName: '',
      lastName: ''
    };
  }

  public componentWillReceiveProps(props: IPropsComponents): void {
    // this.setState({firstName: props.currentUsername});
  }

  public render(): JSX.Element {
    const {isAuthenticated} = this.props;
    const {firstName, lastName} = this.state;
    return (
        <React.Fragment>
          <h1>Настройки приложения</h1>
          <Switch>
            <Route
                exact={true}
                path={`${DashboardRouteNames.Settings}${SettingsRouteNames.Main}`}
                component={() => 'Общие настройки1'}
            />
            <Route
                path={`${DashboardRouteNames.Settings}${SettingsRouteNames.Notifications}`}
                component={() => 'Настройки уведомлений'}
            />
          </Switch>
        </React.Fragment>
    );
  }

  private changeFirstName = (event: any): void => {
    this.setState({firstName: event.target.value});
  }

  private changeLastName = (event: any): void => {
    this.setState({lastName: event.target.value});
  }

  private submitForm = (event: any): void => {
    event.preventDefault();
    const {firstName, lastName} = this.state;
    const {currentUserId} = this.props;
    this.props.actions.updateUser(currentUserId, firstName, lastName);
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
