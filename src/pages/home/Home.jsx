import React, { useEffect, useState } from 'react';

import axios from 'axios';

const imgs = ['i1', 'i2', 'i3'];

export default function Home() {
  // const [imgSrc, setImgSrc] = useState();

  useEffect(() => {
    imgs.forEach((img) => {
      axios
        .get('/api/img', {
          responseType: 'blob',
        })
        .then((res) => {
          const imgUrl = URL.createObjectURL(res.data);

          const imgTag = document.getElementById(img);
          imgTag.src = imgUrl;

          return imgUrl;
        })
        .then((url) => {
          URL.revokeObjectURL(url);
        });
    });
  }, []);

  return (
    <div>
      <div>home</div>
      {imgs.map((id) => (
        <div key={id}>
          <img id={id} />
        </div>
      ))}
    </div>
  );
}
