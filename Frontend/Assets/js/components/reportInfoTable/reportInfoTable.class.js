import Tdg from "../../tdg.class.js";


export default class reportInfoTable extends Tdg {
    constructor(data){
        super();
        this.state = {
            element: [],
            tableData: data
        };
        
    }

    init = () => {

        this.state.mainDivtitle = this.CreateElement({
            element: "h1",
            attributes: ["title"],
            style: {
                color: "#269FFF",
                fontFamily: "BPG",
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center'
            },
            children: this.state.tableData.title
        })

        this.state.mainDivbutton = this.CreateElement({
            element: "button",
            attributes: ["button"],
            style: {
                width: '60px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'transparent',
                fontFamily: "BPG",
                fontSize: '15px',
                padding: '10px',
                color: '#8095FF',
                border: '1px solid #8095FF'
            },
            children: this.state.tableData.button
        })

        this.state.mainDivTable = this.CreateElement({
            element: "div",
            attributes: ["mainDiv"],
        })

        this.state.mainDiv = this.CreateElement({
            element: "div",
            style:{
                display:"flex",
                flexDirection:"column",
            }
        }, this.CreateElement({
            element: "div",
            style: {
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "10px",
            }
        }, this.state.mainDivtitle,this.state.mainDivbutton),
        this.state.mainDivTable)

        this.state.tableData.column.forEach(element => {
            var ind = this.state.tableData.column.indexOf(element);

            this.append(this.state.mainDivTable, this.CreateElement({
                element: "div"
            }, this.CreateElement({
                element: "fieldName",
                children: element.field
            }), this.CreateElement({
                element: "fieldData",
                children: this.state.tableData.data[ind].value
            })))
        });

        return this.state.mainDiv;
    }

}
