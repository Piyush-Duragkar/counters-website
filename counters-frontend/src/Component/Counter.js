import React, { useState, useEffect } from "react";
import axios from "axios";

function Counter() {
  const [counters, setCounters] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/counters/").then((response) => {
      setCounters(response.data);
    });
  }, []);

  const incrementCounter = (id, currentValue) => {
    axios
      .patch(`http://localhost:8000/api/counters/${id}/`, {
        count: currentValue + 1,
      })
      .then((response) => {
        setCounters(
          counters.map((counter) =>
            counter.id === id ? response.data : counter
          )
        );
      });
  };

  const decrementCounter = (id, currentValue) => {
    axios
      .patch(`http://localhost:8000/api/counters/${id}/`, {
        count: currentValue - 1,
      })
      .then((response) => {
        setCounters(
          counters.map((counter) =>
            counter.id === id ? response.data : counter
          )
        );
      });
  };

  const resetCounter = (id) => {
    axios
      .patch(`http://localhost:8000/api/counters/${id}/`, { count: 0 })
      .then((response) => {
        setCounters(
          counters.map((counter) =>
            counter.id === id ? response.data : counter
          )
        );
      });
  };

  const addCounter = () => {
    axios
      .post("http://localhost:8000/api/counters/", { count: 0 })
      .then((response) => {
        setCounters([...counters, response.data]);
      })
      .catch((error) => {
        console.error("There's an error in adding", error);
      });
  };

  return (
    <div>
      <h1>Counters</h1>
      {counters.map((counter, index) => (
        <div key={counter.id}>
          <h2>{`Counter ${index + 1}: ${counter.count}`}</h2>
          <button onClick={() => incrementCounter(counter.id, counter.count)}>
            Increment
          </button>
          <button onClick={() => decrementCounter(counter.id, counter.count)}>
            Decrement
          </button>
          <button onClick={() => resetCounter(counter.id)}>Reset</button>
        </div>
      ))}
      <button onClick={addCounter}>Add Counter</button>
    </div>
  );
}

export default Counter;
