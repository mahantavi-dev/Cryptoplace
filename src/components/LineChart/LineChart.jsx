import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Price"]]);

  useEffect(() => {
    if (historicalData?.prices) {
      const formattedData = [["Date", "Price"]];

      historicalData.prices.forEach((item) => {
        formattedData.push([
          new Date(item[0]), // timestamp
          item[1],           // price
        ]);
      });

      setData(formattedData);
    }
  }, [historicalData]);

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={{
          hAxis: {
            title: "Date",
            format: "MMM dd",
          },
          vAxis: {
            title: "Price",
          },
          legend: { position: "none" },
          chartArea: { width: "80%", height: "70%" },
        }}
      />
    </div>
  );
};

export default LineChart;