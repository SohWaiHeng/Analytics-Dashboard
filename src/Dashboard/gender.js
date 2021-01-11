import React, { useState, useEffect, useCallback } from "react";
import { addDays } from "date-fns";
import { Pie } from "react-chartjs-2";
import CustomDatePicker from "./datepicker";
import { queryReport } from "./queryReport";
import { ChartTitle, Subtitle, PieChartWrapper, colors } from "./styles";
import styles from './Basic/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const Gender = (props) => {
  const INITIAL_STATE = {
    labels: [],
    values: [],
    colors: [],
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [totalUsers, setTotalUsers] = useState(0);

  const displayResults = useCallback((response) => {
    const queryResult = response.result.reports[0].data.rows;
    const total = response.result.reports[0].data.totals[0].values[0];
    setTotalUsers(total);
    let labels = [];
    let values = [];
    let bgColors = [];
    queryResult.forEach((row, id) => {
      labels.push(row.dimensions[0]);
      values.push(row.metrics[0].values[0]);
      bgColors.push(colors[id]);
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
    legend: { position: "bottom" },
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        font: {
          size: 0,
        },
      },
    },
  };

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate: props.startDate,
      endDate: props.endDate,
      metrics: "ga:users",
      dimensions: ["ga:userGender"],
    };
    const timer = setTimeout(
      () =>
        queryReport(request)
          .then((resp) => {displayResults(resp)})
          .catch((error) => console.error(error)),
      1500
    );
    return () => clearTimeout(timer);
  }, [props.startDate, props.endDate]);

  return (
    <div>
      <div style={{ float: 'right' }}>
        <a data-for='enrich' data-tip=''><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon></a>
        <ReactTooltip id='enrich' getContent={(dataTip) => dataTip} />
      </div>
        <ChartTitle>Gender</ChartTitle>
        <Subtitle>{`Total Users - ${totalUsers}`}</Subtitle>
        {reportData && (
          <PieChartWrapper>
            <Pie data={data} options={options} width={300} height={300} />
          </PieChartWrapper>
        )}
      </div>
  );
};

export default Gender;