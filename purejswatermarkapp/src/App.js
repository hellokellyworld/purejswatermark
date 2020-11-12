 import logo from './logo.svg';
// import pic from "./2.jpeg"
import './App.css';
const path = require("path");
var watermark = require('jimp-watermark');

 async function test() {


  let Jimp = require('jimp')

let image = new Jimp(300, 530, 'green', (err, image) => {

  if (err) throw err

  console.log("imnage",image)
})


}


// let newPic;

const originalImg="/2.jpeg";

const watermarkImg="/logo192.png";


test();

// imageObject.loadFont(Jimp.FONT_SANS_32_BLACK).then(font => {
//   // image.print(
//   //   font,
//   //   10,
//   //   10,
//   //   'Hello world that wraps!',
//   //   50,
//   //   (err, image, { x, y }) => {
//   //     image.print(font, x, y + 20, 'More text on another line', 50);
//   //   }
//   // );
// }).then((image)=>{console.log(image)})
// .catch((err)=>{console.log("error",err)})



function App() {

  return (
    <div className="App">
     <img src={originalImg} />
     {/* <img src={image} /> */}

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
