import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  getCurrentUserId,
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
import Checkbox from 'antd/lib/checkbox';
import Radio from 'antd/lib/radio';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import moment from 'moment';
import { getProfile } from '../../../../store/reducers/domain/profile/selectors';
import { updateUser } from '../../../../store/actions';

const CheckboxGroup = Checkbox.Group;
const styles = require('./styles.less');

const FormItem = Form.Item;
const {MonthPicker, RangePicker} = DatePicker;
const {TextArea} = Input;

export interface IStateProps {
  expertId: string;
  isAuthenticated: boolean;
  qualifications: Array<string>;
}

export interface IDispatchProps {
  actions: {
    updateUser: typeof updateUser;
  };
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
        xs: {span: 24},
        sm: {span: 8}
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16}
      }
    };
    const {isAuthenticated, form} = this.props;
    const {getFieldDecorator} = form;
    const options = [
      {label: 'Психолог', value: 'psychologist'},
      {label: 'Психотерапевт', value: 'psychotherapist'},
      {label: 'Психиатр', value: 'psychiatrist'},
      {label: 'Психоаналитик', value: 'psychoanalyst'}
    ];
    return (
        <PanelWrapper>
          <SubPanel>
            <SettingsMenu/>
          </SubPanel>
          <Panel>
            <DashboardContainer>
              Специализация
              <br/>
              <br/>
              <Form layout="vertical" style={{'maxWidth': '600px'}} onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="Квалификация" style={{width: '40px'}}>
                  {getFieldDecorator('qualifications')(
                      <CheckboxGroup options={options}/>
                  )}
                </FormItem>
              </Form>
            </DashboardContainer>
          </Panel>
        </PanelWrapper>
    );
  }

  private handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    this.submitForm();
  };

  private submitForm = (): void => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('specialization form: ', values);
        const {expertId} = this.props;
        const {qualifications} = values;
        this.props.actions.updateUser(
            expertId,
            {
              qualifications
            }
        );
      }
    });
  };
}

const WrappedSpecializationSettings = Form.create<IPropsComponents>({
  mapPropsToFields: (props: IStateProps) => {
    return {
      qualifications: Form.createFormField({
        value: props.qualifications
      })
    };
  }
})(SpecializationSettings);

const mapStateToProps = (state: State): IStateProps => {
  const account = getAccount(state);
  const profile = getProfile(state);
  return {
    expertId: profile.expertId,
    isAuthenticated: isAuthenticated(state),
    qualifications: profile.qualifications
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators({
    updateUser
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps as any)(WrappedSpecializationSettings as any);
