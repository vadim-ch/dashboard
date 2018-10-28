import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  getCurrentUserId,
  isAuthenticated
} from '../../../../store/reducers/domain/account/selectors';
import { State } from '../../../../store/reducers';
import * as actions from '../../../../store/actions';
import { withRouter } from 'react-router-dom';
import { HeadWrapper } from '../../../components/head-wrapper';
import { DashboardContainer } from '../../../components/dashboard-container';
import { Title } from '../../../components/title';
import { Panel } from '../../../components/panel';
import { SubPanel } from '../../../components/sub-panel';
import { PanelWrapper } from '../../../components/panel-wrapper';
import SettingsMenu from '../settings-menu';
import {getCurrentUsername} from "../../../../store/reducers/domain/profile/selectors";
export interface IStateProps {
  isAuthenticated: boolean;
  currentUserId: string;
  currentUsername: string;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

class NotificationSettings extends React.PureComponent<IPropsComponents, {}> {
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
          <SettingsMenu />
        </SubPanel>
        <Panel>
          <DashboardContainer>
            Настройки уведомлений
            {/*<DashboardContainer>*/}
            {/*{cabinets.map(cabinet => (*/}
            {/*<div>*/}
            {/*{cabinet.address}*/}
            {/*</div>*/}
            {/*))}*/}
            {/*</DashboardContainer>*/}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(NotificationSettings as any));
