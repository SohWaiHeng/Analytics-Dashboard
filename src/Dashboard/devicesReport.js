import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { queryReport } from "./queryReport";
import { ChartTitle, Subtitle, PieChartWrapper, colors } from "./styles";

const DevicesReport = (props) => {
  const INITIAL_STATE = {
    labels: [],
    values: [],
    colors: [],
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [totalUsers, setTotalUsers] = useState(0);

  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows;
    const total = response.result.reports[0].data.totals[0].values[0];
    setTotalUsers(total);
    let labels = [];
    let values = [];
    let bgColors = [];
    queryResult.forEach((row, id) => {
      labels.push(row.dimensions[0]);
      values.push(row.metrics[0].values[0]);
      bgColors.push(colors[id + 4]);
    });
    setReportData({
      ...reportData,
      labels,
      values,
      colors: bgColors,
    });
  };

  const data = {
    labels: reportData.labels,
    datasets: [
      {
        data: reportData.values,
        backgroundColor: reportData.colors,
      },
    ],
  };

  const options = {
    legend: { position: "bottom" },
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
    },
  };

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate: props.startDate,
      endDate: props.endDate,
      metrics: "ga:users",
      dimensions: ["ga:deviceCategory"],
    };
    setTimeout(
      () => queryReport(request)
          .then((resp) => {displayResults(resp)})
          .catch((error) => console.error(error)),
      1500
    );
  }, [props.startDate, props.endDate]);

  return (
    <div>
      <ChartTitle>Devices by Users</ChartTitle>
      <Subtitle>{`Total Users - ${totalUsers}`}</Subtitle>
      {reportData && (
        <PieChartWrapper>
          <Doughnut data={data} options={options} width={300} height={300} />
        </PieChartWrapper>
      )}
    </div>
  );
};

export default DevicesReport;
