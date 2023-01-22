import React from 'react';
import {TextInput} from 'react-native';
import tw from 'twrnc';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Style} from 'twrnc/dist/esm/types';

type SearchBoxProps = {
  style?: Style;
  value: string;
  onChange: (value: string) => void;
};

const {darker, lighter} = Colors;

const SearchBox = ({style, value, onChange}: SearchBoxProps): JSX.Element => (
  <TextInput
    style={[
      tw`border-b text-xl mx-4 border-[${darker}] dark:border-[${lighter}] text-[${darker}] dark:text-[${lighter}]`,
      style,
    ]}
    onChangeText={onChange}
    textAlign="center"
    value={value}
    placeholderTextColor="#777"
    placeholder="Try Random Words"
  />
);

export default SearchBox;
