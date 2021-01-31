// Main file for Google API

import React, { useState } from "react";
import { addDays } from "date-fns";
import DayVisitsReport from "./dayVisitsReport";
import CountriesReport from "./countriesReport";
import SourceReport from "./sourceReport";
import BrowsersReport from "./browsersReport";
import DevicesReport from "./devicesReport";
import RateReport from "./rate";
import Gender from "./gender";
import Age from "./age";
import TopContentReport from "./topContent";
import ExitPageReport from "./exitPage";
import { Row, Col, Card, CardBody } from 'reactstrap';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DashBoard = () => {

  const viewID = '190721502';

  const [startDate, setStartDate] = useState(addDays(new Date(), -6));
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div>
      <Row>
        <Col lg="4">
          <br></br>
          <h1 style={{ textAlign: "left", marginLeft: "15px" }}><b>FinKAB.com Insights</b></h1>
        </Col>
      </Row>
{/* button */}
      <UncontrolledButtonDropdown className="mb-2 mr-2">
        <DropdownToggle caret color="primary" className="mb-2 mr-2">
          Days
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Choose the number of days</DropdownItem>
          <DropdownItem onClick={() => { setStartDate(addDays(endDate, -6)) }}><b>7 Days</b></DropdownItem>
          <DropdownItem onClick={() => { setStartDate(addDays(endDate, -27)) }}><b>28 Days</b></DropdownItem>
          <DropdownItem onClick={() => { setStartDate(addDays(endDate, -89)) }}><b>90 Days</b></DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      {console.log(startDate.toString().substring(4,15))}
      <Card style={{ width: '40%', margin: '0 auto', borderRadius: '10px' }}><CardBody>
        <b><h3>{startDate.toString().substring(4,15)} to {endDate.toString().substring(4,15)}</h3></b>
      </CardBody></Card>
      <br></br>
{/* Community Demographic */}
      <div style={{ padding: "10px 0px 10px 30px" }}>
        <Row>
          <Col md="4">
            <h3 style={{ textAlign: "left" }}>Community Demographic</h3>
          </Col>
        </Row>
      </div>
{/* age */}
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
{/* countries */}
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <CountriesReport viewID={viewID} startDate={startDate}
                  endDate={endDate} />
              </div>
            </div>
          </Col>
        </Row>
{/* gender */}
        <Row>
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <Gender viewID={viewID} startDate={startDate}
                  endDate={endDate} />
              </div>
            </div>
          </Col>
{/* browsers */}
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <BrowsersReport viewID={viewID} startDate={startDate}
                  endDate={endDate} />
              </div>
            </div>
          </Col>
        </Row>
{/* Website Engagement */}
        <div style={{ padding: "10px 0px 10px 30px" }}>
          <Row>
            <Col md="4">
              <h3 style={{ textAlign: "left" }}>Website Engagement</h3>
            </Col>
          </Row>
        </div>
{/* users per day */}
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
{/* sessions per day */}
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
{/* sources of visit */}
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
{/* top content */}
        <Row>
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <TopContentReport viewID={viewID} startDate={startDate}
                  endDate={endDate} />
              </div>
            </div>
          </Col>
{/* top exit pages */}
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <ExitPageReport viewID={viewID} startDate={startDate}
                  endDate={endDate} />
              </div>
            </div>
          </Col>
        </Row>
{/* average time spent*/}
        <Row>
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <RateReport
                  metric={"ga:avgTimeOnPage"}
                  title={"Average Time Spent"}
                  viewID={viewID}
                  startDate={startDate}
                  endDate={endDate}
                  description="TBC"
                />
              </div>
            </div>
          </Col>
{/* average pages per visit */}
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <RateReport
                  metric={"ga:pageviewsPerSession"}
                  title={"Average Page Per Visits"}
                  viewID={viewID}
                  startDate={startDate}
                  endDate={endDate}
                  description="TBC"
                />
              </div></div>
          </Col>
        </Row>
{/* bounce rate */}
        <Row>
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <RateReport
                  metric={"ga:bounceRate"}
                  title={"Bounce Rate"}
                  viewID={viewID}
                  startDate={startDate}
                  endDate={endDate}
                  description="TBC"
                />
              </div>
            </div>
          </Col>
{/* devices by users */}
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <DevicesReport
                  viewID={viewID}
                  startDate={startDate}
                  endDate={endDate}
                  description="TBC"
                />
              </div>
            </div>
          </Col>
        </Row>
{/* new visitors */}
        <Row>
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <DayVisitsReport id="chart"
                  metric={"ga:newUsers"}
                  title={"New Visitor"}
                  viewID={viewID}
                  startDate={startDate}
                  endDate={endDate}
                  description="TBC"
                />
              </div>
            </div>
          </Col>
{/* active users */}
          <Col md="6">
            <div className="card">
              <div className="card-body">
                <DayVisitsReport
                  metric={"ga:1DayUsers"}
                  title={"Active User"}
                  viewID={viewID}
                  startDate={startDate}
                  endDate={endDate}
                  description="TBC"
                />
              </div></div>
          </Col>
        </Row>
      </div>
    </div>)

};

export default DashBoard;
