"use client";
import Banner from "./_Components/Banner";
import { useEffect, useState } from "react";
import ChartComponent from "./_Components/Chart";
import CustomerList from "./_Components/CustomerList";
export default function Home() {
  const [data, setData] = useState({ customers: [], transactions: [] });
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [chartData, setChartData] = useState({
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Total Amount",
        data: [1000, 2000, 1500, 3000, 2500],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Function to calculate total transaction amount per day for selected customer
    const calculateChartData = () => {
      if (!selectedCustomerId) {
        return;
      }

      const transactions = data.transactions.filter(
        (transaction) => transaction.customer_id === selectedCustomerId
      );

      const totals = {};
      transactions.forEach((transaction) => {
        const date = transaction.date;
        if (!totals[date]) {
          totals[date] = 0;
        }
        totals[date] += transaction.amount;
      });

      const chartLabels = Object.keys(totals);
      const chartValues = Object.values(totals);

      setChartData({
        labels: chartLabels,
        datasets: [
          {
            label: "Total Amount",
            data: chartValues,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    };

    calculateChartData();
  }, [selectedCustomerId, data.transactions]);

  const handleCustomerChange = (event) => {
    setSelectedCustomerId(parseInt(event.target.value));
  };

  const getFilteredTransactions = (transactions) => {
    return transactions.filter((transaction) => {
      const amount = transaction.amount;
      const isAboveMin = minAmount === "" || amount >= parseFloat(minAmount);
      const isBelowMax = maxAmount === "" || amount <= parseFloat(maxAmount);
      return isAboveMin && isBelowMax;
    });
  };

  const getCustomerTransactions = (customerId) => {
    return getFilteredTransactions(
      data.transactions.filter(
        (transaction) => transaction.customer_id === customerId
      )
    );
  };

  return (
    <div className="p-4">
      <Banner />
      <CustomerList
        customers={data.customers}
        setMaxAmount={setMaxAmount}
        setMinAmount={setMinAmount}
        minAmount={minAmount}
        maxAmount={maxAmount}
        getCustomerTransactions={getCustomerTransactions}
      />
      <hr></hr>
      <h1 className=" mt-6">Total Transaction Amount per Day</h1>
      <div>
        <label>Select Customer:</label>
        <select
          value={selectedCustomerId || ""}
          onChange={handleCustomerChange}
        >
          <option value="">Select a customer</option>
          {data.customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.name}
            </option>
          ))}
        </select>
      </div>
      <ChartComponent chartData={chartData} />
    </div>
  );
}
