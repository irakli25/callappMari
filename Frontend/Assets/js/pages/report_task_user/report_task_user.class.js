import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import Input from "../../components/input/input.class.js";
import { kendo__multiSelectedID } from "../../helpers/kendo.helper.js";

export default class Report_task_user extends Tdg {

  constructor() {
    super();

    this.state = {
      sectionName: document.querySelector("section[Report_task_user]"),
      element: [],
      level: 1
    }
    
    this.chartOptions = {
      option_1: {},
      option_2: {},
      option_3: {}
    }
    this.removeLoading();
    this.init();
  }


  init = async() => {
    this.append(this.state.sectionName, this.statisticsgBlock());
    this.append(this.state.element.statisticsgBlock, this.startDateTime());
    this.append(this.state.element.statisticsgBlock, this.buildTire());
    this.append(this.state.element.statisticsgBlock, this.endDateTime()); 
    this.append(this.state.element.statisticsgBlock, this.buildMethod());
    this.append(this.state.element.statisticsgBlock, this.filterBtn());
    this.append(this.state.element.statisticsgBlock, await this.buildCountLabel());
    this.append(this.state.sectionName, this.statisticsgTableBlock());
    this.append(this.state.element.tableBlock, this.createTitle());


    for (let i = 1; i <= 3; i++) {

      this.state.element[`chart_${i}`] = this.CreateElement({
          element: "div",
          id: `chart_${i}`,
          style: {
            // maxWidth: "700px",
            maxHeight: "432.75px",
            display: "grid",
            justifyContent: "center"
          }
      })

      this.append(this.state.element.tableBlock, this.state.element[`chart_${i}`]);

    }
      this.chartOptions.option_1 = {
          chart: {
          width: 1300,
          type: 'pie',
          fontFamily: "BPG2",
          events: {
            dataPointSelection: (e) => {
                this.chartLvLHandler();
            } 
          }
        },
        
        labels: [],
        colors: ["#5D8AA8",  "#177245",  "#E32636", "#FFBF00", "#8DB600", "#007FFF", "#3D2B1F", "#318CE7", "#DE5D83", "#B5A642", "#FF007F", "#FFEF00","#FF8C00", "#9400D3","#CE1620", "#014421" ],
        fill: {
          opacity: 1
        },
        stroke: {
          width: 1,
          colors: undefined
        },
        yaxis: {
          show: false
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0
            },
            spokes: {
              strokeWidth: 0
            },
          }
        },
        legend: {
          show: true,
          position: 'right',
        },

        series: [],
        responsive: [{
          breakpoint: 800,
          options: {
            chart: {
              width: 400
            }
          }
        }]
      }
      this.chartOptions.option_2 = {
        chart: {
        width: 900,
        type: 'pie',
        fontFamily: "BPG2",
        events: {
            dataPointSelection: (e) => {
              this.chartLvLHandler();
            }
        }
      },
      labels: [],
      colors: ["#5D8AA8",  "#177245",  "#E32636", "#FFBF00", "#8DB600", "#007FFF", "#3D2B1F", "#318CE7", "#DE5D83", "#B5A642", "#FF007F", "#FFEF00","#FF8C00", "#9400D3","#CE1620", "#014421"],
      fill: {
        opacity: 1
      },
      stroke: {
        width: 1,
        colors: undefined
      },
      yaxis: {
        show: false
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 0
          },
          spokes: {
            strokeWidth: 0
          },
        }
      },
      legend: {
        show: true,
        position: 'right'
      },

      
      
      series: [],
      responsive: [{
        breakpoint: 800,
        options: {
          chart: {
            width: 400
          }
        }
      }]
      }
      this.chartOptions.option_3 = {
          chart: {
          width: 900,
          type: 'pie',
          fontFamily: "BPG2",
          events: {
              dataPointSelection: (e) => {
                this.chartLvLHandler();
              }
          }
        },

        labels: [],
        colors: ["#5D8AA8",  "#177245",  "#E32636", "#FFBF00", "#8DB600", "#007FFF", "#3D2B1F", "#318CE7", "#DE5D83", "#B5A642", "#FF007F", "#FFEF00","#FF8C00", "#9400D3","#CE1620", "#014421"],
        fill: {
          opacity: 1
        },
        stroke: {
          width: 1,
          colors: undefined
        },
        yaxis: {
          show: false
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0
            },
            spokes: {
              strokeWidth: 0
            },
          }
        },
        legend: {
          show: true,
          position: 'right'
        },

        series: [],
        responsive: [{
          breakpoint: 800,
          options: {
            chart: {
              width: 400
            }
          }
        }]
      }
      
      this.chartLvLHandler();
  }

  chartLvLHandler = async(e = null) => {
    
    var text = $("#chart_1 .apexcharts-active .apexcharts-tooltip-text-label").text()
    var category = text.substr(0, text.indexOf(' '));

    var text = $("#chart_2 .apexcharts-active .apexcharts-tooltip-text-label").text()
    var subCategory = text.substr(0, text.indexOf(' '));

    await this.getResponse({
        route: "Processing_report",
        act: "init_chart",
        method: "get_list"  + this.state.level,
        start_date          : this.state.element.startDateTime.value,
        end_date            : this.state.element.endDateTime.value,
        category            : category ,
        subCategory         : subCategory,
        source              : kendo__multiSelectedID(this.state.element.buildMethod)
    }).then(async (data) => {
      
        // // put data to chart options
        data = data.map(function(item){
          if(item.name == null){
              item.name = "არ აქვს კატეგორია";
          }
          return item;
        });

        var nameArray = [];
        var dataArray = [];
        for (let i=0; i<data.length; i++){
          dataArray.push(data[i].data[0]);
          nameArray.push(data[i].name + " - " + data[i].data);
        }

        this.chartOptions["option_" + this.state.level].series =  dataArray;
        this.chartOptions["option_" + this.state.level].labels =  nameArray;

        // empty chart container and render new chart
        this.state.element[`chart_${this.state.level}`].innerHTML = "";
        var chart = new ApexCharts(
            this.state.element[`chart_${this.state.level}`], 
            this.chartOptions["option_" + this.state.level]
        );

        chart.render();

        // show chosen lvl chart
        document.getElementById("chart_1").style.display="none";
        document.getElementById("chart_2").style.display="none";
        document.getElementById("chart_3").style.display="none";
        this.state.element[`chart_${this.state.level}`].style.display="block";

        // create table
        if((this.state.element).hasOwnProperty("table")) this.state.element.table.parentElement.remove();
        this.append(this.state.element.tableBlock, this.statisticsgTable());

        console.log(data);
        let sum=0;
        for (let i = 0; i<data.length; i++){
            sum += parseInt(data[i].data);
        }
        $("#count_label").text('ზარების ჯამური რაოდენობა - '+ sum);

        // increment lvl
        if(this.state.level >= 3)
            this.state.level = 1;
        else 
            this.state.level += 1;

    }) 
};


  statisticsgBlock = () => {

    this.state.element.statisticsgBlock = this.CreateElement({
      element: "statisticsgBlock"
    })

    return this.state.element.statisticsgBlock;
  } 

  statisticsgTableBlock = () => {
    this.state.element.tableBlock = this.CreateElement({
        element: "tableBlock"
    })
    return this.state.element.tableBlock;
  }

  buildMethod = () => {
    this.state.element.buildMethod = this.CreateElement({
        element: "kendo",
        type: "selector",
        title: "პასუხისმგებელი პირი",
        data: {
            route: "",
            act: ""
        },
    })
    return this.state.element.buildMethod
  }

  startDateTime = () => {
    this.state.element.startDateTime = this.CreateElement({
        element: "input",
        style: {
            height: "37px",
            width: "auto"
        },
        type: "date"
    });
    return this.state.element.startDateTime;
  }

  buildTire = () => {
    this.state.element.tire = this.CreateElement({
        element: "span",
        children: "-",
        style: {
            fontSize: '24px',
            marginBottom: '7px'
        }
    })

    return this.state.element.tire
  }

  endDateTime = () => {
      this.state.element.endDateTime = this.CreateElement({
          element: "input",
          style: {
              height: "37px",
              width: "auto"
          },
          type: "date"
      });
      return this.state.element.endDateTime;
  }

  

  filterBtn = () => {
    this.state.element.filterBtn = new Button({
        text: "ფილტრი",
        onclick: () => {
            // dont change lvl on filter
            (this.state.level == 1) ? this.state.level : this.state.level--;
            this.chartLvLHandler();
        }
    })

    return this.state.element.filterBtn
  }

  createTitle = () => {
    this.state.element.title = this.CreateElement({
        element: "h1",
        class: "title",
        children: "დავალებები პასუხისმგებელი პირების მიხედვით"
    })
    return this.state.element.title
  } 

  buildCountLabel = async () => {
    this.state.element.buildCountLabel = this.CreateElement({
        element: "label",
        id:"count_label",
        text: "ზარების ჯამური რაოდენობა - იტვირთება... ",
        style:{
            fontSize: '18px',
            fontFamily:'BPG',
            fontWeight: 'normal',
            color: '#269FFF'
        }
    });
    
    return this.state.element.buildCountLabel;

  }


  statisticsgTable = () => {
    var text = $("#chart_1 .apexcharts-active .apexcharts-tooltip-text-label").text()
    var category = text.substr(0, text.indexOf(' '));

    var text = $("#chart_2 .apexcharts-active .apexcharts-tooltip-text-label").text()
    var subCategory = text.substr(0, text.indexOf(' '));

    this.state.element.table = this.CreateElement({
      element: "kendo",
      type: "table",
      column: [
          {
              field: "დასახელება"
          },
          {
              field: "რაოდენობა"
          },
          {
              field: "პროცესი"
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
      data: {
        route: "Processing_report",
        act: "init",
        method: "get_list" + this.state.level,
        start_date          : this.state.element.startDateTime.value,
        end_date            : this.state.element.endDateTime.value,
        source              : kendo__multiSelectedID(this.state.element.buildMethod),
        category            : category,
        subCategory         : subCategory,
    },
        ondblclick: this.voiceDblClick
    })

    return this.state.element.table;
}
}