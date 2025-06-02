import 'styled-components';
import { CustomTheme } from './styles/themes';

declare module 'styled-components' {
  export interface DefaultTheme extends CustomTheme {}
}
