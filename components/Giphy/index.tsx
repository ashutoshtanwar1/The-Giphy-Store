import React, {useState} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {useDebounce} from '../../hooks';
import GifsGridView from '../GifsGridView';
import SearchBox from '../SearchBox';

const API_DELAY = 500;

const Giphy = (): JSX.Element => {
  const [searchedQuery, setSearchedValue] = useState('');

  const searchQueryDebouced = useDebounce(
    searchedQuery,
    searchedQuery ? API_DELAY : 0,
  );

  return (
    <View>
      <SearchBox
        style={tw`mt-4`}
        value={searchedQuery}
        onChange={setSearchedValue}
      />
      <GifsGridView searchedQuery={searchQueryDebouced} />
    </View>
  );
};

export default Giphy;
