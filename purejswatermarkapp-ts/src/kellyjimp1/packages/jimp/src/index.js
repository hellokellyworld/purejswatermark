import configure from '@jimp/custom' // "../../custom/src/index.js" //'@jimp/custom';

import types from '@jimp/types' //"../../types/src/index.js" //'@jimp/types';
import plugins from '@jimp/plugins';

export default configure({
  types: [types],
  plugins: [plugins]
});
