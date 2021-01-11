import React, { useState, useEffect } from "react";
import { addDays } from "date-fns";
import { Pie } from "react-chartjs-2";
import CustomDatePicker from "./datepicker";
import { queryReport } from "./queryReport";
import { ChartTitle, Subtitle, PieChartWrapper, colors } from "./styles";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

const BrowsersReport = (props) => {
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
      bgColors.push(colors[id]);
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
      dimensions: ["ga:browser"],
    };
    setTimeout(
      () =>
        queryReport(request)
          .then((resp) => { displayResults(resp) })
          .catch((error) => console.error(error)),
      1500
    );
  }, [props.startDate, props.endDate]);

  return (
    <div style={{ padding: "0px 0px 0px 0px" }}>
      <div style={{ float: 'right' }}>
        <a data-for='enrich' data-tip='Total number of new followers each day within the specified range. Returns a maximum of 30 days worth of data.'><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon></a>
        <ReactTooltip id='enrich' getContent={(dataTip) => dataTip} />
      </div>
      <ChartTitle>Browsers by Users</ChartTitle>
      <Subtitle>{`Total Users - ${totalUsers}`}</Subtitle>
      {/* <CustomDatePicker
        placeholder={"Start date"}
        date={startDate}
        handleDateChange={(date) => setStartDate(date)}
      />
      <CustomDatePicker
        placeholder={"End date"}
        date={endDate}
        handleDateChange={(date) => setEndDate(date)}
      /> */}
      {reportData && (
        <PieChartWrapper>
          <Pie data={data} options={options} width={300} height={300} />
        </PieChartWrapper>
      )}
    </div>
  );
};

export default BrowsersReport;