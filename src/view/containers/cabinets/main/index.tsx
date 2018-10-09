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
import Button from 'antd/lib/button';
import { RouteNames } from '../../../router';
import { getCabinets } from '../../../../store/reducers/domain/cabinets/selectors';
import { GetAllCabinetsResponseType } from '../../../../api/requests/cabinet/get-all-cabinets';
import CabinetsMenu from '../menu';

const styles = require('../styles.less');

export interface IStateProps {
  cabinets: GetAllCabinetsResponseType;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

class MainCabinets extends React.PureComponent<IPropsComponents, {}> {
  constructor(props: IPropsComponents) {
    super(props);
  }

  public componentWillReceiveProps(props: IPropsComponents): void {
    // this.setState({firstName: props.currentUsername});
  }

  public render(): JSX.Element {
    const {cabinets} = this.props;
    return (
      <DashboardContainer menu={<CabinetsMenu />} title={<Title>Мои кабинеты</Title>}>
          <HeadContainer mode="right">
            <Button type="primary">
              Создать кабинет
            </Button>
          </HeadContainer>
          <DashboardContainer>
            {cabinets.map(cabinet => (
                <div>
                  {cabinet.address}
                </div>
            ))}
          </DashboardContainer>
        </DashboardContainer>
    );
  }
}

const mapStateToProps = (state: State): IStateProps => {
  return {
    cabinets: getCabinets(state).list
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators<any, any>(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(MainCabinets as any));
