import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isAuthenticated } from '../../../store/reducers/domain/account/selectors';
import { State } from '../../../store/reducers/index';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import { PageContainer } from '../../components/page-container';
import { Button } from 'antd';
import { getCabinets, isCabinetsPending } from '../../../store/reducers/domain/cabinets/selectors';
import { GetAllCabinetsResponseType } from '../../../api/requests/cabinet/get-all-cabinets';

const styles = require('./styles.less');

export interface IStateProps {
  isAuthenticated: boolean;
  cabinetsPending: boolean;
  cabinets: GetAllCabinetsResponseType;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

class Home extends React.PureComponent<IPropsComponents, void> {
  public render(): JSX.Element {
    const {cabinetsPending, cabinets} = this.props;
    return (
        <div className={styles.homeWrapper}>
          <PageContainer>

            Home Page
            {/*<Button*/}
            {/*type="primary"*/}
            {/*loading={expertsPending}*/}
            {/*size="large" icon="search"*/}
            {/*onClick={() => this.props.actions.getAllExperts()}>*/}
            {/*Поиск специалиста*/}
            {/*</Button>*/}
            {/*{experts.map(expert => {*/}
            {/*return(*/}
            {/*<div>*/}
            {/*<div>*/}
            {/*Имя: {expert.email}*/}
            {/*</div>*/}
            {/*<div>id: {expert.id}</div>*/}
            {/*</div>*/}
            {/*);*/}
            {/*})}*/}
          </PageContainer>
        </div>
    );
  }
}

const mapStateToProps = (state: State): IStateProps => {
  return {
    isAuthenticated: isAuthenticated(state),
    cabinetsPending: isCabinetsPending(state),
    cabinets: getCabinets(state).list
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators<any, any>(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(Home as any));
