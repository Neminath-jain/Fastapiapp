import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div className="counter-card">
      <h1>Count: {count}</h1>
      <button className="btn btn-primary" onClick={increment}>
        Increment
      </button>
    </div>
  );
}
export default Counter;