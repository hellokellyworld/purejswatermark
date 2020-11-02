import * as React from 'react';
import './CreatePost2AddrPhotos.scss';
import {Button} from 'react-bootstrap';
//import { submitPostAddrPhotos } from "../ActionCreator";
import autobind from 'autobind-decorator';
import {withRouter, RouteComponentProps} from 'react-router';
import TopBanner from './TopBanner';

import {ControlLabel} from 'react-bootstrap';

const mapPinBlue = '/static/images/map-pin-blue.svg';
const addrError = '地址不能为空';
const pluginProps = {};
const amapkey = ''; // 请填入自己的amapkey
// interface ICreatePostProps {
//   postAddrPhotos: PostUtils.IPostAddrPhotosForm;
//   postInfo: PostUtils.IPostInfoForm;
//   submitPostAddrPhotos: (postAddrPhotos) => Promise<void>;
// }

interface ICreatePostPropsFromState {
  //submitPostAddrPhotos: (postAddrPhotos) => Promise<void>;
}

interface ICreatePostPropsForSelf {}

interface ICreatePostPropsFromDispatch {}

//type IProps = ICreatePostProps & RouteComponentProps<any>;
type IProps = ICreatePostPropsFromState &
  ICreatePostPropsForSelf &
  ICreatePostPropsFromDispatch &
  RouteComponentProps<any>; //it seams here ConnectedReduxProps is dispatch related
interface ICreatePostState {
  errors: {};
  redirect: boolean;
  zoomLevel: number;
  // PC上，参数zoom可设范围：[3,18]；
  // 移动端：参数zoom可设范围：[3,19]
}

class CreatePost2AddrPhotos extends React.Component<IProps, ICreatePostState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      errors: this.initializeError(),
      redirect: false,
      zoomLevel: 8,
    };
  }

  componentWillMount() {}

  render() {
    return (
      <div className="create-post-addr-photos-page">
        <TopBanner
          title={'发布卖单:地址照片(2/4)'}
          leftButtonText={'<返回'}
          leftButtonURL={''}
          rightButtonText={'主页'}
          rightButtonURL={''}
        />
        <div className="newpost-addr-photos-div">
          {this.buildPostPhotosUploadSection()}
        </div>
      </div>
    );
  }

  private isInvalid = (value, property): boolean => {
    switch (property) {
      case 'address': //should check if address is valid here
        return (value && value.length) <= 0 || value === null ? true : false;
      default:
        return false;
    }
  };

  private initializeError() {
    return {
      address: false,
    };
  }

  @autobind
  private buildSectionHeader(
    headerText: string,
    subHeaderText?: string
  ): JSX.Element {
    return (
      <div className="heading">
        <h4 className="fontthicker">
          {headerText}
        </h4>
        <p className="text-muted">
          {subHeaderText}
        </p>
      </div>
    );
  }

  @autobind
  private buildPostPhotosUploadSection(): JSX.Element {
    return (
      <div className="newpost-photos-div">
        <div className="photo-label-delete-div">
          <div className="photo-label">
            {this.buildSectionHeader('上传照片')}
          </div>
          <div className="photo-delete-all-div">
            <Button
              className="photo-delete-button"
              onClick={() => {
                //this.deleteUplodedPhtos(this.state.form);
              }}
            >
              全部删除
            </Button>
          </div>
        </div>
        <div className="photo-upload-div">
          <fieldset />
        </div>
      </div>
    );
  }

  @autobind
  private resetAddrPhotosForm() {
    this.setState(prevState => {
      return {
        errors: this.initializeError(),
        redirect: false,
      };
    });
  }
}

export default withRouter(CreatePost2AddrPhotos as any);
