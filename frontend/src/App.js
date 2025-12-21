import { useEffect, useState } from "react";
import apiClient from "./api/apiClient";

function App() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [plan, setPlan] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = () => {
    apiClient.get("/subscriptions")
      .then(res => setSubscriptions(res.data));
  };

  const addSubscription = () => {
    setError("");

    apiClient.post("/subscriptions", { plan, price })
      .then(() => {
        setPlan("");
        setPrice("");
        loadSubscriptions();
      })
      .catch(() => {
        setError("Invalid input. Please check plan and price.");
      });
  };

  const deleteSubscription = (id) => {
    apiClient.delete(`/subscriptions/${id}`)
      .then(() => loadSubscriptions());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Subscriptions</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Plan"
        value={plan}
        onChange={e => setPlan(e.target.value)}
      />

      <input
        placeholder="Price"
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
      />

      <button onClick={addSubscription}>
        Add Subscription
      </button>

      <ul>
        {subscriptions.map(sub => (
          <li key={sub.id}>
            {sub.plan} - ${sub.price}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => deleteSubscription(sub.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;


