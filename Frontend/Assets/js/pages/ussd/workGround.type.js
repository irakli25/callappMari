import Tdg from "../../tdg.class.js";
import Input from "../../components/input/input.class.js";
import Datetime from "../../components/datetime/datetime.class.js";
import { kendo_SelectedID, kendo_setIndex, kendo_setValueByID } from "../../helpers/kendo.helper.js";
import Selector from "../../components/selector/selector.class.js";

import TabHistory from "./tabs/history.class.js";
import TabQuestion from "./tabs/question.tab.js";
import TabComment from "./tabs/comment.tab.js";
import TabMail from "./tabs/mail.tab.js";
import TabRecord from "./tabs/record.tab.js";
import TabSms from "./tabs/sms.tab.js";
import TabTask from "./tabs/task.tab.js";
import TabFile from "./tabs/file.tab.js";
import TabLogs from "./tabs/logs.class.js";
import TabNews from "./tabs/news.tab.js";
import TabDetail from "./tabs/detail.tab.js";
import TabLink from "./tabs/link.tab.js";
import Button from "../../components/button/button.class.js";
import Uploader from "../../components/uploader/uploader.class.js";
export default class WorkGround extends Tdg {

    constructor(prop, hide = false) {
        super();

        self.WorkGround = this;
        self.selector = Selector;

        this.state = {
            interface: this.CreateElement({
                element: "interface",
                attributes: ["workground"],
                "grid-column": 2
            }),
            element: [],
            fieldset: [],
            tab: [],
            inputs: [],
            multilevels: [],
            multilevelType: [],
            prop: prop,
            addInput: [],
            showtabs: hide,
            fiedsetarray: [],
            currentTab: '',
            oldTab: '',
            ussd: []
        }

    }


    /**
     * INITIALIZE RIG
     */
    init = async () => {

        if (!this.state.showtabs) {
            await this.build()
            return this.state.interface

        } else {

            this.getTabContentForTask(this.state.prop.key);
            return this.state.interface
        }

    }

    /**
     * WORKGROUND INTERFACE
     * @returns {element} Workground Interface
     */
    build = async () => {

        this.buildTab()

    }

    getTabContentForTask = async (key) => {
        switch (key) {
            case "info":
                self.WorkGround.getInfoPage()
                break;
            case "history":
                await new TabHistory().init();
                break;
            case "task":
                new TabTask().init();
                break;
            case "question":
                new TabQuestion().init()
                break;
            case "sms":
                new TabSms().init()
                break;
            case "mail":
                new TabMail().init();
                break;
            case "comment":
                new TabComment().init();
                break;
            case "record":
                new TabRecord().init();
                break;
            case "file":
                new TabFile().init();
                break;
            case "log":
                new TabLogs().init();
                break;
            case "news":
                new TabNews().init();
                break;
            case "detail":
                new TabDetail().init();
                break;
        }
    }


    createTab = async () => {

        this.state.element.tab = this.CreateElement({
            element: "tab",
            attributes: ["incomming"]
        })

        let data = [{
            key: "info",
            title: "ინფო"
        },
        {
            key: "link",
            title: "ლინკი"
        },
        {
            key: "history",
            title: "ისტორია"
        },
        {
            key: "task",
            title: "დავალება"
        },
        {
            key: "question",
            title: "შეკითხვა"
        },
        {
            key: "sms",
            title: "SMS"
        },
        {
            key: "mail",
            title: "Mail"
        },
        {
            key: "comment",
            title: "კომენტარი"
        },
        {
            key: "record",
            title: "ჩანაწერი"
        },
        {
            key: "file",
            title: "ფაილები"
        },
        {
            key: "log",
            title: "ლოგები"
        },
        {
            key: "news",
            title: "სიახლეები"
        },
        {
            key: "detail",
            title: "დეტალები"
        }


        ]

        typeof data == 'object' && data.length > 0 && data.forEach(x => this.append(this.state.element.tab, this.createTabItem(x)))

        return this.state.element.tab;

    }

    createTabItem = (tab) => {

        this.state.element.tabItem = this.CreateElement({
            element: "item",
            attributes: ["svg"],
            key: tab.key,
            title: tab.title,
            style: tab.key == "detail" ? { position: 'absolute', right: '20px' } : {},
            children: `<svg viewBox="0 0 16 16" width="16" height="16">
                            <use xlink:href="Frontend/Assets/images/icons/icons.svg#tab-${tab.key}" />
                        </svg>`,
            onclick: this.handleTabClick
        }, this.CreateElement({
            element: "span",
            text: tab.title,
            style: {
                display: "none",
                visibility: "hidden"
            }
        }))

        if (tab.key == "info") {
            this.state.element.tabItem.click()
        }

        return this.state.element.tabItem

    }

    buildTab = async () => {

        this.append(this.state.interface, await this.createTab());

    }

    checkAndSaveInfoTab = () => {

        if (this.state.oldTab == 'info') {

            self.Ussd.ussdSaveButton()
        }

    }

    // loading before get response

    handleTabClick = function () {

        Object.values(self.WorkGround.state.fieldset).forEach(x => x.remove())

        // self.Helper.setLoadingForm(self.WorkGround.state.interface)

        self.WorkGround.state.element.tab.childNodes.forEach(x => {
            x.removeAttribute("actived")
            x.children[1].style.display = "none"
            x.children[1].style.visibility = "hidden"

        })

        let key = this.getAttribute("key");

        if (self.WorkGround.state.currentTab == 'info') {
            self.WorkGround.state.oldTab = "info"
            if (key != 'info') self.WorkGround.checkAndSaveInfoTab();
        } else {
            self.WorkGround.state.oldTab = false
        }


        $('interface[workground] > div').remove();

        switch (key) {
            case "info":
                self.WorkGround.getInfoPage()
                break;
            case "link":
                new TabLink().init();

                break;
            case "history":
                new TabHistory().init();

                break;
            case "task":
                new TabTask().init();

                break;
            case "question":
                new TabQuestion().init()

                break;
            case "sms":
                new TabSms().init()

                break;
            case "mail":
                new TabMail().init();

                break;
            case "comment":
                new TabComment().init();

                break;
            case "record":
                new TabRecord().init();

                break;
            case "file":
                new TabFile().init();

                break;
            case "log":
                new TabLogs().init();

                break;
            case "news":
                new TabNews().init();

                break;
            case "detail":
                new TabDetail().init();

                break;
        }


        self.WorkGround.state.currentTab = key;


        this.children[1].style = { display: "inline-block", visibility: "visible" }

        this.setAttribute("actived", true)



    }


    getInfoPage = async () => {

        this.state.inputs = [];
        this.state.multilevels = [];
        this.state.inputData = await this.getResponse({
            route: "Automator",
            act: "getGeneratedInputs",
            pageKey: "incommingRequest",
            id: this.state.prop.id
        })

        var tmpTab = this.state.inputData[0].tabs[0];
        this.state.inputData[0].tabs[0] = { tabName: "USSD ინფორმაცია", inputs: [], check: "ussd" };
        this.state.inputData[0].tabs.push(tmpTab);

        this.state.inputData.length > 0 && this.state.inputData.forEach((x, i) => this.buildInfoInputData(x, i));

        this.state.clicktabItem.click();

        this.createUssdContent();
        // console.log(this.state.inputData)

    }

    /**
     * 
     * @param {Object} field 
     * @param {Number} i 
     */
    buildInfoInputData = async (field, i) => {

        await this.createFieldSet(field, i)

    }


    createFieldSet = (field, i) => {

        let fieldsetName = this.geo_to_latin(field.fieldsetName)

        this.state.fieldset[fieldsetName] = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            index: i,
            title: field.fieldsetName
        })

        this.state.fiedsetarray.push(this.state.fieldset[fieldsetName]);

        this.append(this.state.interface, this.state.fieldset[fieldsetName])

        typeof field.inputs != "undefined" && field.inputs.length > 0 && field.inputs.forEach(x => this.buildInfoInput(x, this.state.fieldset[fieldsetName]))

        field.tabs.length > 0 && this.createInfoTab(field.tabs, this.state.fieldset[fieldsetName], i)

    }


    createInfoTab = (tab, fieldset, i) => {

        this.state.tab[i] = this.CreateElement({
            element: "tab",
            attributes: ["fieldset"],
            "grid-column": "max"
        })

        this.append(fieldset, this.state.tab[i])
        tab.forEach((x, ii) => this.buildInfoTab(x, ii, this.state.tab[i], fieldset))

    }

    buildInfoTab = async (data, i, tab, fieldset) => {

        let content = this.CreateElement({
            element: "tabcontent",
            attributes: ["hidden"],
            "grid-column": "max",
        })

        if (typeof (data.check) != "undefined") {
            this.state.ussd.ussdTab = content;
            this.state.ussd.ussdTab.setAttribute("ussdTab", "true");
        }

        let tabItem = this.CreateElement({
            element: "item",
            text: data.tabName,
            onclick: (e) => this.handleInfoTabItem(e.target, content, tab, fieldset)
        })

        this.append(tab, tabItem);

        if (i == 0) {
            this.state.clicktabItem = tabItem;
        }

        this.append(fieldset, content);

        data.inputs.length > 0 && data.inputs.forEach(x => this.buildInfoInput(x, content))

    }

    handleInfoTabItem = (e, content, tab, fieldset) => {

        tab.childNodes.forEach(x => x.removeAttribute("actived"))

        fieldset.childNodes.forEach(x => {
            if (x.localName == "tab") return false;
            x.setAttribute("hidden", true)
        })

        let tabs = Array.prototype.slice.call(fieldset.children[0].children);
        this.showhidefieldset(tabs.indexOf(e));

        e.setAttribute("actived", true);

        content.removeAttribute("hidden");

    }

    showhidefieldset = (tabindex) => {
        this.state.fiedsetarray.forEach(element => {
            if (tabindex == 0) {
                element.getAttribute("index") == 3 ? element.style.display = "none" : ""
                element.getAttribute("index") == 2 ? element.style.display = "grid" : ""
            } else if (tabindex == 1) {
                element.getAttribute("index") == 3 ? element.style.display = "grid" : ""
                element.getAttribute("index") == 2 ? element.style.display = "none" : ""
            }

        });
    }

    addAdditionalSelections = (fieldset) => {
        let randomNumber = this.generateRandomNumberForInputs(100, 999);
        this.state.addInput[randomNumber] = [];

        let additionalInputsArea = this.CreateElement({
            element: "inputArea",
            id: "inputArea_" + randomNumber,
            style: {
                "grid-column": "1 / -1",
                display: "grid",
                gap: "20px",
                "grid-template-columns": "repeat(auto-fill, minmax(100px, 1fr))",
                "grid-auto-flow": "row dense"
            }
        });
        this.state.multilevels.forEach(x => {

            if (x.getAttribute('type_2') != null) {
                var additional_level = this.CreateElement({
                    element: "kendo",
                    type: "selector",
                    id: x.getAttribute('id') + '--' + randomNumber,
                    title: x.getAttribute('title'),
                    custom: x.getAttribute('custom'),
                    style: {
                        "grid-column": "auto / span 2"
                    }
                });

            }
            else {
                var additional_level = this.CreateElement({
                    element: "kendo",
                    type: "selector",
                    id: x.getAttribute('id') + '--' + randomNumber,
                    title: x.getAttribute('title'),
                    custom: x.getAttribute('custom'),
                    style: {
                        "grid-column": "auto / span 2"
                    }
                });
            }


            this.state.addInput[randomNumber].push(additional_level);

            //this.append(additionalInputsArea, additional_level);
        });


        this.append(additionalInputsArea, this.state.addInput[randomNumber][0], false, (cb) => {
            let id = kendo_SelectedID(cb.sender.element[0])
            new Selector().setDataSource({
                element: this.state.addInput[randomNumber][1],
                data: {
                    route: "Automator",
                    act: "getLevel",
                    index: 1,
                    id: id,
                    inputKey: $(this.state.addInput[randomNumber][0]).attr("id")
                }
            })
        });
        this.append(additionalInputsArea, this.state.addInput[randomNumber][1], false, (cb) => {
            let id = kendo_SelectedID(cb.sender.element[0])
            new Selector().setDataSource({
                element: this.state.addInput[randomNumber][2],
                data: {
                    route: "Automator",
                    act: "getLevel",
                    index: 1,
                    id: id,
                    inputKey: $(this.state.addInput[randomNumber][0]).attr("id")
                }
            })
        });
        this.append(additionalInputsArea, this.state.addInput[randomNumber][2]);
        this.append(additionalInputsArea, this.state.addInput[randomNumber][3]);




        let additionalButtonsArea = this.CreateElement({
            element: "buttonArea",
            style: {
                display: "inline-flex",
                gap: "15px"
            }
        });

        let buttonMinus = this.CreateElement({
            element: "icon",
            name: "buttonMinus",
            onclick: function () {
                // console.log(this.state.inputs);
                // this.remove()

                delete self.WorkGround.state.addInput[randomNumber]
                document.getElementById('inputArea_' + randomNumber).remove();
            },


            children: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 12H20" stroke="#BEBEBE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`,
            style: {
                display: "flex",
                cursor: "pointer",
                width: "fit-content",
                "align-items": "center"
            }
        })
        this.append(additionalButtonsArea, buttonMinus);

        let buttonDocuments = this.CreateElement({
            element: "icon",
            name: "buttonDocuments",
            children: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 16H9C8.73478 16 8.48043 16.1054 8.29289 16.2929C8.10536 16.4804 8 16.7348 8 17C8 17.2652 8.10536 17.5196 8.29289 17.7071C8.48043 17.8946 8.73478 18 9 18H15C15.2652 18 15.5196 17.8946 15.7071 17.7071C15.8946 17.5196 16 17.2652 16 17C16 16.7348 15.8946 16.4804 15.7071 16.2929C15.5196 16.1054 15.2652 16 15 16Z" fill="#BEBEBE"/>
                            <path d="M9 14H12C12.2652 14 12.5196 13.8946 12.7071 13.7071C12.8946 13.5196 13 13.2652 13 13C13 12.7348 12.8946 12.4804 12.7071 12.2929C12.5196 12.1054 12.2652 12 12 12H9C8.73478 12 8.48043 12.1054 8.29289 12.2929C8.10536 12.4804 8 12.7348 8 13C8 13.2652 8.10536 13.5196 8.29289 13.7071C8.48043 13.8946 8.73478 14 9 14Z" fill="#BEBEBE"/>
                            <path d="M19.74 8.33018L14.3 2.33018C14.2065 2.22659 14.0924 2.14371 13.9649 2.08688C13.8375 2.03004 13.6995 2.00051 13.56 2.00018H6.56C6.22775 1.99622 5.89797 2.05774 5.5895 2.18124C5.28103 2.30473 4.9999 2.48778 4.76218 2.71993C4.52446 2.95209 4.33479 3.22879 4.20402 3.53425C4.07324 3.8397 4.00392 4.16793 4 4.50018V19.5002C4.00392 19.8324 4.07324 20.1607 4.20402 20.4661C4.33479 20.7716 4.52446 21.0483 4.76218 21.2804C4.9999 21.5126 5.28103 21.6956 5.5895 21.8191C5.89797 21.9426 6.22775 22.0041 6.56 22.0002H17.44C17.7723 22.0041 18.102 21.9426 18.4105 21.8191C18.719 21.6956 19.0001 21.5126 19.2378 21.2804C19.4755 21.0483 19.6652 20.7716 19.796 20.4661C19.9268 20.1607 19.9961 19.8324 20 19.5002V9.00018C19.9994 8.75234 19.9067 8.51358 19.74 8.33018ZM14 5.00018L16.74 8.00018H14.74C14.6353 7.99386 14.5329 7.96674 14.4387 7.92041C14.3446 7.87408 14.2607 7.80947 14.1918 7.73034C14.1229 7.65122 14.0704 7.55916 14.0375 7.45955C14.0046 7.35994 13.9918 7.25477 14 7.15018V5.00018ZM17.44 20.0002H6.56C6.49037 20.0042 6.42063 19.9945 6.35477 19.9715C6.28892 19.9486 6.22824 19.9129 6.17621 19.8664C6.12419 19.82 6.08184 19.7637 6.0516 19.7009C6.02137 19.638 6.00383 19.5698 6 19.5002V4.50018C6.00383 4.43054 6.02137 4.36234 6.0516 4.2995C6.08184 4.23665 6.12419 4.18039 6.17621 4.13394C6.22824 4.08749 6.28892 4.05176 6.35477 4.02881C6.42063 4.00586 6.49037 3.99613 6.56 4.00018H12V7.15018C11.9839 7.8868 12.2598 8.59991 12.7675 9.13385C13.2752 9.6678 13.9735 9.97923 14.71 10.0002H18V19.5002C17.9962 19.5698 17.9786 19.638 17.9484 19.7009C17.9182 19.7637 17.8758 19.82 17.8238 19.8664C17.7718 19.9129 17.7111 19.9486 17.6452 19.9715C17.5794 19.9945 17.5096 20.0042 17.44 20.0002Z" fill="#BEBEBE"/>
                        </svg>`,
            style: {
                display: "flex",
                cursor: "pointer",
                width: "fit-content",
                "align-items": "center"
            }
        })
        // this.append(additionalButtonsArea, buttonDocuments);

        let buttonContacts = this.CreateElement({
            element: "icon",
            name: "buttonContacts",
            children: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 6H20V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4C18.7348 4 18.4804 4.10536 18.2929 4.29289C18.1054 4.48043 18 4.73478 18 5V6H17C16.7348 6 16.4804 6.10536 16.2929 6.29289C16.1054 6.48043 16 6.73478 16 7C16 7.26522 16.1054 7.51957 16.2929 7.70711C16.4804 7.89464 16.7348 8 17 8H18V9C18 9.26522 18.1054 9.51957 18.2929 9.70711C18.4804 9.89464 18.7348 10 19 10C19.2652 10 19.5196 9.89464 19.7071 9.70711C19.8946 9.51957 20 9.26522 20 9V8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6Z" fill="#BEBEBE"/>
                            <path d="M10 11C10.7911 11 11.5645 10.7654 12.2223 10.3259C12.8801 9.88635 13.3928 9.26164 13.6955 8.53074C13.9983 7.79983 14.0775 6.99556 13.9231 6.21964C13.7688 5.44372 13.3878 4.73098 12.8284 4.17157C12.269 3.61216 11.5563 3.2312 10.7804 3.07686C10.0044 2.92252 9.20017 3.00173 8.46927 3.30448C7.73836 3.60723 7.11365 4.11992 6.67412 4.77772C6.2346 5.43552 6 6.20888 6 7C6 8.06087 6.42143 9.07828 7.17157 9.82843C7.92172 10.5786 8.93913 11 10 11ZM10 5C10.3956 5 10.7822 5.1173 11.1111 5.33706C11.44 5.55683 11.6964 5.86918 11.8478 6.23463C11.9991 6.60009 12.0387 7.00222 11.9616 7.39018C11.8844 7.77814 11.6939 8.13451 11.4142 8.41422C11.1345 8.69392 10.7781 8.8844 10.3902 8.96157C10.0022 9.03874 9.60009 8.99914 9.23463 8.84776C8.86918 8.69639 8.55682 8.44004 8.33706 8.11114C8.1173 7.78224 8 7.39556 8 7C8 6.46957 8.21071 5.96086 8.58579 5.58579C8.96086 5.21072 9.46957 5 10 5Z" fill="#BEBEBE"/>
                            <path d="M10 13C8.14348 13 6.36301 13.7375 5.05025 15.0503C3.7375 16.363 3 18.1435 3 20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21C4.26522 21 4.51957 20.8946 4.70711 20.7071C4.89464 20.5196 5 20.2652 5 20C5 18.6739 5.52678 17.4021 6.46447 16.4645C7.40215 15.5268 8.67392 15 10 15C11.3261 15 12.5979 15.5268 13.5355 16.4645C14.4732 17.4021 15 18.6739 15 20C15 20.2652 15.1054 20.5196 15.2929 20.7071C15.4804 20.8946 15.7348 21 16 21C16.2652 21 16.5196 20.8946 16.7071 20.7071C16.8946 20.5196 17 20.2652 17 20C17 18.1435 16.2625 16.363 14.9497 15.0503C13.637 13.7375 11.8565 13 10 13Z" fill="#BEBEBE"/>
                        </svg>`,
            style: {
                display: "flex",
                cursor: "pointer",
                width: "fit-content",
                "align-items": "center"
            }
        })



        // this.append(additionalButtonsArea, buttonContacts);
        this.append(additionalInputsArea, additionalButtonsArea);
        this.append(fieldset, additionalInputsArea);

    }

    generateRandomNumberForInputs = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    /**
     * 
     * @param {*} inputData 
     * @param {*} lvl_1_name 
     * @param {*} lvl_2_name 
     * @param {*} lvl_3_name 
     * @param {*} lvl_1_param 
     * @param {*} lvl_2_param 
     * @param {*} lvl_3_param 
     */
    createAdditionalInputsFromReuqest = (inputData, fieldset, lvl_1_name, lvl_2_name, lvl_3_name, lvl_1_param, lvl_2_param, lvl_3_param) => {

        let randomNumber = inputData['input_number'];
        this.state.addInput[randomNumber] = [];

        let additionalInputsArea = this.CreateElement({
            element: "inputArea",
            id: "inputArea_" + randomNumber,
            style: {
                "grid-column": "1 / -1",
                display: "grid",
                gap: "20px",
                "grid-template-columns": "repeat(auto-fill, minmax(100px, 1fr))",
                "grid-auto-flow": "row dense"
            }
        });

        var additional_level_1 = this.CreateElement({
            element: "kendo",
            type: "selector",
            id: inputData['input_key'] + '--1--' + randomNumber,
            title: lvl_1_name,
            custom: lvl_1_param,
            value: (typeof inputData['level_value_2'] != 'undefined' ? inputData['level_value_2'] : 0),
            style: {
                "grid-column": "auto / span 2"
            }
        });

        var additional_level_2 = this.CreateElement({
            element: "kendo",
            type: "selector",
            id: inputData['input_key'] + '--2--' + randomNumber,
            title: lvl_2_name,
            custom: lvl_2_param,
            value: (typeof inputData['level_value_3'] != 'undefined' ? inputData['level_value_3'] : 0),
            style: {
                "grid-column": "auto / span 2"
            }
        });

        var additional_level_3 = this.CreateElement({
            element: "kendo",
            type: "selector",
            id: inputData['input_key'] + '--3--' + randomNumber,
            title: lvl_3_name,
            custom: lvl_3_param,
            value: (typeof inputData['level_value_4'] != 'undefined' ? inputData['level_value_4'] : 0),
            style: {
                "grid-column": "auto / span 2"
            }
        });



        this.state.addInput[randomNumber].push(additional_level_1);
        this.append(additionalInputsArea, additional_level_1, false, (cb) => {

            let id = kendo_SelectedID(cb.sender.element[0])
            new Selector().setDataSource({
                element: additional_level_2,
                data: {
                    route: "Automator",
                    act: "getLevel",
                    index: 1,
                    id: id,
                    inputKey: inputData['input_key']
                }
            })
        });

        this.state.addInput[randomNumber].push(additional_level_2);
        this.append(additionalInputsArea, additional_level_2, false, (cb) => {

            let id = kendo_SelectedID(cb.sender.element[0])
            new Selector().setDataSource({
                element: additional_level_3,
                data: {
                    route: "Automator",
                    act: "getLevel",
                    index: 1,
                    id: id,
                    inputKey: inputData['input_key']
                }
            })
        });

        this.state.addInput[randomNumber].push(additional_level_3);
        this.append(additionalInputsArea, additional_level_3);



        let additionalButtonsArea = this.CreateElement({
            element: "buttonArea",
            style: {
                display: "inline-flex",
                gap: "15px"
            }
        });

        let buttonMinus = this.CreateElement({
            element: "icon",
            name: "buttonMinus",
            onclick: function () {
                // console.log(this.state.inputs);
                // this.remove()

                delete self.WorkGround.state.addInput[randomNumber]
                document.getElementById('inputArea_' + randomNumber).remove();
            },


            children: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M4 12H20" stroke="#BEBEBE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>`,
            style: {
                display: "flex",
                cursor: "pointer",
                width: "fit-content",
                "align-items": "center"
            }
        })
        this.append(additionalButtonsArea, buttonMinus);

        let buttonDocuments = this.CreateElement({
            element: "icon",
            name: "buttonDocuments",
            children: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 16H9C8.73478 16 8.48043 16.1054 8.29289 16.2929C8.10536 16.4804 8 16.7348 8 17C8 17.2652 8.10536 17.5196 8.29289 17.7071C8.48043 17.8946 8.73478 18 9 18H15C15.2652 18 15.5196 17.8946 15.7071 17.7071C15.8946 17.5196 16 17.2652 16 17C16 16.7348 15.8946 16.4804 15.7071 16.2929C15.5196 16.1054 15.2652 16 15 16Z" fill="#BEBEBE"/>
                            <path d="M9 14H12C12.2652 14 12.5196 13.8946 12.7071 13.7071C12.8946 13.5196 13 13.2652 13 13C13 12.7348 12.8946 12.4804 12.7071 12.2929C12.5196 12.1054 12.2652 12 12 12H9C8.73478 12 8.48043 12.1054 8.29289 12.2929C8.10536 12.4804 8 12.7348 8 13C8 13.2652 8.10536 13.5196 8.29289 13.7071C8.48043 13.8946 8.73478 14 9 14Z" fill="#BEBEBE"/>
                            <path d="M19.74 8.33018L14.3 2.33018C14.2065 2.22659 14.0924 2.14371 13.9649 2.08688C13.8375 2.03004 13.6995 2.00051 13.56 2.00018H6.56C6.22775 1.99622 5.89797 2.05774 5.5895 2.18124C5.28103 2.30473 4.9999 2.48778 4.76218 2.71993C4.52446 2.95209 4.33479 3.22879 4.20402 3.53425C4.07324 3.8397 4.00392 4.16793 4 4.50018V19.5002C4.00392 19.8324 4.07324 20.1607 4.20402 20.4661C4.33479 20.7716 4.52446 21.0483 4.76218 21.2804C4.9999 21.5126 5.28103 21.6956 5.5895 21.8191C5.89797 21.9426 6.22775 22.0041 6.56 22.0002H17.44C17.7723 22.0041 18.102 21.9426 18.4105 21.8191C18.719 21.6956 19.0001 21.5126 19.2378 21.2804C19.4755 21.0483 19.6652 20.7716 19.796 20.4661C19.9268 20.1607 19.9961 19.8324 20 19.5002V9.00018C19.9994 8.75234 19.9067 8.51358 19.74 8.33018ZM14 5.00018L16.74 8.00018H14.74C14.6353 7.99386 14.5329 7.96674 14.4387 7.92041C14.3446 7.87408 14.2607 7.80947 14.1918 7.73034C14.1229 7.65122 14.0704 7.55916 14.0375 7.45955C14.0046 7.35994 13.9918 7.25477 14 7.15018V5.00018ZM17.44 20.0002H6.56C6.49037 20.0042 6.42063 19.9945 6.35477 19.9715C6.28892 19.9486 6.22824 19.9129 6.17621 19.8664C6.12419 19.82 6.08184 19.7637 6.0516 19.7009C6.02137 19.638 6.00383 19.5698 6 19.5002V4.50018C6.00383 4.43054 6.02137 4.36234 6.0516 4.2995C6.08184 4.23665 6.12419 4.18039 6.17621 4.13394C6.22824 4.08749 6.28892 4.05176 6.35477 4.02881C6.42063 4.00586 6.49037 3.99613 6.56 4.00018H12V7.15018C11.9839 7.8868 12.2598 8.59991 12.7675 9.13385C13.2752 9.6678 13.9735 9.97923 14.71 10.0002H18V19.5002C17.9962 19.5698 17.9786 19.638 17.9484 19.7009C17.9182 19.7637 17.8758 19.82 17.8238 19.8664C17.7718 19.9129 17.7111 19.9486 17.6452 19.9715C17.5794 19.9945 17.5096 20.0042 17.44 20.0002Z" fill="#BEBEBE"/>
                        </svg>`,
            style: {
                display: "flex",
                cursor: "pointer",
                width: "fit-content",
                "align-items": "center"
            }
        })
        this.append(additionalButtonsArea, buttonDocuments);

        let buttonContacts = this.CreateElement({
            element: "icon",
            name: "buttonContacts",
            children: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M21 6H20V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4C18.7348 4 18.4804 4.10536 18.2929 4.29289C18.1054 4.48043 18 4.73478 18 5V6H17C16.7348 6 16.4804 6.10536 16.2929 6.29289C16.1054 6.48043 16 6.73478 16 7C16 7.26522 16.1054 7.51957 16.2929 7.70711C16.4804 7.89464 16.7348 8 17 8H18V9C18 9.26522 18.1054 9.51957 18.2929 9.70711C18.4804 9.89464 18.7348 10 19 10C19.2652 10 19.5196 9.89464 19.7071 9.70711C19.8946 9.51957 20 9.26522 20 9V8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6Z" fill="#BEBEBE"/>
                            <path d="M10 11C10.7911 11 11.5645 10.7654 12.2223 10.3259C12.8801 9.88635 13.3928 9.26164 13.6955 8.53074C13.9983 7.79983 14.0775 6.99556 13.9231 6.21964C13.7688 5.44372 13.3878 4.73098 12.8284 4.17157C12.269 3.61216 11.5563 3.2312 10.7804 3.07686C10.0044 2.92252 9.20017 3.00173 8.46927 3.30448C7.73836 3.60723 7.11365 4.11992 6.67412 4.77772C6.2346 5.43552 6 6.20888 6 7C6 8.06087 6.42143 9.07828 7.17157 9.82843C7.92172 10.5786 8.93913 11 10 11ZM10 5C10.3956 5 10.7822 5.1173 11.1111 5.33706C11.44 5.55683 11.6964 5.86918 11.8478 6.23463C11.9991 6.60009 12.0387 7.00222 11.9616 7.39018C11.8844 7.77814 11.6939 8.13451 11.4142 8.41422C11.1345 8.69392 10.7781 8.8844 10.3902 8.96157C10.0022 9.03874 9.60009 8.99914 9.23463 8.84776C8.86918 8.69639 8.55682 8.44004 8.33706 8.11114C8.1173 7.78224 8 7.39556 8 7C8 6.46957 8.21071 5.96086 8.58579 5.58579C8.96086 5.21072 9.46957 5 10 5Z" fill="#BEBEBE"/>
                            <path d="M10 13C8.14348 13 6.36301 13.7375 5.05025 15.0503C3.7375 16.363 3 18.1435 3 20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21C4.26522 21 4.51957 20.8946 4.70711 20.7071C4.89464 20.5196 5 20.2652 5 20C5 18.6739 5.52678 17.4021 6.46447 16.4645C7.40215 15.5268 8.67392 15 10 15C11.3261 15 12.5979 15.5268 13.5355 16.4645C14.4732 17.4021 15 18.6739 15 20C15 20.2652 15.1054 20.5196 15.2929 20.7071C15.4804 20.8946 15.7348 21 16 21C16.2652 21 16.5196 20.8946 16.7071 20.7071C16.8946 20.5196 17 20.2652 17 20C17 18.1435 16.2625 16.363 14.9497 15.0503C13.637 13.7375 11.8565 13 10 13Z" fill="#BEBEBE"/>
                        </svg>`,
            style: {
                display: "flex",
                cursor: "pointer",
                width: "fit-content",
                "align-items": "center"
            }
        })
        this.append(additionalButtonsArea, buttonContacts);

        this.append(additionalInputsArea, additionalButtonsArea);
        this.append(fieldset, additionalInputsArea);

    }

    searchOnclick = async (id, el) => {
        this.state.inputs.forEach(o => {
            if (o.getAttribute("id") == "abonentis_nomeri___019--6--1") {
                this.state.globalClientNumber = o.value;
            }
            if (o.getAttribute("id") == "ganacxadis_nomeri___793--11--1") {
                this.state.globalGancxNumbe = o.value;
            }
        });

        await this.getResponse({
            route: "ussd",
            act: "getSearchData",
            searchby: id,
            phone: this.state.globalPhoneNumber,
            abonent: this.state.globalClientNumber,
            gancxd: this.state.globalGancxNumbe
        }).then((data) => {
            var item = data.Data.customerResult[0];

            el.style.backgroundColor = "var(--sky)";
            el.childNodes.forEach(o => {
                if (o.tagName === "svg") {
                    o.style.stroke = '#fff';
                    o.style.fill = '#fff';
                    o.style.filter = 'brightness(10)';
                }
            })

            this.state.inputs.forEach(o => {
                if (o.getAttribute("id") == "misamarti___180--10--1") {
                    o.value = item.address;
                }
                if (o.getAttribute("id") == "mimdinare_davalianeba___232--9--1") {
                    o.value = item.balance;
                }
                if (o.getAttribute("id") == "blockis_nomeri___300--26--1") {
                    o.value = item.blockName;
                }
                if (o.getAttribute("id") == "abonenti___079--7--1") {
                    o.value = item.customerName;
                }
                if (o.getAttribute("id") == "abonentis_nomeri___019--6--1") {
                    o.value = item.customerNumber;
                }
                if (o.getAttribute("id") == "mshobeli_kvandzi___576--12--1") {
                    o.value = item.parentNode;
                }
                if (o.getAttribute("id") == "abonentis_sp_n___250--8--1") {
                    o.value = item.personalN;
                }
                if (o.getAttribute("id") == "ganacxadis_nomeri___793--11--1") {
                    o.value = item.registrationNumber;
                }
                if (o.getAttribute("id") == "momxmareblis_kategoria___374--4--1") {
                    o.value = item.customerCategory;
                }

                // if(o.getAttribute("id") == "gatishvis_mizezi___903--13--8"){
                //     o.value = item.reason;
                // }
            })
        })

    }

    /**
     * 
     * @param {Object} input 
     */
    buildInfoInput = async (input, fieldset) => {

        let element;
        let column;

        switch (input.input_type) {

            case "input":
                if (input.input_key == "telefoni___987--1--1" || input.input_key == "telefoni___396--21--1") {
                    this.state.globalPhoneNumber = input.input_value == "" ? this.state.prop.telefoni : input.input_value
                }

                if (input.input_key == "abonentis_nomeri___019--6--1") {
                    this.state.globalClientNumber = input.input_value;
                }

                if (input.input_key == "abonenti___079--7--1") {
                    this.state.globalClientName = input.input_value;
                }

                if (input.input_key == "informaciis_ckaro___384--17--1") {
                    if (this.state.prop.call_log_id > 0) {
                        this.state.source_info = await this.getResponse({
                            route: "ussd",
                            act: "get_source_info",
                            id: this.state.prop.call_log_id
                        })

                        input.input_value = input.input_value != "" ? input.input_value : this.state.source_info.number;
                    }

                }

                if (input.input_size == 0) input.input_size = 2
                element = new Input({
                    type: "text",
                    placeholderTitle: input.input_name,
                    column: input.input_size,
                    id: input.input_key,
                    value: (input.input_key == "telefoni___987--1--1" || input.input_key == "telefoni___396--21--1") && input.input_value == "" ? this.state.prop.telefoni : input.input_value,
                    searchShow: input.input_key == "telefoni___987--1--1" || input.input_key == "abonentis_nomeri___019--6--1" || input.input_key == "ganacxadis_nomeri___793--11--1" ? true : false,
                    searchOnclick: input.input_key == "telefoni___987--1--1" || input.input_key == "abonentis_nomeri___019--6--1" || input.input_key == "ganacxadis_nomeri___793--11--1" ? this.searchOnclick : "",
                }).build()

                this.state.inputs.push(element.childNodes[0]);

                if (input.input_value != '') {
                    $(element).children("input").css("border-color", "#1E88E5");
                    $(element).css("color", "#1E88E5")
                } else if (input.input_value.length >= 1) {
                    $(element).children("input").css("border-color", "#1E88E5");
                    $(element).css("color", "#1E88E5")
                } else {
                    // console.log($(element).children("input").attr('type'))

                }

                // if(input.input_value != '') {
                //     $(element).children("input").css("border-color", "#1E88E5");
                //     $(element).css("color", "#1E88E5")
                //     $(element).addClass('field-class');
                //     console.log($(element).children("input").attr('type'))
                //     console.log(input.input_value)
                //     console.log(input.input_value.length)
                // } else if (input.input_value.length >= 1 ){
                //     $(element).children("input").css("border-color", "#1E88E5");
                //     $(element).css("color", "#1E88E5")
                //     $(element).addClass('field-class');
                //     console.log($(element).children("input").attr('type'))
                //     console.log(input.input_value)
                // } else {
                //     $(element).removeClass('field-class');
                //     $(element).addClass('field-class-main');
                //     console.log($(element).children("input").attr('type'))
                //     console.log(input.input_value)
                // }

                break;
            case "textarea":
                if (input.input_size == 0) input.input_size = "max"
                element = new Input({
                    type: "textarea",
                    placeholder: input.input_name,
                    column: input.input_size,
                    id: input.input_key
                }).build()
                element.childNodes[0].value = input.input_value;
                this.state.inputs.push(element.childNodes[0]);
                break;
            case "number":

                break;
            case "date":
                if (input.input_size == 0) {
                    column = `1 / -1`
                } else {
                    column = `auto / span ${input.input_size}`
                }
                element = this.CreateElement({
                    element: "input",
                    type: "date",
                    style: {
                        "grid-column": column
                    }
                })

                break;
            case "datetime":
                if (input.input_size == 0) {
                    column = `1 / -1`
                } else {
                    column = `auto / span ${input.input_size}`
                }
                element = this.CreateElement({
                    element: "input",
                    type: "datetime",
                    style: {
                        "grid-column": column
                    }
                })
                break;
            case "radio":

                break;
            case "checkbox":

                break;
            case "select":
                if (input.input_size == 0) {
                    column = `1 / -1`
                } else {
                    column = `auto / span ${input.input_size}`
                }


                if (input.input_key == 'komunikaciis_arxi--16--8') {
                    var new_vew = 0;

                    if (this.state.prop.source == "phone") {
                        new_vew = 1;
                    } else if (this.state.prop.source == "chat") {
                        new_vew = 2;
                    } else if (this.state.prop.source == "messenger") {
                        new_vew = 3;
                    } else if (this.state.prop.source == "mail") {
                        new_vew = 4;
                    }

                    if (!(this.state.prop.source_id > 0)) {
                        new_vew = 16;
                    }

                    input.input_value = input.input_value > 0 ? input.input_value : new_vew;
                }


                if (input.input_key == 'momartvis_tipi___627--19--8') {
                    element = this.CreateElement({
                        element: "kendo",
                        type: "selector",
                        type_2: "multilevel_status",
                        title: input.input_name,
                        custom: input.input_parameters,
                        id: input.input_key,
                        value: (typeof input.input_value != 'undefined' ? input.input_value : 0),
                        style: {
                            "grid-column": column
                        }
                    })

                    this.state.addInput.forEach((x, i) => {
                        let additionalElement = this.CreateElement({
                            element: "kendo",
                            type: "selector",
                            type_2: "multilevel_status",
                            title: input.input_name,
                            custom: input.input_parameters,
                            id: input.input_key + '--' + i,
                            style: {
                                "grid-column": column
                            }
                        });

                        $('#inputArea_' + i + ' > buttonArea:last').before(additionalElement);
                        this.state.addInput[i].push(additionalElement);
                        new Selector(additionalElement).init();
                        kendo_setValueByID(additionalElement, 8)

                    })


                    this.state.multilevels.push(element);
                }
                else {
                    let source_id = 0;
                    if (input.input_key == "komunikaciis_arxi--16--8") {

                        if (this.state.prop.source_id == 3) {
                            source_id = 6;
                        }

                        if (this.state.prop.source_id == 2) {
                            source_id = 4;
                        }

                        if (this.state.prop.source_id == 4) {
                            source_id = 7;
                        }
                    }

                    element = this.CreateElement({
                        element: "kendo",
                        type: "selector",
                        title: input.input_name,
                        custom: input.input_parameters,
                        id: input.input_key,
                        value: source_id > 0 ? source_id : (typeof input.input_value != 'undefined' ? input.input_value : 0),
                        style: {
                            "grid-column": column
                        }
                    })
                }


                this.state.inputs.push(element);

                break;
            case "multiselect":

                break;
            case "multilevelselect":

                if (input.input_size == 0) {
                    column = `1 / -1`
                } else {
                    column = `auto / span ${input.input_size}`
                }


                let level_1 = this.CreateElement({
                    element: "kendo",
                    type: "selector",
                    id: input.input_key + '--1',
                    title: input.level_1_name,
                    custom: input.level_1_parameters,
                    value: (typeof input.level_1_value != 'undefined' ? input.level_1_value : 0),
                    style: {
                        "grid-column": column
                    }
                })

                let level_2 = this.CreateElement({
                    element: "kendo",
                    type: "selector",
                    id: input.input_key + '--2',
                    title: input.level_2_name,
                    custom: input.level_2_parameters,
                    value: (typeof input.level_2_value != 'undefined' ? input.level_2_value : 0),
                    style: {
                        "grid-column": column
                    }
                })

                let level_3 = this.CreateElement({
                    element: "kendo",
                    type: "selector",
                    id: input.input_key + '--3',
                    title: input.level_3_name,
                    custom: input.level_3_parameters,
                    value: (typeof input.level_3_value != 'undefined' ? input.level_3_value : 0),
                    style: {
                        "grid-column": column
                    }
                })

                this.state.inputs.push(level_1);
                this.state.inputs.push(level_2);
                this.state.inputs.push(level_3);

                this.state.multilevels.push(level_1);
                this.state.multilevels.push(level_2);
                this.state.multilevels.push(level_3);

                this.append(fieldset, level_1, false, (cb) => {

                    let id = kendo_SelectedID(cb.sender.element[0])
                    new Selector().setDataSource({
                        element: level_2,
                        data: {
                            route: "Automator",
                            act: "getLevel",
                            index: 1,
                            id: id,
                            inputKey: input.input_key
                        }
                    })
                })

                this.append(fieldset, level_2, false, async (cb) => {
                    let id1 = kendo_SelectedID(level_1);
                    let id2 = kendo_SelectedID(level_2);
                    let id3 = kendo_SelectedID(level_3);
                    if (id1 > 0) {
                        let id = kendo_SelectedID(cb.sender.element[0])
                        new Selector().setDataSource({
                            element: level_3,
                            data: {
                                route: "Automator",
                                act: "getLevel",
                                index: 1,
                                id: id,
                                inputKey: input.input_key
                            }
                        })
                    } else {
                        var parent_id = await this.getResponse({
                            route: "ussd",
                            act: "get_parent_id",
                            id: id2
                        })

                        var x = $(level_1).data("kendoDropDownList");
                        x.value(parent_id.second);
                        x.trigger("change");
                        x.refresh();

                        new Selector().setDataSource({
                            element: level_1,
                            data: {
                                route: "ussd",
                                act: "get_call_types",
                                id: parent_id.first,
                            }
                        })
                    }



                })


                this.append(fieldset, level_3, false, async (cb) => {

                    let id1 = kendo_SelectedID(level_1);
                    let id2 = kendo_SelectedID(level_2);
                    let id3 = kendo_SelectedID(level_3);

                    if (id1 == 0 && id2 == 0 && id3 > 0) {
                        var parent_id = await this.getResponse({
                            route: "ussd",
                            act: "get_parent_id",
                            id: id3
                        })

                        var x = $(level_2).data("kendoDropDownList");
                        x.value(parent_id.second);
                        x.trigger("change");
                        x.refresh();

                        new Selector().setDataSource({
                            element: level_2,
                            data: {
                                route: "ussd",
                                act: "get_call_types",
                                id: parent_id.first,
                            }
                        })
                    }

                })


                input.additionals.length > 0 && input.additionals.forEach(x => this.createAdditionalInputsFromReuqest(x, fieldset, input.level_1_name, input.level_2_name, input.level_3_name, input.level_1_parameters, input.level_2_parameters, input.level_3_parameters));



                break;
            default:
                if (typeof input.multipleButtons != 'undefined') {
                    let additionalButtonsArea = this.CreateElement({
                        element: "buttonArea",
                        style: {
                            display: "inline-flex",
                            gap: "15px"
                        }
                    });

                    if (input.multipleButtons.buttonAdd) {
                        let buttonAdd = this.CreateElement({
                            element: "icon",
                            name: "buttonAdd",
                            onclick: () => {
                                this.addAdditionalSelections(fieldset);
                            },
                            children: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M12 4V20" stroke="#BEBEBE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M4 12H20" stroke="#BEBEBE" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>`,
                            style: {
                                display: "flex",
                                cursor: "pointer",
                                width: "fit-content",
                                "align-items": "center"
                            }
                        })
                        this.append(additionalButtonsArea, buttonAdd);
                    }
                    if (input.multipleButtons.buttonDocuments) {
                        let buttonDocuments = this.CreateElement({
                            element: "icon",
                            name: "buttonDocuments",
                            children: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M15 16H9C8.73478 16 8.48043 16.1054 8.29289 16.2929C8.10536 16.4804 8 16.7348 8 17C8 17.2652 8.10536 17.5196 8.29289 17.7071C8.48043 17.8946 8.73478 18 9 18H15C15.2652 18 15.5196 17.8946 15.7071 17.7071C15.8946 17.5196 16 17.2652 16 17C16 16.7348 15.8946 16.4804 15.7071 16.2929C15.5196 16.1054 15.2652 16 15 16Z" fill="#BEBEBE"/>
                                            <path d="M9 14H12C12.2652 14 12.5196 13.8946 12.7071 13.7071C12.8946 13.5196 13 13.2652 13 13C13 12.7348 12.8946 12.4804 12.7071 12.2929C12.5196 12.1054 12.2652 12 12 12H9C8.73478 12 8.48043 12.1054 8.29289 12.2929C8.10536 12.4804 8 12.7348 8 13C8 13.2652 8.10536 13.5196 8.29289 13.7071C8.48043 13.8946 8.73478 14 9 14Z" fill="#BEBEBE"/>
                                            <path d="M19.74 8.33018L14.3 2.33018C14.2065 2.22659 14.0924 2.14371 13.9649 2.08688C13.8375 2.03004 13.6995 2.00051 13.56 2.00018H6.56C6.22775 1.99622 5.89797 2.05774 5.5895 2.18124C5.28103 2.30473 4.9999 2.48778 4.76218 2.71993C4.52446 2.95209 4.33479 3.22879 4.20402 3.53425C4.07324 3.8397 4.00392 4.16793 4 4.50018V19.5002C4.00392 19.8324 4.07324 20.1607 4.20402 20.4661C4.33479 20.7716 4.52446 21.0483 4.76218 21.2804C4.9999 21.5126 5.28103 21.6956 5.5895 21.8191C5.89797 21.9426 6.22775 22.0041 6.56 22.0002H17.44C17.7723 22.0041 18.102 21.9426 18.4105 21.8191C18.719 21.6956 19.0001 21.5126 19.2378 21.2804C19.4755 21.0483 19.6652 20.7716 19.796 20.4661C19.9268 20.1607 19.9961 19.8324 20 19.5002V9.00018C19.9994 8.75234 19.9067 8.51358 19.74 8.33018ZM14 5.00018L16.74 8.00018H14.74C14.6353 7.99386 14.5329 7.96674 14.4387 7.92041C14.3446 7.87408 14.2607 7.80947 14.1918 7.73034C14.1229 7.65122 14.0704 7.55916 14.0375 7.45955C14.0046 7.35994 13.9918 7.25477 14 7.15018V5.00018ZM17.44 20.0002H6.56C6.49037 20.0042 6.42063 19.9945 6.35477 19.9715C6.28892 19.9486 6.22824 19.9129 6.17621 19.8664C6.12419 19.82 6.08184 19.7637 6.0516 19.7009C6.02137 19.638 6.00383 19.5698 6 19.5002V4.50018C6.00383 4.43054 6.02137 4.36234 6.0516 4.2995C6.08184 4.23665 6.12419 4.18039 6.17621 4.13394C6.22824 4.08749 6.28892 4.05176 6.35477 4.02881C6.42063 4.00586 6.49037 3.99613 6.56 4.00018H12V7.15018C11.9839 7.8868 12.2598 8.59991 12.7675 9.13385C13.2752 9.6678 13.9735 9.97923 14.71 10.0002H18V19.5002C17.9962 19.5698 17.9786 19.638 17.9484 19.7009C17.9182 19.7637 17.8758 19.82 17.8238 19.8664C17.7718 19.9129 17.7111 19.9486 17.6452 19.9715C17.5794 19.9945 17.5096 20.0042 17.44 20.0002Z" fill="#BEBEBE"/>
                                        </svg>`,
                            style: {
                                display: "flex",
                                cursor: "pointer",
                                width: "fit-content",
                                "align-items": "center"
                            }
                        })
                        // this.append(additionalButtonsArea, buttonDocuments);
                    }
                    if (input.multipleButtons.buttonContacts) {
                        let buttonContacts = this.CreateElement({
                            element: "icon",
                            name: "buttonContacts",
                            children: ` <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M21 6H20V5C20 4.73478 19.8946 4.48043 19.7071 4.29289C19.5196 4.10536 19.2652 4 19 4C18.7348 4 18.4804 4.10536 18.2929 4.29289C18.1054 4.48043 18 4.73478 18 5V6H17C16.7348 6 16.4804 6.10536 16.2929 6.29289C16.1054 6.48043 16 6.73478 16 7C16 7.26522 16.1054 7.51957 16.2929 7.70711C16.4804 7.89464 16.7348 8 17 8H18V9C18 9.26522 18.1054 9.51957 18.2929 9.70711C18.4804 9.89464 18.7348 10 19 10C19.2652 10 19.5196 9.89464 19.7071 9.70711C19.8946 9.51957 20 9.26522 20 9V8H21C21.2652 8 21.5196 7.89464 21.7071 7.70711C21.8946 7.51957 22 7.26522 22 7C22 6.73478 21.8946 6.48043 21.7071 6.29289C21.5196 6.10536 21.2652 6 21 6Z" fill="#BEBEBE"/>
                                            <path d="M10 11C10.7911 11 11.5645 10.7654 12.2223 10.3259C12.8801 9.88635 13.3928 9.26164 13.6955 8.53074C13.9983 7.79983 14.0775 6.99556 13.9231 6.21964C13.7688 5.44372 13.3878 4.73098 12.8284 4.17157C12.269 3.61216 11.5563 3.2312 10.7804 3.07686C10.0044 2.92252 9.20017 3.00173 8.46927 3.30448C7.73836 3.60723 7.11365 4.11992 6.67412 4.77772C6.2346 5.43552 6 6.20888 6 7C6 8.06087 6.42143 9.07828 7.17157 9.82843C7.92172 10.5786 8.93913 11 10 11ZM10 5C10.3956 5 10.7822 5.1173 11.1111 5.33706C11.44 5.55683 11.6964 5.86918 11.8478 6.23463C11.9991 6.60009 12.0387 7.00222 11.9616 7.39018C11.8844 7.77814 11.6939 8.13451 11.4142 8.41422C11.1345 8.69392 10.7781 8.8844 10.3902 8.96157C10.0022 9.03874 9.60009 8.99914 9.23463 8.84776C8.86918 8.69639 8.55682 8.44004 8.33706 8.11114C8.1173 7.78224 8 7.39556 8 7C8 6.46957 8.21071 5.96086 8.58579 5.58579C8.96086 5.21072 9.46957 5 10 5Z" fill="#BEBEBE"/>
                                            <path d="M10 13C8.14348 13 6.36301 13.7375 5.05025 15.0503C3.7375 16.363 3 18.1435 3 20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21C4.26522 21 4.51957 20.8946 4.70711 20.7071C4.89464 20.5196 5 20.2652 5 20C5 18.6739 5.52678 17.4021 6.46447 16.4645C7.40215 15.5268 8.67392 15 10 15C11.3261 15 12.5979 15.5268 13.5355 16.4645C14.4732 17.4021 15 18.6739 15 20C15 20.2652 15.1054 20.5196 15.2929 20.7071C15.4804 20.8946 15.7348 21 16 21C16.2652 21 16.5196 20.8946 16.7071 20.7071C16.8946 20.5196 17 20.2652 17 20C17 18.1435 16.2625 16.363 14.9497 15.0503C13.637 13.7375 11.8565 13 10 13Z" fill="#BEBEBE"/>
                                        </svg>`,
                            style: {
                                display: "flex",
                                cursor: "pointer",
                                width: "fit-content",
                                "align-items": "center"
                            }
                        })
                        // this.append(additionalButtonsArea, buttonContacts);
                    }


                    this.append(fieldset, additionalButtonsArea);



                }

        }

        if (typeof element == "undefined") return false;

        this.append(fieldset, element)

    }

    createUssdContent = () => {
        this.append(this.state.ussd.ussdTab, this.mobileNumberInput())
        this.append(this.state.ussd.ussdTab, this.typeKendoSelector())
        this.append(this.state.ussd.ussdTab, this.buildDivAndLabel("თარიღი", this.dateInput()))
        this.append(this.state.ussd.ussdTab, this.commentTextArea())
        this.append(this.state.ussd.ussdTab, this.abonentNumberInput())
        this.append(this.state.ussd.ussdTab, this.abonentNameInput())
        this.append(this.state.ussd.ussdTab, this.registerShidaNumberInput())
        this.append(this.state.ussd.ussdTab, this.registerShidaSemekInput())
        this.append(this.state.ussd.ussdTab, this.statusKendoSelector())
        this.append(this.state.ussd.ussdTab, this.buildDivAndLabel("რეგაირების ბოლო ვადა", this.reagBoloVadaInput()))
        this.append(this.state.ussd.ussdTab, this.raioniInput())
        this.append(this.state.ussd.ussdTab, this.addressInput())
        this.append(this.state.ussd.ussdTab, this.shedegiKendoSelector())
        this.append(this.state.ussd.ussdTab, this.buildDivAndButton(this.smsAnswerKendoSelector()))
        this.append(this.state.ussd.ussdTab, this.buildDivAndLabel("sms გაგზავნის დრო", this.smsSentTimeInput()))
        this.append(this.state.ussd.ussdTab, this.buildDivAndLabel("რეგაირების ფაქტობრივი ვადა", this.reagFactorVadaInput()))
        this.append(this.state.ussd.ussdTab, this.buildDivAndLabel("გარე მიზეზის დოკუმენტი", this.gareMizezDocButton()))
        this.append(this.state.ussd.ussdTab, this.konpOdenInput())
        this.append(this.state.ussd.ussdTab, this.konpTranNumberInput())
        this.append(this.state.ussd.ussdTab, this.buildDivAndLabel("კომპენსაციის გადახდის დოკ.", this.kompPayDocButton()))
        this.append(this.state.ussd.ussdTab, this.buildDivAndLabel("ჩანაწ. ბოლო ცვლილების დრო", this.chanawBoloCvlilTimeInput()))
        this.append(this.state.ussd.ussdTab, this.buildDivAndLabel("კომპენსაციის ბოლო ვადა", this.kompBoloVadaInput()))
        this.append(this.state.ussd.ussdTab, this.buildDivAndLabel("კომპესაციის დედლაინი", this.kompDeadlineInput()))
    }

    buildDivAndLabel = (title, element) => {
        var div = this.CreateElement({
            element: "div",
            style: {
                display: 'flex',
                flexDirection: 'column',
                marginTop: '-13px'
            }
        }, this.CreateElement({
            element: "span",
            text: title,
            style: { fontFamily: 'BPG', fontSize: '11px' }
        }), element)

        return div;
    }

    buildDivAndButton = (element) => {
        var div = this.CreateElement({
            element: "div",
            style: { gap: '4px', display: 'flex' }
        }, element,
            new Button({
                text: "გაგზავნა",
            }))

        return div;
    }

    mobileNumberInput = () => {
        this.state.ussd.mobileNumberInput = new Input({
            type: "text",
            placeholderTitle: "მობილურის ნომერი"
        }).build();

        this.state.ussd.mobileNumberInput.style.gridColumn = 'unset';

        return this.state.ussd.mobileNumberInput;

    }

    typeKendoSelector = (id = 0) => {

        this.state.typeKendoSelector = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: 'ტიპი',
            value: Number(id),
            onchange: '',
            style: {
                gridColumn: 'unset',
                'max-height': '39px'
            },
            data: {
                route: 'Task',
                act: 'GETSTATUS'
            }
        })

        return this.state.typeKendoSelector
    }

    dateInput = () => {
        this.state.ussd.dateInput = this.CreateElement({
            element: "input",
            type: "datetime",
            placeholder: 'თარიღი',
            style: {
                gridColumn: 'unset',
                'max-height': '39px',
                width: "217px"
            }
        });

        return this.state.ussd.dateInput;

    }

    commentTextArea = () => {
        this.state.ussd.commentTextArea = new Input({
            type: "textarea",
            placeholderTitle: "კომენტარი",
            style: {
                'margin': '0px',
                'height': '36px',
                'min-height': '36px',
                'min-width': '217px',
                'max-width': '217px',
                'max-height': '500px'
            }
        }).build();

        this.state.ussd.commentTextArea.style.gridColumn = 'unset';

        return this.state.ussd.commentTextArea;

    }

    abonentNumberInput = () => {
        this.state.ussd.abonentNumberInput = new Input({
            type: "text",
            placeholderTitle: "აბონენტის ნომერი"
        }).build();

        this.state.ussd.abonentNumberInput.style.gridColumn = 'unset';

        return this.state.ussd.abonentNumberInput;

    }

    abonentNameInput = () => {
        this.state.ussd.abonentNameInput = new Input({
            type: "text",
            placeholderTitle: "აბონენტრის დასახელება"
        }).build();

        this.state.ussd.abonentNameInput.style.gridColumn = 'unset';

        return this.state.ussd.abonentNameInput;

    }

    registerShidaNumberInput = () => {
        this.state.ussd.registerShidaNumber = new Input({
            type: "text",
            placeholderTitle: "რეგისტრაციის ნომერი შიდა"
        }).build();

        this.state.ussd.registerShidaNumber.style.gridColumn = 'unset';

        return this.state.ussd.registerShidaNumber;

    }

    registerShidaSemekInput = () => {
        this.state.ussd.registerShidaSemek = new Input({
            type: "text",
            placeholderTitle: "რეგისტრაციის ნომერი სემეკი"
        }).build();

        this.state.ussd.registerShidaSemek.style.gridColumn = 'unset';

        return this.state.ussd.registerShidaSemek;

    }

    statusKendoSelector = (id = 0) => {

        this.state.statusKendoSelector = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: 'სტატუსი',
            value: Number(id),
            onchange: '',
            style: {
                gridColumn: 'unset',
                'max-height': '39px'
            },
            data: {
                route: 'Task',
                act: 'GETSTATUS'
            }
        })

        return this.state.statusKendoSelector
    }

    reagBoloVadaInput = () => {
        this.state.ussd.reagBoloVada = this.CreateElement({
            element: "input",
            type: "datetime",
            placeholder: 'რეგაირების ბოლო ვადა',
            style: {
                gridColumn: 'unset',
                'max-height': '39px',
                width: "217px"
            }
        });

        return this.state.ussd.reagBoloVada;

    }

    raioniInput = () => {
        this.state.ussd.raioniInput = new Input({
            type: "text",
            placeholderTitle: "რაიონი"
        }).build();

        this.state.ussd.raioniInput.style.gridColumn = 'unset';

        return this.state.ussd.raioniInput;

    }

    addressInput = () => {
        this.state.ussd.addressInput = new Input({
            type: "text",
            placeholderTitle: "მისამართი"
        }).build();

        this.state.ussd.addressInput.style.gridColumn = 'unset';

        return this.state.ussd.addressInput;

    }

    shedegiKendoSelector = (id = 0) => {

        this.state.shedegiKendoSelector = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: 'შედეგი',
            value: Number(id),
            onchange: '',
            style: {
                gridColumn: 'unset',
                'max-height': '39px'
            },
            data: {
                route: 'Task',
                act: 'GETSTATUS'
            }
        })

        return this.state.shedegiKendoSelector
    }

    smsAnswerKendoSelector = (id = 0) => {

        this.state.smsAnswerKendoSelector = this.CreateElement({
            element: "kendo",
            type: "selector",
            title: 'sms პასუხი',
            value: Number(id),
            onchange: '',
            style: {
                gridColumn: 'unset',
                'max-height': '39px'
            },
            data: {
                route: 'Task',
                act: 'GETSTATUS'
            }
        })

        return this.state.smsAnswerKendoSelector
    }

    smsSentTimeInput = () => {
        this.state.ussd.smsSentTimeInput = this.CreateElement({
            element: "input",
            type: "datetime",
            placeholder: 'sms გაგზავნის დრო',
            style: {
                gridColumn: 'unset',
                'max-height': '39px',
                width: "217px"
            }
        });

        return this.state.ussd.smsSentTimeInput;

    }

    reagFactorVadaInput = () => {
        this.state.ussd.reagFactorVadaInput = this.CreateElement({
            element: "input",
            type: "datetime",
            placeholder: 'რეგაირების ფაქტობრივი ვადა',
            style: {
                gridColumn: 'unset',
                'max-height': '39px',
                width: "217px"
            }
        });

        return this.state.ussd.reagFactorVadaInput;

    }

    gareMizezDocButton = () => {
        this.state.ussd.reagFactorVadaInput = new Button({
            text: "დოკუმენტი",
            placeholder: 'გარე მიზეზის დოკუმენტი',
            onclick: () => {
                let param = {
                    table: "",
                    inc_id: this.state.prop.id,
                    req: "UssdUpload1"
                }

                new Uploader(param).init();
            },
            style: {
                gridColumn: 'unset',
                'max-height': '39px',
                width: "217px"
            }
        })

        return this.state.ussd.reagFactorVadaInput;

    }

    konpOdenInput = () => {
        this.state.ussd.konpOdenInput = new Input({
            type: "text",
            placeholderTitle: "კომპენსაციის ოდენობა"
        }).build();

        this.state.ussd.konpOdenInput.style.gridColumn = 'unset';

        return this.state.ussd.konpOdenInput;

    }

    konpTranNumberInput = () => {
        this.state.ussd.konpTranNumberInput = new Input({
            type: "text",
            placeholderTitle: "კომპენსაციის ტრანზ. ნომერი"
        }).build();

        this.state.ussd.konpTranNumberInput.style.gridColumn = 'unset';

        return this.state.ussd.konpTranNumberInput;

    }

    kompPayDocButton = () => {
        this.state.ussd.reagFactorVadaInput = new Button({
            text: "დოკუმენტი",
            placeholder: 'კომპენსაციის გადახდის დოკუმენტი',
            onclick: () => {
                let param = {
                    table: "",
                    inc_id: this.state.prop.id,
                    req: "UssdUpload2"
                }

                new Uploader(param).init();
            },
            style: {
                gridColumn: 'unset',
                'max-height': '39px',
                width: "217px"
            }
        })

        return this.state.ussd.reagFactorVadaInput;

    }

    chanawBoloCvlilTimeInput = () => {
        this.state.ussd.chanawBoloCvlilTimeInput = this.CreateElement({
            element: "input",
            type: "datetime",
            placeholder: 'ჩანაწერზე ბოლო ცვლილების დრო',
            style: {
                gridColumn: 'unset',
                'max-height': '39px',
                width: "217px"
            }
        });

        return this.state.ussd.chanawBoloCvlilTimeInput;

    }

    kompBoloVadaInput = () => {
        this.state.ussd.kompBoloVadaInput = this.CreateElement({
            element: "input",
            type: "datetime",
            placeholder: 'კომპენსაციის ბოლო ვადა',
            style: {
                gridColumn: 'unset',
                'max-height': '39px',
                width: "217px"
            }
        });

        return this.state.ussd.kompBoloVadaInput;

    }

    kompDeadlineInput = () => {
        this.state.ussd.kompDeadlineInput = this.CreateElement({
            element: "input",
            type: "datetime",
            placeholder: 'კომპესაციის დედლაინი',
            style: {
                gridColumn: 'unset',
                'max-height': '39px',
                width: "217px"
            }
        });

        return this.state.ussd.kompDeadlineInput;

    }



}

