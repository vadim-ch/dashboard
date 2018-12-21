import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isAuthenticated } from '../../../store/reducers/domain/account/selectors';
import { State } from '../../../store/reducers/index';
import { withRouter } from 'react-router-dom';
import { DashboardContainer } from '../../components/dashboard-container';
import { Title } from '../../components/title';
import { HeadWrapper } from '../../components/head-wrapper';
import { dashboardRoutes } from '../../router/routes';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import Button from 'antd/lib/button';
import { sendInvite } from '../../../store/actions/auth/send-invite';

const FormItem = Form.Item;
const {TextArea} = Input;

const styles = require('./styles.less');

export interface IStateProps {
  isAuthenticated: boolean;
}

export interface IDispatchProps {
  actions: {
    sendInvite: typeof sendInvite;
  };
}

type IPropsComponents = IStateProps & IDispatchProps & {
  form: WrappedFormUtils;
};

class DashboardHome extends React.PureComponent<IPropsComponents, void> {
  constructor(props: IPropsComponents) {
    super(props);
  }

  public render(): JSX.Element {
    const {form} = this.props;
    const {getFieldDecorator} = form;
    return (
        <React.Fragment>
          <DashboardContainer>
            <HeadWrapper mode="left">
              <Title>
                <Switch>
                  {
                    dashboardRoutes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={() => route.title}
                        />
                    ))
                  }
                </Switch>
              </Title>
            </HeadWrapper>
          </DashboardContainer>

          <DashboardContainer>
            Пригласить психолога
            <br/>
            <br/>
            <Form layout="vertical" style={{'maxWidth': '600px'}} onSubmit={this.handleSubmit}>
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
                    <Input placeholder="Email"/>
                )}
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit">Отправить приглашение</Button>
              </FormItem>
            </Form>
          </DashboardContainer>

        </React.Fragment>
    );
  }

  private handleSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actions.sendInvite(values.email);
      }
    });
  }
}

const WrappedDashboardHome = Form.create<IPropsComponents>({
  mapPropsToFields: (props: IStateProps) => {
    return {};
  }
})(DashboardHome as any);

const mapStateToProps = (state: State): IStateProps => {
  return {
    isAuthenticated: isAuthenticated(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators<any, any>({
    sendInvite
  }, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(WrappedDashboardHome as any));
