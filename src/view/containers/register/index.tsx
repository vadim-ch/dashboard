import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isAuthenticated, isAuthPending } from '../../../store/reducers/domain/account/selectors';
import { State } from '../../../store/reducers';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import Checkbox from 'antd/lib/checkbox';
import { WrappedFormUtils } from 'antd/lib/form/Form';

const styles = require('./styles.less');

const Option = Select.Option;
const FormItem = Form.Item;

export interface IStateProps {
  isAuthenticated: boolean;
  buttonLoading: boolean;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps & {
  form: WrappedFormUtils;
};

interface IState {
  confirmDirty: boolean;
}

class Register extends React.PureComponent<IPropsComponents, IState> {
  constructor(props: IPropsComponents) {
    super(props);
    this.state = {
      confirmDirty: false
    };
  }

  public render(): JSX.Element {
    const {isAuthenticated, buttonLoading} = this.props;
    const {getFieldDecorator} = this.props.form;
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '+7'
    })(
        <Select style={{width: 60}}>
          <Option value="+7">+7</Option>
        </Select>
    );
    const { from } = this.props['location'].state || { from: { pathname: '/' } };
    // if (this.props.isAuthenticated) {
    //   return <Redirect to={from} />;
    // }
    return (
        <div className={styles.registerWrapper}>
          <Form onSubmit={this.submitForm} className={styles.registerForm}>
            <FormItem label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'Не правильный формат'
                  }, {
                    required: true,
                    message: 'Поле является обязательным'
                  }
                ]
              })(<Input/>)}
            </FormItem>
            <FormItem
                label="Password"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!'
                }, {
                  validator: this.validateToNextPassword
                }]
              })(
                  <Input type="password"/>
              )}
            </FormItem>
            <FormItem
                label="Confirm Password"
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
            <FormItem>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked'
              })(
                  <Checkbox>I have read the <a href="">agreement</a></Checkbox>
              )}
              <FormItem>
                <Button className={styles.registerButton} type="primary" htmlType="submit">Зарегистрироваться</Button>
              </FormItem>
            </FormItem>
          </Form>
        </div>
    );
  }

  private compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  private handleConfirmBlur = (e: any) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  }

  private validateToNextPassword = (rule: any, value: any, callback: any) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  }

  private submitForm = (event: any): void => {
    event.preventDefault();
    this.props.form.validateFields((err, values: { email: string, password: string }) => {
      if (!err) {
        const {email, password} = values;
        this.props.actions.register('Гость', email, password);
      }
    });
  }
}

const WrappedRegister = Form.create<IPropsComponents>()(Register);

const mapStateToProps = (state: State): IStateProps => {
  return {
    isAuthenticated: isAuthenticated(state),
    buttonLoading: isAuthPending(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators<any, any>(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(WrappedRegister));
