import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  ChartWrapper,
  ReportWrapper,
  ChartTitle,
  Subtitle,
} from "./styles";
import { queryReport } from "./queryReport";
import { formatDate } from "./utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

const RateReport = (props) => {
  const INITIAL_STATE = {
    labels: [],
    values: [],
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);
  const [average, setAverage] = useState(0);

  const displayResults = (response) => {
    const queryResult = response.result.reports[0].data.rows;
    const total = response.result.reports[0].data.totals[0].values[0];
    setAverage(parseInt(total));
    let labels = [];
    let values = [];
    queryResult.forEach((row) => {
      labels.push(formatDate(row.dimensions[0]));
      values.push(row.metrics[0].values[0]);
    });
    setReportData({
      ...reportData,
      labels,
      values,
    });
  };

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgb(42, 210, 201, 1)');
    gradient.addColorStop(1, 'rgb(42, 210, 201, 0)');

    return {
      labels: reportData.labels,
      datasets: [
        {
          label: `${props.title}`,
          fill: 'start',
          backgroundColor: gradient, // Put the gradient here as a fill color
          borderColor: "rgb(42, 210, 201, 1)",
          borderWidth: 1,
          data: reportData.values,
        }
      ]
    }
  }

  const options = {
    scales: {
      yAxes: [
        {
          display: false,
          gridLines: {
            display: false,
          },
          ticks: {
            suggestedMin: 0,
          },
        },
      ],
      xAxes: [
        {
          display: false,
          gridLines: {
            display: false,
          },
          ticks: {
            autoSkip: true,
            maxTicksLimit: 7,
          },
        },
      ],
    },
    elements: {
      point: {
        radius: 2
      }
    },
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        font: {
          size: 0,
        },
      },
    },
    datasetStrokeWidth: 3,
    pointDotStrokeWidth: 4,
  };

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate: props.startDate,
      endDate: props.endDate,
      metrics: props.metric,
      dimensions: ["ga:date"],
    };
    setTimeout(
      () => queryReport(request)
        .then((resp) => { displayResults(resp) })
        .catch((error) => console.error(error)),
      1500
    );
  }, [props.startDate, props.endDate]);


  return (
    <ReportWrapper>
      <div style={{ float: 'right' }}>
        <a data-for='enrich' data-tip={props.description}><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon></a>
        <ReactTooltip id='enrich' getContent={(dataTip) => dataTip} />
      </div>
      <ChartTitle>{`${props.title}`}</ChartTitle>
      <Subtitle>{`Average - ${average}`}</Subtitle>
      {reportData && (
        <ChartWrapper>
          <Line data={data} options={options} width={100} height={250} />
        </ChartWrapper>
      )}
    </ReportWrapper>
  );
};

export default RateReport;