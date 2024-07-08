Sure! Here is a README for your Currency Arbitrage Visualizer project:

---

# Currency Arbitrage Visualizer

Currency Arbitrage Visualizer is a web application designed to identify and display arbitrage opportunities between different currencies. This application fetches currency rates from the Currency Beacon forex API, computes potential arbitrage cycles, and visualizes them for users.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
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

Feel free to modify the content as per your project's specifics and add any additional sections you find necessary.
