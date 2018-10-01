import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
const styles = require('./styles.css');

export class PageContainer extends React.PureComponent<{}, {}> {
  constructor(props) {
    super(props);
  }

  public render(): JSX.Element {
    return (
        <div className={styles.container}>
          {this.props.children}
        </div>
    );
  }
}
