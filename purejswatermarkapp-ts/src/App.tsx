import * as React from "react";
import "./App.scss";
import {Route, BrowserRouter, Switch} from "react-router-dom";
import CreatePost2AddrPhotos from "./components/CreatePost2AddrPhotos";

//some testing programs
// import TestWorldCities from "./tests/testWorldCities";
import Photo from "./tests/modularScss/Photo";

// import {
//     getCSRFToken
// } from "./store/csrf/CSRFActionsCreatorSaga";
//import { CSRFTypes } from "./store/csrf/CSRFTypes";

//---new store combined from multiple stores and multiple reducers ---
import {createBrowserHistory} from "history";

//convert this thiing into a buffer and if it works

var watermark = require("../lib-watermark/dist/watermark/index.js");

// let newResult = new Image();
//const logo = "/static/images/heart-hollow-black.svg";
class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
    // this.state = { apiResponse: "" };
    this.state = {
      imageWithWatermark: "",
      imageWithTextWatermark: "",
      imageInBmp: "",
      imageInGif: "",
      imageInTiff: "",
      imageWithTextInPng: "",
      imageWithTextInBmp: "",
      imageWithTextInGif: "",
      imageWithTextInTiff: "",
    };
  }

  async componentWillMount() {
    await this.getNewResult();
  }

  getNewResult = async () => {
    //picture watermark
    //jpeg and png
    const image = await watermark.addWatermark(
      "http://localhost:8081/static/images/2.jpeg",
      "http://localhost:8081/static/images/logo192.png"
    );
    //console.log("this is jpeg", image);

    //bmp
    const imageInBmp = await watermark.addWatermark(
      "http://localhost:8081/static/images/1.bmp",
      "http://localhost:8081/static/images/logo192.png"
    );

    //gif
    const imageInGif = await watermark.addWatermark(
      "http://localhost:8081/static/images/2.gif",
      "http://localhost:8081/static/images/logo192.png"
    );
    //console.log("this is gif", imageInGif);

    //tiff
    const imageInTiff = await watermark.addWatermark(
      "http://localhost:8081/static/images/1.tiff",
      "http://localhost:8081/static/images/logo192.png"
    );
    //console.log("this is tiff", imageInTiff);

    //////==================================
    //text watermark

    //jpeg
    const imageWithText = await watermark.addTextWatermark(
      "http://localhost:8081/static/images/2.jpeg",
      {text: "Kelly Kang", textSize: 8}
    );

    console.log("this is jpeg with text", imageWithText);

    //png
    const imageWithTextInPng = await watermark.addTextWatermark(
      "http://localhost:8081/static/images/png image.png",
      {text: "Kelly Kang", textSize: 8}
    );

    //bmp
    const imageWithTextInBmp = await watermark.addTextWatermark(
      "http://localhost:8081/static/images/1.bmp",
      {text: "Kelly Kang", textSize: 8}
    );

    //gif
    const imageWithTextInGif = await watermark.addTextWatermark(
      "http://localhost:8081/static/images/2.gif",
      // myGifBuffer,
      {text: "Kelly Kang", textSize: 8}
    );

    console.log("this is gif with text", imageInGif);

    //tiff
    const imageWithTextInTiff = await watermark.addTextWatermark(
      "http://localhost:8081/static/images/1.tiff",
      {text: "Kelly Kang", textSize: 8}
    );

    this.setState({
      imageWithWatermark: image,
      imageWithTextWatermark: imageWithText,
      imageInBmp: imageInBmp,
      imageInGif: imageInGif,
      imageInTiff: imageInTiff,
      imageWithTextInPng: imageWithTextInPng,
      imageWithTextInBmp: imageWithTextInBmp,
      imageWithTextInGif: imageWithTextInGif,
      imageWithTextInTiff: imageWithTextInTiff,
    });
  };
  componentDidMount() {
    // this.callAPI() {
    //     fetch("http://localhost:9000/testAPI")
    //         .then(res => res.text())
    //         .then(res => this.setState({ apiResponse: res }))
    //         .catch(err => err);
    // }
  }

  render() {
    // We use browser history because this example is going to be hosted dynamically
    // for staic sites, you can use createHashHistory()
    const history = createBrowserHistory();
    // var options = {
    //   ratio: 0.6, // Should be less than one
    //   opacity: 0.6, //Should be less than one
    //   dstPath: "/watermark.jpg",
    // };

    //store.dispatch(getCSRFToken(() => { })) //It is NOT good idea to set global CSRF Token, as the Token will change
    //hence we should only do that if everytime we dispatch getCSRFToken() we pass the setAxiosCSRF to it.

    //------------------
    //store can be used to do getState(), dispatch(action), subscrib(listener),...
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route
              path={Urls.CreatePost2AddrPhotos}
              component={() => <CreatePost2AddrPhotos />}
            /> */}

          <Route
            path="/"
            exact
            component={() =>
              <div>
                <p>
                  {"This is jpeg and png👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageWithWatermark}
                />
                <br />
                <p>
                  {"This is bmp👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageInBmp}
                />
                <br />
                <p>
                  {"This is gif👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={
                    this.state.imageInGif //{"http://localhost:8081/static/images/2.gif"}
                  }
                />

                <br />
                <p>
                  {"This is tiff👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageInTiff}
                />
                <br />
                <p>
                  {"This is jpeg👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageWithTextWatermark}
                />
                <br />
                <p>
                  {"This is png with text👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageWithTextInPng}
                />
                <br />
                <p>
                  {"This is bmp with text👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageWithTextInBmp}
                />
                <br />
                <p>
                  {"This is gif with text👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageWithTextInGif} //{myGifBuffer} //{this.state.imageWithTextInGif}
                />
                <br />
                <p>
                  {"This is original buffer gif👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={
                    // myGifBuffer
                    "http://localhost:8081/static/images/2.gif"
                  }
                />
                <br />
                <p>
                  {"This is tiff with text👇"}
                </p>
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageWithTextInTiff}
                />
              </div>}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
