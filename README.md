Here is the updated README with the section on how the Bellman-Ford algorithm is used:

---

# Currency Arbitrage Visualizer

Currency Arbitrage Visualizer is a web application designed to identify and display arbitrage opportunities between different currencies. This application fetches real-time currency rates, computes potential arbitrage cycles, and visualizes them for users.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Arbitrage Detection with Bellman-Ford Algorithm](#arbitrage-detection-with-bellman-ford-algorithm)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Real-time Currency Rates**: Fetches the latest currency rates from the Currency Beacon API.
- **Arbitrage Cycle Detection**: Identifies potential arbitrage opportunities.
- **Visualization**: Displays arbitrage opportunities on a graphical interface.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **API**: Currency Beacon API
- **Styling**: CSS

## Installation

To get started with the Currency Arbitrage Visualizer, follow these steps:

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/pirate2580/Currency-Arbitrage-Visualizer.git
   cd Currency-Arbitrage-Visualizer
   ```

2. **Install Dependencies**:

   ```sh
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Set Up Environment Variables**:

   Create a `.env` file in the `server` directory and add the following environment variables:

   ```plaintext
   MONGO_URI=<your_mongodb_uri>
   CURRENCY_BEACON_API_KEY=<your_currency_beacon_api_key>
   PORT=3001
   ```

4. **Run the Application**:

   ```sh
   # Start the backend server
   cd server
   npx tsx server.ts

   # Start the frontend server
   cd ../client
   npm start
   ```

   The backend server will run on `http://localhost:3001` and the frontend server on `http://localhost:3000`.

## Usage

1. **Fetch Arbitrage Opportunities**: Click on the "Find Arbitrage Opportunities" button to fetch and display potential arbitrage cycles.
2. **View Cycles**: The application will display the detected arbitrage cycles along with the profit and timestamp.

## API Endpoints

### GET /arbitrage/display

Fetches all detected arbitrage opportunities with a profit greater than 1.

### GET /arbitrage/get

Fetches all currency rates and detects potential arbitrage opportunities.

### DELETE /arbitrage/delete

Deletes all stored arbitrage opportunities.

## Arbitrage Detection with Bellman-Ford Algorithm

The Currency Arbitrage Visualizer uses the Bellman-Ford algorithm to detect price inefficiencies and potential arbitrage cycles. Here’s how it works:

### Bellman-Ford Algorithm

The Bellman-Ford algorithm is used to find the shortest paths from a single source vertex to all other vertices in a weighted graph. In the context of currency arbitrage, it helps identify negative weight cycles, which correspond to arbitrage opportunities.

### Implementation

Here's an overview of the implementation:

1. **Graph Representation**: The currency exchange rates are represented as a graph where each vertex is a currency, and each edge is an exchange rate between two currencies.

2. **Initialize Distances and Predecessors**: For each start currency, initialize the distance to all other currencies as infinity and the predecessor of each currency as empty.

3. **Relax Edges**: For each vertex, relax all edges |V|-1 times, where |V| is the number of vertices. If a shorter path is found, update the distance and predecessor.

4. **Detect Negative Cycles**: Check for negative weight cycles by iterating through each edge. If a shorter path is found, a negative cycle exists, indicating an arbitrage opportunity.

5. **Extract Cycle and Profit**: If a negative cycle is detected, extract the cycle and calculate the profit by multiplying the exchange rates along the cycle.

```javascript
static async bellmanFord() {
  const rawGraph = await this.getGraph();
  const graph = await this.mapToObject(rawGraph);
  const opportunitiesid = new Set();
  const opportunities = new Set();

  for (let start in graph) {
    const distance = {};
    const predecessor = {};

    for (let vertex in graph) {
      distance[vertex] = Infinity;
      predecessor[vertex] = '';
    }
    distance[start] = 0;
    const n = 52;

    for (let i = 1; i <= n - 1; i++) {
      for (let startcurrency in graph) {
        for (let exchangecurrency in graph[startcurrency]) {
          const exchangerate = graph[startcurrency][exchangecurrency];
          if (distance[exchangecurrency] > distance[startcurrency] - Math.log2(exchangerate)) {
            distance[exchangecurrency] = distance[startcurrency] - Math.log2(exchangerate);
            predecessor[exchangecurrency] = startcurrency;
          }
        }
      }
    }

    const { profit, cycle, id, profitRates } = await this.negativeCycles(n, graph, distance, predecessor);
    if (!opportunitiesid.has(id) && profit > 1) {
      opportunities.add({ profit, cycle, profitRates });
      opportunitiesid.add(id);
    }
  }
  return opportunities;
}

static async negativeCycles(n, graph, distance, predecessor) {
  let negCycle = '';

  for (let startcurrency in graph) {
    for (let exchangecurrency in graph[startcurrency]) {
      const exchangerate = graph[startcurrency][exchangecurrency];
      if (distance[exchangecurrency] > distance[startcurrency] - Math.log2(exchangerate)) {
        negCycle = startcurrency;
        break;
      }
    }
    if (negCycle) {
      break;
    }
  }

  if (negCycle) {
    let cycle = [];
    let curr_vertex = negCycle;

    for (let i = 0; i < n; i++) {
      curr_vertex = predecessor[curr_vertex];
    }

    let cycle_start = curr_vertex;
    cycle.push(cycle_start);
    let prev_vertex = cycle_start;
    curr_vertex = predecessor[cycle_start];
    let profit = 1;
    let profitRates = [];
    profit *= graph[prev_vertex][curr_vertex];
    profitRates.push(graph[prev_vertex][curr_vertex]);
    while (curr_vertex !== cycle_start) {
      cycle.push(curr_vertex);
      prev_vertex = curr_vertex;
      curr_vertex = predecessor[curr_vertex];
      profit *= graph[prev_vertex][curr_vertex];
      profitRates.push(graph[prev_vertex][curr_vertex]);
    }
    cycle.push(curr_vertex);
    return { profit, cycle, id: cycle.join(' '), profitRates };
  }
  return { profit: 0, cycle: [], id: '', profitRates: [] };
}
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
