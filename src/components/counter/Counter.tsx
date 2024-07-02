import { useState } from 'react';

import { Button } from '../ui/button';

interface CounterProps {
  initial?: number;
  min?: number;
  max?: number;
}

const useCounter = ({ initial = 0, min = -Infinity, max = Infinity }: CounterProps) => {
  const [count, setCount] = useState(initial);

  const changeCount = (value: number) => {
    setCount((prev) => {
      const newValue = prev + value;

      if (newValue < min) {
        return min;
      }

      if (newValue > max) {
        return max;
      }

      return newValue;
    });
  };

  return {
    count,
    changeCount,
    is: {
      min: count === min,
      max: count === max,
    },
  };
};

export const Counter = ({ step = 1, ...props }: { step: number } & CounterProps) => {
  const { count, changeCount, is } = useCounter(props);

  return (
    <div className="flex flex-col gap-2">
      <p>Current counter value is {count}</p>

      <div className="flex gap-4">
        <Button onClick={() => changeCount(-step)} disabled={is.min}>
          decrease by {step}
        </Button>

        <Button onClick={() => changeCount(+step)} disabled={is.max}>
          increase by {step}
        </Button>
      </div>
    </div>
  );
};
