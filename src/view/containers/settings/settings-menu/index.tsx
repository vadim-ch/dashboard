import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  getCurrentUserId,
  getCurrentUsername,
  isAuthenticated
} from '../../../../store/reducers/domain/account/selectors';
import { State } from '../../../../store/reducers/index';
import * as actions from '../../../../store/actions/index';
import { withRouter } from 'react-router-dom';
import { DashboardRouteNames, SettingsRouteNames } from '../../../router/index';
import { Link } from 'react-router-dom';
import Menu from 'antd/lib/menu';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

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

const menuList = [
  {
    title: `Основные`,
    path: `${DashboardRouteNames.Settings}${SettingsRouteNames.Main}`
  },
  {
    title: `Уведомления`,
    path: `${DashboardRouteNames.Settings}${SettingsRouteNames.Notifications}`
  }
];

class SettingsMenu extends React.PureComponent<IPropsComponents, IState> {
  constructor(props: IPropsComponents) {
    super(props);
  }

  public render(): JSX.Element {
    const {isAuthenticated} = this.props;
    const {pathname} = this.props['location'];
    const activeIndex = menuList.findIndex(item => {
      return item.path === pathname;
    });
    return (
        <React.Fragment>
          <Menu
              // style={{ width: 256 }}
              defaultSelectedKeys={[`${activeIndex}`]}
              mode="inline"
          >
            {menuList.map((link, index) => (
                <Menu.Item key={index}>
                  <Link to={link.path}>
                    {link.title}
                  </Link>
                </Menu.Item>
            ))}
          </Menu>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(SettingsMenu as any));
