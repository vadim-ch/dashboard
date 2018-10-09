import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isAuthenticated } from '../../../../store/reducers/domain/account/selectors';
import { State } from '../../../../store/reducers/index';
import * as actions from '../../../../store/actions/index';
import { withRouter } from 'react-router-dom';
import { PageContainer } from '../../../components/page-container/index';
import {Button} from 'antd';

export interface IStateProps {
  isAuthenticated: boolean;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

class SearchBySpecialization extends React.PureComponent<IPropsComponents, void> {
  public render(): JSX.Element {
    return (
        <React.Fragment>
          <PageContainer>
            Поиск по специализации
          </PageContainer>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(SearchBySpecialization as any));
