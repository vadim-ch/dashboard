import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  getCurrentUserId,
  getCurrentUsername,
  isAuthenticated,
  getAccount
} from '../../../../store/reducers/domain/account/selectors';
import { State } from '../../../../store/reducers';
import * as actions from '../../../../store/actions';
import { withRouter } from 'react-router-dom';
import { HeadWrapper } from '../../../components/head-wrapper';
import SettingsMenu from '../settings-menu';
import { DashboardContainer } from '../../../components/dashboard-container';
import { Title } from '../../../components/title';
import { Panel } from '../../../components/panel';
import { SubPanel } from '../../../components/sub-panel';
import { PanelWrapper } from '../../../components/panel-wrapper';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import DatePicker from 'antd/lib/date-picker';
import Radio from 'antd/lib/radio';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import moment from 'moment';

const styles = require('./styles.less');

const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const { TextArea } = Input;

export interface IStateProps {
  isAuthenticated: boolean;
  userId: string;
  firstName: string;
  lastName: string;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps & {
  form: WrappedFormUtils;
};

class SpecializationSettings extends React.PureComponent<IPropsComponents, {}> {
  constructor(props: IPropsComponents) {
    super(props);
  }

  public componentWillReceiveProps(props: IPropsComponents): void {
    // this.setState({firstName: props.currentUsername});
  }

  public render(): JSX.Element {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const { isAuthenticated, form} = this.props;
    const { getFieldDecorator } = form;
    return (
      <PanelWrapper>
        <SubPanel>
          <SettingsMenu />
        </SubPanel>
        <Panel>
          <DashboardContainer>
              Личная информация
            <br/>
            <br/>
            <Form layout="vertical" style={{ 'maxWidth': '600px' }} onSubmit={this.handleSubmit}>
              <FormItem {...formItemLayout} label="Имя">
                {getFieldDecorator('firstName', {})(<Input/>)}
              </FormItem>
            </Form>
          </DashboardContainer>
        </Panel>
      </PanelWrapper>
    );
  }

  private handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values, values.birthday.format('YYYY-MM-DD'));
      }
    });
  }
}

const WrappedSpecializationSettings = Form.create<IPropsComponents>({
  mapPropsToFields: (props: IStateProps) => {
    return {
      firstName: Form.createFormField({
        value: props.firstName
      }),
      lastName: Form.createFormField({
        value: props.lastName
      })
    };
  }
})(SpecializationSettings);

const mapStateToProps = (state: State): IStateProps => {
  const account = getAccount(state);
  return {
    isAuthenticated:  isAuthenticated(state),
    userId: account.id,
    firstName: account.firstName,
    lastName: account.lastName
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions:  bindActionCreators<any,  any>(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(WrappedSpecializationSettings as any));
