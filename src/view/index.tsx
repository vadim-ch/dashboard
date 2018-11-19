import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { State } from '../store/reducers';
import { ConnectedRouter } from 'connected-react-router';
import App from './containers/app';
// import 'normalize.css';
import './global.less';
import { history } from '../store';
import LocaleProvider from 'antd/lib/locale-provider';
import ru_RU from 'antd/lib/locale-provider/ru_RU';

interface IProps {
  store: Store<State>;
}

export default class Root extends React.Component<IProps, {}> {
  public render(): JSX.Element {
    const {store} = this.props;
    return (
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <LocaleProvider locale={ru_RU}>
            <App/>
            </LocaleProvider>
          </ConnectedRouter>
        </Provider>
    );
  }
}
