import { mergeDeep } from 'timm';

import jpeg from "../../type-jpeg/src/index.js"//'@jimp/jpeg';
import png from"../../type-png/src/index.js" //'@jimp/png';
import bmp from "../../type-bmp/src/index.js"//'@jimp/bmp';
import tiff from "../../type-tiff/src/index.js"//'@jimp/tiff';
import gif from "../../type-gif/src/index.js"//'@jimp/gif';

export default () => mergeDeep(jpeg(), png(), bmp(), tiff(), gif());
