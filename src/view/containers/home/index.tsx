import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isAuthenticated } from '../../../store/reducers/domain/account/selectors';
import { State } from '../../../store/reducers/index';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom'
import { privateRoute } from '../../router/utils';

export interface IStateProps {
  isAuthenticated: boolean;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

class Home extends React.PureComponent<IPropsComponents, void> {
  public render(): JSX.Element {
    const {isAuthenticated} = this.props;
    return (
        <React.Fragment>
          Home
        </React.Fragment>
    );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(Home as any));
