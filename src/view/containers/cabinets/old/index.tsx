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
import { HeadWrapper } from '../../../components/head-wrapper';
import { DashboardContainer } from '../../../components/dashboard-container';
import Button from 'antd/lib/button';
import {SubPanel} from '../../../components/sub-panel';
import CabinetsMenu from '../menu';
import {Panel} from '../../../components/panel';
import {PanelWrapper} from '../../../components/panel-wrapper';

export interface IStateProps {
  isAuthenticated: boolean;
  currentUserId: string;
  currentUsername: string;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

class OldCabinets extends React.PureComponent<IPropsComponents, {}> {
  constructor(props: IPropsComponents) {
    super(props);
  }

  public componentWillReceiveProps(props: IPropsComponents): void {
    // this.setState({firstName: props.currentUsername});
  }

  public render(): JSX.Element {
    const {isAuthenticated} = this.props;
    return (
        <PanelWrapper>
            <SubPanel>
                <CabinetsMenu/>
            </SubPanel>
            <Panel>
                <DashboardContainer>
                    Старые контент
                </DashboardContainer>
            </Panel>
        </PanelWrapper>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(OldCabinets as any));
