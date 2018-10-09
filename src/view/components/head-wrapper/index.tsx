import * as React from 'react';

const styles = require('./styles.less');

interface IProps {
  mode?: 'left' | 'right' | 'justify';
}

export class HeadWrapper extends React.PureComponent<IProps, any> {
  public render(): JSX.Element {
    const {mode = 'left'} = this.props;
    return (
        <div className={`${styles.head} ${styles[mode]}`}>
          {this.props.children}
        </div>
    );
  }
}
