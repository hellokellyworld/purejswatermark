import * as React from 'react';
import './App.scss';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import * as Jimp from 'jimp';
import CreatePost2AddrPhotos from './components/CreatePost2AddrPhotos';

//some testing programs
// import TestWorldCities from "./tests/testWorldCities";
import Photo from './tests/modularScss/Photo';

// import {
//     getCSRFToken
// } from "./store/csrf/CSRFActionsCreatorSaga";
//import { CSRFTypes } from "./store/csrf/CSRFTypes";

//---new store combined from multiple stores and multiple reducers ---
import {createBrowserHistory} from 'history';

// let newResult = new Image();
//const logo = "/static/images/heart-hollow-black.svg";
class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
    // this.state = { apiResponse: "" };
    this.state = {newResult: ''};
  }
  // callAPI() {
  //     fetch("http://localhost:9000/testAPI")
  //         .then(res => res.text())
  //         .then(res => this.setState({ apiResponse: res }))
  //         .catch(err => err);
  // }

  async componentWillMount() {
    await this.getNewResult();
  }

  getNewResult = () => {
    Jimp.read('/static/images/logo192.png')
      .then(image => {
        const mime = image.getMIME();
        image.getBase64Async(mime).then(bufferData => {
          // newResult.src = bufferData;

          this.setState({
            newResult: bufferData,
          });
          console.log('buffer data', bufferData);
          // return newResult.src;
        });
      })
      .catch(err => {
        console.log('error', err);
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
              <Photo
                publicId="balloons"
                alt="Balloons!"
                rounded
                borderRadius="15px"
                newImageSrc={this.state.newResult}
              />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
