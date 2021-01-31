import React, { useEffect, useState, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import { format } from "date-fns";
import { queryReport } from "./queryReport";
import { formatDate, transformToDate } from "./utils";
import {
  ChartTitle,
  ReportWrapper,
  ChartWrapper,
  colors,
} from "./styles";
import styles from './Basic/index.css';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const ExitPageReport = (props) => {
  const INITIAL_STATE = {
    labels: [],
    sets: {
      labels: [],
      datasets: [{
        backgroundColor: 'rgba(146,202,242,0.2)',
        borderColor: 'rgba(38,150,228,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(146,202,242,0.4)',
        hoverBorderColor: 'rgba(38,150,228,1)',
        borderCapStyle: 'round',
        data: []
      }]
    }
  };
  const [reportData, setReportData] = useState(INITIAL_STATE);

  const displayResults = useCallback((response) => {
    var exitPageObj = {};
    const queryResult = response.result.reports[0].data.rows;

    for (let i = 0; i < 10; i++) {
      queryResult[i].dimensions[0] in exitPageObj ? exitPageObj[queryResult[i].dimensions[0]] += parseInt(queryResult[i].metrics[0].values[0]) : exitPageObj[queryResult[i].dimensions[0]] = parseInt(queryResult[i].metrics[0].values[0])
    }

    wait(3 * 1000).then(() => {

      var myData = {
        labels: Object.keys(exitPageObj),
        datasets: [{
          backgroundColor: 'rgba(146,202,242,0.2)',
          borderColor: 'rgba(38,150,228,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(146,202,242,0.4)',
          hoverBorderColor: 'rgba(38,150,228,1)',
          borderCapStyle: 'round',
          data: Object.values(exitPageObj)
        }]
      }

      setReportData({
        ...reportData,
        labels: Object.keys(exitPageObj),
        sets: myData
      })
    })
  }, [setReportData, reportData]);

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate: props.startDate,
      endDate: props.endDate,
      metrics: "ga:exits",
      dimensions: ["ga:exitPagePath"],
      orderBy: {
        fieldName: "ga:exits",
        order: "DESCENDING",
      },
    };
    setTimeout(
      () =>
        queryReport(request)
          .then((resp) => { displayResults(resp); })
          .catch((error) => console.log(error)),
      1100
    );
  }, [props.startDate, props.endDate]);

  return (
    <div className="card" className={styles.card}>
      <div className="card-body">
        <ReportWrapper>
          <ChartTitle>Top Exit Pages</ChartTitle>
          {reportData && (
            <ChartWrapper>
              <Bar
                data={reportData.sets}
                width={50}
                height={25}
                options={{
                  tooltips: {
                    display: false,
                    displayColors: true,
                    callbacks: {
                      mode: "x",
                    },
                  },
                  barValueSpacing: 20,
                  scales: {
                    xAxes: [
                      {
                        stacked: true,
                        gridLines: {
                          display: false,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        stacked: true,
                        ticks: {
                          beginAtZero: true,
                        },
                        type: "linear",
                      },
                    ],
                  },
                  legend: { position: "bottom", display: false },
                  plugins: {
                    datalabels: {
                      display: false
                    }
                  }
                }}
              />
            </ChartWrapper>
          )}
        </ReportWrapper>
      </div>
    </div>
  );
};

export default ExitPageReport;