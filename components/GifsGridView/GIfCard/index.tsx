import React, {useState} from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import tw from 'twrnc';
import Image from '../../atoms/Image';

type GifCardProps = {
  gifDetails: any;
};

const {darker, lighter} = Colors;
const cardWidth = Dimensions.get('window').width / 2;

const GifCard = ({gifDetails}: GifCardProps): JSX.Element => {
  const [isPaused, setPauseGif] = useState(false);
  const {title, images} = gifDetails;
  const {height, width, url} = images.fixed_width_downsampled;
  const {url: pausedGif} = images.fixed_width_still;
  const pauseGif = () => {
    setPauseGif(prev => !prev);
  };
  return (
    <View style={[{width: cardWidth}, tw`flex items-center my-1.5 shadow-md`]}>
      <TouchableOpacity onPress={pauseGif}>
        <View
          style={tw`relative border border-[${darker}] dark:border-[${lighter}] rounded-lg overflow-hidden`}>
          <Image
            style={[
              tw.style(isPaused && 'opacity-60'),
              {height: +height, width: +width - 8},
            ]}
            source={{
              uri: !isPaused ? url : pausedGif,
            }}
          />
          {isPaused && (
            <View style={tw`absolute p-1`}>
              <Text
                style={tw`px-1.5 text-center rounded-full bg-white text-[10px] text-black`}>
                {title}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GifCard;
