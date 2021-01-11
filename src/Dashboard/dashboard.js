import React, { useState } from "react";
import { addDays, format } from "date-fns";
import { DatepickerRow } from "./styles";
import DayVisitsReport from "./dayVisitsReport";
import CountriesReport from "./countriesReport";
import PageviewsReport from "./pageviewReport";
import SourceReport from "./sourceReport";
import BrowsersReport from "./browsersReport";
import DevicesReport from "./devicesReport";
import Gender from "./gender";
import Age from "./age";
import CustomDatePicker from "./datepicker";
import { LastRow } from "./styles";
import { Row, Col } from 'reactstrap';
import styles from './Basic/index.css';

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

const DashBoard = () => {

  const viewID = '190721502';

  const [startDate, setStartDate] = useState(addDays(new Date(), -10));
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <Row>
        <Col lg="4">
          <br></br>
          <h1 style={{ textAlign: "left", marginLeft: "15px" }}><b>FinKAB.com Insights</b></h1>
        </Col>
      </Row>
      <DatepickerRow>
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
      </DatepickerRow>
      <div style={{ padding: "10px 0px 10px 30px" }}>
        <Row>
          <Col md="4">
            <h3 style={{ textAlign: "left" }}>Community Demographic</h3>
          </Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <Age viewID={viewID} startDate={startDate}
                  endDate={endDate} />
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <CountriesReport viewID={viewID} startDate={startDate}
                  endDate={endDate} />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <Gender viewID={viewID} startDate={startDate}
                  endDate={endDate} />
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <BrowsersReport viewID={viewID} startDate={startDate}
                  endDate={endDate} />
              </div>
            </div>
          </Col>
        </Row>
        <div style={{ padding: "10px 0px 10px 30px" }}>
        <Row>
          <Col md="4">
            <h3 style={{ textAlign: "left" }}>Website Engagement</h3>
          </Col>
        </Row>
      </div>
        <Row>
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <DayVisitsReport
                  metric={"ga:users"}
                  title={"Users"}
                  viewID={viewID}
                  startDate={startDate}
                  endDate={endDate}
                  description="Total number of new followers each day within the specific range. Returns a maximum of 30 days worth of data. "
                />
              </div>
            </div>
          </Col>
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <DayVisitsReport
                  metric={"ga:sessions"}
                  title={"Sessions"}
                  viewID={viewID}
                  startDate={startDate}
                  endDate={endDate}
                  description="The volume of visits to the website per day."
                />
              </div></div>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <SourceReport viewID={viewID} startDate={startDate}
                  endDate={endDate} />
              </div>
            </div>
          </Col>
        </Row>
        {/* <Row>
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <DevicesReport viewID={viewID} startDate={startDate}
                  endDate={endDate} />
              </div>
            </div>
          </Col>
        </Row> */}
      </div>
      {/* ) : ''} */}
    </div>)

};

export default DashBoard;
