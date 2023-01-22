import React, {useEffect, useRef} from 'react';
import {ScrollView, View, ActivityIndicator} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import tw from 'twrnc';
import {useFetchGifs} from '../../api';
import GifCard from './GIfCard';

type GifsGridViewProps = {
  searchedQuery?: string;
};

const GifsGridView = ({searchedQuery}: GifsGridViewProps): JSX.Element => {
  const scrollRef = useRef<any>();
  const {
    gifs = [],
    fetchGifs,
    isLoading,
  } = useFetchGifs({
    query: searchedQuery,
  });

  const fetchMoreGifs = () => {
    if (!isLoading) {
      fetchGifs();
    }
  };

  const handleScroll = ({nativeEvent}: any) => {
    const {contentSize, contentOffset} = nativeEvent;
    const {height} = contentSize;
    const {y: offsetValue} = contentOffset;
    if (height - offsetValue < 1300) {
      fetchMoreGifs();
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }, [searchedQuery]);

  return (
    <ScrollView
      ref={scrollRef}
      onScroll={handleScroll}
      scrollEventThrottle={16}>
      <View style={tw`flex flex-row justify-around pt-2 pb-52`}>
        {gifs.map((gifCol, index) => (
          <View key={index}>
            {gifCol.map((gifDetails: {id: string}, idx) => (
              <GifCard
                key={gifDetails.id + idx.toString()}
                gifDetails={gifDetails}
              />
            ))}
          </View>
        ))}
      </View>
      {isLoading && <ActivityIndicator size="large" color={Colors.darker} />}
    </ScrollView>
  );
};

export default GifsGridView;
