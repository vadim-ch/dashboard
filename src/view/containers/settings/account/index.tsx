import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  isAuthenticated,
  getAccount
} from '../../../../store/reducers/domain/account/selectors';
import { State } from '../../../../store/reducers';
import { withRouter } from 'react-router-dom';
import SettingsMenu from '../settings-menu';
import { DashboardContainer } from '../../../components/dashboard-container';
import { Panel } from '../../../components/panel';
import { SubPanel } from '../../../components/sub-panel';
import { PanelWrapper } from '../../../components/panel-wrapper';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { getAvatarUrl, getProfile } from '../../../../store/reducers/domain/profile/selectors';
import { putAccountAction } from '../../../../store/actions/auth/put-account-action';

const styles = require('./styles.less');

const FormItem = Form.Item;

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
    putAccount: typeof putAccountAction;
  };
}

type IPropsComponents = IStateProps & IDispatchProps & {
  form: WrappedFormUtils;
};

interface IState {
  confirmDirty: boolean;
}

class AccountSettings extends React.PureComponent<IPropsComponents, IState> {
  constructor(props: IPropsComponents) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }

  public render(): JSX.Element {
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
                {/*<FormItem {...formItemLayout} label="Текущий пароль">*/}
                  {/*{getFieldDecorator('oldPassword')(<Input/>)}*/}
                {/*</FormItem>*/}

                <FormItem
                    label="Пароль"
                >
                  {getFieldDecorator('password', {
                    rules: [{
                      required: true, message: 'Введите пароль'
                    }, {
                      validator: this.validateToNextPassword
                    }]
                  })(
                      <Input type="password"/>
                  )}
                </FormItem>
                <FormItem
                    label="Ещё раз новый пароль"
                >
                  {getFieldDecorator('confirm', {
                    rules: [{
                      required: true, message: 'Подтвердите пароль'
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
        const {password} = values;
        this.props.actions.putAccount(password);
      }
    });
  }

  private validateToNextPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  }

  private compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Пароли не совпадают');
    } else {
      callback();
    }
  }

  private handleConfirmBlur = (e: any) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  }
}

const WrappedAccountSettings = Form.create<IPropsComponents>({
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
})(AccountSettings);

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
    putAccount: putAccountAction
  }, dispatch)
});
// const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => bindActionCreators({
//   actions: {
// }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps as any)(WrappedAccountSettings as any);
