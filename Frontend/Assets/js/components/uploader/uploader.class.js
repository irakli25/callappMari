
import { kendo__multiSelectedID, kendo__refresh } from "../../helpers/kendo.helper.js";
import Tdg from "../../tdg.class.js";

export default class Uploader extends Tdg {

  constructor(param) {
    super();

    self.uploader = this;

    this.state = {
      uploaded: [],
      params: param,
      table: param.table,
      row_id: param.inc_id,
      appedto: param.append_to,
      checkelement: document.querySelector("showfiles"),
      savetdata: typeof param.req != "undefined" ? param.req : "IncommingTabs",
      uploadedfrom: "IncommingTabs",
      multiple: typeof param.multiple != "undefined" ? param.multiple : true,
      setUploads: typeof param.setUploads != "undefined" ? param.setUploads : this.default
    }

    self.uploader.state.uploadedfrom = self.uploader.state.savetdata;
  }

  default = (data) => {
    console.log(data);
  }

  init = async () => {

    this.build();
    this.state.uploadinput.click();
  }

  clean = () => {
    this.state.uploaded = [];
    if (this.state.checkelement) {
      this.state.checkelement.remove();
    }

  }

  build = () => {
    this.buildUploadInput();
  }

  buildUploadInput = () => {
    this.state.uploadinput = this.CreateElement({
      element: "input",
      type: "file",
      onChange: this.uploadFiles,
      attributes: this.state.multiple ? ['multiple'] : "",
      style: {
        display: 'none'
      }
    })

    return this.state.uploadinput;
  }

  buildFilesShow = (files) => {

    if (this.state.checkelement) {
      files.forEach(o => {
        if (self.uploader.state.savetdata == "mail") {
          if (typeof (self.Incomming.tab.TabMail.state.requestData) == "object") {
            self.Incomming.tab.TabMail.state.requestData.push(o);
          }
        } else if (self.uploader.state.savetdata == "chat") {
          if (typeof (self.chatPanel.state.requestData) == "object") {
            self.chatPanel.state.requestData.push(o);
          }
        }

        this.append(this.state.checkelement, this.CreateElement({
          element: 'file'
        }, this.CreateElement({
          element: "span",
          text: o.original,
          onclick: () => {
            window.open(o.link, '_blank', 'location=yes,height=570,width=999,scrollbars=yes,status=yes');
          }
        }), this.CreateElement({
          element: "deletespan",
          delete: o.name,
          onclick: this.deleteFile,
          children: `<i class="fas fa-trash-alt"></i>`
        })));
      });
    } else {
      this.state.filecontetn = this.CreateElement({
        element: "showfiles",
        style: {
          'border': '1px solid rgba(0, 0, 0, 0.151)',
          'border-radius': '4px',
          'padding': '20px',
          'display': 'flex',
          'align-items': 'center',
          'flex-direction': "column",
          'max-height': '70px',
          'gap': '5px',
          'overflow': 'auto'
        }
      })

      files.forEach(o => {

        if (self.uploader.state.savetdata == "mail") {
          if (typeof (self.Incomming.tab.TabMail.state.requestData) == "object") {
            self.Incomming.tab.TabMail.state.requestData.push(o);
            //console.log(self.Incomming.tab.TabMail.state.requestData);
          }
        } else if (self.uploader.state.savetdata == "chat") {
          if (typeof (self.chatPanel.state.requestData) == "object") {
            self.chatPanel.state.requestData.push(o);
          }
        }

        this.append(this.state.filecontetn, this.CreateElement({
          element: 'file'
        }, this.CreateElement({
          element: "span",
          text: o.original,
          onclick: () => {
            window.open(o.link, '_blank', 'location=yes,height=568,width=999,scrollbars=yes,status=yes');
          }
        }), this.CreateElement({
          element: "deletespan",
          delete: o.id,
          onclick: this.deleteFile,
          children: `<i class="fas fa-trash-alt"></i>`
        })));
      });

      this.append(self.uploader.state.appedto, this.state.filecontetn);
    }
  }

  deleteFile = function (e) {
    if (self.uploader.state.savetdata == "mail") {
      if (typeof (self.Incomming.tab.TabMail.state.requestData) == "object") {
        var index = self.Incomming.tab.TabMail.state.requestData.map(x => {
          return x.Id;
        }).indexOf(this.getAttribute("delete"));

        self.Incomming.tab.TabMail.state.requestData.splice(index, 1);
      }
    } else if (self.uploader.state.savetdata == "chat") {
      if (typeof (self.chatPanel.state.requestData) == "object") {
        var index = self.chatPanel.state.requestData.map(x => {
          return x.Id;
        }).indexOf(this.getAttribute("delete"));

        self.chatPanel.state.requestData.splice(index, 1);
      }
    }

    if (e.target.tagName == "DELETESPAN") {
      e.target.parentNode.remove();
    } else {
      e.target.parentNode.parentNode.remove();
    }
  }

  uploadFiles = async function () {

    let xhr = new XMLHttpRequest();
    self.uploader.uploaded = [];
    Array.from(this.files).map(o => self.uploader.uploaded.push(o));
    let formData = new FormData();

    self.uploader.state.params['custom'] = (self.uploader.state.params.hasOwnProperty("custom")) ? self.uploader.state.params.custom : false;
    if(self.uploader.state.params.custom) {
     Object.entries(self.uploader.state.params).forEach((e) => {
      formData.append(e[0], e[1]);
     });

    } else {
      formData.append("inc_id", self.uploader.state.row_id);
      formData.append("route", "IncommingTabs");
      formData.append("act", "addFile");
      formData.append("uploadedfrom", self.uploader.state.uploadedfrom);

    }


    var i = 0;
    var continueUpload = true;

    self.uploader.uploaded.forEach(file => {

      if (self.uploader.state.uploadedfrom == "voice") {
        var checktype = file.name.substr(file.name.length - 3);
        if (checktype != "wav") {
          if (continueUpload) { continueUpload = false; }
        }
      }

      formData.append("file" + i, file);
      i++;
    });

    if (!continueUpload) {
      self.Tdg.buildNotice({ msg: "დასაშვებია მხოლოდ wav ფორმატის ფაილები!" });

      return false;
    }

    // xhr.timeout = 5000;
    xhr.open("POST", 'index.php');
    xhr.send(formData);

    xhr.onreadystatechange = state => {

      if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
        
        if(self.uploader.state.params.hasOwnProperty("callback")) {
          self.uploader.state.params.callback(JSON.parse(xhr.responseText));
        }

        if (data.status == "OK") {
          self.Tdg.buildNotice({ msg: "ფაილი წარმატებით აიტვირთა" });

          self.uploader.state.setUploads(data[0][0])

          if (self.uploader.state.appedto != "") {
            self.uploader.buildFilesShow(data[0]);
          }

          if (self.uploader.state.table) {
            kendo__refresh(self.uploader.state.table, "table");
          }

          if (typeof self.IncommingModal != "undefined" && self.IncommingModal.fromtask) {
            self.Task.insertIntoNotifications(self.TaskCase.state.prop.id, "", 4);
          }
        
        }
      }
    }
  }


}