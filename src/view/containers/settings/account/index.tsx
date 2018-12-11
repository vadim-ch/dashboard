import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ActionCreator, bindActionCreators, Dispatch } from 'redux';
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
import DatePicker from 'antd/lib/date-picker';
import Radio from 'antd/lib/radio';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import moment from 'moment';
import { AvatarUploader } from '../../../components/image-uploader';
import { updateUser } from '../../../../store/actions';
import { getAvatarUrl, getProfile } from '../../../../store/reducers/domain/profile/selectors';

const styles = require('./styles.less');

const FormItem = Form.Item;
const {MonthPicker, RangePicker} = DatePicker;
const {TextArea} = Input;

export interface IStateProps {
  isAuthenticated: boolean;
  expertId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  avatar: string;
  gender: string;
  birthday: string;
}

export interface IDispatchProps {
  actions: {
    updateUser: typeof updateUser;
  };
}

type IPropsComponents = IStateProps & IDispatchProps & {
  form: WrappedFormUtils;
};

interface IState {
  file: File;
}

const dateFormat = 'D MMMM YYYY';

class AccountSettings extends React.PureComponent<IPropsComponents, IState> {
  constructor(props: IPropsComponents) {
    super(props);
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
    const {avatar, form} = this.props;
    const {getFieldDecorator} = form;
    return (
        <PanelWrapper>
          <SubPanel>
            <SettingsMenu/>
          </SubPanel>
          <Panel>
            <DashboardContainer>
              Смена пароля
              <br/>
              <br/>
              <Form layout="vertical" style={{'maxWidth': '600px'}} onSubmit={this.handleSubmit}>
                <AvatarUploader onUploaded={this.onUploadedFile} initialImageUrl={avatar}/>
                <FormItem {...formItemLayout} label="Текущий пароль">
                  {getFieldDecorator('oldPassword')(<Input/>)}
                </FormItem>

                <FormItem {...formItemLayout} label="Новый пароль">
                  {getFieldDecorator('password')(<Input type="textarea"/>)}
                </FormItem>
                <FormItem
                    label="Ещё раз новый пароль"
                >
                  {getFieldDecorator('confirm', {
                    rules: [{
                      required: true, message: 'Please confirm your password!'
                    }, {
                      validator: this.compareToFirstPassword
                    }]
                  })(
                      <Input type="password" onBlur={this.handleConfirmBlur}/>
                  )}
                </FormItem>
                <Button style={{display: 'none'}} type="primary" htmlType="submit">Сохранить</Button>
              </Form>
            </DashboardContainer>
          </Panel>
        </PanelWrapper>
    );
  }

  private handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    this.submitForm();
  }

  private submitForm = (): void => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values, values.birthday.format('YYYY-MM-DD'));
        const {expertId} = this.props;
        const {file: avatar} = this.state;
        const {firstName, lastName} = values;
        this.props.actions.updateUser(
            expertId,
            {
              firstName,
              lastName,
              avatar
            }
        );
      }
    });
  }

  private onUploadedFile = (file: File) => {
    this.setState({file});
  }
}

const WrappedMainSettings = Form.create<IPropsComponents>({
  mapPropsToFields: (props: IStateProps) => {
    return {
      firstName: Form.createFormField({
        value: props.firstName
      }),
      lastName: Form.createFormField({
        value: props.lastName
      }),
      middleName: Form.createFormField({
        value: props.middleName
      }),
      gender: Form.createFormField({
        value: props.gender
      }),
      birthday: Form.createFormField({
        value: props.birthday
      })
    };
  }
})(MainSettings);

const mapStateToProps = (state: State): IStateProps => {
  const account = getAccount(state);
  const profile = getProfile(state);
  return {
    isAuthenticated: isAuthenticated(state),
    expertId: profile.expertId,
    firstName: profile.firstName,
    lastName: profile.lastName,
    middleName: profile.middleName,
    gender: profile.gender,
    birthday: profile.birthday,
    avatar: getAvatarUrl(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators({
    updateUser
  }, dispatch)
});
// const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => bindActionCreators({
//   actions: {
// }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps as any)(WrappedMainSettings as any);
