import {extendTheme, ITheme} from 'native-base';

import {Colors, IColors} from './Colors';
import {fontConfig, fonts} from './Fonts';

const theme: ITheme | {colors: IColors; fonts: any} = {
  ...extendTheme({
    fonts,
    fontConfig,
    Colors,
  }),
};

export default theme;
