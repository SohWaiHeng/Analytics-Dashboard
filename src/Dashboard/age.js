import React, { useEffect, useState, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import { addDays, format } from "date-fns";
import CustomDatePicker from "./datepicker";
import { queryReport } from "./queryReport";
import { formatDate, transformToDate } from "./utils";
import {
  ChartTitle,
  ReportWrapper,
  Subtitle,
  DatepickerRow,
  ChartWrapper,
  colors,
} from "./styles";
import styles from './Basic/index.css';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const Age = (props) => {
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
  const [totalSources, setTotalSources] = useState(0);

  const transformAPIData = (data) => {
    let transformedData = [];
    let datesArray = [];
    data.forEach((row) => {
      transformedData.push({
        date: formatDate(row.dimensions[1]),
        source: row.dimensions[0],
        visits: row.metrics[0].values[0],
      });
      datesArray.push(transformToDate(row.dimensions[1]));
    });
    return [transformedData, datesArray];
  };

  const groupDataBySource = (data) => {
    return data.reduce((r, a) => {
      r[a.source] = r[a.source] || [];
      r[a.source].push(a);
      return r;
    }, Object.create(null));
  };

  const sortSourcesByTotalVisits = (data) => {
    let sumedVisits = [];
    for (let [key, value] of Object.entries(data)) {
      const sumOfVisits = value.reduce((a, b) => {
        return a + parseInt(b.visits);
      }, 0);
      sumedVisits.push({
        source: key,
        visits: sumOfVisits,
      });
    }
    return sumedVisits.sort((a, b) => b.visits - a.visits);
  };

  const createDataForChart = (datesArray, sumedVisits, groupedBySource) => {
    datesArray.sort((a, b) => {
      return new Date(a) - new Date(b);
    });
    const datesFormatted = datesArray.map((date) =>
      format(new Date(date), "MMM. d, yyyy")
    );
    const uniqueDates = [...new Set(datesFormatted)];
    let datasetsArray = [];
    let i = 0;
    sumedVisits.forEach((item, id) => {
      if (id < 5) {
        const label = item.source;
        const backgroundColor = colors[i + 3];
        i++;
        let data = [];
        uniqueDates.forEach((date) => {
          const row = groupedBySource[item.source].find(
            (item) => item.date === date
          );
          if (row) {
            data.push(parseInt(row.visits));
          } else {
            data.push(0);
          }
        });
        datasetsArray.push({
          label,
          backgroundColor,
          data,
        });
      }
    });
    return { labels: uniqueDates, data: datasetsArray };
  };

  const displayResults = useCallback((response) => {
    var ageObj = {};
    const queryResult = response.result.reports[0].data.rows;

    for (let i = 0; i < queryResult.length; i++) {
      queryResult[i].dimensions[0] in ageObj ? ageObj[queryResult[i].dimensions[0]] += parseInt(queryResult[i].metrics[0].values[0]) : ageObj[queryResult[i].dimensions[0]] = parseInt(queryResult[i].metrics[0].values[0])
    }

    wait(3 * 1000).then(() => {

      var myData = {
        labels: Object.keys(ageObj),
        datasets: [{
          backgroundColor: 'rgba(146,202,242,0.2)',
          borderColor: 'rgba(38,150,228,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(146,202,242,0.4)',
          hoverBorderColor: 'rgba(38,150,228,1)',
          borderCapStyle: 'round',
          data: Object.values(ageObj)
        }]
      }

      setReportData({
        ...reportData,
        labels: Object.keys(ageObj),
        sets: myData
      })
    })
  }, [setReportData, reportData]);

  const options = {
    tooltips: {
      displayColors: true,
      callbacks: {
        mode: "x",
      },
    },
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
    maintainAspectRatio: false,
    legend: { position: "bottom" },
    plugins: {
      datalabels: {
        font: {
          size: 0,
        },
      },
    },
  };

  const data = {
    labels: reportData.labels,
    datasets: reportData.datasets,
  };

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate: props.startDate,
      endDate: props.endDate,
      metrics: "ga:users",
      dimensions: ["ga:userAgeBracket"],
    };
    setTimeout(
      () =>
        queryReport(request)
          .then((resp) => { displayResults(resp);})
          .catch((error) => console.log(error)),
      1100
    );
  }, [props.startDate, props.endDate]);

  return (
    <div className="card" className={styles.card}>
      <div className="card-body">
        <ReportWrapper>
          <ChartTitle>Age Group</ChartTitle>
          {/* <DatepickerRow>
            <CustomDatePicker
              placeholder={"Start date"}
              date={startDate}
              handleDateChange={(date) => setStartDate(date)}
            />
            <CustomDatePicker
              placeholder={"End date"}
              date={endDate}
              handleDateChange={(date) => setEndDate(date)}
            />
          </DatepickerRow> */}
          {reportData && (
            <ChartWrapper>
              {/* <Bar data={data} width={100} height={250} options={options} /> */}
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

export default Age;