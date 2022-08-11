import Tdg from "../../tdg.class.js";
import Tabs from "../../components/tabs/tabs.class.js";
import Button from "../../components/button/button.class.js";
import Input from "../../components/input/input.class.js";
import kendoSelector from "../../components/selector/selector.class.js";
import Table from "../../components/table/table.class.js";
import multikendoSelector from "../../components/multiselector/multiselector.class.js";
import reportInfoTable from "../../components/reportInfoTable/reportInfoTable.class.js";
import { kendo_SelectedID, kendo__refresh, kendo__multiSelectedID, kendo__destroy } from "../../helpers/kendo.helper.js";

export default class Technical extends Tdg {
    constructor() {
        super();
        self.Technical = this;
        this.state = {
            sectionName: $("component[techreport]"),
            element: []
        }

        document.title = "Technical Report";

        this.initialize();

        /* this.sendRequest({
            route: "TechRe"
        }) */
    }


    data = [
        {
            value: "'20404041','20404042','21211111'",
        },
        {
            value: "21/04/2021",
        },
        {
            value: "22/04/2021",
        },
        {
            value: "1 დღე"
        }
    ]


    data2 = [
        {
            value: "9",
        },
        {
            value: "167.78",
        },
        {
            value: "25.17",
        },
        {
            value: "22.00",
        }
    ]

    data3 = [
        {
            value: "30",
        },
        {
            value: "წამი",
        },
        {
            value: "1",
        },
        {
            value: "1",
        }
    ]

    data4 = [
        {
            value: "20",
        },
        {
            value: "01:32",
        },
        {
            value: "03:35",
        },
        {
            value: "03:41",
        },
        {
            value: "00:21",
        }
    ]

    data5 = [
        {
            value: "20",
        },
        {
            value: "05:52",
        },
        {
            value: "01:05:42",
        }
    ]


    data6 = [
        {
            value: "30",
        },
        {
            value: "02:41",
        },
        {
            value: "01:05:42",
        },
        {
            value: "00:20:51",
        }
    ]

    data7 = [
        {
            value: "10",
        },
        {
            value: "1",
        }
    ]


    initialize = () => {
        this.state.tableDiv = this.CreateElement({
            element: "div",
            style: {
                marginTop: "30px",
                minWidth: '200px'
            }
        })

        this.append(this.state.sectionName, this.buildTaskTabs());
        this.append(this.state.sectionName, this.Filterblock());


        this.append(this.state.element.filterBlock, this.queueSelector());
        this.append(this.state.element.filterBlock, this.extSelector());
        this.append(this.state.element.filterBlock, this.dateTimePicker_start());
       
        this.append(this.state.element.filterBlock, this.buildTire());
        this.append(this.state.element.filterBlock, this.dateTimePicker_end());
        this.append(this.state.element.filterBlock, this.slTypeSelector());
        this.append(this.state.element.filterBlock, this.percentInput());
        this.append(this.state.element.filterBlock, this.secondsInput());
        this.append(this.state.element.filterBlock, this.sulMomartva());
        this.append(this.state.element.filterBlock, this.slPercentSecondInput());
        this.append(this.state.element.filterBlock, this.filterButton());
        this.append(this.state.element.filterBlock, this.state.tableDiv);

        this.getReportInfo();
        this.removeLoading();
    }

    getActiveTab = (tabs) => {
        let activeTab = window.location.href.split("#")[1];
        if (activeTab == '' || activeTab == undefined) {
            tabs.children[0].click();
        } else {
            tabs.childNodes.forEach(tab => {
                if (tab.getAttribute("url") == activeTab) {
                    tab.click();
                }
            })
        }
    }

    getTabContent = (key) => {
        switch (key) {
            case "main":
                this.append(this.state.tableDiv, this.createTable());
                break;


            case "answered":
                this.getReportInfo();

                this.append(this.state.tableDiv, this.CreateElement({
                    element: "div",
                    className: ["answeredDiv"],
                }, this.reportInfo(), this.answeredInfo()));

                this.append(this.state.tableDiv, this.answered());
                this.append(this.state.tableDiv, this.createAnsweredTable());

                let div = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "1800px",
                        minWidth: '200px',
                        marginTop: "40px",
                    }
                })

                this.append(this.state.tableDiv, div);
                var options = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "436px",
                        toolbar: {
                            show: false,
                        },
                    },
                    plotOptions: {
                        bar: {
                            distributed: true,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    fill: {
                        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26A69A', '#D10CE8']
                    },
                    title: {
                        text: "ნაპასუხები მომართვები წამების მიხედვით",
                        align: "left",
                        offsetX: '-2',
                        style: {
                            fontSize: '15px',
                            fontFamily: "BPG",
                            fontWeight: 'normal',
                            color: '#269FFF'
                        },
                    },
                    theme: {
                        mode: 'light',
                        palette: 'palette1',
                    },
                    series: [{
                        name: '1234',
                        data: [103, 105, 107, 160, 150, 180, 187, 192]
                    }],
                    responsive: [
                        {
                            breakpoint: 700,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    },
                                },
                            }
                        }
                    ],
                    xaxis: {
                        show: true,
                        categories: [103, 105, 107, 160, 150, 180, 187, 192],
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26A69A', '#D10CE8'],
                                fontFamily: "BPG2"
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    legend: {
                        show: false
                    }
                }

                var options2 = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "201px",
                        toolbar: {
                            show: false,
                        },
                    },
                    fill: {
                        colors: ['#3A559F']
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    series: [{
                        name: '1234',
                        data: ['15 წამი', '20 წამი', '25 წამი', '30 წამი', '35 წამი', '40 წამი', '45 წამი', '50 წამი', '55 წამი', '60 წამი']
                    }],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                            }
                        }
                    ],
                    xaxis: {
                        show: true,
                        categories: ['15 წამი', '20 წამი', '25 წამი', '30 წამი', '35 წამი', '40 წამი', '45 წამი', '50 წამი', '55 წამი', '60 წამი'],
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    legend: {
                        show: false
                    }
                }


                var options3 = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "201px",
                        toolbar: {
                            show: false,
                        },
                    },
                    fill: {
                        colors: ['#3A559F']
                    },
                    series: [{
                        name: '1234',
                        data: ['10', '20', '30']
                    }],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                            }
                        }
                    ],
                    dataLabels: {
                        enabled: false,
                    },

                    xaxis: {
                        show: true,
                        categories: ['20404041', '20404041', '20404041'],
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                            fill: {
                                type: 'solid',
                                color: '#B1B9C4',
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    legend: {
                        show: false
                    }
                }

                var options4 = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "201px",
                        toolbar: {
                            show: false,
                        },
                    },
                    plotOptions: {
                        bar: {
                            distributed: true,
                        }
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    fill: {
                        colors: ['#FD0A50', '#3ABE82']
                    },
                    series: [{
                        name: '1234',
                        data: ['10', '20']
                    }],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                            }
                        }
                    ],
                    xaxis: {
                        show: true,
                        categories: ['ოპერატორმა გათიშა', 'აბონენტმა გათიშა'],
                        axisBorder: {
                            show: true,
                            color: '#78909C',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    legend: {
                        show: false
                    }
                }

                setTimeout(() => {
                    var chart = new ApexCharts(div, options);

                    chart.render();
                }, 100);

                let div2 = this.CreateElement({
                    element: "div",
                    id: "chart",
                    className: ["apex-charts"]
                })

                setTimeout(() => {
                    var chart = new ApexCharts(div2, options2);
                    chart.render();
                }, 100);

                let div3 = this.CreateElement({
                    element: "div",
                    id: "chart",
                    className: ["apex-charts"]
                })

                setTimeout(() => {
                    var chart = new ApexCharts(div3, options3);
                    chart.render();
                }, 100);


                let div4 = this.CreateElement({
                    element: "div",
                    id: "chart",
                    className: ["apex-charts"]
                })

                setTimeout(() => {
                    var chart = new ApexCharts(div4, options4);

                    chart.render();
                }, 100);


                this.state.answered2div = this.CreateElement({
                    element: "div",
                    className: ["answeredDiv1"],
                }, this.CreateElement({
                    element: "div",
                    className: ["answeredDiv2"],
                }, this.CreateElement({
                    element: "div",
                }, this.answeredTwo(), this.createAnsweredTableTwo()),
                    this.CreateElement({
                        element: "div",
                    }, this.answeredThree(), this.createAnsweredTableThree()),
                    this.CreateElement({
                        element: "div",
                    }, this.kavshirisGawyveta(), this.createAnsweredTableFour())),
                    this.CreateElement({
                        element: "div",
                        className: ["answeredDiv3"],
                    }, div2, div3, div4))

                this.append(this.state.tableDiv, this.state.answered2div);

                break;


            case "unanswered":
                this.getReportInfo();
                this.append(this.state.tableDiv, this.CreateElement({
                    element: "div",
                    className: ["answeredDiv"],
                }, this.reportInfo(), this.unansweredInfo()));

                let unansweredDiv1 = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "100vw",
                        marginTop: "40px",
                        width: '1110px'
                    }
                })

                let unansweredDiv2 = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "100vw",
                        marginTop: "40px",
                        width: '1110px'
                    }
                })


                this.append(this.state.tableDiv, unansweredDiv1);
                var options = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "281px",
                        toolbar: {
                            show: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    title: {
                        text: "კავშირის გაწყვეტის მიზეზი",
                        align: "left",
                        offsetX: '-2',
                        style: {
                            fontSize: '15px',
                            fontFamily: "BPG",
                            color: '#269FFF',
                            fontWeight: 'normal'
                        },
                    },
                    plotOptions: {
                        bar: {
                            distributed: true,
                        }
                    },
                    fill: {
                        colors: ['#FBD300', '#FD0A50', '#3ABE82']
                    },
                    series: [{
                        name: '123',
                        data: [30, 40, 45]
                    }],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                                legend: {
                                    position: "bottom"
                                }
                            }
                        }
                    ],
                    xaxis: {
                        show: true,
                        categories: ['აბონენტმა გათიშა', 'დრო ამოიწურა', 'ტექ. ხარვეზი'],
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    legend: {
                        show: false
                    }
                }


                var options2 = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "281px",
                        toolbar: {
                            show: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    title: {
                        text: "უპასუხო მომართვები რიგის მიხედვით",
                        align: "left",
                        offsetX: '-2',
                        style: {
                            fontSize: '15px',
                            fontWeight: 'normal',
                            fontFamily: "BPG",
                            color: '#269FFF'
                        },
                    },
                    fill: {
                        colors: ['#3A559F']
                    },
                    series: [{
                        name: '123',
                        data: [30, 40, 45]
                    }],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                                legend: {
                                    position: "bottom"
                                }
                            }
                        }
                    ],

                    xaxis: {
                        show: true,
                        categories: [20404041, 20404041, 20404041],
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    }
                }

                setTimeout(() => {
                    var chart = new ApexCharts(unansweredDiv1, options);

                    chart.render();
                }, 100);

                setTimeout(() => {
                    var chart = new ApexCharts(unansweredDiv2, options2);

                    chart.render();
                }, 100);


                this.state.unanswereddiv = this.CreateElement({
                    element: "div",
                    className: ["unansweredDiv1"],
                }, this.CreateElement({
                    element: "div",
                    className: ["unansweredDiv2"],
                }, this.CreateElement({
                    element: "div",
                }, this.kavshirisGawyveta(), this.createUnansweredTable()),
                    this.CreateElement({
                        element: "div",
                    }, this.unanswered(), this.createUnansweredTableTwo())),
                    this.CreateElement({
                        element: "div",
                        className: ["unansweredDiv3"],
                    }, unansweredDiv1, unansweredDiv2))


                this.append(this.state.tableDiv, this.state.unanswereddiv);


                break;

            case "transfered":
                this.append(this.state.tableDiv, this.CreateElement({
                    element: "div",
                    className: ["answeredDiv"],
                }, this.reportInfo(), this.transferedInfo()));

                this.append(this.state.tableDiv, this.transfered());
                this.append(this.state.tableDiv, this.createTransferedTable());


                let transferedOne = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "1800px",
                        marginTop: "40px",
                    }
                })

                this.append(this.state.tableDiv, transferedOne);
                var options = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "383px",
                        toolbar: {
                            show: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    plotOptions: {
                        bar: {
                            distributed: true,
                        }
                    },
                    fill: {
                        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26A69A', '#D10CE8']
                    },
                    title: {
                        text: "გადამისამართებული მომართვების რ-ბა ოპერატორების  მიხედვით",
                        align: "left",
                        offsetX: '-2',
                        style: {
                            fontSize: '15px',
                            fontWeight: 'normal',
                            fontFamily: "BPG",
                            color: '#269FFF'
                        },
                    },
                    theme: {
                        mode: 'light',
                        palette: 'palette1',
                    },
                    series: [{
                        name: '1234',
                        data: [49, 60, 70, 80, 109, 102, 40, 80]
                    }],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                            }
                        }
                    ],
                    xaxis: {
                        show: true,
                        categories: ['user name_1', 'user name_2', 'user name_3', 'user name_3', 'user name_3', 'user name_3', 'user name_3', 'user name_3',],
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26A69A', '#D10CE8'],
                                fontFamily: "BPG2"
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    legend: {
                        show: false
                    }
                }
                setTimeout(() => {
                    var chart = new ApexCharts(transferedOne, options);

                    chart.render();
                }, 100);

                this.append(this.state.tableDiv, this.transferedTwo());
                this.append(this.state.tableDiv, this.createTransferedTableTwo());


                let transferedTwo = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "1800px",
                        marginTop: "40px",
                    }
                })

                this.append(this.state.tableDiv, transferedTwo);
                var options2 = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "383px",
                        toolbar: {
                            show: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    plotOptions: {
                        bar: {
                            distributed: true,
                        }
                    },
                    fill: {
                        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26A69A', '#D10CE8']
                    },
                    title: {
                        text: "გადამისამართებული მომართვების რ-ბა ოპერატორების  მიხედვით",
                        align: "left",
                        offsetX: '-2',
                        style: {
                            fontSize: '15px',
                            fontFamily: "BPG",
                            fontWeight: 'normal',
                            color: '#269FFF'
                        },
                    },
                    theme: {
                        mode: 'light',
                        palette: 'palette1',
                    },
                    series: [{
                        name: '1234',
                        data: [49, 60, 70, 80, 109, 102, 40, 80]
                    }],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                            }
                        }
                    ],
                    xaxis: {
                        show: true,
                        categories: ['user name_1', 'user name_2', 'user name_3', 'user name_3', 'user name_3', 'user name_3', 'user name_3', 'user name_3',],
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26A69A', '#D10CE8'],
                                fontFamily: "BPG2"
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    legend: {
                        show: false
                    }
                }
                setTimeout(() => {
                    var chart = new ApexCharts(transferedTwo, options2);

                    chart.render();
                }, 100);

                break;


            case "done":
                this.append(this.state.tableDiv, this.CreateElement({
                    element: "div",
                    className: ["answeredDiv"],
                }, this.reportInfo(), this.doneInfo()));

                this.append(this.state.tableDiv, this.done());
                this.append(this.state.tableDiv, this.createDoneTable());

                let done = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "1800px",
                        marginTop: "40px",
                    }
                })

                this.append(this.state.tableDiv, done);
                var options = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "383px",
                        toolbar: {
                            show: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    plotOptions: {
                        bar: {
                            distributed: true,
                        }
                    },
                    fill: {
                        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26A69A', '#D10CE8']
                    },
                    title: {
                        text: "დამუშავებული ზარები ოპერატორების მიხედვით",
                        align: "left",
                        offsetX: '-2',
                        style: {
                            fontSize: '15px',
                            fontFamily: "BPG",
                            color: '#269FFF'
                        },
                    },
                    theme: {
                        mode: 'light',
                        palette: 'palette1',
                    },
                    series: [{
                        name: '1234',
                        data: [50, 49, 60, 70, 91, 130, 80, 88]
                    }],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                            }
                        }
                    ],
                    xaxis: {
                        show: true,
                        categories: ['user name_1', 'user name_2', 'user name_3', 'user name_3', 'user name_3', 'user name_3', 'user name_3', 'user name_3'],
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26A69A', '#D10CE8'],
                                fontFamily: "BPG2"
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    legend: {
                        show: false
                    }
                }
                setTimeout(() => {
                    var chart = new ApexCharts(done, options);

                    chart.render();
                }, 100);

                break;


            case "undone":
                this.append(this.state.tableDiv, this.CreateElement({
                    element: "div",
                    className: ["answeredDiv"],
                }, this.reportInfo(), this.undoneInfo()));

                this.append(this.state.tableDiv, this.undone());
                this.append(this.state.tableDiv, this.createUndoneTable());

                let undone = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "1800px",
                        margin: "35px auto",
                    }
                })

                this.append(this.state.tableDiv, undone);
                var options = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "383px",
                        toolbar: {
                            show: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    plotOptions: {
                        bar: {
                            distributed: true,
                        }
                    },
                    fill: {
                        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26A69A', '#D10CE8']
                    },
                    title: {
                        text: "დაუმუშავებელი ზარები ოპერატორების მიხედვით",
                        align: "left",
                        offsetX: '-2',
                        style: {
                            fontSize: '15px',
                            fontFamily: "BPG",
                            color: '#269FFF'
                        },
                    },
                    theme: {
                        mode: 'light',
                        palette: 'palette1',
                    },
                    series: [{
                        name: '1234',
                        data: [50, 49, 60, 70, 91, 130, 80, 88]
                    }],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                            }
                        }
                    ],
                    xaxis: {
                        show: true,
                        categories: ['user name_1', 'user name_2', 'user name_3', 'user name_3', 'user name_3', 'user name_3', 'user name_3', 'user name_3'],
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#546E7A', '#26A69A', '#D10CE8'],
                                fontFamily: "BPG2"
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    legend: {
                        show: false
                    }
                }
                setTimeout(() => {
                    var chart = new ApexCharts(undone, options);

                    chart.render();
                }, 100);


                break;


            case "momartvebi":
                this.getReportInfo();
                this.append(this.state.tableDiv, this.CreateElement({
                    element: "div",
                    className: ["answeredDiv"],
                }, this.reportInfo(), this.momartvebiInfo()));

                this.append(this.state.tableDiv, this.momartvebi());
                this.append(this.state.tableDiv, this.momartvebiTable());

                let momartvebiChart = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "855px",
                        marginTop: "40px",
                    }
                })

                let momartvebiChartTwo = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "855px",
                        marginTop: "40px",
                    }
                })

                let momartvebiChart3 = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "855px",
                        marginTop: "40px",
                    }
                })

                let momartvebiChart4 = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "855px",
                        marginTop: "40px",
                    }
                })

                let momartvebiChart5 = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "855px",
                        marginTop: "40px",
                    }
                })

                let momartvebiChart6 = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "855px",
                        marginTop: "40px",
                    }
                })


                var options = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "201px",
                        toolbar: {
                            show: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    fill: {
                        colors: ['#3ABE82']
                    },
                    title: {
                        text: "ნაპასუხები მომართვები დღეების მიხედვით",
                        align: "left",
                        offsetX: '-2',
                        style: {
                            fontSize: '15px',
                            fontFamily: "BPG",
                            fontWeight: 'normal',
                            color: '#269FFF'
                        },
                    },
                    theme: {
                        mode: 'light',
                        palette: 'palette1',
                    },
                    series: [{
                        name: '1234',
                        data: [103,]
                    }],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                            }
                        }
                    ],
                    xaxis: {
                        show: true,
                        categories: ['აბონენტმა გათიშა'],
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    legend: {
                        show: false
                    }
                }

                var options2 = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "201px",
                        toolbar: {
                            show: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    fill: {
                        colors: ['#FD0A50']
                    },
                    title: {
                        text: "უპასუხო მომართვები დღეების მიხედვით",
                        align: "left",
                        offsetX: '-2',
                        style: {
                            fontSize: '15px',
                            fontWeight: 'normal',
                            fontFamily: "BPG",
                            color: '#269FFF'
                        },
                    },
                    theme: {
                        mode: 'light',
                        palette: 'palette1',
                    },
                    series: [{
                        name: '1234',
                        data: [103,]
                    }],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                            }
                        }
                    ],
                    xaxis: {
                        show: true,
                        categories: ['აბონენტმა გათიშა'],
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    legend: {
                        show: false
                    }
                }

                var options3 = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "201px",
                        toolbar: {
                            show: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    fill: {
                        colors: ['#3ABE82']
                    },
                    title: {
                        text: "ნაპასუხები მომართვები დღეების მიხედვით",
                        align: "left",
                        offsetX: '-2',
                        style: {
                            fontSize: '15px',
                            fontFamily: "BPG",
                            fontWeight: 'normal',
                            color: '#269FFF'
                        },
                    },
                    theme: {
                        mode: 'light',
                        palette: 'palette1',
                    },
                    series: [{
                        name: '1234',
                        data: [20, 40, 50, 60, 70]
                    }],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                            }
                        }
                    ],
                    xaxis: {
                        show: true,
                        categories: ['00:00', '00:10', '01:00', '02:00', '03:00'],
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    legend: {
                        show: false
                    }
                }


                var options4 = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "201px",
                        toolbar: {
                            show: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    fill: {
                        colors: ['#FD0A50']
                    },
                    title: {
                        text: "უპასუხო მომართვები დღეების მიხედვით",
                        align: "left",
                        offsetX: '-2',
                        style: {
                            fontSize: '15px',
                            fontFamily: "BPG",
                            fontWeight: "normal",
                            color: '#269FFF'
                        },
                    },
                    theme: {
                        mode: 'light',
                        palette: 'palette1',
                    },
                    series: [{
                        name: '1234',
                        data: [20, 40, 50, 60, 70]
                    }],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                            }
                        }
                    ],
                    xaxis: {
                        show: true,
                        categories: ['00:00', '00:10', '01:00', '02:00', '03:00'],
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    legend: {
                        show: false
                    }
                }

                var options5 = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "201px",
                        toolbar: {
                            show: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    fill: {
                        colors: ['#3ABE82']
                    },
                    title: {
                        text: "ნაპასუხები მომართვები დღეების მიხედვით",
                        align: "left",
                        offsetX: '-2',
                        style: {
                            fontSize: '15px',
                            fontFamily: "BPG",
                            fontWeight: 'normal',
                            color: '#269FFF'
                        },
                    },
                    theme: {
                        mode: 'light',
                        palette: 'palette1',
                    },
                    series: [{
                        name: '1234',
                        data: [103,]
                    }],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                            }
                        }
                    ],
                    xaxis: {
                        show: true,
                        categories: ['აბონენტმა გათიშა'],
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    legend: {
                        show: false
                    }
                }

                var options6 = {
                    chart: {
                        type: 'bar',
                        width: "100%",
                        height: "201px",
                        toolbar: {
                            show: false,
                        },
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    fill: {
                        colors: ['#FD0A50']
                    },
                    title: {
                        text: "უპასუხო მომართვები დღეების მიხედვით",
                        align: "left",
                        offsetX: '-2',
                        style: {
                            fontSize: '15px',
                            fontFamily: "BPG",
                            fontWeight: 'normal',
                            color: '#269FFF'
                        },
                    },
                    theme: {
                        mode: 'light',
                        palette: 'palette1',
                    },
                    series: [{
                        name: '1234',
                        data: [103,]
                    }],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                            }
                        }
                    ],
                    xaxis: {
                        show: true,
                        categories: ['აბონენტმა გათიშა'],
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        },
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    },
                    yaxis: {
                        show: true,
                        labels: {
                            show: true,
                            align: 'right',
                            minWidth: 0,
                            maxWidth: 160,
                            style: {
                                colors: [],
                                fontSize: '12px',
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                cssClass: 'apexcharts-yaxis-label',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            rotate: 0,
                        },
                        axisBorder: {
                            show: true,
                            color: '#000000',
                            offsetX: 0,
                            offsetY: 0
                        }
                    },
                    legend: {
                        show: false
                    }
                }

                setTimeout(() => {
                    var chart = new ApexCharts(momartvebiChart, options);

                    chart.render();
                }, 100);

                setTimeout(() => {
                    var chart = new ApexCharts(momartvebiChartTwo, options2);

                    chart.render();
                }, 100);

                setTimeout(() => {
                    var chart = new ApexCharts(momartvebiChart3, options3);

                    chart.render();
                }, 100);

                setTimeout(() => {
                    var chart = new ApexCharts(momartvebiChart4, options4);

                    chart.render();
                }, 100);

                setTimeout(() => {
                    var chart = new ApexCharts(momartvebiChart5, options5);

                    chart.render();
                }, 100);

                setTimeout(() => {
                    var chart = new ApexCharts(momartvebiChart6, options6);

                    chart.render();
                }, 100);



                this.append(this.state.tableDiv, this.CreateElement({
                    element: "div",
                    className: ["momartvebi123"],
                }, momartvebiChart, momartvebiChartTwo))

                this.append(this.state.tableDiv, this.momartvebiTwo());
                this.append(this.state.tableDiv, this.momartvebiTableTwo());

                this.append(this.state.tableDiv, this.CreateElement({
                    element: "div",
                    className: ["momartvebi123"],
                }, momartvebiChart3, momartvebiChart4))


                this.append(this.state.tableDiv, this.momartvebiThree());
                this.append(this.state.tableDiv, this.momartvebiTableThree());

                this.append(this.state.tableDiv, this.CreateElement({
                    element: "div",
                    className: ["momartvebi123"],
                }, momartvebiChart5, momartvebiChart6))



                break;


            case "sl":

                let slDiv = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "1800px",
                        right: "11px",
                        height: "302px",
                        background: "white",
                        width: "97vw",
                    }
                })

                let slDiv2 = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "1800px",
                        right: "11px",
                        height: "302px",
                        background: "white",
                        width: "97vw",
                    }
                })

                let slDiv3 = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "1800px",
                        right: "11px",
                        height: "302px",
                        background: "white",
                        width: "97vw",
                    }
                })

                this.append(this.state.tableDiv, slDiv);
                var options = {
                    series: [
                        {
                            name: "1",
                            type: "column",
                            color: "#7cb5ec",
                            data: [2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
                        },
                        {
                            name: "2",
                            type: "column",
                            color: "#fc6aa0",
                            data: [3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
                        },
                        {
                            name: "3",
                            type: "line",
                            color: "#FBD300",
                            data: [20, 20, 20, 20, 20, 30, 30]
                        },
                        {
                            name: "4",
                            type: "line",
                            color: "#00E396",
                            data: [20, 29, 37, 36, 44, 45, 50]
                        }
                    ],
                    chart: {
                        height: 350,
                        type: "line",
                        width: '100%',
                        stacked: false,
                        events: {
                            dataPointSelection: () => {
                                this.append(this.state.tableDiv, slDiv2);
                                this.append(this.state.tableDiv, slDiv3);

                                setTimeout(() => {
                                    var chart = new ApexCharts(slDiv2, options2);
                                    var chart2 = new ApexCharts(slDiv3, options3);
                                    chart.render();
                                    chart2.render();
                                }, 100);
                            }
                        },
                    },
                    dataLabels: {
                        enabled: true,
                        enabledOnSeries: [2, 3]
                    },
                    stroke: {
                        width: [1, 1, 4, 4]
                    },
                    xaxis: {
                        categories: ['2020-12-11', '2020-12-12', '2020-12-13', '2020-12-14', '2020-12-14', '2020-12-14', '2020-12-14'],
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    },
                    yaxis: [
                        {
                            axisTicks: {
                                show: false
                            },
                            labels: {
                                style: {
                                    color: "#008FFB"
                                }
                            },
                        },
                        {
                            seriesName: "123",
                            opposite: true,
                            axisTicks: {
                                show: false
                            },
                        },
                        {
                            seriesName: "1",
                            opposite: true,
                            axisTicks: {
                                show: false
                            },
                        }
                    ],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                                legend: {
                                    position: "bottom"
                                }
                            }
                        }
                    ],
                    legend: {
                        show: false
                    }
                }

                setTimeout(() => {
                    var chart = new ApexCharts(slDiv, options);

                    chart.render();
                }, 100);

                var options2 = {
                    series: [
                        {
                            name: "1",
                            type: "column",
                            color: "#7cb5ec",
                            data: [20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37]
                        },
                        {
                            name: "2",
                            type: "column",
                            color: "#fc6aa0",
                            data: [20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 35, 50, 20, 29, 37]
                        },
                        {
                            name: "3",
                            type: "line",
                            color: "#FBD300",
                            data: [22, 1, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 14, 20, 10, 16, 8, 60, 50, 30, 10, 22]
                        },
                        {
                            name: "4",
                            type: "line",
                            color: "#00E396",
                            data: [20, 29, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 70, 60, 56, 80, 60, 50, 30, 10, 29]
                        }
                    ],
                    chart: {
                        height: 350,
                        type: "line",
                        width: '100%',
                        stacked: false,
                    },
                    dataLabels: {
                        enabled: true,
                        enabledOnSeries: [2, 3]
                    },
                    stroke: {
                        width: [1, 1, 4, 4]
                    },
                    xaxis: {
                        categories: [
                            "00:00",
                            "01:00",
                            "02:00",
                            "03:00",
                            "04:00",
                            "05:00",
                            "06:00",
                            "07:00",
                            "08:00",
                            "09:00",
                            "10:00",
                            "11:00",
                            "12:00",
                            "13:00",
                            "14:00",
                            "15:00",
                            "16:00",
                            "17:00",
                            "18:00",
                            "19:00",
                            "20:00",
                            "21:00",
                            "22:00",
                            "23:00"
                        ],

                        labels: {
                            show: true,
                            rotate: 45,
                            style: {
                                fontFamily: "BPG2",
                                fontSize: "10px",
                                colors: '#3A559F',
                            },
                            offsetX: 0,
                            offsetY: 0,
                            format: undefined,
                            formatter: undefined,
                            datetimeUTC: true,
                            datetimeFormatter: {
                                year: 'yyyy',
                                month: "MMM 'yy",
                                day: 'dd MMM',
                                hour: 'HH:mm',
                            },
                        },
                    },
                    yaxis: [
                        {
                            axisTicks: {
                                show: false
                            },
                            labels: {
                                style: {
                                    color: "#008FFB"
                                }
                            },
                        },
                        {
                            seriesName: "123",
                            opposite: true,
                            axisTicks: {
                                show: false
                            },
                        },
                        {
                            seriesName: "1",
                            opposite: true,
                            axisTicks: {
                                show: false
                            },
                        }
                    ],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                                legend: {
                                    position: "bottom"
                                }
                            }
                        }
                    ],
                    legend: {
                        show: false
                    }
                }


                var options3 = {
                    series: [
                        {
                            name: "1",
                            type: "column",
                            color: "#7cb5ec",
                            data: [20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 70, 60, 56, 80, 60, 50, 30, 10]
                        },
                        {
                            name: "2",
                            type: "column",
                            color: "#fc6aa0",
                            data: [20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 35, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 30, 10, 16, 80, 60, 50, 30, 10]
                        },
                        {
                            name: "3",
                            type: "line",
                            color: "#FBD300",
                            data: [22, 1, 23, 86, 44, 45, 50, 20, 29, 27, 36, 44, 45, 50, 20, 29, 37, 36, 44, 35, 50, 20, 29, 27, 36, 44, 45, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 14, 20, 10, 16, 8, 60, 50, 30, 10]
                        },
                        {
                            name: "4",
                            type: "line",
                            color: "#00E396",
                            data: [20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 45, 50, 20, 29, 37, 36, 44, 70, 60, 56, 80, 60, 50, 30, 10]
                        }
                    ],
                    chart: {
                        height: 350,
                        type: "line",
                        width: '100%',
                        stacked: false,
                    },
                    dataLabels: {
                        enabled: true,
                        enabledOnSeries: [2, 3]
                    },
                    stroke: {
                        width: [1, 1, 4, 4]
                    },
                    xaxis: {
                        categories: [
                            "0:00",
                            "0:30",
                            "1:00",
                            "01:30",
                            "2:00",
                            "2:30",
                            "03:00",
                            "03:30",
                            "04:00",
                            "04:30",
                            "05:00",
                            "5:30",
                            "6:00",
                            "6:30",
                            "7:00",
                            "7:30",
                            "08:00",
                            "8:30",
                            "9:00",
                            "9:30",
                            "10:00",
                            "10:30",
                            "11:00",
                            "11:30",
                            "12:00",
                            "12:30",
                            "13:00",
                            "13:30",
                            "14:00",
                            "14:30",
                            "15:00",
                            "15:30",
                            "16:00",
                            "16:30",
                            "17:00",
                            "17:30",
                            "18:00",
                            "18:30",
                            "19:00",
                            "19:30",
                            "20:00",
                            "20:30",
                            "21:00",
                            "21:30",
                            "22:00",
                            "22:30",
                            "23:00",
                            "23:30"
                        ],

                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                fontSize: "10px",
                                colors: '#3A559F'
                            },
                            offsetX: 0,
                            offsetY: 0,
                            format: undefined,
                            formatter: undefined,
                            datetimeUTC: true,
                            datetimeFormatter: {
                                year: 'yyyy',
                                month: "MMM 'yy",
                                day: 'dd MMM',
                                hour: 'HH:mm',
                            },
                        },
                    },
                    yaxis: [
                        {
                            axisTicks: {
                                show: false
                            },
                            labels: {
                                style: {
                                    color: "#008FFB"
                                }
                            },
                        },
                        {
                            seriesName: "123",
                            opposite: true,
                            axisTicks: {
                                show: false
                            },
                        },
                        {
                            seriesName: "1",
                            opposite: true,
                            axisTicks: {
                                show: false
                            },
                        }
                    ],
                    responsive: [
                        {
                            breakpoint: 1000,
                            options: {
                                chart: {
                                    width: 380
                                },
                                plotOptions: {
                                    bar: {
                                        horizontal: false
                                    }
                                },
                                legend: {
                                    position: "bottom"
                                }
                            }
                        }
                    ],
                    legend: {
                        show: false
                    }
                }

                break;


            case "fcr":
                let fcrDiv = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "1800px",
                        right: "11px",
                        background: "white",
                        width: "85vw",
                    }
                })

                this.append(this.state.tableDiv, fcrDiv);
                var options = {
                    series: [{
                        name: "1",
                        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 10, 21, 13, 65, 100]
                    }],
                    chart: {
                        height: 350,
                        type: 'line',
                        toolbar: {
                            show: false,
                        },
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'],
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: ['2020-12-11', '2020-12-12', '2020-12-13', '2020-12-14', '2020-12-11', '2020-12-11', '2020-12-11', '2020-12-11', '2020-12-11', '2020-12-11', '2020-12-11', '2020-12-11', '2020-12-11', '2020-12-11'],
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    }
                }
                setTimeout(() => {
                    var chart = new ApexCharts(fcrDiv, options);

                    chart.render();
                }, 100);

                break;


            case "asa":
                let asaDiv = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "1800px",
                        right: "11px",
                        background: "white",
                        width: "85vw",
                    }
                })

                this.append(this.state.tableDiv, asaDiv);
                var options = {
                    series: [{
                        name: "1",
                        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
                    }],
                    chart: {
                        height: 350,
                        type: 'line',
                        toolbar: {
                            show: false,
                        },
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'],
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: ['ზარი', 'მესენჯერი', 'ვაიბერი', 'ვოცაპი', 'ვიდეო ზარი', 'ჩატი', 'ინსტაგრამი', 'ელ-ფოსტა', 'ფეისბუქი'],
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    }
                }
                setTimeout(() => {
                    var chart = new ApexCharts(asaDiv, options);

                    chart.render();
                }, 100);

                break;


            case "att":
                let attDiv = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "1800px",
                        right: "11px",
                        background: "white",
                        width: "85vw",
                    }
                })

                this.append(this.state.tableDiv, attDiv);
                var options = {
                    series: [{
                        name: "1",
                        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
                    }],
                    chart: {
                        height: 350,
                        type: 'line',
                        toolbar: {
                            show: false,
                        },
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'],
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: ['ზარი', 'მესენჯერი', 'ვაიბერი', 'ვოცაპი', 'ვიდეო ზარი', 'ჩატი', 'ინსტაგრამი', 'ელ-ფოსტა', 'ფეისბუქი'],
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    }
                }
                setTimeout(() => {
                    var chart = new ApexCharts(attDiv, options);

                    chart.render();
                }, 100);


                break;


            case "aht":
                let ahtDiv = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "1800px",
                        right: "11px",
                        background: "white",
                        width: "85vw",
                    }
                })

                this.append(this.state.tableDiv, ahtDiv);
                var options = {
                    series: [{
                        name: "1",
                        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
                    }],
                    chart: {
                        height: 350,
                        type: 'line',
                        toolbar: {
                            show: false,
                        },
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'],
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: ['ზარი', 'მესენჯერი', 'ვაიბერი', 'ვოცაპი', 'ვიდეო ზარი', 'ჩატი', 'ინსტაგრამი', 'ელ-ფოსტა', 'ფეისბუქი'],
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    }
                }
                setTimeout(() => {
                    var chart = new ApexCharts(ahtDiv, options);

                    chart.render();
                }, 100);

                break;


            case "awt":
                let awtDiv = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "1800px",
                        right: "11px",
                        background: "white",
                        width: "85vw",
                    }
                })

                this.append(this.state.tableDiv, awtDiv);
                var options = {
                    series: [{
                        name: "1",
                        data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
                    }],
                    chart: {
                        height: 350,
                        type: 'line',
                        toolbar: {
                            show: false,
                        },
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'],
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: ['ზარი', 'მესენჯერი', 'ვაიბერი', 'ვოცაპი', 'ვიდეო ზარი', 'ჩატი', 'ინსტაგრამი', 'ელ-ფოსტა', 'ფეისბუქი'],
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    }
                }
                setTimeout(() => {
                    var chart = new ApexCharts(awtDiv, options);

                    chart.render();
                }, 100);
                break;


            case "csat":
                let csatDiv = this.CreateElement({
                    element: "div",
                    id: "chart",
                    style: {
                        maxWidth: "1800px",
                        right: "11px",
                        background: "white",
                        width: "85vw",
                    }
                })

                this.append(this.state.tableDiv, csatDiv);
                var options = {
                    series: [{
                        name: "1",
                        data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 232, 148, 124, 148, 343]
                    }],
                    chart: {
                        height: 350,
                        type: 'line',
                        toolbar: {
                            show: false,
                        },
                        zoom: {
                            enabled: false
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    grid: {
                        row: {
                            colors: ['#f3f3f3', 'transparent'],
                            opacity: 0.5
                        },
                    },
                    xaxis: {
                        categories: ['2020-12-11', '2020-12-12', '2020-12-13', '2020-12-14', '2020-12-11', '2020-12-11', '2020-12-11', '2020-12-11', '2020-12-11', '2020-12-11', '2020-12-11', '2020-12-11', '2020-12-11', '2020-12-11'],
                        labels: {
                            show: true,
                            style: {
                                fontFamily: "BPG2",
                                colors: '#3A559F',
                            },
                        },
                    }
                }
                setTimeout(() => {
                    var chart = new ApexCharts(csatDiv, options);

                    chart.render();
                }, 100);

                break;


            default:
                this.append(this.state.tableDiv, this.createTable());
                break;
        }
    }


    getTabs = () => {
        let tabData = [
            {
                name: "მთავარი",
                content_id: "main",
                id: 1
            },
            {
                name: "ნაპასუხები",
                content_id: "answered",
                id: 2
            },
            {
                name: "უპასუხო",
                content_id: "unanswered",
                id: 3

            },
            /* {
                name:"გადამისამართებული",
                content_id: "transfered",
                id: 4
            }, */
            /* {
                name:"დამუშავებული",
                content_id: "done",
                id: 5
            },
            {
                name:"დაუმუშავებელი",
                content_id: "undone",
                id: 6
            }, */
            {
                name: "მომართვების განაწილება",
                content_id: "momartvebi",
                id: 7
            },
            {
                name: "SL",
                content_id: "sl",
                id: 8
            },
            /* {
                name:"FCR",
                content_id: "fcr",
                id: 9
            },
            {
                name:"ASA",
                content_id: "asa",
                id: 10
            },
            {
                name:"ATT",
                content_id: "att",
                id: 11
            },
            {
                name:"AHT",
                content_id: "aht",
                id: 12
            },
            {
                name:"AWT",
                content_id: "awt",
                id: 13
            },
            {
                name:"CSAT",
                content_id: "csat",
                id: 14
            } */
        ];

        return tabData;
    }

    buildTaskTabs = () => {
        var tmp = [];
        tmp = this.getTabs();

        this.state.element.taskTabs = this.CreateElement({
            element: "taskTabs"
        })

        tmp.forEach(el => {
            this.append(this.state.element.taskTabs, this.CreateElement({
                element: "tab",
                children: el.name,
                'tab-id': el.id,
                onclick: this.tabClick,
                url: el.content_id
            }))
        })

        this.getActiveTab(this.state.element.taskTabs);

        return this.state.element.taskTabs;

    }

    tabClick = (e) => {
        this.state.tableDiv.innerHTML = '';
        this.state.element.taskTabs.childNodes.forEach(child => {
            child.classList.remove("active");
        });

        e.target.classList.add("active");

        var content_id = e.target.getAttribute("url");

        window.location.hash = content_id;

        this.getTabContent(content_id);


    }

    createTableModal = (act) => {
        var time = "";

        act == "getNotAnswered" ? time = "ლოდინის დრო" : time = "დრო";

        this.state.element.tableModal = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "id",
                    hidden: true,
                },
                {
                    field: "თარიღი",
                },
                {
                    field: "წყარო"
                },
                {
                    field: "ადრესატი"
                },
                {
                    field: "ექსთენშენი",
                    hidden: act == "getNotAnswered" ? true : false
                },
                {
                    field: time
                },
                {
                    field: "ქმედება",
                    template: `<div onclick="self.Technical.downloadRecord('#: qmedeba #')" style="height: 22px;cursor:pointer;display: #: qmedeba == null ? "none" : "block" #">
                                <div style="display: flex; gap: 7px; align-items: center; justify-content: center; margin-right: 15px">
                                <img style="width: 23px;" src="Frontend/Assets/images/icons/download.svg"><span>ჩამოტვირთვა
                                </span></div>
                              </div>`,
                    hidden: act == "getNotAnswered" ? true : false
                }
            ],
            data: {
                route: "Technical",
                act: "getModalData",
                startDate: this.state.element.datetime_start.value + ' 00:00:00',
                endDate: this.state.element.datetime_end.value + ' 23:59:59',
                type: act,
                queues: `${kendo__multiSelectedID(this.state.element.queueSelector)}`,
                exts: `${kendo__multiSelectedID(this.state.element.extSelector)}`
            },
            option: {
                header: true,
                numeric: true,
                export: {
                    excel: true,
                    pdf: true
                },
                selectable: 'single',
                footer: true
            },
            // ondblclick: this.tableDblClickHandler
        })

        return this.state.element.tableModal;

    }

    downloadRecord = (url) => {
        window.open("http://10.0.18.19/records/" + url, '_blank');
    }

    buildModalContent = (title, act) => {
        var div = this.CreateElement({
            element: "div",
            attributes: ['fieldset'],
            title: title
        }, this.createTableModal(act))

        return div;
    }

    createModal = (title, act) => {
        this.buildModal(null, {
            width: '50vw',
            height: '660px',
            content: this.buildModalContent(title, act),
            buttons: {

            }
        })
    }

    createTable = () => {
       
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "სულ",
                    template: `<span style="cursor: pointer;text-decoration: underline;" onclick="self.Technical.createModal('სულ','getAll')">#: sul > 0 ? sul : "0" #</span>`
                },
                {
                    field: "ნაპასუხები",
                    template: `<span style="cursor: pointer;text-decoration: underline;" onclick="self.Technical.createModal('ნაპასუხები','getAnswered')">#: napasuxebi > 0 ? napasuxebi : "0" #</span>`
                },
                {
                    field: "80წმ-მდე",
                    name: "otxmoc_wm_mde"
                },
                {
                    field: "80წმ-ზემოთ",
                    name: "otxmoc_wm_zemot"
                },
                {
                    field: "უპასუხო",
                    template: `<span style="cursor: pointer;text-decoration: underline;" onclick="self.Technical.createModal('უპასუხო','getNotAnswered')">#: upasuxo > 0 ? upasuxo : "0" #</span>`
                },
                {
                    field: "უპას. 80წმ-მდე",
                    name: "upasuxo_otxmoc_wm_mde"
                },
                {
                    field: "გადამისამართებული"
                },
                {
                    field: "დამუშავებული",
                    template: `<span style="cursor: pointer;text-decoration: underline;" onclick="self.Technical.createModal('დამუშავებული','getWorked')">#: damushavebuli > 0 ? damushavebuli : "0" #</span>`
                },
                {
                    field: "დაუმუშავებელი",
                    template: `<span style="cursor: pointer;text-decoration: underline;" onclick="self.Technical.createModal('დაუმუშავებული','getNotWorked')">#: daumushavebeli > 0 ? daumushavebeli : "0" #</span>`
                },
                {
                    field: "საშუალო ხანგ."
                },
                {
                    field: "ნაპასუხებია პროც."
                },
                {
                    field: "უპასუხოა პროც."
                },
                {
                    field: "გადართული პროც."
                },
                {
                    field: "დამუშავებ. პროც."
                },
                {
                    field: "დაუმუშავებ. პროც."
                }
            ],
            data: {
                route: "Technical",
                act: "getMain",
                startDate: this.state.element.datetime_start.value,
                endDate: this.state.element.datetime_end.value,
                queues: `${kendo__multiSelectedID(this.state.element.queueSelector)}`,
                exts: `${kendo__multiSelectedID(this.state.element.extSelector)}`,
                slType: `${kendo_SelectedID(this.state.element.slTypeSelector)}`,
                callAnsIn: this.state.element.secondsInput.value,
                callNotAfter: 60
            },
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                selectable: 'single',
                footer: true
            },
            ondblclick: (cb) => {
                console.log(cb)
            }
        })

        return this.state.element.table;

    }


    reportInfo = () => {
        this.state.element.reportinfo = new reportInfoTable({
            column: [
                {
                    field: "რიგი:"
                },
                {
                    field: "საწყისი თარიღი:"
                },
                {
                    field: "დასრულების თარიღი:"
                },
                {
                    field: "პერიოდი:"
                }
            ],
            data: this.data,
            title: "რეპორტების ინფორმაცია",
            button: "Excel"

        }).init()

        return this.state.element.reportinfo;
    }

    answeredInfo = () => {
        this.state.element.answeredinfo = new reportInfoTable({
            className: ["answered-info"],
            column: [
                {
                    field: "ნაპასუხები მომართვები:"
                },
                {
                    field: "საშ. ხანგძლივობა:"
                },
                {
                    field: "სულ საუბრის ხანგძლივობა:"
                },
                {
                    field: "ლოდინის საშ. ხანგძლივობა:"
                }
            ],
            data: this.data2,
            title: "ნაპასუხები მომართვები",
            button: "Excel"

        }).init()

        return this.state.element.answeredinfo;
    }



    answered = () => {
        this.state.element.answered = this.CreateElement({
            element: "h1",
            children: "ნაპასუხები მომართვები ოპერატორების მიხედვით",
            className: ["table-titles"]
        })
        return this.state.element.answered
    }


    createAnsweredTable = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "ოპერატორი"
                },
                {
                    field: "მომართვები"
                },
                {
                    field: "მომართვები p"
                },
                {
                    field: "მომართვის დრო"
                },
                {
                    field: "მომართვის დრო p"
                },
                {
                    field: "საშ. მომართვის ხანგძლივობა"
                },
                {
                    field: "ლოდინის დრო"
                },
                {
                    field: "საშ. ლოდინის ხანგძლივობა"
                }
            ],
            data: {
                route: "Technical",
                act: "answeredCallsByOperator",
                startDate: this.state.element.datetime_start.value,
                endDate: this.state.element.datetime_end.value,
                queues: `${kendo__multiSelectedID(this.state.element.queueSelector)}`,
                exts: `${kendo__multiSelectedID(this.state.element.extSelector)}`,
                slType: `${kendo_SelectedID(this.state.element.slTypeSelector)}`,
                callAnsIn: this.state.element.secondsInput.value,
                callNotAfter: 60
            },
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                selectable: 'single',
                footer: true
            },
            ondblclick: this.tableDblClickHandler
        })

        return this.state.element.table;
    }


    answeredTwo = () => {
        this.state.element.answered = this.CreateElement({
            element: "h1",
            children: "მომსახურების დონე (Service Level)",
            className: ["table-titles"]

        })
        return this.state.element.answered
    }

    createAnsweredTableTwo = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "პასუხი"
                },
                {
                    field: "რაოდენობა"
                },
                {
                    field: "დელტა"
                },
                {
                    field: "პროცენტი"
                }
            ],
            data: {
                route: "Technical",
                act: "getServiceLVL",
                startDate: this.state.element.datetime_start.value,
                endDate: this.state.element.datetime_end.value,
                queues: `${kendo__multiSelectedID(this.state.element.queueSelector)}`,
                exts: `${kendo__multiSelectedID(this.state.element.extSelector)}`,
                slType: `${kendo_SelectedID(this.state.element.slTypeSelector)}`,
                callAnsIn: this.state.element.secondsInput.value,
                callNotAfter: 60
            }
        })

        return this.state.element.table;
    }

    answeredThree = () => {
        this.state.element.answered = this.CreateElement({
            element: "h1",
            children: "ნაპასუხები მომართვები რიგის მიხედვით",
            className: ["table-titles"]

        })
        return this.state.element.answered
    }

    createAnsweredTableThree = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "რიგი"
                },
                {
                    field: "სულ"
                },
                {
                    field: "პროცენტი"
                }
            ],
            data: {
                route: "Technical",
                act: "answerCall",
                startDate: this.state.element.datetime_start.value,
                endDate: this.state.element.datetime_end.value,
                queues: `${kendo__multiSelectedID(this.state.element.queueSelector)}`,
                exts: `${kendo__multiSelectedID(this.state.element.extSelector)}`,
                slType: `${kendo_SelectedID(this.state.element.slTypeSelector)}`,
                callAnsIn: this.state.element.secondsInput.value,
                callNotAfter: 60
            }
        })

        return this.state.element.table;
    }

    createAnsweredTableFour = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "მიზეზი"
                },
                {
                    field: "სულ"
                },
                {
                    field: "პროცენტი"
                }
            ],
            data: {
                route: "Technical",
                act: "disconnectReason",
                startDate: this.state.element.datetime_start.value,
                endDate: this.state.element.datetime_end.value,
                queues: `${kendo__multiSelectedID(this.state.element.queueSelector)}`,
                exts: `${kendo__multiSelectedID(this.state.element.extSelector)}`,
                slType: `${kendo_SelectedID(this.state.element.slTypeSelector)}`,
                callAnsIn: this.state.element.secondsInput.value,
                callNotAfter: 60
            }
        })

        return this.state.element.table;
    }

    kavshirisGawyveta = () => {
        this.state.element.kavshirisgawyveta = this.CreateElement({
            element: "h1",
            children: "კავშირის გაწყვეტის მიზეზი",
            className: ["table-titles"]

        })
        return this.state.element.kavshirisgawyveta
    }



    unansweredInfo = () => {
        this.state.element.unansweredinfo = new reportInfoTable({
            className: ["answered-info"],
            column: [
                {
                    field: "უპასუხო მომართვები:"
                },
                {
                    field: "ლოდინის საშ. ხანგძლივობა:"
                },
                {
                    field: "საშ. რიგში პოზიცია:"
                },
                {
                    field: "საშ. საწყისი პოზიცია რიგში:"
                }
            ],
            data: this.data3,
            title: "უპასუხო მომართვები",
            button: "Excel"

        }).init()

        return this.state.element.unansweredinfo;
    }

    createUnansweredTable = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "მიზეზი"
                },
                {
                    field: "რაოდენობა"
                },
                {
                    field: " პროცენტი"
                }
            ],
            data: {
                route: "Technical",
                act: "disconnectReason",
                startDate: this.state.element.datetime_start.value,
                endDate: this.state.element.datetime_end.value,
                queues: `${kendo__multiSelectedID(this.state.element.queueSelector)}`,
                exts: `${kendo__multiSelectedID(this.state.element.extSelector)}`,
                slType: `${kendo_SelectedID(this.state.element.slTypeSelector)}`,
                callAnsIn: this.state.element.secondsInput.value,
                callNotAfter: 60
            }
        })

        return this.state.element.table;

    }

    unanswered = () => {
        this.state.element.unanswered = this.CreateElement({
            element: "h1",
            children: "უპასუხო მომართვები რიგის მიხედვით",
            className: ["table-titles"]
        })
        return this.state.element.unanswered
    }


    createUnansweredTableTwo = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "რიგი"
                },
                {
                    field: "სულ"
                },
                {
                    field: " პროცენტი"
                }
            ],
            data: {
                route: "Technical",
                act: "unanswered_calls_by_queue",
                startDate: this.state.element.datetime_start.value,
                endDate: this.state.element.datetime_end.value,
                queues: `${kendo__multiSelectedID(this.state.element.queueSelector)}`,
                exts: `${kendo__multiSelectedID(this.state.element.extSelector)}`,
                slType: `${kendo_SelectedID(this.state.element.slTypeSelector)}`,
                callAnsIn: this.state.element.secondsInput.value,
                callNotAfter: 60
            }
        })

        return this.state.element.table;

    }

    transferedInfo = () => {
        this.state.element.transferedinfo = new reportInfoTable({
            className: ["answered-info"],
            column: [
                {
                    field: "გადამისამართებული სულ:"
                },
                {
                    field: "საშუალო ხ-ბა:"
                },
                {
                    field: "საუბრის ხ-ბა სულ:"
                },
                {
                    field: "საუბრიას ხ-ბა გადამისამართებული:"
                },
                {
                    field: "ლოდინის საშუალო დრო:"
                },
            ],
            data: this.data4,
            title: "გადამისამართებული მომართვები",
            button: "Excel"

        }).init()

        return this.state.element.transferedinfo;
    }

    transfered = () => {
        this.state.element.transfered = this.CreateElement({
            element: "h1",
            children: "გადამისამართებული მომართვების რ-ბა ოპერატორების მიხედვით",
            className: ["table-titles"]

        })
        return this.state.element.transfered
    }

    createTransferedTable = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "თარიღი"
                },
                {
                    field: "ოპერატორი"
                },
                {
                    field: "სულ"
                },
                {
                    field: "ნაპასუხები"
                },
                {
                    field: "უპასუხო"
                },
                {
                    field: "ლოდინის საშ. დრო"
                },
                {
                    field: "ლოდინის ჯამური დრო"
                }
            ],
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                selectable: 'single',
                footer: true
            },
            ondblclick: this.tableDblClickHandler
        })

        return this.state.element.table;
    }

    transferedTwo = () => {
        this.state.element.transferedtwo = this.CreateElement({
            element: "h1",
            children: "გადმომისამართებული მომართვების რაოდენობა ოპერატორების მიხედვით",
            className: ["table-titles"]

        })
        return this.state.element.transferedtwo
    }

    createTransferedTableTwo = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "თარიღი"
                },
                {
                    field: "ოპერატორი"
                },
                {
                    field: "გადამისამართებული"
                },
                {
                    field: "ნაპასუხები"
                },
                {
                    field: "უპასუხო"
                },
                {
                    field: "ლოდინის ჯამური დრო"
                },
                {
                    field: "საუბრის ხ-ბა საშ"
                },
                {
                    field: "საუბრის ხ-ბა სულ"
                }
            ],
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                selectable: 'single',
                footer: true
            },
            ondblclick: this.tableDblClickHandler
        })

        return this.state.element.table;
    }



    doneInfo = () => {
        this.state.element.doneinfo = new reportInfoTable({
            className: ["answered-info"],
            column: [
                {
                    field: "დამუშავებული მომართვები:"
                },
                {
                    field: "დამუშავების ხ-ბა საშუალო:"
                },
                {
                    field: "ხანგრძლივობა სულ:"
                }
            ],
            data: this.data5,
            title: "დამუშავებული მომართვები",
            button: "Excel"

        }).init()

        return this.state.element.doneinfo;
    }


    done = () => {
        this.state.element.done = this.CreateElement({
            element: "h1",
            children: "დამუშავებული ზარები ოპერატორების მიხედვით",
            className: ["table-titles"]

        })
        return this.state.element.done
    }

    createDoneTable = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "თარიღი"
                },
                {
                    field: "ოპერატორი"
                },
                {
                    field: "მომართვები სულ"
                },
                {
                    field: "დამუშავებული მომართვები"
                },
                {
                    field: "დამუშავებული მომართვები `%`"
                },
                {
                    field: "დამუშავების ხ-ბა სულ"
                },
                {
                    field: "დამუშავების საშუალო ხ-ბა"
                }
            ],
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                selectable: 'single',
                footer: true
            },
            ondblclick: this.tableDblClickHandler
        })

        return this.state.element.table;
    }


    undoneInfo = () => {
        this.state.element.undoneinfo = new reportInfoTable({
            className: ["answered-info"],
            column: [
                {
                    field: "დაუმუშავებული მომართვები:"
                },
                {
                    field: "საუბრის საშ. ხ-ბა"
                },
                {
                    field: "სულ საუბრის  ხ-ბა"
                },
                {
                    field: "ლოდინის საშ. ხ-ბა"
                }
            ],
            data: this.data6,
            title: "დაუმუშავებელი მომართვები",
            button: "Excel"

        }).init()

        return this.state.element.undoneinfo;
    }

    undone = () => {
        this.state.element.undone = this.CreateElement({
            element: "h1",
            children: "დაუმუშავებელი ზარები ოპერატორების მიხედვით",
            className: ["table-titles"]

        })
        return this.state.element.undone
    }

    createUndoneTable = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "თარიღი"
                },
                {
                    field: "ოპერატორი"
                },
                {
                    field: "მომართვები სულ"
                },
                {
                    field: "დაუმუშავებელი მომართვები"
                },
                {
                    field: "დაუმუშავებელი მომართვები `%`"
                },
                {
                    field: "საშ. მომართვის ხ-ბა"
                },
                {
                    field: "სულ საუბრის ხ-ბა"
                }
            ],
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                selectable: 'single',
                footer: true
            },
            ondblclick: this.tableDblClickHandler
        })

        return this.state.element.table;
    }


    momartvebiInfo = () => {
        this.state.element.momartvebiinfo = new reportInfoTable({
            className: ["answered-info"],
            column: [
                {
                    field: "ნაპასუხები მომართვები:"
                },
                {
                    field: "უპასუხო მომართები:"
                }
            ],
            data: this.data7,
            title: "სულ",
            button: "Excel"

        }).init()

        return this.state.element.momartvebiinfo;
    }


    momartvebi = () => {
        this.state.element.momartvebi = this.CreateElement({
            element: "h1",
            children: "მომართვების განაწილება დღეების მიხედვით",
            className: ["table-titles"]

        })
        return this.state.element.momartvebi
    }

    momartvebiTwo = () => {
        this.state.element.momartvebi = this.CreateElement({
            element: "h1",
            children: "მომართვის განაწილება საათების მიხედვით",
            className: ["table-titles"]

        })
        return this.state.element.momartvebi
    }

    momartvebiThree = () => {
        this.state.element.momartvebi = this.CreateElement({
            element: "h1",
            children: "მომართვის განაწილება კვირის დღეების მიხედვით",
            className: ["table-titles"]

        })
        return this.state.element.momartvebi
    }

    momartvebiTable = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "თარიღი"
                },
                {
                    field: "სულ"
                },
                {
                    field: "ნაპასუხები"
                },
                {
                    field: "ნაპასუხები"
                },
                {
                    field: "უპასუხო"
                },
                {
                    field: "უპასუხო"
                },
                {
                    field: "საშ. ხანგრძლივობა"
                },
                {
                    field: "საშ. ლოდინის ხანგძლივობა"
                }
            ],
            data: {
                route: "Technical",
                act: "call_distribution_per_day",
                startDate: this.state.element.datetime_start.value,
                endDate: this.state.element.datetime_end.value,
                queues: `${kendo__multiSelectedID(this.state.element.queueSelector)}`,
                exts: `${kendo__multiSelectedID(this.state.element.extSelector)}`,
                slType: `${kendo_SelectedID(this.state.element.slTypeSelector)}`,
                callAnsIn: this.state.element.secondsInput.value,
                callNotAfter: 60
            },

            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                selectable: 'single',
                footer: true
            },
            ondblclick: this.tableDblClickHandler
        })

        return this.state.element.table;
    }

    momartvebiTableTwo = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "საათი"
                },
                {
                    field: "სულ"
                },
                {
                    field: "ნაპასუხები"
                },
                {
                    field: "ნაპასუხები"
                },
                {
                    field: "უპასუხო"
                },
                {
                    field: "უპასუხო"
                },
                {
                    field: "საშ. ხანგრძლივობა"
                },
                {
                    field: "საშ. ლოდინის ხანგძლივობა"
                }
            ],
            data: {
                route: "Technical",
                act: "call_distribution_per_hour",
                startDate: this.state.element.datetime_start.value,
                endDate: this.state.element.datetime_end.value,
                queues: `${kendo__multiSelectedID(this.state.element.queueSelector)}`,
                exts: `${kendo__multiSelectedID(this.state.element.extSelector)}`,
                slType: `${kendo_SelectedID(this.state.element.slTypeSelector)}`,
                callAnsIn: this.state.element.secondsInput.value,
                callNotAfter: 60
            },
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                selectable: 'single',
                footer: true
            },
            ondblclick: this.tableDblClickHandler
        })

        return this.state.element.table;
    }


    momartvebiThree = () => {
        this.state.element.momartvebi = this.CreateElement({
            element: "h1",
            children: "მომართვების განაწილება კვირის დღეების მიხედვით",
            className: ["table-titles"]

        })
        return this.state.element.momartvebi
    }

    momartvebiTableThree = () => {
        this.state.element.table = this.CreateElement({
            element: "kendo",
            type: "table",
            column: [
                {
                    field: "საათი"
                },
                {
                    field: "სულ"
                },
                {
                    field: "ნაპასუხები"
                },
                {
                    field: "ნაპასუხები"
                },
                {
                    field: "უპასუხო"
                },
                {
                    field: "უპასუხო"
                },
                {
                    field: "საშ. ხანგრძლივობა"
                },
                {
                    field: "საშ. ლოდინის ხანგძლივობა"
                }
            ],
            data: {
                route: "Technical",
                act: "call_distribution_per_day_of_week",
                startDate: this.state.element.datetime_start.value,
                endDate: this.state.element.datetime_end.value,
                queues: `${kendo__multiSelectedID(this.state.element.queueSelector)}`,
                exts: `${kendo__multiSelectedID(this.state.element.extSelector)}`,
                slType: `${kendo_SelectedID(this.state.element.slTypeSelector)}`,
                callAnsIn: this.state.element.secondsInput.value,
                callNotAfter: 60
            },
            option: {
                header: true,
                numeric: false,
                export: {
                    excel: true,
                    pdf: true
                },
                selectable: 'single',
                footer: true
            },
            ondblclick: this.tableDblClickHandler
        })

        return this.state.element.table;
    }




    Filterblock = () => {

        this.state.element.filterBlock = this.CreateElement({
            element: "filterblock",
        })

        return this.state.element.filterBlock;

    }


    queueSelector = () => {
        this.state.element.queueSelector = this.CreateElement({
            element: "kendo",
            type: "multiselector",
            title: "რიგი",
            data: {
                route: "Authorization",
                act: "getQueue"
            },
        });
        return this.state.element.queueSelector;
    }

    extSelector = () => {
        this.state.element.extSelector = this.CreateElement({
            element: "kendo",
            type: "multiselector",
            title: "შიდა ნომერი",
            data: {
                route: "Authorization",
                act: "getExt"
            },
        });
        return this.state.element.extSelector;
    }
    slTypeSelector = () => {
        this.state.element.slTypeSelector = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: "SL ტიპი",
            className: ["sl-type"],
            style: {
                width: "396px",
                height: "37px"
            },
            data: {
                route: "Technical",
                act: "getSlTypes"
            },
        });
        return this.state.element.slTypeSelector;
    }

    dateTimePicker_start = () => {
        this.state.element.datetime_start = this.CreateElement({
            element: "input",
            style: {
                height: "37px",
                width: "auto"
            },
            type: "date"
        });
        return this.state.element.datetime_start;
    }

    buildTire = () => {
        this.state.element.tire = this.CreateElement({
            element: "span",
            children: "-",
            style: {
                fontSize: '24px'
            }
        })

        return this.state.element.tire
    }

    dateTimePicker_end = () => {
        this.state.element.datetime_end = this.CreateElement({
            element: "input",
            style: {
                height: "37px",
                width: "auto"
            },
            type: "date"
        });
        return this.state.element.datetime_end;
    }
    percentInput = () => {
        this.state.element.percentInput = this.CreateElement({
            element: "input",
            type: "text",
            placeholder: "%",
            className: ["technical-input"],
            value: 80,
            style: {
                width: "90px"
            }
        })

        return this.state.element.percentInput;
    }


    secondsInput = () => {
        this.state.element.secondsInput = this.CreateElement({
            element: "input",
            type: "text",
            placeholder: "წმ-ში",
            className: ["technical-input"],
            value: 60,
            style: {
                width: "114px",
            }
        })

        return this.state.element.secondsInput;
    }

    sulMomartva = () => {
        this.state.element.sulMomartva = new Input({
            type: "text",
            placeholderTitle: "სულ მომართვა",
            className: ["sul-input"]
        }).build();

        return this.state.element.sulMomartva;
    }

    slPercentSecondInput = () => {
        this.state.element.slPercentSecondInput = new Input({
            type: "text",
            placeholderTitle: "SL (% / წმ)",
            className: ["sl-input"]
        }).build();

        return this.state.element.slPercentSecondInput;
    }

    filterButton = () => {

        this.state.element.filterButton = new Button({
            text: "ფილტრი",
            style: {
                marginLeft: "11px"
            },
            onclick: async () => {
                this.state.tableDiv.remove();
                this.state.tableDiv = this.CreateElement({
                    element: "div",
                    style: {
                        marginTop: "30px",
                        minWidth: '200px'
                    }
                })
                let activeTab = window.location.href.split("#")[1];
                this.append(this.state.element.filterBlock, this.state.tableDiv);

                /* this.append(this.state.tableDiv, this.createTable()) */
                this.getTabContent(activeTab);
                this.getPercentSL();
            }

        })

        return this.state.element.filterButton
    }

    getPercentSL = () => {
        this.getResponse({
            route: "Technical",
            act: "getPercent",
            startDate: this.state.element.datetime_start.value,
            endDate: this.state.element.datetime_end.value,
            queues: `${kendo__multiSelectedID(this.state.element.queueSelector)}`,
            exts: `${kendo__multiSelectedID(this.state.element.extSelector)}`,
            slType: `${kendo_SelectedID(this.state.element.slTypeSelector)}`,
            callAnsIn: this.state.element.secondsInput.value,
            callNotAfter: 60
        }).then((data) => {
            this.state.element.sulMomartva.children[0].value = data.allCalls;
            this.state.element.slPercentSecondInput.children[0].value = data.percentValues;

        });
    }

    getReportInfo = () => {
        this.getResponse({
            route: "Technical",
            act: "reportData",
            startDate: this.state.element.datetime_start.value,
            endDate: this.state.element.datetime_end.value,
            queues: `${kendo__multiSelectedID(this.state.element.queueSelector)}`,
            exts: `${kendo__multiSelectedID(this.state.element.extSelector)}`,
            slType: `${kendo_SelectedID(this.state.element.slTypeSelector)}`,
            callAnsIn: this.state.element.secondsInput.value,
            callNotAfter: 60
        }).then((data) => {
            this.data = data.report_info;
            this.data2 = data.answer_info;
            this.data3 = data.unanswer_info;
            this.data7 = data.totals;
        });
    }

}