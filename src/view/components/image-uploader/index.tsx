import * as React from 'react';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

interface IProps {
  token: string;
}

interface IState {
  loading: boolean;
  imageUrl: string;
}

export class AvatarUploader extends React.PureComponent<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: ''
    }
  }

  public render() {
    const {imageUrl, loading} = this.state;
    const {token} = this.props;
    const uploadButton = (
        <div>
          <Icon type={loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
    );
    return (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            headers={{
              Authorization: `Bearer ${token}`,
            }}
            showUploadList={false}
            action="//static/upload"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
        </Upload>
    );
  }

  private handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
}
