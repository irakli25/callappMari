import Tdg from "../../tdg.class.js";
import Button from "../../components/button/button.class.js";
import Input from "../../components/input/input.class.js";

export default class Processing_report extends Tdg {

    constructor() {
      super();
      this.state = {
        sectionName: document.querySelector("section[Processing_report]"),
        element: []
      }

      this.initialize();
    }

    initialize = () => {
      this.append(this.state.sectionName, this.BuildBlock());

      this.append(this.state.element.buildblock, this.communicationSelector());
      this.append(this.state.element.buildblock, this.dateTimePicker_start());
      this.append(this.state.element.buildblock, this.dateTimePicker_end());
      this.append(this.state.element.buildblock, this.filterButton());

      this.append(this.state.sectionName, this.ApexBlock());



      let div = this.CreateElement({
        element: "div",
        id: "chart",
        style: {
          maxWidth: "700px",
          margin: "30px"
        }
      })

      this.append(this.state.element.apexblock, this.CreateElement({
        element: "div",
        className: ["apex-grid"]
      }, this.apexBlockTitle(), this.newTitle(), div, this.apexTitle()));

        var options = {
          series: [96, 84, 74, 78, 90],
            chart: {
            width: 500,
            type: 'polarArea',
            fontFamily: "BPG2",
            events: {
              click: function(labels) {
                alert('123');
                document.getElementById("apexblocktitle").style.display="none";
                document.getElementById("apextitle").style.display="none";
                document.getElementById("newtitle").style.display="block";

                // document.getElementById("SvgjsG1019").style.display="none";

                console.log(labels)
              },
            }
          },
          selection: {
            enabled: true,
            type: 'x',
            fill: {
              color: '#24292e',
              opacity: 0.1
            },
          },
          labels: ['შიდა კომუნიკაცია განცხადებაზე/რეგისტრაციაზე', 'SPAM MAIL', 'სხვა/ზოგადი საკითხები', 'სისხლის სამართლის მართლმსაჯულება', 'მოსაწვევი/რელიზი'],
          colors: ["#3ABE82",  "#FBD300",  "#1BD741", "#2196F3", "#FF005C"],
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
          legend: {
            position: 'bottom'
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
            position: 'bottom'
          },

          states: {
            normal: {
              allowMultipleDataPointsSelection: false,
                filter: {
                  type: 'none',
                  value: 0,
                      }
            },
            hover: {
                allowMultipleDataPointsSelection: false,
                filter: {
                  type: 'lighten',
                  value: 0.15,
                }
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                  type: 'darken',
                  value: 0.90,
                }
            },
          },
          responsive: [{
            breakpoint: 800,
            options: {
              chart: {
                width: 400
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        }
          
      var chart = new ApexCharts(div, options);
          
      chart.render();


      this.append(this.state.element.apexblock, this.CreateElement({
        element: "div",
        className: ["kendo-grid"],
      }, this.CreateElement({
        element: "div",
        id: "kendo-table",
      }, this.createTable())));
    }

    BuildBlock = () => {

      this.state.element.buildblock = this.CreateElement({
          element: "buildblock",
      })

      return this.state.element.buildblock;
    }


    communicationSelector = () => {
        this.state.element.communicationSelector = this.CreateElement({
            element: "kendo",
            type: "multiselector",
            title: "კომუნიკაციის არხი",
            className: ["communication-selector"],
            style:{
              width: '400px',
              height: '37px',
              maxWidth: '456px'
            }
        });
        return this.state.element.communicationSelector;
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

    filterButton = () => {

      this.state.element.filterButton = new Button({
          text: "ფილტრი",
          onclick: function () {
            alert(123)
          }

      })

      return this.state.element.filterButton
    }    

    ApexBlock = () => {

      this.state.element.apexblock = this.CreateElement({
          element: "apexblock",
      })

      return this.state.element.apexblock;
    }

    apexBlockTitle = () => {
      this.state.element.apexblocktitle = this.CreateElement({
        element: "h1",
        id: "apexblocktitle",
        children: "შემოსული ზარები კატეგორიების მიხედვით",
        className: ["apexblocktitle"]
      })
      return this.state.element.apexblocktitle
    }

    apexTitle = () => {
      this.state.element.apextitle = this.CreateElement({
        element: "h1",
        id: "apextitle",
        children: "მომართვის ჯამური რაოდენობა: 17.00",
        className: ["apextitle"]
      })
      return this.state.element.apextitle
    }


    KendoBlock = () => {
      this.state.element.kendoblock = this.CreateElement({
          element: "kendoblock",
      })

      return this.state.element.kendoblock;
    }


    createTable = () => {
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
          ondblclick: this.tableDblClickHandler
      })

      return this.state.element.table;
  }


  newTitle = () => {
    this.state.element.newtitle = this.CreateElement({
      element: "h1",
      id: "newtitle",
      children: "SPAM MAIL - შემოსული ზარები კატეგორია 1 - ის  მიხედვით",
      className: ["newTitle"],
    })
    return this.state.element.newtitle
  }

}