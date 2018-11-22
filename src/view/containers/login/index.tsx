import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isAuthenticated, isAuthPending } from '../../../store/reducers/domain/account/selectors';
import { State } from '../../../store/reducers/index';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import { RouteNames } from '../../router';
import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Checkbox from 'antd/lib/checkbox';
import { PageContainer } from '../../components/page-container';
import { WrappedFormUtils } from 'antd/lib/form/Form';

const FormItem = Form.Item;

const styles = require('./styles.less');

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

class Login extends React.PureComponent<IPropsComponents, {}> {
  constructor(props: IPropsComponents) {
    super(props);
  }

  // componentDidUpdate(): void {
  //
  // }

  public render(): JSX.Element {
    const {isAuthenticated, buttonLoading} = this.props;
    const {getFieldDecorator} = this.props.form;
    const { from } = this.props['location'].state || { from: { pathname: '/' } };
    // if (this.props.isAuthenticated) {
    //   return <Redirect to={from} />;
    // }
    return (
        <div className={styles.loginWrapper}>
          <Form onSubmit={this.submitForm} className={styles.loginForm}>
            <div>Вход</div>
            <FormItem>
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
              })(
                  <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Email"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: 'Введите пароль!'}]
              })(
                  <Input
                      prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                      type="password" placeholder="Пароль"/>
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(
                  <Checkbox>Запомнить меня</Checkbox>
              )}
              <a className={styles.loginFormForgot} href="">Восстановить пароль</a>
              <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.loginButton}
                  loading={buttonLoading}
              >
                Войти
              </Button>
              или <Link to={RouteNames.Register}>Зарегистрироваться</Link>
            </FormItem>
          </Form>
        </div>
    );
  }

  private submitForm = (event: any): void => {
    event.preventDefault();
    this.props.form.validateFields((err, values: { email: string, password: string }) => {
      if (!err) {
        const {email, password} = values;
        this.props.actions.login(email, password);
      }
    });
  }
}

const WrappedLogin = Form.create<IPropsComponents>()(Login);

const mapStateToProps = (state: State): IStateProps => {
  return {
    isAuthenticated: isAuthenticated(state),
    buttonLoading: isAuthPending(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators<any, any>(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(WrappedLogin));
