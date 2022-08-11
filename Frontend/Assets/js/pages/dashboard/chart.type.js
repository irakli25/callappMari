import Helper from "../../helpers/helper.class.js";

/**
  * @description Create Chart Element for Dashboard Blocks
  * @param {Element} content 
  * @param {Object} dataObj 
  */

export const ChartObj = (content, dataObj) => {

    let noData;

    if(!dataObj.data) return console.error("data is not exist in Object")
    // if(!dataObj.colors) return console.error("colors is not exist in Object")
    // if(!dataObj.header) return console.error("header is not exist in Object")
    
    let chartEl = new Helper().CreateElement({
      element: "div",
      attributes: [{id: dataObj.id}]
    })

    content.append(chartEl)

    if(dataObj.type == 'bar'){

      let dataKey = Object.keys(dataObj.data);
      let dataValue = Object.values(dataObj.data);

      setTimeout(function(){
        new ApexCharts(chartEl, {
          series: [{
            name: "",
            data: [...dataValue]
        }],
          chart: {
            height: (dataObj.height ? dataObj.height : 230),
            width: '100%',
            type: 'bar',
            events: {
              click: function(chart, w, e) {
                
              }
            },
            toolbar: {
              show: false
          },
          fontFamily: 'BPG'
        },
        colors: dataObj.colors,
        plotOptions: {
          bar: {
            columnWidth: (dataObj.options ? (dataObj.options.columnWidth ? dataObj.options.columnWidth : '45%') : '45%'),
            distributed: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [...dataKey],
          labels: {
            style: {
              colors: dataObj.colors,
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          labels: {
            show: true,
            decimalsInFloat: false,
            style: {
                colors: ["var(--text-color)"],
            }
          }
        }
        }).render();
      }, 1)
    
    }

    if(dataObj.type == "donut"){

      setTimeout(function(){
        new ApexCharts(chartEl, {
            series: dataObj.data,
            chart: {
              type: 'donut',
              height: (dataObj.options ? (dataObj.options.height ? dataObj.options.height : '170px') : '170px'),
              height: '100%',
              stacked: true,
              fontFamily: 'BPG'
          },
          colors: dataObj.colors,
          dataLabels: {
            enabled: false
          },
          plotOptions: {
            pie: { 
              donut: {
                size: '80%',
                labels: {
                  show: true,
                  name: {
                    show: true,
                    color: 'var(--text-color)',
                    fontSize: '14px'
                  },
                  value: {
                    show: true,
                    color: 'var(--text-color)',
                    fontSize: '15px',
                    fontWeight: 'bold'

                  },
                  total: {
                    show: true,
                    showAlways: true,
                    label: 'სულ',
                    fontSize: '13px',
                    color: 'var(--text-color)',
                    formatter: function (w) {
                      return w.globals.seriesTotals.reduce((a, b) => {
                        return a + b
                      }, 0)
                    }
                  }
                }
              }
            }
          },
          stroke:{
            colors:['rgba(225,225,225, 0)']
           },
          responsive: [{
            breakpoint: 130,
            options: {
              chart: {
                width: 130
              },
              legend: {
                show: false
              }
            }
          }],
          legend: {
            show: false
          }
        }).render();

    }, 1);
    let countEl = new Helper().CreateElement({
      element: "donut-count"
    })

    if(!dataObj.data) return console.error("data is not exist in Object")

    dataObj.data.map((x, i) => {
     
      let labelEl = new Helper().CreateElement({
       
        element: "label",
        attributes: [
                { 
                  name: dataObj.header[i]
                },
                {
                  style: `color: ${dataObj.colors[i]}`
                }
              ],
        children: (x == 0 ? "0" : x)
      })
      countEl.append(labelEl);
    })
    content.append(countEl);
  }

  if(dataObj.type == 'list'){
    setTimeout(function() {

      if(dataObj.chart == 'gauge'){

      new ApexCharts(chartEl, {
                series: dataObj.data,
                chart: {
                    type: 'radialBar',
                    offsetY: -60,
                    offsetX: 0,
                    height: '110%',
                    sparkline: {
                        enabled: true
                    },
                    fontFamily: 'BPG'
                },
                
                colors: dataObj.colors,
                plotOptions: {
                    radialBar: {
                        startAngle: -90,
                        endAngle: 90,
                        hollow: {
                            size: '65%'
                        },
                        track: {
                            show: true,
                            background: "var(--dashboard-bg-color)",
                            strokeWidth: '100%',
                            margin: 5
                        },
                        dataLabels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '12px',
                                color: "var(--text-color)",
                                fontWeight: 'bold',
                            },
                            value: {
                                offsetY: -50,
                                fontSize: '25px',
                                fontWeight: 500,
                                color: dataObj.colors[0]
                            }
                        }
                    }
                },
                grid: {
                    padding: {
                        top: -10
                    }
                },
                labels: dataObj.dataTitle
        }).render();
      }

      if(dataObj.chart == 'radialbar'){
        new ApexCharts(chartEl, {
          series: dataObj.data,
          chart: {
              type: 'radialBar',
              height: 320,
              fontFamily: 'BPG'
          },
          
          colors: dataObj.colors,
          plotOptions: {
              radialBar: {
                hollow: {
                    size: '35%'
                },
                track: {
                    show: true,
                    background: "var(--dashboard-bg-color)",
                    strokeWidth: '100%',
                    margin: 5
                },
                dataLabels: {
                    name: {
                        fontSize: '22px'
                    },
                    value: {
                        fontSize: '16px'
                    },
                    total: {
                        show: true,
                        label: 'სულ',
                        formatter: function (w) {
                          return w.globals.seriesTotals.reduce((a, b) => {
                            let count = 0;
                           
                            if(typeof content.childNodes == typeof undefined) {
                                content = document.querySelector("component[dashboard] block[data-id='"+dataObj.id+"'] content")
                            }
                           
                            content.childNodes[1].childNodes.forEach((x, i) => {
                              count += parseInt(x.innerText)
                            })
                            
                            return count;
                        }, 0)
                        }
                    }
                }
            }
          },
          labels: dataObj.dataTitle
  }).render();
      }


      if(dataObj.chart == "count"){
        
        let countLabel = new Helper().CreateElement({
          element: "counter"
        })

        if(dataObj.data[0] == null || dataObj.data[0] == '' || dataObj.data[0] == undefined){
            noData = new Helper().CreateElement({
              element: "noData",
              children: "ინფორმაცია არ არის"
            });

            countLabel.append(noData)
            chartEl.append(countLabel);
            
          return 
        }
        countLabel.append(dataObj.data[0])
        chartEl.append(countLabel);
      }

    })

    let labelBlockEl = new Helper().CreateElement({
      element: "block-label"
    })
    let StackEl = new Helper().CreateElement({
      element: "block-label"
    })
    
    if(!dataObj.header) return console.error("header is not exist in Object")
    dataObj.header.map((x, i) => {
      let labelEl = new Helper().CreateElement({
        element: "label",
        attributes: [x],
        children: dataObj.labelData[i]
      })

      labelBlockEl.append(labelEl);
    
    if(typeof dataObj.labelStack != typeof undefined){
      let labelStack = new Helper().CreateElement({
        element: "stack",
        attributes: [dataObj.labelStack[i].label],
        children: dataObj.labelStack[i].percent
      })
      StackEl.append(labelStack)
    }

  })

    content.append(labelBlockEl);
    content.append(StackEl);

  }

}