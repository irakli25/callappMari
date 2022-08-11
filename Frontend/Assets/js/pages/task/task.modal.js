import Tdg from "../../tdg.class.js";
import TaskCase from "./task.case.js";

export default class TaskModal extends Tdg {

    constructor(prop) {
        super()

        self.TaskModal = this

        this.state = {

            dom: this.CreateElement({
                element: "interface",
                attributes: ["task"]
            }),
            interface: [],
            prop: prop,
            task_prop: prop,
            id: prop.id,
            source: prop.source
        }
        

    }

    init = () => {

        this.build()
        return this.state.dom

    }


    build = async () => {

        this.append(this.state.dom, await new TaskCase(this.state.task_prop).init())

    }
}