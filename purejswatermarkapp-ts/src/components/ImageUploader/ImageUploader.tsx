import * as React from "react";
import Dropzone from "react-dropzone";
import { Cropper } from "react-image-cropper";
import autobind from "autobind-decorator";
import "./ImageUploader.scss";
import * as Jimp from "jimp";
import { resolve } from "path";
import { read, readFile } from "fs";
import { number } from "prop-types";

class MMLImage {
  originalWidth: number;
  originalHeight: number;
  originalImageData: any;
  preview: any;
  name: string;
}

interface IImageUploaderState {
  files: any[]; //files read after dropping into to drop zone
  croppedImageUrl: any[]; //image data after cropping
  readyToCrops: any[]; //image data to be cropped
  // originalWidth: number[];
  // originalHeight: number[];
  // originalImageData: any[];
  uploadedImage: MMLImage[];
}
interface IImageUploaderProps {
  images: any[];
  onChange: (images: any[]) => void;
  cropAreaWidth?: number;
  cropAreaHeight?: number;
}

export default class ImageUploader extends React.Component<
  IImageUploaderProps,
  IImageUploaderState
  > {
  private cropper;
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      croppedImageUrl: [],
      readyToCrops: [],
      // originalWidth: [],
      // originalHeight: [],
      // originalImageData: [],
      uploadedImage: []
    };
  }

  @autobind
  private onDrop(files) {
    Promise.all(
      files.map(file => {
        return this.processFile(file);
      })
    ).then(mmlImages => {
      let readyToCropsTmp: any[] = [];
      let uploadedImageTmp: MMLImage[] = [];
      mmlImages.map((mmlImage: MMLImage) => {
        readyToCropsTmp.push(mmlImage.originalImageData);
        uploadedImageTmp.push(mmlImage);
      });
      this.setState({
        readyToCrops: readyToCropsTmp,
        uploadedImage: uploadedImageTmp
      });
    });
  }

  onDelete(e, i) {
    e.preventDefault();
    let files = this.state.files;
    files.splice(i, 1);
    this.setState({
      files
    });
  }

  private async processFile(file): Promise<MMLImage> {
    try {
      return new Promise(async (resolve, reject) => {
        try {
          const data = await this.getData(file);
          const { height, width } = await this.getImageSize(data);
          const info = {
            data: data,
            height: height,
            width: width
          };
          resolve(info);
        } catch {
          throw new Error("can not get data");
        }
      }).then((info: { data: string; height: number; width: number }) => {
        let img = new MMLImage();
        img.name = file.name;
        img.preview = file.preview;
        img.originalImageData = info.data;
        img.originalHeight = info.height;
        img.originalWidth = info.width;
        return Promise.resolve(img);
      });
    } catch (err) {
      logger.info(err);
    }
  }

  private getData(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
    });
  }

  private getImageSize(data) {
    return new Promise((resolve, reject) => {
      let curImg = new Image();
      curImg.src = data;
      resolve(curImg);
      curImg.onerror = reject;
    }).then((img: HTMLImageElement) => {
      return Promise.resolve({ height: img.height, width: img.width });
    });
  }

  @autobind
  private renderWorkingContainer(): JSX.Element {
    let images = this.props.images;
    const onChange = this.props.onChange;
    const cropAreaWidth = 100; //this.props.cropAreaWidth;
    // ? this.props.cropAreaWidth
    // : this.state.originalWidth;
    const cropAreaHeight = 100; //this.props.cropAreaHeight;
    // ? this.props.cropAreaHeight
    // : this.state.originalHeight;

    if (this.state.uploadedImage.length != 0) {
      return (
        <div className="crop-images-div">
          {this.editImageList2(
            this.state.uploadedImage,
            this.state.readyToCrops,
            cropAreaWidth,
            cropAreaHeight
          )}
        </div>
      );
    } else {
      return (
        <Dropzone multiple={true} onDrop={this.onDrop}>
          <p>点击此处上传照片</p>
        </Dropzone>
      );
    }
  }

  private editImageList(
    uploadedImage,
    readyToCrops,
    cropAreaWidth,
    cropAreaHeight
  ) {
    return uploadedImage.map(ready => {
      return (
        <div
          className={"cropArea"}
          style={{
            width: cropAreaWidth,
            height: cropAreaHeight
          }}
        >
          <img src={ready.preview} />
          <Cropper
            //src={this.state.readyToCrop.preview}
            src={ready.preview}
            width={Math.round(cropAreaWidth * 0.8)}
            height={Math.round(cropAreaHeight * 0.8)}
            originX={Math.round(cropAreaWidth * 0.1)}
            originY={Math.round(cropAreaHeight * 0.1)}
            ref={ref => {
              this.cropper = ref;
            }}
            fixedRatio={false}
            allowNewSelection={false}
            styles={{
              //  modal: {
              //    opacity: 0.5,
              //    backgroundColor: "#ff0000"
              //  },
              //  dotInner: {
              //    borderColor: "#ff0000"
              //  },
              //  dotInnerCenterVertical: {
              //    backgroundColor: "#ff0000"
              //  },
              //  dotInnerCenterHorizontal: {
              //    backgroundColor: "#ff0000"
              //  }
              objectFit: "cover"
            }}
          />
          <div className={"buttons"}>
            <div
              className={"cancel"}
              onClick={() => {
                this.setState({
                  readyToCrops: [],
                  uploadedImage: []
                  // originalHeight: [],
                  // originalWidth: []
                });
              }}
            >
              取消
            </div>
            <div
              className={"confirm"}
              onClick={() => {
                const croppedImageUrl = this.cropper.crop(); //data of the images after cropping
                //const cropValues = this.cropper.values(); //get crop info
                const croppedImg = {
                  preview: ready.preview,
                  result: croppedImageUrl,
                  name: ready.name
                };
                this.props.images.push(croppedImg);
                this.props.onChange(this.props.images);
                this.setState({
                  readyToCrops: [],
                  uploadedImage: []
                  // originalImageData: [],
                  // originalHeight: [],
                  // originalWidth: []
                });
              }}
            >
              确认剪切
            </div>
            <div
              className={"confirm"}
              onClick={() => {
                const buffer = ready.originalImageData;
                Jimp.read(buffer)
                  .then(image => {
                    image.rotate(-90);
                    const mime = image.getMIME();
                    let newResult = new Image();
                    const oldPreview = ready.preview;
                    const oldHeight = ready.originalHeight;
                    const oldWidth = ready.originalWidth;
                    const oldName = ready.name;
                    image
                      .getBase64Async(mime)
                      .then(bufferData => {
                        newResult.src = bufferData;
                        return {
                          preview: oldPreview,
                          result: newResult,
                          name: oldName
                        };
                      })
                      .then(rotatedImage => {
                        logger.info(rotatedImage);
                        // this.setState(

                        //   {
                        //   readyToCrop: rotatedImage,
                        //   originalImageData: rotatedImage.result.src,
                        //   originalHeight: oldWidth,
                        //   originalWidth: oldHeight,
                        // });
                        ready = {
                          originalHeight: oldWidth,
                          originalWidth: oldHeight,
                          originalImageData: rotatedImage.result.src,
                          preview: rotatedImage.preview,
                          name: rotatedImage.name
                        };
                      })
                      .catch(error => {
                        logger.error(error);
                      });
                  })
                  .catch(err => {
                    logger.error("ImageUploader.tsx: Invalid Image");
                  });
              }}
            >
              向右旋转
            </div>
          </div>
        </div>
      );
    });
  }

  private editImageList2(
    uploadedImage,
    readyToCrops,
    cropAreaWidth,
    cropAreaHeight
  ) {
    //logger.debug(uploadedImage.length);
    //logger.debug(uploadedImage);
    return uploadedImage.map((ready: MMLImage, index) => {
      // logger.debug(ready)
      // logger.debug(index)
      return (
        <div key={index} className={"cropArea"}>
          <div className="cropper-div">
            <div className="cropper-inner-div">
              <Cropper
                src={ready.preview}
                width={Math.round(cropAreaWidth * 0.8)}
                height={Math.round(cropAreaHeight * 0.8)}
                originX={Math.round(cropAreaWidth * 0.1)}
                originY={Math.round(cropAreaHeight * 0.1)}
                ref={ref => {
                  this.cropper = ref;
                }}
                fixedRatio={false}
                allowNewSelection={false}
              />
            </div>
            <div className={"buttons"}>
              <div
                className={"cancel"}
                onClick={() => {
                  this.onRemoveImg(index);
                }}
              >
                取消
              </div>
              <div
                className={"confirm"}
                onClick={async () => {
                  const croppedImageUrl = await this.cropper.crop(); //data of the images after cropping
                  //const cropValues = this.cropper.values(); //get crop info
                  const croppedImg: MMLImage = await {
                    preview: ready.preview,
                    originalImageData: croppedImageUrl,
                    name: ready.name,
                    originalHeight: ready.originalHeight,
                    originalWidth: ready.originalWidth
                  };
                  //this.props.images.push(croppedImg);
                  //this.props.onChange(this.props.images);
                  this.setState({
                    readyToCrops: [],
                    uploadedImage: []
                    // originalImageData: [],
                    // originalHeight: [],
                    // originalWidth: []
                  });
                }}
              >
                确认剪切
              </div>
              <div
                className={"confirm"}
                onClick={() => {
                  this.rotateImage(ready, index);
                }}
              >
                向右旋转
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  onRemoveImg = i => {
    this.setState(state => {
      const uploadedImageTmp = state.uploadedImage.filter((item, j) => i !== j);
      const readyToCropsTmp = state.readyToCrops.filter((item, j) => i !== j);

      return {
        ...state,
        readyToCrops: readyToCropsTmp,
        uploadedImage: uploadedImageTmp
      };
    });
  };

  onRotateImg = (i, newItem) => {
    this.setState(state => {
      const uploadedImageTmp = state.uploadedImage.map((item, j) => {
        if (j === i) {
          return newItem;
        } else {
          return item;
        }
      });

      const readyToCropsTmp = state.readyToCrops.map((item, j) => {
        if (j === i) {
          return newItem.originalImageData;
        } else {
          return item;
        }
      });

      return {
        ...state,
        readyToCrops: readyToCropsTmp,
        uploadedImage: uploadedImageTmp
      };
    });
  };

  private rotateImage(img: MMLImage, index) {
    let newImage = new Image();
    const oldPreview = img.preview;
    const oldName = img.name;
    const buffer = img.originalImageData;
    Jimp.read(buffer).then(image => {
      const mime = image.getMIME();
      image.rotate(-90);
      image
        .getBase64Async(mime)
        .then(newData => {
          newImage.src = newData;
          return {
            preview: oldPreview,
            result: newImage,
            name: oldName
          };
        })
        .then(async rotatedImage => {
          // let newImg = new MMLImage();
          // newImg.originalWidth = img.originalHeight;
          // newImg.originalHeight = img.originalWidth;
          // newImg.originalImageData = rotatedImage.result.src;
          // newImg.preview = rotatedImage.preview;
          // newImg.name = rotatedImage.name;
          let newImg: MMLImage = await this.processFile(rotatedImage);
          return newImg;
        })
        .then((newImg: MMLImage) => {
          this.onRotateImg(index, newImg);
        });
    });
  }

  render() {
    let images = this.props.images;
    const onChange = this.props.onChange;
    return (
      <section>
        {this.renderWorkingContainer()}
        <aside>
          {/* <h5>已上传照片</h5> */}
          <ul>
            {//list all images that are uploaded and cropped
              images.map((image, i) => (
                <li key={i}>
                  <div>
                    <button
                      onClick={() => {
                        images.splice(i);
                        onChange(images);
                      }}
                    >
                      删除
                  </button>
                  </div>
                  <img width={"100%"} src={image.result} />
                </li>
              ))}
          </ul>
        </aside>
      </section>
    );
  }
}
