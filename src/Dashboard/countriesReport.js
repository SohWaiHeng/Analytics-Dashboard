import React, { useState, useEffect, useCallback } from "react";
import { Pie } from "react-chartjs-2";
import { PieChartWrapper, colors } from "./styles";
import { queryReport } from "./queryReport";
import { ChartTitle, ReportWrapper } from "./styles";
import "chartjs-plugin-datalabels";
import styles from './Basic/index.css';

const CountriesReport = (props) => {
  const INITIAL_STATE = {
    labels: [],
    values: [],
    colors: [],
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [totalCountries, setTotalCountries] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  const displayResults = useCallback((response) => {
    const queryResult = response.result.reports[0].data.rows;
    setTotalUsers(response.result.reports[0].data.totals[0].values[0]);
    setTotalCountries(queryResult.length);
    let labels = [];
    let values = [];
    let bgColors = [];
    queryResult.forEach((row, idx) => {
      if (idx < 5) {
        labels.push(row.dimensions[0]);
        values.push(row.metrics[0].values[0]);
        bgColors.push(colors[idx + 1]);
      }
    });
    setReportData({
      ...reportData,
      labels,
      values,
      colors: bgColors,
    });
  }, [setReportData, reportData]);

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
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return data.labels[tooltipItem["index"]];
        },
      },
    },
    plugins: {
      datalabels: {
        color: "black",
        font: {
          size: 20,
        },
        formatter: function (value, context) {
          const perc = parseInt((value / totalUsers) * 100);
          return perc + "%";
        },
      },
    },
  };

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate: props.startDate,
      endDate: props.startDate,
      metrics: "ga:users",
      dimensions: ["ga:country"],
      orderBy: {
        fieldName: "ga:users",
        order: "DESCENDING",
      },
    };
    setTimeout(
      () =>
        queryReport(request)
          .then((resp) => {displayResults(resp);})
          .catch((error) => console.error(error)),
      1500
    );
  }, [props.startDate, props.endDate]);

  return (
    <div className="card" className={styles.card}>
      <div className="card-body">
        <ReportWrapper>
          <ChartTitle>Top 5 Countries</ChartTitle>
          {reportData && (
            <PieChartWrapper>
              <Pie data={data} options={options} />
            </PieChartWrapper>
          )}
        </ReportWrapper>
      </div>
    </div>
  );
};

export default CountriesReport;
