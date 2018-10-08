import * as React from 'react';
const styles = require('./styles.less');

export class Title extends React.PureComponent<any, any> {
  public render(): JSX.Element {
    return (
        <div className={styles.title}>
          {this.props.children}
        </div>
    );
  }
}
