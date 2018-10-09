import * as React from 'react';
const styles = require('./styles.less');

export class HeadContainer extends React.PureComponent<any, any> {
  public render(): JSX.Element {
    return (
        <div className={styles.head}>
          {this.props.children}
        </div>
    );
  }
}
