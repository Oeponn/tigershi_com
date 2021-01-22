import React, {useState} from "react";

const CounterComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      Click the button below to see the number go up: {count}
      <br />
      <br />
      <button onClick={() => setCount(count => {
        // console.log("Hullo", count)
        return (count + 1)
      })}>I have too much time on my hands</button>
    </div>
  );
}

export default function Store() {
  return (
    <div className="container-main">
      <div>
      <p>Store will open at next drop</p>
        <div> <CounterComponent /> </div>
      </div>
    </div>
    )
}