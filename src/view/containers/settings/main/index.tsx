import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  getCurrentUserId,
  getCurrentUsername,
  isAuthenticated
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
import Checkbox from 'antd/lib/checkbox';
import { WrappedFormUtils } from 'antd/lib/form/Form';

const FormItem = Form.Item;

export interface IStateProps {
  isAuthenticated: boolean;
  currentUserId: string;
  currentUsername: string;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps & {
  form: WrappedFormUtils;
};

class MainSettings extends React.PureComponent<IPropsComponents, {}> {
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
            Основные настройки
            <br/>
            <Form layout="vertical" style={{'maxWidth': '600px'}}>
              <FormItem {...formItemLayout} label="Имя">
                {getFieldDecorator('firstName', {
                  rules: [{ message: 'Please input the title of collection!' }]
                })(
                  <Input defaultValue="mysite"/>
                )}
              </FormItem>
              <FormItem {...formItemLayout} label="Фамилия">
                {getFieldDecorator('lastName')(<Input type="textarea" />)}
              </FormItem>
              {/* <FormItem className="collection-create-form_last-form-item">
                {getFieldDecorator('modifier', {
                  initialValue: 'public'
                })(
                  <Radio.Group>
                    <Radio value="public">Public</Radio>
                    <Radio value="private">Private</Radio>
                  </Radio.Group>
                )}
              </FormItem> */}
              <FormItem>
                <Button type="primary" htmlType="submit">Сохранить</Button>
              </FormItem>
            </Form>
          </DashboardContainer>
        </Panel>
      </PanelWrapper>
    );
  }
}

const WrappedMainSettings = Form.create<IPropsComponents>()(MainSettings);

const mapStateToProps = (state: State): IStateProps => {
  return {
    isAuthenticated:  isAuthenticated(state),
    currentUsername: getCurrentUsername(state),
    currentUserId: getCurrentUserId(state)
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions:  bindActionCreators<any,  any>(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(WrappedMainSettings as any));
