import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { State } from '../store/reducers';
import { ConnectedRouter } from 'connected-react-router';
import App from './containers/app';
// import 'normalize.css';
import './global.less';

interface IProps {
  store: Store<State>;
  history: any;
}

export default class Root extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    const {store, history} = this.props;
    return (
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <App/>
          </ConnectedRouter>
        </Provider>
    );
  }
}
