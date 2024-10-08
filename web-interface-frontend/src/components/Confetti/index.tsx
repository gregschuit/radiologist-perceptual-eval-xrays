import { useRef } from 'react';
import Confetti from 'react-confetti';

export default function MyConfetti() {
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  return (
    <Confetti
      width={ windowSize.current[0] }
      height={ windowSize.current[1] }
      initialVelocityY={ 20 }
      friction={ 0.99 }
      tweenDuration={ 5000 }
    />
  )
};
