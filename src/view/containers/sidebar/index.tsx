import * as React from 'react';
import {Route, Switch, Redirect, matchPath} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import {isAuthenticated, getCurrentUserChars} from '../../../store/reducers/domain/account/selectors';
import {State} from '../../../store/reducers/index';
import * as actions from '../../../store/actions';
import {withRouter} from 'react-router-dom';
import {getCabinets, isCabinetsPending} from '../../../store/reducers/domain/cabinets/selectors';
import {GetAllCabinetsResponseType} from '../../../api/requests/cabinet/get-all-cabinets';
import {NavLink} from 'react-router-dom';
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Avatar from 'antd/lib/avatar';
import Icon from 'antd/lib/icon';
import {dashboardRoutes} from '../../router/routes';

const styles = require('./styles.less');

export interface IStateProps {
  isAuthenticated: boolean;
  cabinetsPending: boolean;
  currentUsername: string;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

class Sidebar extends React.PureComponent<IPropsComponents, void> {
  public render(): JSX.Element {
    const { cabinetsPending, currentUsername} = this.props;
    // const { from } = this.props['location'].state || { from: { pathname: '/' } };
    // if (this.props.isAuthenticated) {
    //   return <Redirect to={from} />;
    // }
    const {pathname} = this.props['location'];
    const menu = (
        <Menu>
          <Menu.Item key="logout" onClick={() => this.props.actions.logout()}>
            <Icon type="logout"/>Выйти
          </Menu.Item>
        </Menu>
    );
    return (
        <React.Fragment>
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <Avatar size="large" style={{cursor: 'pointer'}}>
            {currentUsername}
            </Avatar>
          </Dropdown>
          <ul className={styles.menu}>
            {dashboardRoutes.map((route, index) => {

              return (
                  <li className={styles.item}>
                    <NavLink
                        key={index}
                        to={route.path}
                        activeClassName={styles.selected}
                        exact={route.exact}
                    >
                      {route.icon}
                    </NavLink>
                  </li>
              );
            })}
          </ul>
        </React.Fragment>
    );
  }
}

const mapStateToProps = (state: State): IStateProps => {
  return {
    isAuthenticated: isAuthenticated(state),
    currentUsername: getCurrentUserChars(state),
    cabinetsPending: isCabinetsPending(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators<any, any>(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(Sidebar as any));
