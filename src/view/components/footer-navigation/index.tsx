import * as React from 'react';
import { PageContainer } from '../page-container';
import { Link, Redirect } from 'react-router-dom';
import { RouteNames } from '../../router';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
const styles = require('./styles.less');

export interface IProps {
}

export class FooterNavigation extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
        <ul>
          <li>

          </li>
        </ul>
    );
  }
}
