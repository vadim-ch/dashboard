import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isAuthenticated } from '../../../store/reducers/domain/account/selectors';
import { State } from '../../../store/reducers/index';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import { PageContainer } from '../../components/page-container';
import Tabs from 'antd/lib/tabs';
import SearchByQuestions from './search-by-questions';
import SearchBySpecialization from './search-by-specialisation';
const { TabPane } = Tabs;

const styles = require('./styles.less');

export interface IStateProps {
  isAuthenticated: boolean;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

class Search extends React.PureComponent<IPropsComponents, void> {
  public render(): JSX.Element {
    // prototype https://spb.profi.ru/sport/kickboxing/k-1/?seamless=1&tabName=PROFILES
    return (
          <PageContainer>
            <div className={styles.searchWrapper}>
              <h1 className={styles.largeTitle}>Поиск специалиста</h1>
              <div className={styles.searchWrapper}>
                <Tabs defaultActiveKey="1" size="default"  tabPosition="left" className={styles.tabs} animated={false}>
                  <TabPane tab="По проблеме" key="1">
                    <SearchByQuestions/>
                  </TabPane>
                  <TabPane tab="По специализации" key="2">
                    <SearchBySpecialization/>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </PageContainer>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(Search as any));
