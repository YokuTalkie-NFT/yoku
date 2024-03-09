import { useState } from 'react';
import { useSpring } from '@react-spring/web';

function useSwitchPageAnimation() {
  const [isAnimating, setAnimating] = useState(false);
  const [_handler, setHandler] = useState<(() => void) | null>(null);

  const animatedProps = useSpring({
    zIndex: isAnimating ? 1 : -100,
    to: { opacity: isAnimating ? 0 : 1 },
    from: { opacity: 0 },
    onRest: () => {
      if (isAnimating) {
        _handler?.();
      }
    },
  });

  const switchTo = (handler: () => void) => {
    setAnimating(true);
    setHandler(() => handler);
  };

  return {
    switchTo,
    animatedProps,
  };
}

export default useSwitchPageAnimation;
