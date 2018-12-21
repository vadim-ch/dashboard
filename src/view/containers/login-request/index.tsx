import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isAuthenticated, isAuthPending } from '../../../store/reducers/domain/account/selectors';
import { State } from '../../../store/reducers/index';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import Form from 'antd/lib/form';
import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Checkbox from 'antd/lib/checkbox';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { emailSigninRequest } from '../../../store/actions/auth/email-signin-request';

const FormItem = Form.Item;

const styles = require('./styles.less');

export interface IStateProps {
  isAuthenticated: boolean;
  buttonLoading: boolean;
}

export interface IDispatchProps {
  actions: {
    emailSigninRequest: typeof emailSigninRequest;
  };
}

type IPropsComponents = IStateProps & IDispatchProps & {
  form: WrappedFormUtils;
};

class LoginRequest extends React.PureComponent<IPropsComponents, {}> {
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
    return (
        <div className={styles.loginWrapper}>
          <Form onSubmit={this.submitForm} className={styles.loginForm}>
            <div>Отправить ссылку для входа на email</div>
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
              <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.loginButton}
              >
                Отправить
              </Button>
            </FormItem>
          </Form>
        </div>
    );
  }

  private submitForm = (event: any): void => {
    event.preventDefault();
    this.props.form.validateFields((err, values: { email: string, password: string }) => {
      if (!err) {
        const {email} = values;
        this.props.actions.emailSigninRequest(email);
      }
    });
  }
}

const WrappedLoginRequest = Form.create<IPropsComponents>()(LoginRequest);

const mapStateToProps = (state: State): IStateProps => {
  return {
    isAuthenticated: isAuthenticated(state),
    buttonLoading: isAuthPending(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators<any, any>({
    emailSigninRequest
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(WrappedLoginRequest));
