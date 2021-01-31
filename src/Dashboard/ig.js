import React, { Component } from 'react';

import {
    Row, Col,
    Card,
    CardBody
} from 'reactstrap';

import { Bar, Pie } from 'react-chartjs-2';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faAngleUp,
    faAngleDown,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

import {
    AreaChart, Area,
    ResponsiveContainer,
    Tooltip,
} from 'recharts';

import ReactTooltip from 'react-tooltip';

import styles from './Basic/index.css';

const lineChartColour = '#2ad2c9';
let genderAge90 = { 'M': [0, 0, 0, 0, 0, 0, 0], 'F': [0, 0, 0, 0, 0, 0, 0], 'U': [0, 0, 0, 0, 0, 0, 0] };
var countryDataArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var countryDataNames = [];
const countryNum = { 'Australia': 0, 'Canada': 0, 'China': 0, 'Great Britain': 0, 'Hong Kong': 0, 'India': 0, 'Macao': 0, 'Malaysia': 0, 'Singapore': 0, 'Taiwan': 0, 'USA': 0, 'Others': 0 };
const countryArr = { 'AU': 'Australia', 'CA': 'Canada', 'CN': 'China', 'GB': 'Great Britain', 'HK': 'Hong Kong', 'ID': 'India', 'MO': 'Macao', 'MY': 'Malaysia', 'SG': 'Singapore', 'TW': 'Taiwan', 'US': 'USA' }
var total7Days = {};
var total28Days = {};
var total90Days = {};
var previous7Days = {};
var previous28Days = {};
var todaysValue = { 'Reach': 0, 'Impressions': 0, 'Lead Generated': 0, 'New Followers': 0, 'Online Followers': 0 };
var difference = { 'Reach': { '7': 0, '28': 0, '90': 0 }, 'Impressions': { '7': 0, '28': 0, '90': 0 }, 'Lead Generated': { '7': 0, '28': 0, '90': 0 }, 'New Followers': { '7': 0, '28': 0, '90': 0 }, 'Online Followers': { '7': 0, '28': 0, '90': 0 } };
var metricsArray = ['Reach', 'Impressions', 'Lead Generated', 'New Followers']
var maindata = [];
var onlineFollowersNum = [];
const engagementDescriptions = ['Total number of unique users who have viewed at least one of the IG User\'s IG Media', 'Total number of times the IG User\'s IG Media objects (i.e. posts, stories and promotions) have been viewed. Does not include profile views.', 'Total number of users who have viewed the IG User\'s profile within the specified period.', 'Total number of new followers each day within the specified range. Returns a maximum of 30 days worth of data.', 'Total number of this profile\'s followers that were online during the specified period']
const compareOnline = {
    0: 16,
    1: 17,
    2: 18,
    3: 19,
    4: 20,
    5: 21,
    6: 22,
    7: 23,
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 6,
    15: 7,
    16: 8,
    17: 9,
    18: 10,
    19: 11,
    20: 12,
    21: 13,
    22: 14,
    23: 15,
}

var allData = [];
for (let i = 0; i < 90; i++) {
    const name = i + 'day';
    allData.push({ 'name': name });
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

var genderAndAgeToFrequency, fansCountry, reach, impressions, leadGenerated, newFollowers, onlineFollowersMetrics;

function formatNumber(num) {
    if (num == null) return;
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

export default class IgDashboard extends Component {
    constructor() {
        super();

        this.state = {
            followersCount: 0,
            followCount: 0,
            mediaCount: 0,
            newFollowersCount: 0,
            currentDifference: '7',
            obj: { 'Reach': { '7': 0, '28': 0, '90': 0 }, 'Impressions': { '7': 0, '28': 0, '90': 0 }, 'Lead Generated': { '7': 0, '28': 0, '90': 0 }, 'New Followers': { '7': 0, '28': 0, '90': 0 }, 'Online Followers': { '7': 0, '28': 0, '90': 0 } },
            todaysValue: { 'Reach': 0, 'Impressions': 0, 'Lead Generated': 0, 'New Followers': 0, 'Online Followers': 0 },
            difference: { 'Reach': { '7': 0, '28': 0, '90': 0 }, 'Impressions': { '7': 0, '28': 0, '90': 0 }, 'Lead Generated': { '7': 0, '28': 0, '90': 0 }, 'New Followers': { '7': 0, '28': 0, '90': 0 }, 'New Followers': { '7': 0, '28': 0, '90': 0 }, 'Online Followers': { '7': 0, '28': 0, '90': 0 } },
            demographic: {
                labels: ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
                datasets: [
                    {
                        label: 'Male',
                        backgroundColor: 'rgba(146,202,242,0.2)',
                        borderColor: 'rgba(38,150,228,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(146,202,242,0.4)',
                        hoverBorderColor: 'rgba(38,150,228,1)',
                        borderCapStyle: 'round',
                        data: genderAge90['M']
                    },
                    {
                        label: 'Female',
                        backgroundColor: 'rgba(255,87,121,0.2)',
                        borderColor: 'rgba(255,87,122,1)',
                        borderWidth: 1,
                        stack: 1,
                        hoverBackgroundColor: 'rgba(255,171,188,1)',
                        hoverBorderColor: 'rgba(255,87,122,1)',
                        data: genderAge90['F']
                    },
                    {
                        label: 'Unknown',
                        backgroundColor: 'rgba(15,21,150,0.2)',
                        borderColor: 'rgba(25,99,232,1)',
                        borderWidth: 1,
                        stack: 2,
                        hoverBackgroundColor: 'rgba(25,99,232,1)',
                        hoverBorderColor: 'rgba(7,9,232,1)',
                        data: genderAge90['U']
                    }
                ]
            },
            onlineFollowers: {
                labels: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'],
                datasets: [
                    {
                        backgroundColor: 'rgba(146,202,242,0.2)',
                        borderColor: 'rgba(38,150,228,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(146,202,242,0.4)',
                        hoverBorderColor: 'rgba(38,150,228,1)',
                        borderCapStyle: 'round',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    }
                ]
            },
            thecountry: {
                labels: countryDataNames,
                datasets: [
                    {
                        data: countryDataArr,
                        backgroundColor: [
                            '#8dace7',
                            '#71deb9',
                            '#ef869e',
                            '#8dace7',
                            '#71deb9',
                            '#ef869e',
                            '#8dace7',
                            '#71deb9',
                            '#ef869e',
                            '#8dace7',
                            '#71deb9',
                            '#ef869e'
                        ],
                        hoverBackgroundColor: [
                            '#8dace7',
                            '#71deb9',
                            '#ef869e',
                            '#8dace7',
                            '#71deb9',
                            '#ef869e',
                            '#8dace7',
                            '#71deb9',
                            '#ef869e',
                            '#8dace7',
                            '#71deb9',
                            '#ef869e'
                        ]
                    }
                ]
            }
        }

    }

    componentDidMount() {
        getIGData();

        // to get data for number of followers and media count
        const updateOuterData = (response) => {
            this.setState(prevState => {
                let followersCount = Object.assign({}, prevState.followersCount);
                followersCount = response.followers_count
                return { followersCount };
            })
            this.setState(prevState => {
                let followCount = Object.assign({}, prevState.followCount);
                followCount = response.follows_count
                return { followCount };
            })
            this.setState(prevState => {
                let mediaCount = Object.assign({}, prevState.mediaCount);
                mediaCount = response.media_count
                return { mediaCount };
            })
        }

        function getIGData() {

            let accesstoken = 'EAAPWNENHrcUBAGhWddJQiTk4p2pLD4VCvXS5TFLodT0FldefNR7Bmy9qSmWLJgOzFJYl6RsOCMztr8Dc4LZCDXC3swEYKYvyWZAnhJeUe7XBj4ycYMm7cNaP4yZBHXW7BXb45YgnzcDX41Q3EPldDIyf0awJlI4cEXnBWD5LZBvdWK77jbKg0xLbZB9vSangZD'
            const now = Math.round(Date.now() / 1000);
            const before = Math.round(now - 2500000);
            now.toString();
            before.toString();

            const updateData = (response) => {
                updateOuterData(response)
            }

            function updateData2(callback) {
                return getInsights2(function (res) {
                    updateOuterData2(res, function (resp) {
                        maindata = resp
                    })
                    callback(maindata)
                })
            }
            function updateData3(callback) {
                return getInsights3(function (res) {
                    updateOuterData3(res, function (resp) {
                        maindata = resp
                    })
                    callback(maindata)
                })
            }
            function updateData4(callback) {
                return getInsights4(function (res) {
                    updateOuterData4(res, function (resp) {
                        onlineFollowersNum = resp
                    })
                    callback(onlineFollowersNum)
                })
            }

            // to get data for reach, impressions, lead generated and new followers
            function updateOuterData2(res, callback) {
                class Metrics {
                    updateSimpleData(data, name) {
                        var count = 27, sum = 0;
                        allData.forEach((obj) => {
                            if (data.period == 'day' && count > 0) {
                                if (count == 20) {
                                    total7Days[name] = sum || 0;
                                } else if (count == 13) {
                                    previous7Days[name] = sum - total7Days[name] || 0
                                }
                                obj[name] = 0 || data.values[count].value;
                                sum += data.values[count].value || 0;
                                count--;

                            }
                        });
                    }
                }

                reach = new Metrics('reach', 7);
                impressions = new Metrics('impressions', 7);
                leadGenerated = new Metrics('profile_views', 7);
                newFollowers = new Metrics('follower_count', 7);

                for (let i = 0; i < res.data.length; i++) {

                    switch (res.data[i].name) {
                        case 'reach':
                            reach.updateSimpleData(res.data[i], 'Reach');
                            break;

                        case 'impressions':
                            impressions.updateSimpleData(res.data[i], 'Impressions');
                            break;

                        case 'profile_views':
                            leadGenerated.updateSimpleData(res.data[i], 'Lead Generated');
                            break;

                        case 'follower_count':
                            newFollowers.updateSimpleData(res.data[i], 'New Followers');
                            break;
                    }
                }

                callback(allData);
            }

            // to get data for demographic and country data 
            function updateOuterData3(res, callback) {
                class Metrics {
                    changeAgeAndGender(data) {
                        const substitute = { '13-17': 0, '18-24': 1, '25-34': 2, '35-44': 3, '45-54': 4, '55-64': 5, '65+': 6 }
                        Object.entries(data.values[data.values.length - 1].value).forEach(([key, value]) => {
                            if (key.substring(0, 1) == 'U' && key.substring(2) == '13-17') return;
                            genderAge90[key.substring(0, 1)][substitute[key.substring(2)]] = value == NaN ? 0 : value;
                        })
                    }

                    changeCountryData(data) {
                        Object.entries(data.values[data.values.length - 1].value).forEach(([key, value]) => {
                            key in countryArr ? countryNum[countryArr[key]] = value : countryNum['Others'] += value;
                        })
                        Object.entries(countryNum).forEach(([key, value]) => {
                            var count = 0;
                            while (count < 12) {
                                if (value >= countryDataArr[count]) {
                                    countryDataArr.splice(count, 0, value)
                                    countryDataNames.splice(count, 0, key)
                                    break;
                                }
                                count++;
                            }
                            countryDataArr[count] = value
                            countryDataNames[count] = key
                        })
                        countryDataArr = countryDataArr.slice(0, 12);
                        countryDataNames = countryDataNames.slice(0, 12);
                    }
                }

                genderAndAgeToFrequency = new Metrics('audience_gender_age');
                fansCountry = new Metrics('audience_country');

                for (let i = 0; i < res.data.length; i++) {

                    switch (res.data[i].name) {
                        case 'audience_gender_age':
                            genderAndAgeToFrequency.changeAgeAndGender(res.data[i])
                            break;

                        case 'audience_country':
                            fansCountry.changeCountryData(res.data[i])
                            break;
                    }
                }

                callback(allData);
            }

            // to get data for online followers
            function updateOuterData4(res, callback) {

                class Metrics {

                    saveLivetimeValue(data, name) {
                        var count = data.values.length - 1;
                        for (let i = count; i >= 0; i--) {
                            if (data.values[i].value[0] != null && data.values[i].value[0] != 0) {
                                Object.entries(data.values[i].value).forEach(((key, value) => {
                                    onlineFollowersNum[compareOnline[value]] = data.values[i].value[value]
                                }))
                                break;
                            }
                        }
                    }
                }
                onlineFollowersMetrics = new Metrics('online_followers');

                for (let i = 0; i < res.data.length; i++) {

                    switch (res.data[i].name) {
                        case 'online_followers':
                            onlineFollowersMetrics.saveLivetimeValue(res.data[i], 'Online Followers')
                            break;
                    }
                }
                callback(onlineFollowersNum);
            }

            function getInsights() {
                window.FB.api(
                    '/17841406215635082?fields=followers_count%2Cfollows_count%2Cmedia_count',
                    'GET',
                    { "access_token": accesstoken, "since": before, "until": now },
                    function (response) {
                        updateData(response);
                    }
                )
            }

            function getInsights2(callback) {
                window.FB.api(
                    '/17841406215635082/insights?metric=impressions,reach,profile_views,follower_count&period=day',
                    'GET',
                    { "access_token": accesstoken, "since": before, "until": now },
                    function (response) {
                        callback(response);
                    }
                )
            }

            function getInsights3(callback) {
                window.FB.api(
                    '/17841406215635082/insights?metric=audience_country,audience_gender_age&period=lifetime',
                    'GET',
                    { "access_token": accesstoken },
                    function (response) {
                        callback(response);
                    }
                )
            }

            function getInsights4(callback) {
                window.FB.api(
                    '/17841406215635082/insights?metric=online_followers&period=lifetime',
                    'GET',
                    { "access_token": accesstoken, "since": before, "until": now },
                    function (response) {
                        callback(response);
                    }
                )
            }

            getInsights();

            updateData2(function (maindata) {
                return maindata
            })

            updateData3(function (maindata) {
                return maindata
            })

            updateData4(function (onlineFollowersNum) {
                return onlineFollowersNum
            })

        }

        // wait until all the data are extracted from the IG API then update them into objects or arrays in an organized way to be displayed
        wait(8 * 1000).then(() => {
            var metric;
            for (metric of metricsArray) {
                todaysValue[metric] = parseFloat(maindata[Object.keys(maindata)[0]][metric])
                difference[metric]['7'] = ((total7Days[metric] - previous7Days[metric]) / previous7Days[metric]) * 100 || 0
                difference[metric]['28'] = ((total28Days[metric] - previous28Days[metric]) / previous28Days[metric]) * 100 || 0
            }
            var demographic = {
                labels: ['13-17', '18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
                datasets: [
                    {
                        label: 'Male',
                        backgroundColor: 'rgba(146,202,242,0.2)',
                        borderColor: 'rgba(38,150,228,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(146,202,242,0.4)',
                        hoverBorderColor: 'rgba(38,150,228,1)',
                        borderCapStyle: 'round',
                        data: genderAge90['M']
                    },
                    {
                        label: 'Female',
                        backgroundColor: 'rgba(255,87,121,0.2)',
                        borderColor: 'rgba(255,87,122,1)',
                        borderWidth: 1,
                        stack: 1,
                        hoverBackgroundColor: 'rgba(255,171,188,1)',
                        hoverBorderColor: 'rgba(255,87,122,1)',
                        data: genderAge90['F']
                    },
                    {
                        label: 'Unknown',
                        backgroundColor: 'rgba(15,21,150,0.2)',
                        borderColor: 'rgba(25,99,232,1)',
                        borderWidth: 1,
                        stack: 2,
                        hoverBackgroundColor: 'rgba(25,99,232,1)',
                        hoverBorderColor: 'rgba(7,9,232,1)',
                        data: genderAge90['U']
                    }
                ]
            }
            var thecountry = {
                labels: countryDataNames,
                datasets: [
                    {
                        data: countryDataArr,
                        backgroundColor: [
                            '#8dace7',
                            '#71deb9',
                            '#ef869e',
                            '#8dace7',
                            '#71deb9',
                            '#ef869e',
                            '#8dace7',
                            '#71deb9',
                            '#ef869e',
                            '#8dace7',
                            '#71deb9',
                            '#ef869e'
                        ],
                        hoverBackgroundColor: [
                            '#8dace7',
                            '#71deb9',
                            '#ef869e',
                            '#8dace7',
                            '#71deb9',
                            '#ef869e',
                            '#8dace7',
                            '#71deb9',
                            '#ef869e',
                            '#8dace7',
                            '#71deb9',
                            '#ef869e'
                        ]
                    }
                ]
            }
            var newOnlineFollowers = {
                labels: ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'],
                datasets: [
                    {
                        label: 'Number of followers',
                        backgroundColor: 'rgba(146,202,242,0.2)',
                        borderColor: 'rgba(38,150,228,1)',
                        borderWidth: 1,
                        hoverBackgroundColor: 'rgba(146,202,242,0.4)',
                        hoverBorderColor: 'rgba(38,150,228,1)',
                        borderCapStyle: 'round',
                        data: onlineFollowersNum
                    }
                ]
            }
            this.setState({
                data: maindata, todaysValue: todaysValue, difference: difference, demographic: demographic, thecountry: thecountry, onlineFollowers: newOnlineFollowers
            })
        })
    }

// IG dashboard
    render() {
        return (
            <div style={{ padding: "10px 0px 10px 30px" }}>
                <Row>
                    <Col lg="4">
                        <br></br>
                        <h1 style={{ textAlign: "left", marginLeft: "15px" }}><b>Instagram Insights</b></h1>
                    </Col>
                </Row>
{/* Instagram Community Overview */}
                <Row>
                    <Col lg="4">
                        <br></br>
                        <h3 style={{ textAlign: "left", marginLeft: "15px" }}>Instagram Community Overview</h3>
                    </Col>
                    <Col lg="4">
                        <Card style={{ borderRadius: '10px' }}><CardBody>
                            <h2><b>{this.state.followersCount}</b></h2>
                            <h4>Total number of followers</h4>
                        </CardBody></Card>
                    </Col>
                    <Col lg="4">
                        <Card style={{ borderRadius: '10px' }}><CardBody>
                            <h2><b>{this.state.mediaCount}</b></h2>
                            <h4>Total media count</h4>
                        </CardBody></Card>
                    </Col>
                </Row>
{/* Instagram Community Demographic */}
                <div style={{ padding: "10px 0px 10px 30px" }}>
                    <Row>
                        <Col md="6">
                            <h3 style={{ textAlign: "left" }}>Instagram Community Demographic</h3>
                        </Col>
                    </Row>
                </div>
                <div style={{ padding: "10px 0px 10px 30px", borderRadius: "10px" }}>
                    <Row>
                        <Col lg="1"></Col>
                        <Col lg="5">
                            <Card className="main-card mb-3" style={{ borderRadius: '10px' }}>
                                <CardBody>
                                    <h2><b>Age and Gender</b></h2>
                                    <div>
                                        <Bar
                                            data={this.state.demographic}
                                            width={50}
                                            height={25}
                                            options={{
                                                barValueSpacing: 20,
                                                scales: {
                                                    yAxes: [{
                                                        ticks: {
                                                            beginAtZero: 0,
                                                        }
                                                    }]
                                                },
                                                plugins: {
                                                    datalabels: {
                                                        display: false
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="5">
                            <Card className="main-card mb-3" style={{ borderRadius: '10px' }}>
                                <CardBody>
                                    <h2><b>Countries</b></h2>
                                    <div>
                                        <Pie dataKey="value" data={this.state.thecountry}
                                            options={{
                                                plugins: {
                                                    datalabels: {
                                                        display: false
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col lg="1"></Col>
                    </Row>
                </div>
{/* Engagement */}
                <div style={{ padding: "10px 0px 10px 30px" }}>
                    <Row>
                        <Col md="4">
                            <h3 style={{ textAlign: "left" }}>Engagement</h3>
                        </Col>
                    </Row>
                </div>
                <Row >
                    {metricsArray.slice(0, 3).map((value, index) => {
                        return (
                            <Col lg="4" key={index}>
                                <span className="rounded">
                                    <div className="card" className={styles.card}>
                                        <div className="card-body" style={{ padding: "10px 0px 10px 30px", borderRadius: "25px" }}>
                                            <div className="card mb-2 widget-chart" style={{ borderRadius: '10px' }}>
                                                <div className="widget-chart-content">
                                                    <div style={{ float: 'right' }}>
                                                        <div>
                                                            <a data-for='enrich' data-tip={engagementDescriptions[index]}><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon></a>
                                                            <ReactTooltip id='enrich' getContent={(dataTip) => dataTip} />
                                                        </div>
                                                    </div>
                                                    <div className="widget-subheading" >
                                                        <center><h2><b>{metricsArray[index]}</b></h2></center>
                                                    </div>
                                                    <div className="widget-numbers">
                                                        <h3><b>{this.state.currentDifference == '7' ? formatNumber(total7Days[value]) : (this.state.currentDifference == '28' ? formatNumber(total28Days[value]) : this.state.currentDifference == '90' ? formatNumber(total90Days[value]) : '')}</b></h3>
                                                    </div>
                                                    {this.state.currentDifference == '90' ? '' :
                                                        <div>
                                                            <div className={this.state.difference[value][this.state.currentDifference] > 0 ? "widget-description text-success" : "widget-description text-danger"}>
                                                                <FontAwesomeIcon icon={this.state.difference[value][this.state.currentDifference] > 0 ? faAngleUp : faAngleDown} />
                                                                <span className="pl-1">{(this.state.difference[value][this.state.currentDifference]).toFixed(2)}%</span>
                                                            </div>
                                                            <div>( from prev. period [{this.state.currentDifference == '7' ? formatNumber(previous7Days[value]) : formatNumber(previous28Days[value])}] )</div>
                                                        </div>
                                                    }
                                                    <div style={{ padding: "10px 0px 10px 0px" }}>
                                                        <ResponsiveContainer height={160} className="container" padding="10px 10px 10px 0px">
                                                            <AreaChart data={maindata.slice(0, parseFloat(this.state.currentDifference))} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                                                <defs>
                                                                    <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                                                                        <stop offset="10%" stopColor={lineChartColour} stopOpacity={0.7} />
                                                                        <stop offset="90%" stopColor={lineChartColour} stopOpacity={0} />
                                                                    </linearGradient>
                                                                </defs>
                                                                <Tooltip />
                                                                <Area type='monotoneX' dataKey={value} stroke={lineChartColour} strokeWidth={2} fillOpacity={1}
                                                                    fill="url(#colorPv2)" style={{ padding: "10px 50px 10px 0px" }} />
                                                            </AreaChart>
                                                        </ResponsiveContainer>
                                                    </div></div></div></div></div></span>
                            </Col>
                        )
                    })}
                </Row>
{/* Growth and Details */}
                <div style={{ padding: "10px 0px 10px 30px" }}>
                    <Row>
                        <Col md="4">
                            <h3 style={{ textAlign: "left" }}>Growth and Details</h3>
                        </Col>
                    </Row>
                </div>
                <Row >
                    {metricsArray.slice(3, 4).map((value, index) => {
                        return (
                            <Col lg="4" key={index}>
                                <span className="rounded">
                                    <div className="card" className={styles.card}>
                                        <div className="card-body" style={{ padding: "0px 0px 10px 30px", borderRadius: "25px" }}>
                                            <div className="card mb-2 widget-chart" style={{ borderRadius: '10px' }}>
                                                <div className="widget-chart-content">
                                                    <div style={{ float: 'right' }}>
                                                        <a data-for='enrich' data-tip={engagementDescriptions[index + 3]}><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon></a>
                                                        <ReactTooltip id='enrich' getContent={(dataTip) => dataTip} />
                                                    </div>
                                                    <div className="widget-subheading" >
                                                        <center><h2><b>{metricsArray[index + 3]}</b></h2></center>
                                                    </div>
                                                    <div className="widget-numbers">
                                                        <h3><b>{this.state.currentDifference == '7' ? formatNumber(total7Days[value]) : (this.state.currentDifference == '28' ? formatNumber(total28Days[value]) : this.state.currentDifference == '90' ? formatNumber(total90Days[value]) : '')}</b></h3>
                                                    </div>
                                                    {this.state.currentDifference == '90' ? '' :
                                                        <div>
                                                            <div className={this.state.difference[value][this.state.currentDifference] > 0 ? "widget-description text-success" : "widget-description text-danger"}>
                                                                <FontAwesomeIcon icon={this.state.difference[value][this.state.currentDifference] > 0 ? faAngleUp : faAngleDown} />
                                                                <span className="pl-1">{(this.state.difference[value][this.state.currentDifference]).toFixed(2)}%</span>
                                                            </div>
                                                            <div>( from prev. period [{this.state.currentDifference == '7' ? formatNumber(previous7Days[value]) : formatNumber(previous28Days[value])}] )</div>
                                                        </div>
                                                    }
                                                    <div style={{ padding: "10px 0px 10px 0px" }}>
                                                        <ResponsiveContainer height={160} className="container" padding="10px 10px 10px 0px">
                                                            <AreaChart data={maindata.slice(0, parseFloat(this.state.currentDifference))} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                                                <defs>
                                                                    <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                                                                        <stop offset="10%" stopColor={lineChartColour} stopOpacity={0.7} />
                                                                        <stop offset="90%" stopColor={lineChartColour} stopOpacity={0} />
                                                                    </linearGradient>
                                                                </defs>
                                                                <Tooltip />
                                                                <Area type='monotoneX' dataKey={value} stroke={lineChartColour} strokeWidth={2} fillOpacity={1}

                                                                    fill="url(#colorPv2)" style={{ padding: "10px 50px 10px 0px" }} />
                                                            </AreaChart>
                                                        </ResponsiveContainer>
                                                    </div></div></div></div></div></span>
                            </Col>
                        )
                    })}
                    <Col lg="8">
                        <Card className="main-card mb-3" style={{ borderRadius: '10px' }}>
                            <CardBody>
                                <div style={{ float: 'right' }}>
                                    <a data-for='enrich' data-tip={engagementDescriptions[4]}><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon></a>
                                    <ReactTooltip id='enrich' border={'true'} getContent={(dataTip) => dataTip} />
                                </div>
                                <h2><b>Online Followers</b></h2>
                                <div>
                                    <Bar
                                        data={this.state.onlineFollowers}
                                        width={50}
                                        height={25}
                                        options={{
                                            barValueSpacing: 20,
                                            scales: {
                                                yAxes: [{
                                                    ticks: {
                                                        beginAtZero: 0,
                                                    }
                                                }]
                                            },
                                            plugins: {
                                                datalabels: {
                                                    display: false
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}