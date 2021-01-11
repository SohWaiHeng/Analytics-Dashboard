import React, { Component, Fragment } from 'react';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container } from 'reactstrap';
import { Bar, Pie } from 'react-chartjs-2';
import styles from './index.css';
import like from '../../assets/images/like.png';
import love from '../../assets/images/love.png';
import angry from '../../assets/images/angry.png';
import haha from '../../assets/images/haha.png';
import wow from '../../assets/images/wow.png';
import sad from '../../assets/images/sad.png';
import care from '../../assets/images/care.png';
import ReactTooltip from 'react-tooltip';
import styled from "styled-components";
import Tooltip from '@material-ui/core/Tooltip';
import Button from "@material-ui/core/Button";
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, makeStyles } from '@material-ui/core/styles';

import {
    Row, Col,
    Card,
    CardBody,
    Progress,
    Tooltip as TooltipStrap
} from 'reactstrap';

import {
    AreaChart, Area,
    ResponsiveContainer,
    Tooltip as TooltipChart
} from 'recharts';

import {
    faAngleUp,
    faAngleDown,
    faInfoCircle
} from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { black } from 'material-ui/styles/colors';

const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
        "&:before": {
            border: "2px solid black"
        },
        color: theme.palette.common.white,
    },
    tooltip: {
        backgroundColor: theme.palette.common.white,
        fontSize: 20,
        color: theme.palette.common.black,
        border: "2px solid black"
    },
}));

function LightTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
var maindata = [];
var total7Days = {
    'Likes Sources': {
        "Ads": 0,
        "News Feed": 0,
        "Page Suggestions": 0,
        "Restored Likes from Reactivated Accounts": 0,
        "Search": 0,
        "Your Page": 0,
        "Other": 0
    },
    'Page View Sites': {
        "WWW": 0,
        "MOBILE": 0,
        "OTHER": 0
    },
    'Fans Impressions': {
        "link": 0,
        "like": 0,
        "comment": 0,
        "other": 0
    },
    'People Talking About Your Page': {
        "fan": 0,
        "other": 0,
        "page post": 0
    }
};
var total28Days = {
    'Likes Sources': {
        "Ads": 0,
        "News Feed": 0,
        "Page Suggestions": 0,
        "Restored Likes from Reactivated Accounts": 0,
        "Search": 0,
        "Your Page": 0,
        "Other": 0
    },
    'Page View Sites': {
        "WWW": 0,
        "MOBILE": 0,
        "OTHER": 0
    },
    'Fans Impressions': {
        "link": 0,
        "like": 0,
        "comment": 0,
        "other": 0
    },
    'People Talking About Your Page': {
        "fan": 0,
        "other": 0,
        "page post": 0
    }
};
var total90Days = {
    'Likes Sources': {
        "Ads": 0,
        "News Feed": 0,
        "Page Suggestions": 0,
        "Restored Likes from Reactivated Accounts": 0,
        "Search": 0,
        "Your Page": 0,
        "Other": 0
    },
    'Page View Sites': {
        "WWW": 0,
        "MOBILE": 0,
        "OTHER": 0
    },
    'Fans Impressions': {
        "link": 0,
        "like": 0,
        "comment": 0,
        "other": 0
    },
    'People Talking About Your Page': {
        "fan": 0,
        "other": 0,
        "page post": 0
    }
};
var temp = {
    'Likes Sources': {
        "Ads": 0,
        "News Feed": 0,
        "Page Suggestions": 0,
        "Restored Likes from Reactivated Accounts": 0,
        "Search": 0,
        "Your Page": 0,
        "Other": 0
    },
    'Page View Sites': {
        "WWW": 0,
        "MOBILE": 0,
        "OTHER": 0
    },
    'Fans Impressions': {
        "link": 0,
        "like": 0,
        "comment": 0,
        "other": 0
    },
    'People Talking About Your Page': {
        "fan": 0,
        "other": 0,
        "page post": 0
    }
};
var countryDataArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var countryDataNames = [];
var totalCountryData = { '7': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], '28': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], '90': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
var country = {
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
var todaysDate, day7Date, day28Date, day90Date, totalLikes = 0;
var previous7Days = { 'country': [] };
var previous28Days = { 'country': [] };
const lineChartColour = '#2ad2c9';
const countryNum = { 'Australia': 0, 'Canada': 0, 'China': 0, 'Great Britain': 0, 'Hong Kong': 0, 'India': 0, 'Macao': 0, 'Malaysia': 0, 'Singapore': 0, 'Taiwan': 0, 'USA': 0, 'Others': 0 };
const countryArr = { 'AU': 'Australia', 'CA': 'Canada', 'CN': 'China', 'GB': 'Great Britain', 'HK': 'Hong Kong', 'ID': 'India', 'MO': 'Macao', 'MY': 'Malaysia', 'SG': 'Singapore', 'TW': 'Taiwan', 'US': 'USA' }
let genderAge7 = { 'M': [0, 0, 0, 0, 0, 0, 0], 'F': [0, 0, 0, 0, 0, 0, 0], 'U': [0, 0, 0, 0, 0, 0, 0] };
let genderAge28 = { 'M': [0, 0, 0, 0, 0, 0, 0], 'F': [0, 0, 0, 0, 0, 0, 0], 'U': [0, 0, 0, 0, 0, 0, 0] };
let genderAge90 = { 'M': [0, 0, 0, 0, 0, 0, 0], 'F': [0, 0, 0, 0, 0, 0, 0], 'U': [0, 0, 0, 0, 0, 0, 0] };
var difference = { 'Page Engagement': { '7': 0, '28': 0, '90': 0 }, 'Page Impressions': { '7': 0, '28': 0, '90': 0 }, 'New Fans': { '7': 0, '28': 0, '90': 0 }, 'Page Consumptions': { '7': 0, '28': 0, '90': 0 }, 'Page View Total': { '7': 0, '28': 0, '90': 0 }, 'Page Engaged Users': { '7': 0, '28': 0, '90': 0 }, 'Daily Reach': { '7': 0, '28': 0, '90': 0 }, 'Post Impression': { '7': 0, '28': 0, '90': 0 }, 'Posts Reach': { '7': 0, '28': 0, '90': 0 }, 'Post Engaged Users': { '7': 0, '28': 0, '90': 0 }, 'Positive Feedback': { '7': 0, '28': 0, '90': 0 }, 'Number of Likes': { '7': 0, '28': 0, '90': 0 }, 'Number of Loves': { '7': 0, '28': 0, '90': 0 }, 'Number of Wow': { '7': 0, '28': 0, '90': 0 }, 'Number of Haha': { '7': 0, '28': 0, '90': 0 }, 'Number of Sorry': { '7': 0, '28': 0, '90': 0 }, 'Number of Anger': { '7': 0, '28': 0, '90': 0 } };
var todaysValue = {};
const barColor = { 'Likes Sources': 'success', 'Page Impressions Frequency': 'info', 'Page View Sites': 'warning', 'Fans Impressions': 'danger' }
const metricsArray = ['Page Engagement', 'Page Impressions', 'Page Consumptions', 'Page View Total', 'Page Engaged Users', 'Post Impression', 'Posts Reach', 'Post Engaged Users', 'New Fans', 'Positive Feedback'];
const reactionArray = ['Number of Likes', 'Number of Loves', 'Number of Wow', 'Number of Haha', 'Number of Sorry', 'Number of Anger'];
const description = { 'WWW': 'World Wide Web', 'MOBILE': 'Mobile', 'OTHER': 'Others', 'link': 'Shared a post/story', 'like': 'Like a post/story', 'comment': 'Commented on a post/story', 'other': 'Others', 'fan': 'Fans', 'page post': 'Page posts' }
const pageEngagementDescriptions = ["The number of times people have engaged with your posts through reactions, comments, shares and more.", "The number of times any content (posts, ads, stories) from your Page or about your Page entered a person's screen.", "The number of times people clicked on any of your content. [Lead Generation]", "The number of times a Page's profile has been viewed.", "The number of people who engaged with your Page. Engagement includes any click."]
const postEngagementDescriptions = ["The number of times people have engaged with your posts through reactions, comments, shares and more.", "The number of people who clicked anywhere in your posts.", "The number of people who had any content from your Page or about your Page enter their screen through with social information attached. As a form of organic distribution, social information displays when a person's friend interacted with your Page, post or story. This includes when someone's friend likes or follows your Page, engages with a post, shares a photo of your Page and checks into your Page."]
const growthDescriptions = ["The number of new people who have liked your Page.", "The number of times people took a positive action on your Page."]
const sourcesDescriptions = ["This is a breakdown of the number of Page likes from the most common places where people can like your Page, by Page story type.", "The number of stories about your Page's stories.", "The number of times people took a positive action.", "The number of people logged in to Facebook who have viewed your Page profile, broken down by the type of device."]
var progressValues = {
    'Likes Sources': {
        "Ads": 0,
        "News Feed": 0,
        "Page Suggestions": 0,
        "Restored Likes from Reactivated Accounts": 0,
        "Search": 0,
        "Your Page": 0,
        "Other": 0
    },
    'Page View Sites': {
        "WWW": 0,
        "MOBILE": 0,
        "OTHER": 0
    },
    'Fans Impressions': {
        "link": 0,
        "like": 0,
        "comment": 0,
        "other": 0
    },
    'People Talking About Your Page': {
        "fan": 0,
        "other": 0,
        "page post": 0
    }
};
var progressValuesData = {
    'Likes Sources': [0, 0, 0, 0, 0, 0, 0],
    'Page View Sites': [0, 0, 0],
    'Fans Impressions': [0, 0, 0],
    'People Talking About Your Page': [0, 0, 0]
};
var progressValuesNames = {
    'Likes Sources': [],
    'Page View Sites': [],
    'Fans Impressions': [],
    'People Talking About Your Page': [0, 0, 0]
};
var talkedAboutSum = { '7': 0, '28': 0, '90': 0 }

function formatNumber(num) {
    if (num == null) return;
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

var access_token;

var postImpression, postEngagedUsers, postsReach, pageImpressionsFrequencyDistribution, pageViewsBySite, fansByLikeSource, fansCountry, pageTotalLikers, pagePostEngagement, pageEngagedUsers, pageImpressions, pageNewLikers, genderAndAgeToFrequency, clicksOnPageContents, pageViews, postLikes, postLoves, postWow, postHaha, postSorry, postAnger, postReactions, dailyReach, talkedAbout, totalPageLikes;

const optionsCursorTrueWithMargin = {
    followCursor: true,
    shiftX: 20,
    shiftY: 0
}

function changeDateFormat(date) {
    let month = {
        "01": " Jan ",
        "02": " Feb ",
        "03": " Mar ",
        "04": " Apr ",
        "05": " May ",
        "06": " Jun ",
        "07": " Jul ",
        "08": " Aug ",
        "09": " Sep ",
        "10": " Oct ",
        "11": " Nov ",
        "12": " Dec "
    }
    return (date.substring(8, 10) + month[date.substring(5, 7)] + date.substring(0, 4))
}

export default class BasicDashboard extends Component {

    constructor() {
        super();

        this.state = {
            dropdownOpen: false,
            activeTab1: '11',
            obj: { 'Page Engagement': total7Days, 'Page Impressions': total7Days, 'New Fans': total7Days, 'Page Consumptions': total7Days, 'Page View Total': total7Days, 'Page Engaged Users': total7Days, 'Daily Reach': total7Days, 'Post Impression': total7Days, 'Post Engaged Users': total7Days, 'Positive Feedback': total7Days, 'Posts Reach': total7Days, 'Number of Likes': total7Days, 'Number of Loves': total7Days, 'Number of Wow': total7Days, 'Number of Haha': total7Days, 'Number of Sorry': total7Days, 'Number of Anger': total7Days },
            num: { 'Page Engagement': 7, 'Page Impressions': 7, 'New Fans': 7, 'Page Consumptions': 7, 'Page View Total': 7, 'Page Engaged Users': 7, 'Daily Reach': 7, 'Post Impression': 7, 'Post Engaged Users': 7, 'Posts Reach': 7, 'Positive Feedback': 7, 'Number of Likes': 7, 'Number of Loves': 7, 'Number of Wow': 7, 'Number of Haha': 7, 'Number of Sorry': 7, 'Number of Anger': 7 },
            todaysValue: { 'Page Engagement': 0, 'Page Impressions': 0, 'New Fans': 0, 'Page Consumptions': 0, 'Page View Total': 0, 'Page Engaged Users': 0, 'Daily Reach': 0, 'Post Impression': 0, 'Post Engaged Users': 0, 'Posts Reach': 0, 'Post Engaged Users': 0, 'Positive Feedback': 0, 'Number of Likes': 0, 'Number of Loves': 0, 'Number of Wow': 0, 'Number of Haha': 0, 'Number of Sorry': 0, 'Number of Anger': 0 },
            difference: { 'Page Engagement': { '7': 0, '28': 0, '90': 0 }, 'Page Impressions': { '7': 0, '28': 0, '90': 0 }, 'New Fans': { '7': 0, '28': 0, '90': 0 }, 'Page Consumptions': { '7': 0, '28': 0, '90': 0 }, 'Page View Total': { '7': 0, '28': 0, '90': 0 }, 'Page Engaged Users': { '7': 0, '28': 0, '90': 0 }, 'Daily Reach': { '7': 0, '28': 0, '90': 0 }, 'Post Impression': { '7': 0, '28': 0, '90': 0 }, 'Posts Reach': { '7': 0, '28': 0, '90': 0 }, 'Post Engaged Users': { '7': 0, '28': 0, '90': 0 }, 'Positive Feedback': { '7': 0, '28': 0, '90': 0 }, 'Number of Likes': { '7': 0, '28': 0, '90': 0 }, 'Number of Loves': { '7': 0, '28': 0, '90': 0 }, 'Number of Wow': { '7': 0, '28': 0, '90': 0 }, 'Number of Haha': { '7': 0, '28': 0, '90': 0 }, 'Number of Sorry': { '7': 0, '28': 0, '90': 0 }, 'Number of Anger': { '7': 0, '28': 0, '90': 0 } },
            currentDifference: '7',
            mydata: [],
            totalWhatDays: total7Days,
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
            thecountry: {
                labels: [],
                datasets: [
                    {
                        data: [],
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
            },
            progressValues: {
                'Likes Sources': {
                    "Ads": 0,
                    "News Feed": 0,
                    "Page Suggestions": 0,
                    "Restored Likes from Reactivated Accounts": 0,
                    "Search": 0,
                    "Your Page": 0,
                    "Other": 0
                },
                'Page View Sites': {
                    "WWW": 0,
                    "MOBILE": 0,
                    "OTHER": 0
                },
                'Fans Impressions': {
                    "link": 0,
                    "like": 0,
                    "comment": 0,
                    "other": 0
                },
                'People Talking About Your Page': {
                    "page post": 0,
                    "fan": 0,
                    "other": 0
                }
            },
            progressValuesData: {
                'Likes Sources': [0, 0, 0, 0, 0, 0, 0],
                'Page View Sites': [0, 0, 0],
                'Fans Impressions': [0, 0, 0],
                'People Talking About Your Page': [0, 0, 0]
            },
            progressValuesNames: {
                'Likes Sources': [],
                'Page View Sites': [],
                'Fans Impressions': [],
                'People Talking About Your Page': [0, 0, 0]
            },
            isHovering: false
        };
        this.toggle = this.toggle.bind(this);
        this.toggle1 = this.toggle1.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    toggle1(tab) {
        if (this.state.activeTab1 !== tab) {
            this.setState({
                activeTab1: tab
            });
        }
    }

    handleMouseEnter() {
        this.setState(this.toggleEnter);
    }

    toggleEnter(state) {
        return {
            isHovering: true,
        };
    }

    handleMouseLeave() {
        this.setState(this.toggleLeave);
    }

    toggleLeave(state) {
        return {
            isHovering: false,
        };
    }

    changeCurrentDifference(num) {
        this.setState(prevState => {
            let currentDifference = Object.assign({}, prevState.currentDifference);
            currentDifference = num;
            return { currentDifference };
        })
    }

    updateDataDisplayed(difference) {
        const arr = difference == '7' ? total7Days : (difference == '28' ? total28Days : total90Days)
        metricsArray.map((value, index) => {
            this.current0(value, arr);
            this.current1(value, parseFloat(difference));
            this.current2(value);
            this.current3(value);
        })
        reactionArray.map((value, index) => {
            this.current0(value, arr);
            this.current1(value, parseFloat(difference));
            this.current2(value);
            this.current3(value);
        })
        Object.keys(this.state.progressValuesNames).map((key) => {
            this.current7(arr, key);
            this.current8(arr);
            this.current6(key);
        })
    }

    current0(metric, object) {
        this.setState(prevState => {
            let obj = Object.assign({}, prevState.obj);
            obj[metric] = object;
            return { obj };
        })
    }

    current1(metric, number) {
        this.setState(prevState => {
            let num = Object.assign({}, prevState.num);
            num[metric] = number;
            return { num };
        })
    }

    current2(metric) {
        this.setState(prevState => {
            let todaysValue = Object.assign({}, prevState.todaysValue);
            todaysValue[metric] = (parseFloat(maindata[Object.keys(maindata)[0]][metric]))
            return { todaysValue };
        })
    }

    current3(metric) {
        this.setState(prevState => {
            let difference = Object.assign({}, prevState.difference);
            difference[metric]['7'] = ((total7Days[metric] - previous7Days[metric]) / previous7Days[metric]) * 100 || 0
            difference[metric]['28'] = ((total28Days[metric] - previous28Days[metric]) / previous28Days[metric]) * 100 || 0
            return { difference };
        })
    }

    current4(obj) {
        this.setState(prevState => {
            let demographic = Object.assign({}, prevState.demographic);
            const copy = JSON.parse(JSON.stringify(obj))
            demographic.datasets.map((value) => {
                if (value.label == 'Male') value.data = copy['M'];
                else if (value.label == 'Female') value.data = copy['F'];
                else if (value.label == 'Unknown') value.data = copy['U'];
            })
            return { demographic };
        })
    };

    current5(array) {
        this.setState(prevState => {
            let thecountry = Object.assign({}, prevState.thecountry);
            thecountry.datasets[0].data = array;
            return { thecountry }
        })
    }

    current7(obj, name) {
        Object.entries(obj[name]).forEach(([key2, value2]) => {
            temp[name][key2] = 0 || ((obj[name][key2] / Math.max(...Object.values(obj[name]))) * 100);
        })
        this.setState(prevState => {
            let progressValues = Object.assign({}, prevState.progressValues);
            progressValues = temp;
            return { progressValues };
        })
    }

    current8(obj) {
        this.setState(prevState => {
            let totalWhatDays = Object.assign({}, prevState.totalWhatDays);
            totalWhatDays = obj;
            return { totalWhatDays };
        })
    }

    current6(name) {
        let arrLength = progressValuesData[name].length, i;
        for (i in progressValuesData[name]) {
            progressValuesData[name][i] = 0;
        }
        Object.entries(temp[name]).forEach(([key2, value2]) => {
            var count = 0;
            while (count < arrLength) {
                if (value2 >= progressValuesData[name][count]) {
                    progressValuesData[name].splice(count, 0, value2)
                    progressValuesNames[name].splice(count, 0, key2)
                    break;
                }
                count++;
            }
            progressValuesData[name][count] = value2
            progressValuesNames[name][count] = key2
        })
        progressValuesData[name] = progressValuesData[name].slice(0, arrLength);
        progressValuesNames[name] = progressValuesNames[name].slice(0, arrLength);
    }

    componentDidMount() {

        var script = document.createElement('script');

        script.src = "https://connect.facebook.net/en_US/sdk.js";
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous'

        document.body.appendChild(script);

        window.fbAsyncInit = function () {

            window.FB.init({
                appId: process.env.FACEBOOK_APP_ID,
                xfbml: true,
                status: true,
                cooie: true,
                version: 'v8.0'
            });

        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        this.run();

    };

    run() {

        wait(2 * 1000).then(() => { getFBData() });

        function getFBData() {

            let accesstoken = 'EAAPWNENHrcUBAABzZCui4hFzNM9ZBdZBYh9EeTPMoNxOMDLEdMx5qRfM3n194zv68NXhplEftvv5EvhRRZAz18DWp2w435ykfNWgCjw1HQZBiof3O9IHZCeICXdJ2v6SI5EV5IP9NTWJ1WBF2TfdlmrpwrJ786eqOw2bko6QZAZC53qMtHH7qs8x86ZC568idviae6AcXG5N0IAZDZD'

            const now = Math.round(Date.now() / 1000);
            const before = Math.round(now - 8000000);
            now.toString();
            before.toString();

            function getValue(data) {
                maindata = data;
                return maindata;
            }

            function startThis(callback) {
                return getInsights("page_posts_impressions_unique,post_engaged_users,page_posts_impressions_viral_unique,page_post_engagements,page_impressions,page_fans,page_fan_adds_unique,page_impressions_by_age_gender_unique,page_consumptions,page_fans_by_like_source,page_impressions_frequency_distribution,page_views_total,page_views_by_site_logged_in_unique,page_fans_country,page_actions_post_reactions_like_total,page_actions_post_reactions_love_total,page_actions_post_reactions_wow_total,page_actions_post_reactions_haha_total,page_actions_post_reactions_sorry_total,page_actions_post_reactions_anger_total,page_positive_feedback_by_type,page_impressions_viral_unique,page_fans_gender_age,page_content_activity_by_action_type,page_engaged_users", function (res) {
                    createClass(res, function (resp) {
                        getValue(resp);
                    })
                    callback(maindata)
                })
            }

            function getInsights(insights, callback) {
                window.FB.api(
                    '/175239293131122/insights',
                    'GET',
                    { "access_token": accesstoken, "metric": insights, "since": before, "until": now },
                    function (response) {
                        callback(response);
                    }
                )
            }

            function createClass(res, callback) {
                class Metrics {

                    constructor(name, numberOfDays) {
                        this.name = name;
                        this.numberOfDays = numberOfDays;
                    }

                    updateSimpleData(data, name) {
                        var count = 89, sum = 0;
                        allData.forEach((obj) => {
                            if (data.period == 'day') {
                                if (count == 82) {
                                    total7Days[name] = sum || 0;
                                } else if (count == 75) {
                                    previous7Days[name] = sum - total7Days[name] || 0
                                } else if (count == 61) {
                                    total28Days[name] = sum || 0;
                                } else if (count == 33) {
                                    previous28Days[name] = sum - total28Days[name] || 0
                                } else if (count == 0) {
                                    total90Days[name] = sum || 0;
                                    return;
                                }
                                obj[name] = data.values[count].value || 0;
                                sum += data.values[count].value || 0;
                                count--;
                            }
                        });
                    }

                    updateAdvancedData(data, name) {
                        var count = 89, sum = {}, totalPos = 0;
                        total7Days[name] = {};
                        total28Days[name] = {};
                        total90Days[name] = {};
                        allData.forEach((obj) => {
                            obj[name] = data.values[count].value;
                            if (name == 'Likes Sources') obj['Positive Feedback'] = 0;
                            Object.entries(data.values[count].value).forEach(([key, value]) => {
                                if (!(sum.hasOwnProperty(key))) {
                                    sum[key] = value;
                                } else {
                                    sum[key] += value;
                                }
                                if (name == 'Likes Sources') {
                                    if (!(obj.hasOwnProperty('Positive Feedback'))) {
                                        obj['Positive Feedback'] = value || 0;
                                        totalPos += value || 0;
                                    } else {
                                        obj['Positive Feedback'] += value || 0;
                                        totalPos += value || 0;
                                    }
                                }
                            });
                            if (count == 83) {
                                console.log(sum)
                                Object.entries(sum).forEach(([key, value]) => {
                                    total7Days[name][key.toString()] = value || 0;
                                    if (name == 'Likes Sources') { console.log('hi'); total7Days['Positive Feedback'] = totalPos || 0 };
                                    progressValues[name][key.toString()] = value || 0;
                                    if (name == 'People Talking About Your Page') {
                                        talkedAboutSum['7'] += value || 0;
                                    }
                                });
                            } else if (count == 76 && name == 'Likes Sources') {
                                previous7Days['Positive Feedback'] = totalPos - total7Days['Positive Feedback'] || 0;
                            } else if (count == 62) {
                                Object.entries(sum).forEach(([key, value]) => {
                                    total28Days[name][key.toString()] = value || 0;
                                    if (name == 'Likes Sources') total28Days['Positive Feedback'] = totalPos || 0;
                                    if (name == 'People Talking About Your Page') {
                                        talkedAboutSum['28'] += value || 0;
                                    }
                                });
                            } else if (count == 34 && name == 'Likes Sources') {
                                previous28Days['Positive Feedback'] = totalPos - total28Days['Positive Feedback'] || 0;
                            } else if (count == 0) {
                                Object.entries(sum).forEach(([key, value]) => {
                                    total90Days[name][key.toString()] = value || 0;
                                    if (name == 'Likes Sources') total90Days['Positive Feedback'] = totalPos || 0;
                                    if (name == 'People Talking About Your Page') {
                                        talkedAboutSum['90'] += value || 0;
                                    }
                                });
                            }
                            count--;
                        });
                        console.log(progressValues)
                        Object.entries(progressValues).forEach(([key, value]) => {
                            Object.entries(progressValues[key]).forEach(([key2, value2]) => {
                                temp[key][key2] = 0 || ((progressValues[key][key2] / Math.max(...Object.values(progressValues[key]))) * 100);
                            })
                        })
                        console.log(temp)
                        const arrLength = progressValuesData[name].length;
                        Object.entries(temp[name]).forEach(([key2, value2]) => {
                            var count = 0;
                            while (count < arrLength) {
                                if (value2 >= progressValuesData[name][count]) {
                                    progressValuesData[name].splice(count, 0, value2)
                                    progressValuesNames[name].splice(count, 0, key2)
                                    break;
                                }
                                count++;
                            }
                            progressValuesData[name][count] = value2
                            progressValuesNames[name][count] = key2
                        })
                        progressValuesData[name] = progressValuesData[name].slice(0, arrLength);
                        progressValuesNames[name] = progressValuesNames[name].slice(0, arrLength);
                        console.log(total28Days)
                        console.log(progressValuesData)
                    }

                    changeCountryData(data) {
                        console.log(data)
                        console.log(data.values[data.values.length - 1].end_time.substring(0, 10))
                        todaysDate = changeDateFormat(data.values[data.values.length - 1].end_time.substring(0, 10))
                        console.log(todaysDate)
                        day7Date = changeDateFormat(data.values[data.values.length - 8].end_time.substring(0, 10))
                        day28Date = changeDateFormat(data.values[data.values.length - 29].end_time.substring(0, 10))
                        if (data.values.length >= 91)
                            day90Date = changeDateFormat(data.values[data.values.length - 91].end_time.substring(0, 10))
                        else
                            day90Date = changeDateFormat(data.values[0].end_time.substring(0, 10))
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

                    saveLivetimeValue(data, name) {
                        todaysDate = changeDateFormat(data.values[data.values.length - 1].end_time.substring(0, 10))
                        day7Date = changeDateFormat(data.values[data.values.length - 8].end_time.substring(0, 10))
                        day28Date = changeDateFormat(data.values[data.values.length - 29].end_time.substring(0, 10))
                        if (data.values.length >= 91)
                            day90Date = changeDateFormat(data.values[data.values.length - 91].end_time.substring(0, 10))
                        else
                            day90Date = changeDateFormat(data.values[0].end_time.substring(0, 10))

                        var count = 89, sum = 0;
                        allData.forEach((obj) => {
                            if (data.period == 'day') {
                                if (count == 82) {
                                    total7Days[name] = sum || 0;
                                } else if (count == 75) {
                                    previous7Days[name] = sum - total7Days[name] || 0
                                } else if (count == 61) {
                                    total28Days[name] = sum || 0;
                                } else if (count == 33) {
                                    previous28Days[name] = sum - total28Days[name] || 0
                                } else if (count == 0) {
                                    total90Days[name] = sum || 0;
                                    return;
                                }
                                obj[name] = data.values[count].value - data.values[count - 1].value || 0;
                                sum += data.values[count].value - data.values[count - 1].value || 0;
                                count--;
                            }
                        });
                    }

                    getTotal(dict, name, key, sum, maleNum, femaleNum, unknownNum) {
                        dict[name]['M'][key] = maleNum;
                        dict[name]['F'][key] = femaleNum;
                        dict[name]['U'][key] = unknownNum;
                        return sum, dict;
                    }

                    addData(value, obj, sumDict, gender, key) {
                        obj[gender][key] = value;
                        if (sumDict[gender][key] == 0) {
                            sumDict[gender][key] = value;
                        } else {
                            sumDict[gender][key] += value;
                        }
                        return obj, sumDict;
                    }

                    changeAgeAndGender(data) {
                        const substitute = { '13-17': 0, '18-24': 1, '25-34': 2, '35-44': 3, '45-54': 4, '55-64': 5, '65+': 6 }
                        Object.entries(data.values[data.values.length - 1].value).forEach(([key, value]) => {
                            if (key.substring(0, 1) == 'U' && key.substring(2) == '13-17') return;
                            genderAge90[key.substring(0, 1)][substitute[key.substring(2)]] = value == NaN ? 0 : value;
                        })
                    }

                    updateAgeGenderData(data, name) {
                        var count = data.values.length - 1, sum = { 'M': {}, 'F': {}, 'U': {} };
                        const substitute = { '13-17': 0, '18-24': 1, '25-34': 2, '35-44': 3, '45-54': 4, '55-64': 5, '65+': 6 }
                        allData.forEach((obj) => {
                            if (data.period == 'day') {
                                obj[name] = { 'M': {}, 'F': {}, 'U': {} };
                                let temp;
                                if (count == data.values.length - 1) {
                                    Object.entries(data.values[count].value).forEach(([key, value]) => {
                                        value == NaN ? temp = 0 : temp = value;
                                        genderAge90[key.substring(0, 1)][key.substring(2)] = value == NaN ? 0 : value;
                                        sum[key.substring(0, 1)][key.substring(2)] = temp;
                                    });
                                } else if (count > -1) {
                                    Object.entries(data.values[count].value).forEach(([key, value]) => {
                                        value == NaN ? temp = 0 : temp = value;
                                        obj[name][key.substring(0, 1)][key.substring(2)] = temp;
                                        genderAge90[key.substring(0, 1)][key.substring(2)] += temp;
                                    });
                                }
                                if (count == data.values.length - 7) {
                                    Object.entries(sum).forEach(([key, value]) => {
                                        Object.entries(value).forEach(([key2, value2]) => {
                                            if (key == 'U' && key2 == '13-17') return;
                                            genderAge7[key][substitute[key2]] = sum[key][key2];
                                        })
                                    })
                                } else if (count == data.values.length - 28) {
                                    Object.entries(sum).forEach(([key, value]) => {
                                        Object.entries(value).forEach(([key2, value2]) => {
                                            if (key == 'U' && key2 == '13-17') return;
                                            genderAge28[key][substitute[key2]] = sum[key][key2];
                                        })
                                    })
                                } else {
                                    Object.entries(sum).forEach(([key, value]) => {
                                        Object.entries(value).forEach(([key2, value2]) => {
                                            if (key == 'U' && key2 == '13-17') return;
                                            genderAge90[key][substitute[key2]] = sum[key][key2];
                                        })
                                    })
                                }
                                count--;

                            }
                        });
                    }

                    displayData(variable) {
                        document.write('<h2>' + this.name + '</h2>');
                        document.write('<h3>' + this.numberOfDays + ' days : ' + variable + '</h3>');
                    }

                    displayDictData(dict) {
                        document.write('<h2>' + this.name + '</h2>');
                        Object.entries(dict).forEach(([key, value]) => {
                            document.write('<h3>' + key + ' : ' + dict[key] + '</h3>');
                        });
                    }
                }

                var allData = [];
                for (let i = 0; i < 90; i++) {
                    const name = i + 'day';
                    allData.push({ 'name': name });
                }

                pageImpressionsFrequencyDistribution = new Metrics('page_impressions_frequency_distribution', 7)
                pageViewsBySite = new Metrics('page_views_by_site_logged_in_unique', 7);
                fansByLikeSource = new Metrics('page_fans_by_like_source', 7);
                fansCountry = new Metrics('page_fans_country', 1);
                pageTotalLikers = new Metrics('page_fans', 1);
                pagePostEngagement = new Metrics('page_post_engagements', 7);
                pageImpressions = new Metrics('page_impressions', 7);
                pageNewLikers = new Metrics('page_fan_adds_unique', 7);
                genderAndAgeToFrequency = new Metrics('page_fans_gender_age', 7);
                clicksOnPageContents = new Metrics('page_consumptions', 7);
                pageViews = new Metrics('page_views_total', 7);
                postLikes = new Metrics('page_actions_post_reactions_like_total', 28);
                postLoves = new Metrics('page_actions_post_reactions_love_total', 28);
                postWow = new Metrics('page_actions_post_reactions_wow_total', 28);
                postHaha = new Metrics('page_actions_post_reactions_haha_total', 28);
                postSorry = new Metrics('page_actions_post_reactions_sorry_total', 28);
                postAnger = new Metrics('page_actions_post_reactions_anger_total', 28);
                postReactions = new Metrics('page_positive_feedback_by_type', 7);
                dailyReach = new Metrics('page_impressions_viral_unique', 7);
                talkedAbout = new Metrics('page_content_activity_by_action_type', 7);
                pageEngagedUsers = new Metrics('page_engaged_users', 7);
                postImpression = new Metrics('page_posts_impressions_unique', 7);
                postEngagedUsers = new Metrics('post_engaged_users', 7);
                postsReach = new Metrics('page_posts_impressions_viral_unique', 7);

                for (let i = 0; i < res.data.length; i++) {

                    switch (res.data[i].name) {

                        case 'page_views_by_site_logged_in_unique':
                            if (res.data[i].period == 'day') {
                                pageViewsBySite.updateAdvancedData(res.data[i], 'Page View Sites');
                            }
                            break;

                        case 'page_post_engagements':
                            pagePostEngagement.updateSimpleData(res.data[i], 'Page Engagement');
                            break;

                        case 'page_impressions':
                            pageImpressions.updateSimpleData(res.data[i], 'Page Impressions');
                            break;

                        case 'page_fan_adds_unique':
                            pageNewLikers.updateSimpleData(res.data[i], 'New Fans');
                            break;

                        case 'page_impressions_viral_unique':
                            dailyReach.updateSimpleData(res.data[i], 'Daily Reach');
                            break;

                        case 'page_fans_gender_age':
                            genderAndAgeToFrequency.changeAgeAndGender(res.data[i]);
                            break;

                        case 'page_consumptions':
                            clicksOnPageContents.updateSimpleData(res.data[i], 'Page Consumptions');
                            break;

                        case 'page_fans_country':
                            fansCountry.changeCountryData(res.data[i]);
                            break;

                        case 'page_fans_by_like_source':
                            console.log(res.data[i])
                            fansByLikeSource.updateAdvancedData(res.data[i], 'Likes Sources');
                            break;

                        case 'page_views_total':
                            pageViews.updateSimpleData(res.data[i], 'Page View Total');
                            break;

                        case 'page_actions_post_reactions_like_total':
                            postLikes.updateSimpleData(res.data[i], 'Number of Likes');
                            break;

                        case 'page_actions_post_reactions_love_total':
                            postLoves.updateSimpleData(res.data[i], 'Number of Loves');
                            break;

                        case 'page_actions_post_reactions_wow_total':
                            postWow.updateSimpleData(res.data[i], 'Number of Wow');
                            break;

                        case 'page_actions_post_reactions_haha_total':
                            postHaha.updateSimpleData(res.data[i], 'Number of Haha');
                            break;

                        case 'page_actions_post_reactions_sorry_total':
                            postSorry.updateSimpleData(res.data[i], 'Number of Sorry');
                            break;

                        case 'page_actions_post_reactions_anger_total':
                            postAnger.updateSimpleData(res.data[i], 'Number of Anger');
                            break;

                        case 'page_positive_feedback_by_type':
                            if (res.data[i].period == 'day') {
                                postReactions.updateAdvancedData(res.data[i], 'Fans Impressions');
                            }
                            break;

                        case 'page_content_activity_by_action_type':
                            if (res.data[i].period == 'day') {
                                talkedAbout.updateAdvancedData(res.data[i], 'People Talking About Your Page');
                            };
                            break;

                        case 'page_fans':
                            totalLikes = res.data[i].values[res.data[i].values.length - 1].value;
                            break;

                        case 'page_engaged_users':
                            pageEngagedUsers.updateSimpleData(res.data[i], 'Page Engaged Users');
                            break;

                        case 'page_posts_impressions_unique':
                            postImpression.updateSimpleData(res.data[i], 'Post Impression');
                            break;

                        case 'page_posts_impressions_viral_unique':
                            postsReach.updateSimpleData(res.data[i], 'Posts Reach');
                            break;

                        case 'post_engaged_users':
                            postEngagedUsers.saveLivetimeValue(res.data[i], 'Post Engaged Users');
                            break;
                    }
                }
                callback(allData);
            }

            return startThis(function (maindata) {
                return maindata;
            })

        }

        wait(6 * 1000).then(() => {
            var metric;
            for (metric of metricsArray) {
                todaysValue[metric] = parseFloat(maindata[Object.keys(maindata)[0]][metric])
                difference[metric]['7'] = ((total7Days[metric] - previous7Days[metric]) / previous7Days[metric]) * 100 || 0
                difference[metric]['28'] = ((total28Days[metric] - previous28Days[metric]) / previous28Days[metric]) * 100 || 0
            }
            for (metric of reactionArray) {
                todaysValue[metric] = parseFloat(maindata[Object.keys(maindata)[0]][metric])
                difference[metric]['7'] = ((total7Days[metric] - previous7Days[metric]) / previous7Days[metric]) * 100 || 0
                difference[metric]['28'] = ((total28Days[metric] - previous28Days[metric]) / previous28Days[metric]) * 100 || 0
            }
            this.setState({ data: maindata, todaysValue: todaysValue, difference: difference, progressValues: temp, thecountry: country, progressValuesData: progressValuesData, progressValuesNames: progressValuesNames });
            console.log(this.state.data)
            console.log(total7Days)
            console.log(total90Days)
        })
    }

    logout = () => {
        window.FB.logout(function (response) {
            window.location = "/";
        });
    }

    render() {
        return (
            <>
                <Fragment>
                    <UncontrolledButtonDropdown className="mb-2 mr-2">
                        <DropdownToggle caret color="primary" className="mb-2 mr-2">
                            {this.state.currentDifference} Days
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem header>Choose the number of days</DropdownItem>
                            <DropdownItem onClick={() => { this.changeCurrentDifference('7'); this.updateDataDisplayed('7'); }}><b>7 Days</b></DropdownItem>
                            <DropdownItem onClick={() => { this.changeCurrentDifference('28'); this.updateDataDisplayed('28'); }}><b>28 Days</b></DropdownItem>
                            <DropdownItem onClick={() => { this.changeCurrentDifference('90'); this.updateDataDisplayed('90'); }}><b>90 Days</b></DropdownItem>
                        </DropdownMenu>
                    </UncontrolledButtonDropdown>
                    <Card style={{ width: '40%', margin: '0 auto', borderRadius: '10px' }}><CardBody>
                        <b>{this.state.currentDifference == '7' ? <h3>{day7Date} to {todaysDate}</h3> : this.state.currentDifference == '28' ? <h3> {day28Date} to {todaysDate}</h3> : <h3>{day90Date} to {todaysDate}</h3>}</b>
                    </CardBody></Card>
                    <br></br>
                    <Col md="4">
                        <br></br>
                        <h1 style={{ textAlign: "left", marginLeft: "15px" }}><b>Facebook Insights</b></h1>
                    </Col>
                    <div style={{ padding: "10px 0px 10px 30px", borderRadius: "20%" }}>
                        <Row>
                            <Col md="4">
                                <br></br>
                                <h3 style={{ textAlign: "left" }}>Facebook Community Overview</h3>
                            </Col>
                            <Col md="4">
                                <Card style={{ borderRadius: '10px' }}><CardBody>
                                    <h2><b>{totalLikes}</b></h2>
                                    {/* {this.state.currentDifference == '7' ? <h3><b>{total7Days['Number of Likes']}</b></h3> : this.state.currentDifference == '28' ? <h3><b>{total28Days['Number of Likes']}</b></h3> : <h3><b>{total90Days['Number of Likes']}</b></h3>} */}
                                    <h4>Total number of page likes</h4>
                                </CardBody></Card>
                            </Col>
                            <Col md="4">
                                <Card style={{ borderRadius: '10px' }}><CardBody>
                                    {this.state.currentDifference == '7' ? <h3><b>{talkedAboutSum['7']}</b></h3> : this.state.currentDifference == '28' ? <h3><b>{talkedAboutSum['28']}</b></h3> : <h3><b>{talkedAboutSum['90']}</b></h3>}
                                    <h4>People talking about your page</h4>
                                </CardBody></Card>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ padding: "10px 0px 10px 30px" }}>
                        <Row>
                            <Col md="4">
                                <h3 style={{ textAlign: "left" }}>Community Demographic</h3>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ padding: "10px 0px 10px 30px", borderRadius: "50%" }}>
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
                    <div style={{ padding: "10px 0px 10px 30px" }}>
                        <Row>
                            <Col md="4">
                                <h3 style={{ textAlign: "left" }}>Page Engagement</h3>
                            </Col>
                        </Row>
                    </div>
                    <Row >
                        {metricsArray.slice(0, 5).map((value, index) => {
                            return (
                                <Col lg="4" key={index}>
                                    <span className="rounded" style={{ borderRadius: '10px' }}>
                                        <div className="card" className={styles.card}>
                                            <div className="card-body" style={{ padding: "10px 0px 10px 30px", borderRadius: "25px" }}>
                                                <div className="card mb-2 widget-chart" style={{ borderRadius: '10px' }}>
                                                    <div className="widget-chart-content">
                                                        <div style={{ float: 'right' }}>
                                                            {/* <Hoverable>
                                                                {(hovered) => {if (hovered) return <Box bgcolor="warning.main" color="warning.contrastText" p={2}>{pageEngagementDescriptions[index]}</Box> }}
                                                        </Hoverable> */}
                                                            {/* <a data-for='enrich' data-tip={pageEngagementDescriptions[index]}><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon></a>
                                                            <ReactTooltip id='enrich' getContent={(dataTip) => dataTip} /> */}
                                                            <LightTooltip title={pageEngagementDescriptions[index]} aria-label={pageEngagementDescriptions[index]} placement="top" arrow>
                                                                <InfoIcon />
                                                            </LightTooltip>
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
                                                                <AreaChart data={maindata.slice(0, parseFloat(this.state.currentDifference))} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className={styles.card}>
                                                                    <defs>
                                                                        <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                                                                            <stop offset="10%" stopColor={lineChartColour} stopOpacity={0.7} />
                                                                            <stop offset="90%" stopColor={lineChartColour} stopOpacity={0} />
                                                                        </linearGradient>
                                                                    </defs>
                                                                    <TooltipChart />
                                                                    {/* <div style={{padding: "10px 10px 10px 0px"}}> */}
                                                                    <Area type='monotoneX' dataKey={value} stroke={lineChartColour} strokeWidth={2} fillOpacity={1}
                                                                        fill="url(#colorPv2)" style={{ padding: "10px 50px 10px 0px" }} />
                                                                    {/* </div> */}
                                                                </AreaChart>
                                                            </ResponsiveContainer>
                                                        </div></div></div></div></div></span>
                                </Col>
                            )
                        })}
                    </Row>
                    <div style={{ padding: "10px 0px 10px 30px" }}>
                        <Row>
                            <Col md="4">
                                <h3 style={{ textAlign: "left" }}>Post Engagement</h3>
                            </Col>
                        </Row>
                    </div>
                    <Row >
                        {metricsArray.slice(5, 8).map((value, index) => {
                            return (
                                <Col lg="4" key={index}>
                                    <span className="rounded">
                                        <div className="card" className={styles.card} style={{ borderRadius: '10px' }}>
                                            <div className="card-body" style={{ padding: "10px 0px 10px 30px", borderRadius: "25px" }}>
                                                <div className="card mb-2 widget-chart" style={{ borderRadius: '10px' }}>
                                                    <div className="widget-chart-content">
                                                        <div style={{ float: 'right' }}>
                                                            {/* <Hoverable>
                                                                {(hovered) => {if (hovered) return <Box bgcolor="warning.main" color="warning.contrastText" p={2}>{pageEngagementDescriptions[index]}</Box> }}
                                                        </Hoverable> */}
                                                            <a data-for='enrich' data-tip={postEngagementDescriptions[index]}><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon></a>
                                                            <ReactTooltip id='enrich' getContent={(dataTip) => dataTip} />
                                                        </div>
                                                        <div className="widget-subheading" >
                                                            <center><h2><b>{metricsArray[index + 5]}</b></h2></center>
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
                                                                <AreaChart data={maindata.slice(0, parseFloat(this.state.currentDifference))} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className={styles.card}>
                                                                    <defs>
                                                                        <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                                                                            <stop offset="10%" stopColor={lineChartColour} stopOpacity={0.7} />
                                                                            <stop offset="90%" stopColor={lineChartColour} stopOpacity={0} />
                                                                        </linearGradient>
                                                                    </defs>
                                                                    <TooltipChart />
                                                                    {/* <div style={{padding: "10px 10px 10px 0px"}}> */}
                                                                    <Area type='monotoneX' dataKey={value} stroke={lineChartColour} strokeWidth={2} fillOpacity={1}
                                                                        fill="url(#colorPv2)" style={{ padding: "10px 50px 10px 0px" }} />
                                                                    {/* </div> */}
                                                                </AreaChart>
                                                            </ResponsiveContainer>
                                                        </div></div></div></div></div></span>
                                </Col>
                            )
                        })}
                    </Row>
                    <div style={{ padding: "10px 0px 10px 30px" }}>
                        <Row>
                            <Col md="4">
                                <h3 style={{ textAlign: "left" }}>Growth</h3>
                            </Col>
                        </Row>
                    </div>
                    <Row >
                        {metricsArray.slice(8, 10).map((value, index) => {
                            return (
                                <Col lg="4" key={index}>
                                    <span className="rounded">
                                        <div className="card" className={styles.card} style={{ borderRadius: '10px' }}>
                                            <div className="card-body" style={{ padding: "10px 0px 10px 30px" }}>
                                                <div className="card mb-2 widget-chart" style={{ borderRadius: '10px' }}>
                                                    <div className="widget-chart-content">
                                                        <div style={{ float: 'right' }}>
                                                            <a data-for='enrich' data-tip={growthDescriptions[index]}><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon></a>
                                                            <ReactTooltip id='enrich' getContent={(dataTip) => dataTip} />
                                                        </div>
                                                        <div className="widget-subheading" >
                                                            <center><h2><b>{metricsArray[index + 8]}</b></h2></center>
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
                                                                <AreaChart data={maindata.slice(0, parseFloat(this.state.currentDifference))} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} className={styles.card}>
                                                                    <defs>
                                                                        <linearGradient id="colorPv2" x1="0" y1="0" x2="0" y2="1">
                                                                            <stop offset="10%" stopColor={lineChartColour} stopOpacity={0.7} />
                                                                            <stop offset="90%" stopColor={lineChartColour} stopOpacity={0} />
                                                                        </linearGradient>
                                                                    </defs>
                                                                    <TooltipChart />
                                                                    {/* <div style={{padding: "10px 10px 10px 0px"}}> */}
                                                                    <Area type='monotoneX' dataKey={value} stroke={lineChartColour} strokeWidth={2} fillOpacity={1}
                                                                        fill="url(#colorPv2)" style={{ padding: "10px 50px 10px 0px" }} />
                                                                    {/* </div> */}
                                                                </AreaChart>
                                                            </ResponsiveContainer>
                                                        </div></div></div></div></div></span>
                                </Col>
                            )
                        })}
                    </Row>
                    <div style={{ padding: "10px 0px 10px 30px" }}>
                        <Row>
                            <Col md="4">
                                <h3 style={{ textAlign: "left" }}>Sentimental Analysis</h3>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ margin: "0px" }}>
                        <Card style={{ width: "80%", height: "60%", marginLeft: "10%", borderRadius: '10px' }}>
                            <br></br>
                            <h2><b>Page Reactions</b></h2>
                            <Row>
                                <Col md="2"><CardBody>
                                    {/* <FontAwesomeIcon icon={faThumbsUp} size="3x" />  */}
                                    <img src={like} alt="Like image" height={50} width={50}></img>
                                    <div><h4>{this.state.currentDifference == '7' ? formatNumber(total7Days['Number of Likes']) : (this.state.currentDifference == '28' ? formatNumber(total28Days['Number of Likes']) : this.state.currentDifference == '90' ? formatNumber(total90Days['Number of Likes']) : '')}</h4></div>
                                </CardBody></Col>
                                <Col md="2"><CardBody>
                                    {/* <FontAwesomeIcon icon={faHeart} size="3x" />  */}
                                    <img src={love} alt="Love image" height={50} width={50}></img>
                                    <div><h4>{this.state.currentDifference == '7' ? formatNumber(total7Days['Number of Loves']) : (this.state.currentDifference == '28' ? formatNumber(total28Days['Number of Loves']) : this.state.currentDifference == '90' ? formatNumber(total90Days['Number of Loves']) : '')}</h4></div>
                                </CardBody></Col>
                                <Col md="2"><CardBody>
                                    {/* <FontAwesomeIcon icon={faLaugh} size="3x" />  */}
                                    <img src={haha} alt="Haha image" height={50} width={50}></img>
                                    <div><h4>{this.state.currentDifference == '7' ? formatNumber(total7Days['Number of Haha']) : (this.state.currentDifference == '28' ? formatNumber(total28Days['Number of Haha']) : this.state.currentDifference == '90' ? formatNumber(total90Days['Number of Haha']) : '')}</h4></div>
                                </CardBody></Col>
                                <Col lg="2"><CardBody>
                                    {/* <FontAwesomeIcon icon={faSurprise} size="3x" />  */}
                                    <img src={wow} alt="Wow image" height={50} width={50}></img>
                                    <div><h4>{this.state.currentDifference == '7' ? formatNumber(total7Days['Number of Wow']) : (this.state.currentDifference == '28' ? formatNumber(total28Days['Number of Wow']) : this.state.currentDifference == '90' ? formatNumber(total90Days['Number of Wow']) : '')}</h4></div>
                                </CardBody></Col>
                                <Col lg="2"><CardBody>
                                    {/* <FontAwesomeIcon icon={faSadTear} size="3x" />  */}
                                    <img src={sad} alt="Sad image" height={50} width={50}></img>
                                    <div><h4>{this.state.currentDifference == '7' ? formatNumber(total7Days['Number of Sorry']) : (this.state.currentDifference == '28' ? formatNumber(total28Days['Number of Sorry']) : this.state.currentDifference == '90' ? formatNumber(total90Days['Number of Sorry']) : '')}</h4></div>
                                </CardBody></Col>
                                <Col lg="2"><CardBody>
                                    {/* <FontAwesomeIcon icon={faAngry} size="3x" />  */}
                                    <img src={angry} alt="Angry image" height={50} width={50}></img>
                                    <div><h4>{this.state.currentDifference == '7' ? formatNumber(total7Days['Number of Anger']) : (this.state.currentDifference == '28' ? formatNumber(total28Days['Number of Anger']) : this.state.currentDifference == '90' ? formatNumber(total90Days['Number of Anger']) : '')}</h4></div>
                                </CardBody></Col>

                            </Row>
                            <Row>
                                <Col md="3">
                                    <h3 style={{ marginLeft: '20px' }}>Comments</h3>
                                </Col>
                                <Col md="2">
                                    <h3 style={{ backgroundColor: '#ffcccb' }}>{this.state.totalWhatDays['Fans Impressions']['comment']}</h3>
                                </Col>
                                <Col md="3">
                                    <h3 style={{ marginLeft: '20px' }}>Shares</h3>
                                </Col>
                                <Col md="2">
                                    <h3 style={{ backgroundColor: '#ffcccb' }}>{this.state.totalWhatDays['Fans Impressions']['link']}</h3>
                                </Col>
                            </Row>
                        </Card></div>
                    <div style={{ padding: "10px 0px 10px 30px" }}>
                        <Row>
                            <Col md="4">
                                <h3 style={{ textAlign: "left" }}>Sources</h3>
                            </Col>
                        </Row>
                    </div>
                    <div style={{ padding: "10px 0px 10px 30px" }}>
                        <Row>
                            {Object.keys(this.state.progressValuesData).map((key, index) => {
                                return (
                                    <Col lg="6">
                                        <div>
                                            <Card style={{ borderRadius: '10px' }}>
                                                <CardBody>
                                                    <div style={{ float: 'right' }}>
                                                        <a data-for='enrich' data-tip={sourcesDescriptions[index]}><FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon></a>
                                                        <ReactTooltip id='enrich' getContent={(dataTip) => dataTip} />
                                                    </div>
                                                    <h3><b>{key}</b></h3>
                                                    <br></br>
                                                    {/* {Object.keys(this.state.progressValuesData[key]).map((key2) => {
                                                        return (
                                                            <div>
                                                                <h5>{key2 in description ? description[key2] : key2}</h5>
                                                                <Progress className="mb-3" animated color={barColor[key]} value={this.state.progressValues[key][key2]}>{this.state.totalWhatDays[key][key2]}</Progress>
                                                            </div>
                                                        )
                                                    })} */}
                                                    {this.state.progressValuesData[key].map((key2, index) => {
                                                        return (
                                                            <>
                                                                <h5>{this.state.progressValuesNames[key][index] in description ? description[this.state.progressValuesNames[key][index]] : this.state.progressValuesNames[key][index]}</h5>
                                                                <Progress className="mb-3" animated color={barColor[key]} value={this.state.progressValuesData[key][index]}>{this.state.totalWhatDays[key][this.state.progressValuesNames[key][index]]}</Progress>
                                                            </>
                                                        )
                                                    })
                                                    }
                                                </CardBody>
                                            </Card>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                </Fragment >
            </>
        )
    }
}
