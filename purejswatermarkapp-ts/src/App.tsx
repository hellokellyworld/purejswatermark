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

var watermark = require("./js-watermark");

// let newResult = new Image();
//const logo = "/static/images/heart-hollow-black.svg";
class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
    // this.state = { apiResponse: "" };
    this.state = {
      imageWithWatermark: "",
      imageWithTextWatermark: "",
    };
  }

  async componentWillMount() {
    await this.getNewResult();
  }

  getNewResult = async () => {
    const image = await watermark.addWatermark(
      "http://localhost:8081/static/images/2.jpeg",
      "http://localhost:8081/static/images/logo192.png"
    );
    console.log(image);
    const imageWithText = await watermark.addTextWatermark(
      "http://localhost:8081/static/images/2.jpeg",
      {text: "Kelly Kang", textSize: 8}
    );

    console.log("with text", imageWithText);
    //console.log(image);
    // const image = await watermark.addWatermark(
    //   "https://images.pexels.com/photos/531880/pexels-photo-531880.jpeg",
    //   "https://images.pexels.com/photos/1162361/pexels-photo-1162361.jpeg"
    // );
    // console.log("this is img", image);

    // image()
    //   .then(result => {
    this.setState({
      imageWithWatermark: image,
      imageWithTextWatermark: imageWithText,
    });
    //     console.log("this is result", result);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
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
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageWithWatermark}
                />
                <br />
                <Photo
                  publicId="balloons"
                  alt="Balloons!"
                  rounded
                  borderRadius="15px"
                  newImageSrc={this.state.imageWithTextWatermark}
                />
              </div>}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
