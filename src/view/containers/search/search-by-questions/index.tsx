import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isAuthenticated } from '../../../../store/reducers/domain/account/selectors';
import { State } from '../../../../store/reducers/index';
import * as actions from '../../../../store/actions/index';
import { withRouter } from 'react-router-dom';
import { PageContainer } from '../../../components/page-container/index';
import { getCabinets, isCabinetsPending } from '../../../../store/reducers/domain/cabinets/selectors';
import Steps from 'antd/lib/steps';
import Button from 'antd/lib/button';
import Radio from 'antd/lib/radio';
import message from 'antd/lib/message';
import { GetAllCabinetsResponseType } from '../../../../api/requests/cabinet/get-all-cabinets';

const Step = Steps.Step;
const RadioGroup = Radio.Group;

export interface IStateProps {
  isAuthenticated: boolean;
  cabinetsPending: boolean;
  cabinets: GetAllCabinetsResponseType;
}

export interface IDispatchProps {
  actions: any;
}

type IPropsComponents = IStateProps & IDispatchProps;

const firstQuestions = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
];

const secondQuestions = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
];

const thirdQuestions = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
];

interface IState {
  current: number;
  value1?: string;
  value2?: string;
  value3?: string;
}

class SearchByQuestions extends React.PureComponent<IPropsComponents, IState> {
  constructor(props: IPropsComponents) {
    super(props);
    this.state = {
      current: 0
    };
  }

  public render(): JSX.Element {
    const {cabinetsPending, cabinets} = this.props;
    const {current, value1, value2, value3} = this.state;
    const steps = [{
      title: 'First',
      content: (<RadioGroup options={firstQuestions} onChange={this.onChange1} value={this.state.value1} />)
    }, {
      title: 'Second',
      content: (<RadioGroup options={secondQuestions} onChange={this.onChange2} value={this.state.value2} />)
    }, {
      title: 'Last',
      content: (<RadioGroup options={thirdQuestions} onChange={this.onChange3} value={this.state.value3} />)
    }];
    return (
        <React.Fragment>
          <PageContainer>
            Поиск специалиста с помощью опроса
            <Steps current={current}>
              {steps.map(item => <Step key={item.title} title={item.title}/>)}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
              {
                current > 0
                && (
                    <Button style={{marginLeft: 8}} onClick={() => this.prev()}>
                      Previous
                    </Button>
                )
              }
              {
                current < steps.length - 1
                && <Button
                    disabled={(current === 0 && !value1) || (current === 1 && !value2)}
                    type="primary" onClick={() => this.next()}>Next</Button>
              }
              {
                current === steps.length - 1
                && <Button
                    type="primary"
                    disabled={(current === 2)  && !value3}
                    onClick={() => message.success('Processing complete!')}>Done</Button>
              }
            </div>
          </PageContainer>
        </React.Fragment>
    );
  }

  private onChange1 = (e: any) => {
    console.log('radio1 checked', e.target.value);
    this.setState({
      value1: e.target.value
    });
  }

  private onChange2 = (e: any) => {
    console.log('radio2 checked', e.target.value);
    this.setState({
      value2: e.target.value
    });
  }

  private onChange3 = (e: any) => {
    console.log('radio3 checked', e.target.value);
    this.setState({
      value3: e.target.value
    });
  }

  private next(): void {
    const current = this.state.current + 1;
    this.setState({current});
  }

  private prev(): void {
    const current = this.state.current - 1;
    this.setState({current});
  }
}

const mapStateToProps = (state: State): IStateProps => {
  return {
    isAuthenticated: isAuthenticated(state),
    cabinetsPending: isCabinetsPending(state),
    cabinets: getCabinets(state).list
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>): IDispatchProps => ({
  actions: bindActionCreators<any, any>(actions, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps as any)(SearchByQuestions as any));
