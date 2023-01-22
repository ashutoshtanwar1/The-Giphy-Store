import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import tw, {useAppColorScheme, useDeviceContext} from 'twrnc';
import Image from './components/atoms/Image';
import Giphy from './components/Giphy';
import {NAME, THEME_ICONS} from './constants';

const {darker, lighter} = Colors;

function App(): JSX.Element {
  useDeviceContext(tw, {withDeviceColorScheme: false});

  const [colorScheme, toggleColorScheme] = useAppColorScheme(tw, 'light');
  const isDarkMode = colorScheme === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? darker : lighter,
  };

  return (
    <SafeAreaView>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={tw`h-full bg-[${lighter}] dark:bg-[${darker}]`}>
        <TouchableOpacity
          onPress={toggleColorScheme}
          style={tw`flex items-end mr-3 mt-1`}>
          <Image
            style={tw`h-6 w-6`}
            source={{
              uri: isDarkMode ? THEME_ICONS.light : THEME_ICONS.dark,
            }}
          />
        </TouchableOpacity>
        <Text
          style={tw`tracking-3 text-[${darker}] dark:text-[${lighter}] text-center text-4xl font-black`}>
          {NAME}
        </Text>
        <Giphy />
      </View>
    </SafeAreaView>
  );
}

export default App;
