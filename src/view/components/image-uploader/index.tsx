import * as React from 'react';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';
import Button from 'antd/lib/button';

const styles = require('./styles.less');

function getBase64(img: File, callback: (file: string) => void): void {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

interface IProps {
  onUploaded: (file: File) => void;
  initialImageUrl: string;
}

interface IState {
  loading: boolean;
  imageBase64: string;
}

export class AvatarUploader extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      loading: false,
      imageBase64: ''
    };
  }

  public render(): JSX.Element {
    const {loading, imageBase64} = this.state;
    const {initialImageUrl} = this.props;
    // const uploadButton = (
    //     <div>
    //       <Icon type={loading ? 'loading' : 'plus'}/>
    //       <div className="ant-upload-text">Upload</div>
    //     </div>
    // );
    const imageUrl = imageBase64 ? imageBase64 : initialImageUrl;
    return (
        <div className={styles.imageWrapper}>
          <div
              className={styles.img}
              style={{'backgroundImage': `url(${imageUrl})`}}>
          </div>
          <div className={styles.tips}>
            Фотографии такие секие
          </div>
          <div className={styles.controlButtons}>
            <Upload
                name="avatar"
                className="avatar-uploader"
                showUploadList={false}
                // action="//static/upload"
                beforeUpload={this.beforeUpload}
                // onChange={this.handleChange}
            >
              <Button type="primary">
                <Icon type="upload" /> Загрузить
              </Button>
            </Upload>
            <Button type="default">
              Удалить
            </Button>
          </div>
        </div>
    );
  }

  private beforeUpload = (file: File) => {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    // if (!isPNG) {
    //   message.error('You can only upload PNG file!');
    // }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    if ((isJPG) && isLt2M) {
      // this.setState(({file}) => ({
      //   file: file
      // }));
      this.props.onUploaded(file);

      getBase64(file, imageBase64 => this.setState({
        imageBase64
      }));
    }
    return false;
  }

  // private handleChange = (info) => {
  //   if (info.file.status === 'uploading') {
  //     this.setState({ loading: true });
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, imageUrl => this.setState({
  //       imageUrl,
  //       loading: false,
  //     }));
  //   }
  // }
}
