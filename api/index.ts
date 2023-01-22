import {useCallback, useEffect, useRef, useState} from 'react';
import {FETCH_GIFS, FETCH_TRENDING_GIFS} from './apiConstants';
import api from './axios';

const restructureArrays = (
  firstArr: any[],
  secondArr: any[],
  dataToBePushed: any[],
): any[] => {
  const first = [...firstArr],
    second = [...secondArr];
  dataToBePushed.forEach((el: any, index) => {
    if (index % 2 === 0) {
      first.push(el);
    } else {
      second.push(el);
    }
  });
  return [first, second];
};

export const useFetchGifs = ({
  limit = 30,
  query = '',
}: {limit?: number; query?: string} = {}) => {
  const [gifs, setGifs] = useState([[], []]);
  const [isLoading, setLoading] = useState(false);
  const offset = useRef(0);

  const fetchGifs = useCallback(
    (isFirstCall: boolean = false) => {
      let URL = query ? FETCH_GIFS : FETCH_TRENDING_GIFS;
      URL += `?limit=${limit}&lang=en`;
      URL += `&offset=${isFirstCall ? 0 : offset.current}`;
      if (query) {
        URL += `&q=${query}`;
      }

      setLoading(true);

      return api
        .get(URL)
        .then((resp: any) => {
          const {data = [], pagination = {}} = resp;
          offset.current = pagination.offset + pagination.count;
          setGifs(([prevGifsOne, prevGifsTwo]) =>
            restructureArrays(
              isFirstCall ? [] : prevGifsOne,
              isFirstCall ? [] : prevGifsTwo,
              data,
            ),
          );
          return data;
        })
        .catch((err: Error) => {
          console.log('Error', err);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [limit, query],
  );

  useEffect(() => {
    fetchGifs(true);
  }, [query, fetchGifs]);

  return {
    gifs,
    fetchGifs,
    isLoading,
  };
};
