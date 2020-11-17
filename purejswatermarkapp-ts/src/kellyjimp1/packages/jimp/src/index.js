import configure from  "../../custom/src/index.js" //'@jimp/custom';

import types from "../../types/src/index.js" //'@jimp/types';
import plugins from "../../plugins/src/index.js"//'@jimp/plugins';

export default configure({
  types: [types],
  plugins: [plugins]
});
