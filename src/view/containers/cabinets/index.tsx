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
import { CabinetsRouteNames, DashboardRouteNames } from '../../router';
import { DashboardContainer } from '../../components/dashboard-container';
import CabinetsMenu from './menu';
import { Title } from '../../components/title';
import MainCabinets from './main';
import FavoritesCabinets from './favorites';
import OldCabinets from './old';
import Drawer from 'antd/lib/drawer';

export interface IStateProps {
  newCabinetVisible: boolean;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

class Cabinets extends React.PureComponent<IPropsComponents, {}> {
  constructor(props: IPropsComponents) {
    super(props);
  }

  public componentWillReceiveProps(props: IPropsComponents): void {
    // this.setState({firstName: props.currentUsername});
  }

  public render(): JSX.Element {
    const { newCabinetVisible } = this.props;
    return (
      <Switch>
        <Route
          exact={true}
          path={`${DashboardRouteNames.Cabinets}${CabinetsRouteNames.Active}`}
          component={MainCabinets}
        />
        {/* <Route
          path={`${DashboardRouteNames.Cabinets}${CabinetsRouteNames.Old}`}
          component={OldCabinets}
        />
        <Route
          path={`${DashboardRouteNames.Cabinets}${CabinetsRouteNames.Favorites}`}
          component={FavoritesCabinets}
        /> */}
      </Switch>
    );
  }
}

const mapStateToProps = (state: State): IStateProps => {
  return {
    // newCabinetVisible: isNewCabinetVisible(state)
    newCabinetVisible: true
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators<any, any>(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(Cabinets as any));