import { Dimensions } from 'react-native';

class ScreenDimensions {
  constructor() {
    const { height, width } = Dimensions.get('window');

    this.dimensions = { height, width };
  }

  get height() {
    return this.dimensions.height;
  }

  get width() {
    return this.dimensions.width;
  }
}

const singleton = new ScreenDimensions();

export default singleton;
