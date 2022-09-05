import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useCallback,
} from 'react';

import axios from 'axios';
import ReactImageMagnify from 'react-image-magnify';

const ids = ['i1', 'i2'];

export default function Home() {
  const [imgs, setImgs] = useState([]);

  // useLayoutEffect(() => {
  //   loadingImgs();
  // }, []);

  console.log(imgs);

  useLayoutEffect(() => {
    async function load() {
      const prev = new Array();

      for (let i = 0; i < ids.length; i++) {
        const arr = await loadingImgs(ids[i]);

        prev.push(arr);
      }

      console.log(prev);

      setImgs(prev);
    }

    load();
  }, []);

  const loadingImgs = async (img) => {
    return await axios
      .get('/api/img', {
        responseType: 'blob',
      })
      .then((res) => {
        return {
          id: img,
          imgSrc: URL.createObjectURL(res.data),
        };
      });
  };

  return (
    <div>
      <div>home</div>
      <div
        style={{
          width: '500px',
        }}
      >
        {imgs.map((item) => (
          <ReactImageMagnify
            key={item.id}
            smallImage={{
              src: item.imgSrc,
              isFluidWidth: true,
            }}
            largeImage={{
              src: item.imgSrc,
              width: 1280,
              height: 720,
            }}
          />
        ))}
      </div>
    </div>
  );
}
