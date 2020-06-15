import React, { useEffect, useState } from "react";
import axios from "axios";

export default () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/api/values/current");
      setValues(response.data);
    }
    getData();
  }, [setValues]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/api/values/all");
      setSeenIndexes(response.data);
    }
    getData();
  }, [setSeenIndexes]);

  async function handleSubmit(event) {
    event.preventDefault();
    await axios.post("/api/values", {
      index: index,
    });

    setIndex("");
  }

  function renderSeenIndexes() {
    return seenIndexes.map(({ number }) => number).join(", ");
  }

  function renderValues() {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}.
        </div>
      );
    }
    return entries;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your input</label>
        <input
          value={index}
          onChange={(event) => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>
      <h3>Indexes I have seen</h3>
      {renderSeenIndexes()}
      <h3>Values I have calculated</h3>
      {renderValues()}
    </div>
  );
};
