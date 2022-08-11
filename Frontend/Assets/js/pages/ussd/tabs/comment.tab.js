import Tdg from "../../../tdg.class.js";
import Button from "../../../components/button/button.class.js";
import Input from "../../../components/input/input.class.js";
export default class TabComment extends Tdg {

    constructor() {
        super();

        self.Ussd.tab = [];
        self.Ussd.tab.TabComment = this;

        this.state = {
            prop: self.UssdModal.state.prop,
            interfaceName: document.querySelector("interface[workground]"),
            fieldSet: '',
            element: [],
            comments: [],
            parent_id: '',
        }

        if (self.UssdModal.fromtask) {
            this.state.interfaceName = document.querySelector("div[tasktabcontent]");
            self.WorkGround.state.globalPhoneNumber = self.TaskCase.state.globalPhoneNumber;
        }
    }



    init = async () => {

        self.Ussd.TabComment = this.CreateElement({
            element: "div",
            style: {
                gap: '10px',
                flexDirection: 'column',
                display: 'flex'
            }
        });

        this.state.fieldSet = self.Ussd.TabComment;

        this.build();

    }

    build = async () => {

        this.append(this.state.interfaceName, this.state.fieldSet);
        this.append(this.state.fieldSet, this.buildCommentHead());
        this.append(this.state.fieldSet, this.buildCommentBody());

        this.append(this.state.comhead, this.buildDiv());
        this.append(this.state.div, this.buildInputComment());
        this.append(this.state.div, this.buildAddButton());

        await this.fetchData();

    }


    fetchData = async () => {

        this.state.data = await this.getResponse({
            route: "IncommingTabs",
            act: "getComments",
            inc_id: this.state.prop.id
        })

        this.state.data.length && this.state.data.forEach((x, i) => {

            this.createCommentContent(x, i)

        })

    }


    createCommentContent = (data, i) => {

        let comment;
        let answer;
        comment = this.builCommentsContent(data);
        answer = data.answer;

        this.append(this.state.combody, comment);

        if (data.parent_id > 0) {
            var apppenddt = document.querySelector("commentchild[id='" + data.parent_id + "']");
            this.append(apppenddt, comment);
        }
        else {
            this.append(this.state.combody, comment);
        }

        if (answer) {
            answer.forEach(item => {
                this.createCommentContent(item);
            });
        }

    }


    builCommentsContent = (data) => {

        this.state.comments = this.CreateElement({
            element: "section",
            class: "commentsSect"
        }, this.CreateElement({
            element: "div",
            class: "commentsheaddiv"
        }, this.CreateElement({
            element: "span",
            children: data.name,
            style: {
                fontSize: '15px'
            }
        }), this.CreateElement({
            element: "span",
            children: data.date,
            style: {
                fontSize: '12px',
                color: '#686868'

            }
        })), this.CreateElement({
            element: "div",
            class: "textarea"
        }, this.CreateElement({
            element: "comment",
            children: data.text
        }), this.CreateElement({
            element: "div"
        }, this.CreateElement({
            element: "span",
            children: `<img src="Frontend/Assets/images/icons/delete_comment.svg">`,
            onClick: (e) => {
                this.buildConfirmModal(e, data.id);
            }
        }), this.CreateElement({
            element: "span",
            children: `<img src="Frontend/Assets/images/icons/edit_comment.svg">`,
            onClick: (e) => {
                this.buildEditModal(e, data.text, data.id)
            }
        }))), this.CreateElement({
            element: "div",
            class: "replaybtn"
        }, this.CreateElement({
            element: "a",
            children: "პასუხის გაცემა",
            onClick: () => {
                this.hideShowText(data.id);
            }
        })), this.CreateElement({
            element: "div",
            style: {
                display: 'flex',
                gap: '5px'
            }
        }, this.answerInput(data.id),
            this.buildSendButton(data.id)),
            this.CreateElement({
                element: "commentchild",
                id: data.id
            }))

        return this.state.comments;

    }


    buildConfirmModal = (el, id) => {

        let confirmModal = new jBox('Confirm', {
            content: 'ნამდვილად გსურთ კომენტარის წაშლა?',
            cancelButton: 'გაუქმება',
            confirmButton: 'წაშლა',
            zIndex: 'auto',
            confirm: () => {
                this.deleteComment(id);
                $(el.target).parent().parent().parent().parent().remove();
            },
            cancel: function () {
                confirmModal.close()
            },
            onCloseComplete: function () {
                confirmModal.destroy()
            }
        })

        confirmModal.open()

    }

    buildEditModal = (el, text, id) => {
        var commenttxt = $(el.target).parent().parent().parent().children(':first-child').text();
        let editinput = this.CreateElement({
            element: "textarea",
            placeholderTitle: "კომენტარი",
            text: commenttxt,
            style: {
                width: "320px"
            }
        });

        let confirmModal = new jBox('Confirm', {
            content: editinput,
            cancelButton: 'გაუქმება',
            confirmButton: 'ჩასწორება',
            zIndex: 'auto',
            confirm: () => {
                $(el.target).parent().parent().parent().children(':first-child').text(editinput.value);
                this.editComment(editinput.value, id);
            },
            cancel: function () {
                confirmModal.close()
            },
            onCloseComplete: function () {
                confirmModal.destroy()
            }
        })

        confirmModal.open()

    }

    answerInput = (id) => {
        this.state.answerinput = this.CreateElement({
            element: "textarea",
            placeholderTitle: "კომენტარი",
            id: "enterComment" + id,
            style: {
                width: "290px",
                display: "none",
            }
        })

        return this.state.answerinput
    }

    buildSendButton = (id) => {
        this.state.element.buttonsend = new Button({
            text: "გაგზავნა",
            id: "sendButton" + id,
            style: {
                display: "none",
            },
            onclick: this.insertComment
        })

        return this.state.element.buttonsend
    }

    deleteComment = async (id) => {
        let deleteComment = await this.getResponse({
            route: "IncommingTabs",
            act: "deleteComments",
            id: id
        })

        if (deleteComment.status == "OK") {
            console.log("deleted");
        }

    }

    editComment = async (text, id) => {
        let editComment = await this.getResponse({
            route: "IncommingTabs",
            act: "editComments",
            id: id,
            text: text
        })

        if (editComment.status == "OK") {
            console.log("edited");
        }
    }

    hideShowText = (id) => {

        this.state.parent_id = id;

        $("#enterComment" + id).toggle();
        $("#sendButton" + id).toggle();
    }


    buildInputComment = () => {
        this.state.element.inputComment = new Input({
            type: "text",
            placeholderTitle: "კომენტარი",
            column: "2",
            id: "Comment",
            style: {
                width: "290px"
            }
        }).build()

        return this.state.element.inputComment
    }

    buildCommentHead = () => {
        this.state.comhead = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            title: "კომენტარები",
            style: {
                "grid-template-columns": "unset"
            }
        });

        return this.state.comhead;
    }

    buildCommentBody = () => {
        this.state.combody = this.CreateElement({
            element: "div",
            attributes: ["fieldset"],
            style: {
                "grid-template-columns": "unset"
            }
        })

        return this.state.combody;
    }

    buildDiv = () => {
        this.state.div = this.CreateElement({
            element: 'tabcontent',
            style: {
                display: 'flex',
                justifyContent: 'space-between',
                maxWidth: '27%',
                flexWrap: 'wrap',
                gap: '10px'
            }
        })

        return this.state.div;
    }

    buildAddButton = () => {

        this.state.element.button = new Button({
            type: "add",
            text: "დამატება",
            onclick: () => {
                this.state.parent_id = 0;
                this.insertComment();
            },
            access: "add"
        })

        return this.state.element.button
    }

    insertComment = async () => {
        let comment = this.state.element.inputComment.children[0].value;
        this.state.element.inputComment.children[0].value = "";

        if (this.state.parent_id > 0) {
            comment = $("#enterComment" + this.state.parent_id).val();
        }

        let addComment = await this.getResponse({
            route: "IncommingTabs",
            act: "insertComments",
            inc_id: this.state.prop.id,
            text: comment,
            parent_id: this.state.parent_id
        })


        console.log(addComment);

        // this.state.combody.innerHTML = "";

        if (addComment.status == "OK") {
            this.createCommentContent(addComment.result, "");
            $("#enterComment" + this.state.parent_id).val("");
            $("#enterComment" + this.state.parent_id).hide();
            $("#sendButton" + this.state.parent_id).hide();
        }



    }




    destroy = () => {

        if (!self.Ussd.TabComment) return false;
        self.Ussd.TabComment.remove();

    }

}