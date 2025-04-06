import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import BarCharts from "../components/BarChart";
import PieCharts from "../components/PieChart";
import AreaCharts from "../components/AreaChart";
import LineCharts from "../components/LineChart";
import "../styles/pages.css";

function Dashboard() {
  const [stocks, setStocks] = useState([
    { name: "Product A", stock: 120 },
    { name: "Product B", stock: 90 },
    { name: "Product C", stock: 60 },
    { name: "Product D", stock: 150 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((item) => ({
          ...item,
          stock: Math.floor(Math.random() * 2000),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <h1>Sales Report</h1>
      <div className="container-dashboard fade-in">
        <div className="card-graph">
          <BarCharts stockData={stocks} />
        </div>

        <div className="card-graph">
          <PieCharts stockData={stocks} />
        </div>

        <div className="card-graph">
          <AreaCharts stockData={stocks} />
        </div>

        <div className="card-graph">
          <LineCharts stockData={stocks} />
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
