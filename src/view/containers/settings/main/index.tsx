import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  getCurrentUserId,
  getCurrentUsername,
  isAuthenticated
} from '../../../../store/reducers/domain/account/selectors';
import { State } from '../../../../store/reducers';
import * as actions from '../../../../store/actions';
import { withRouter } from 'react-router-dom';
import { HeadContainer } from '../../../components/head-container';
import { DashboardContainer } from '../../../components/dashboard-container';
import { Title } from '../../../components/title';

export interface IStateProps {
  isAuthenticated: boolean;
  currentUserId: string;
  currentUsername: string;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

class MainSettings extends React.PureComponent<IPropsComponents, {}> {
  constructor(props: IPropsComponents) {
    super(props);
  }

  public componentWillReceiveProps(props: IPropsComponents): void {
    // this.setState({firstName: props.currentUsername});
  }

  public render(): JSX.Element {
    const {isAuthenticated} = this.props;
    return (
        <React.Fragment>
          <HeadContainer>
            <Title size="medium">
              Общие настройки
            </Title>
          </HeadContainer>
          <DashboardContainer>
            Контент Общие настройки
          </DashboardContainer>
        </React.Fragment>
    );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(MainSettings as any));
