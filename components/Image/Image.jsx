import React from 'react';
import { Image } from 'react-native';

const GifImage = ({ source, style }) => {
  return (
    <Image
      source={source}
      style={style}
      resizeMode="contain"
    />
  );
};

export default GifImage;
