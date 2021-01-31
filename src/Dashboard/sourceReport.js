import React, { useEffect, useState } from "react";
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import ReactTooltip from 'react-tooltip';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const SourceReport = (props) => {

  const INITIAL_STATE = {
    labels: [],
    sets: {
      labels: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
      datasets: [{
        label: [0,0,0,0,0,0,0,0,0,0,0],
        backgroundColor: 'rgba(146,202,242,0.2)',
        borderColor: 'rgba(38,150,228,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(146,202,242,0.4)',
        hoverBorderColor: 'rgba(38,150,228,1)',
        borderCapStyle: 'round',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

  const displayResults = (response) => {
    var sourcesObj = {}
    var sourcesLabel = {}
    const queryResult = response.result.reports[0].data.rows;

    for (let i = 0; i < queryResult.length; i++) {
      queryResult[i].dimensions[0] in sourcesObj? sourcesObj[queryResult[i].dimensions[0]] += parseInt(queryResult[i].metrics[0].values[0]): sourcesObj[queryResult[i].dimensions[0]] = parseInt(queryResult[i].metrics[0].values[0]);
    }

    const data = transformAPIData(queryResult);
    let transformedData = data[0];
    let datesArray = data[1];

    const groupedBySource = groupDataBySource(transformedData);
    setTotalSources(Object.keys(groupedBySource).length);

    const sumedVisits = sortSourcesByTotalVisits(groupedBySource);

    const dataForChart = createDataForChart(
      datesArray,
      sumedVisits,
      groupedBySource
    );

    wait(3 * 1000).then(() => {

      var myData = {
        labels: Object.keys(sourcesObj),
        datasets: [{
          backgroundColor: 'rgba(146,202,242,0.2)',
          borderColor: 'rgba(38,150,228,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(146,202,242,0.4)',
          hoverBorderColor: 'rgba(38,150,228,1)',
          borderCapStyle: 'round',
          data: Object.values(sourcesObj)
        }]
      }

      setReportData({
        ...reportData,
        labels: Object.keys(sourcesObj),
        sets: myData
      })
    })
  };

  useEffect(() => {
    const request = {
      viewID: props.viewID,
      startDate: props.startDate,
      endDate: props.endDate,
      metrics: "ga:users",
      dimensions: ["ga:source", "ga:date"],
      orderBy: {
        fieldName: "ga:source",
        order: "DESCENDING",
      },
    };
    setTimeout(
      () =>
        queryReport(request)
          .then((resp) => { displayResults(resp);})
          .catch((error) => console.error(error)),
      1100
    );
  }, [props.startDate, props.endDate]);

  return (
    <ReportWrapper>
      <div style={{ float: 'right' }}>
        <a data-for='enrich' data-tip='Total number of new followers each day within the specified range. Returns a maximum of 30 days worth of data.'><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon></a>
        <ReactTooltip id='enrich' getContent={(dataTip) => dataTip} />
      </div>
      <ChartTitle>Sources of Visits</ChartTitle>
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
  );
};

export default SourceReport;