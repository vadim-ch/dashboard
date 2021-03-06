import * as React from 'react';
const styles = require('./styles.less');

interface IProps {
  size?: 'medium' | 'small' | 'large';
}

export class Title extends React.PureComponent<IProps, any> {
  public render(): JSX.Element {
    return (
        <div className={styles.title}>
          {this.props.children}
        </div>
    );
  }
}
