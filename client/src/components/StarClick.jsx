import { useState } from 'react';

import { StarIcon } from './Icons';

function StarClick() {
  const [click, setClicked] = useState([false, false, false, false, false]);

  const handleStarClick = idx => {
    let clickState = [...click];
    for (let i = 0; i < 5; i++) {
      clickState[i] = i <= idx ? true : false;
    }
    setClicked(clickState);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((el, idx) => {
        <StarIcon
          key={idx}
          onClick={() => handleStarClick(el)}
          // svg fill 채우기
          className={el <= idx ? 'fill-{blue}' : 'fill-{gray}'}
        />;
      })}
    </div>
  );
}

export default StarClick;
