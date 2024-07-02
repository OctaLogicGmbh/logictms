import { Counter } from '@/components/counter/Counter';

export default function CounterPage() {
  return (
    <div className="flex flex-col gap-4">
      <h2>Home Page</h2>

      <p>Here is a counter for you</p>
      <Counter step={3} min={0} max={10} initial={5} />
    </div>
  );
}
