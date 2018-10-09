import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isAuthenticated } from '../../../store/reducers/domain/account/selectors';
import { State } from '../../../store/reducers/index';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import { PageContainer } from '../../components/page-container';
import { DashboardContainer } from '../../components/dashboard-container';
import { Title } from '../../components/title';
import NotificationSettings from '../settings/notification';
import { DashboardRouteNames, SettingsRouteNames } from '../../router';
import MainSettings from '../settings/main';
import { HeadWrapper } from '../../components/head-wrapper';

const styles = require('./styles.less');

export interface IStateProps {
  isAuthenticated: boolean;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

class DashboardHome extends React.PureComponent<IPropsComponents, void> {
  public render(): JSX.Element {
    return (
        <React.Fragment>
          <HeadWrapper>
            <Title>
              Панель приборов
            </Title>
          </HeadWrapper>
          <DashboardContainer>
            Контент
          </DashboardContainer>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(DashboardHome as any));
