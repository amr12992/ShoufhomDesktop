var SERVER_URL = "http://ShoufhomNode-iam688687.codeanyapp.com:3000"

$(document).ready(function() {
  $("#grid").shieldGrid({
    dataSource: {
      remote: {
        read: {
          url: SERVER_URL + "/getClasses",
          type: "post"
        },
        modify: {
          create: {
            url: SERVER_URL + "/editstudents",
            type: "post",
            data: function (edited) {
              return edited;
            }
          },
          update: {
            url: SERVER_URL + "/editstudents",
            type: "post",
            data: function (edited) {
              return edited[0].data;
            }
          },
          remove: {
            url: SERVER_URL + "/removestudent",
            type: "post",
            data: function (removed) {
              return { ID: removed[0].data.studentID };
            }
          }
        }
      },
      schema: {
        fields: {
          gradeLevel: { path: "gradeLevel", type: String },
          classNumber: { path: "classNumber", type: String },
          termYear: { path: "termYear", type: String },
          classID: { path: "classID", type: String },
        }
      }
    },
    paging: {
      pageSize: 20,
    },
    events: {
      detailCreated: subjects
    },
    rowHover: false,
    columns: [{
      field: "classID",
      title: "Class ID",
      width: "60px"
    }, {
      field: "termYear",
      title: "Year",
      width: "60px"
    }, {
      field: "gradeLevel",
      title: "Class level",
      width: "60px"
    }, {
      field: "classNumber",
      title: "Section",
      width: "60px"
    }, {
      width: "60px",
      title: "Options",
      buttons: [{ commandName: "edit", caption: "Edit" },
      { commandName: "delete", caption: "Delete" }
    ]
  }],
  editing: {
    enabled: true,
    type: "cell",
    mode: "form",
    confirmation: {
      "delete": {
        enabled: true,
        template: function(item) {
          return "Delete student ID " + item.studentID
        }
      }
    }
  },
  toolbar: [
    {
      buttons: [
        { commandName: "insert", caption: "Add class" }
      ],
      position: "top"
    }
  ]
});

function subjects(e) {
  var request = {
    classID: e.item.classID
  };
  $("<div/>").appendTo(e.detailCell).shieldGrid({
    dataSource: {
      remote: {
        read: {
          url: SERVER_URL + "/getSubjectsOfClass",
          type: "post",
          data: function() {
            return request;
          }
        },
        modify: {
          create: {
            url: SERVER_URL + "/editstudents",
            type: "post",
            data: function (edited) {
              return edited;
            }
          },
          update: {
            url: SERVER_URL + "/editstudents",
            type: "post",
            data: function (edited) {
              return edited[0].data;
            }
          },
          remove: {
            url: SERVER_URL + "/removestudent",
            type: "post",
            data: function (removed) {
              return { ID: removed[0].data.studentID };
            }
          }
        }
      },
      schema: {
        fields: {
          subjectName: { path: "subjectName", type: String },
          subjectID: { path: "subjectID", type: String },
          subjectType: { path: "subjectType", type: String },
          fName: { path: "fName", type: String },
          mName: { path: "mName", type: String },
          lName: { path: "lName", type: String },
        }
      },
      sorting: {
          multiple: true
      }
    },
    paging: {
      pageSize: 20,
    },
    events: {
      detailCreated: examTimes
    },
    rowHover: false,
    columns: [{
      field: "subjectID",
      title: "Subject ID",
      width: "60px"
    }, {
      field: "subjectName",
      title: "Subject Name",
      width: "60px"
    }, {
      field: "subjectType",
      title: "Subject Type",
      width: "60px"
    }, {
      field: "fName",
      title: "Teacher First Name",
      width: "60px"
    }, {
      field: "lName",
      title: "Teacher Last Name",
      width: "60px"
    }, {
      width: "60px",
      title: "Options",
      buttons: [{ commandName: "edit", caption: "Edit" },
      { commandName: "delete", caption: "Delete" }
    ]
  }],
  editing: {
    enabled: true,
    type: "cell",
    mode: "form",
    confirmation: {
      "delete": {
        enabled: true,
        template: function(item) {
          return "Delete student ID " + item.studentID
        }
      }
    }
  },
  toolbar: [
    {
      buttons: [
        { commandName: "insert", caption: "Add subject" }
      ],
      position: "top"
    }
  ]
});
}

function examTimes(e) {
  var request = {
    subjectID: e.item.subjectID
  };
  $("<div/>").appendTo(e.detailCell).shieldGrid({
    dataSource: {
      remote: {
        read: {
          url: SERVER_URL + "/getSubjectExams",
          type: "post",
          data: function() {
            return request;
          }
        },
        modify: {
          create: {
            url: SERVER_URL + "/editstudents",
            type: "post",
            data: function (edited) {
              return edited;
            }
          },
          update: {
            url: SERVER_URL + "/editstudents",
            type: "post",
            data: function (edited) {
              return edited[0].data;
            }
          },
          remove: {
            url: SERVER_URL + "/removestudent",
            type: "post",
            data: function (removed) {
              return { ID: removed[0].data.studentID };
            }
          }
        }
      },
      schema: {
        fields: {
          examTime1: { path: "examTime1", type: Date },
          examTime2: { path: "examTime2", type: Date },
          examTime3: { path: "examTime3", type: Date },
          examTime4: { path: "examTime4", type: Date },
          examTime5: { path: "examTime5", type: Date },
          examTime6: { path: "examTime6", type: Date },
        }
      }
    },
    events: {
    },
    rowHover: false,
    columns: [{
      field: "examTime1",
      title: "Exam time 1",
      width: "60px",
      editor: timePicker
    }, {
      field: "examTime2",
      title: "Exam time 2",
      width: "60px",
      editor: timePicker
    },{
      field: "examTime3",
      title: "Exam time 3",
      width: "60px",
      editor: timePicker
    },{
      field: "examTime4",
      title: "Exam time 4",
      width: "60px",
      editor: timePicker
    },{
      field: "examTime5",
      title: "Exam time 6",
      width: "60px",
      editor: timePicker
    },{
      field: "examTime6",
      title: "Exam time 6",
      width: "60px",
      editor: timePicker
    }, {
      width: "60px",
      title: "Options",
      buttons: [{ commandName: "edit", caption: "Edit" }]
  }],
  editing: {
    enabled: true,
    type: "cell",
    mode: "form",
    confirmation: {
      "delete": {
        enabled: true,
        template: function(item) {
          return "Delete student ID " + item.studentID
        }
      }
    }
  }
});
}

function timePicker(cell, item) {
  $('<div id="dropdown"/>')
  .appendTo(cell)
  .shieldDatePicker().swidget().focus();

  $('<div id="dropdown"/>')
  .appendTo(cell)
  .shieldTimePicker();
}

function myCustomEditor(cell, item) {
  $('<div id="dropdown"/>')
  .appendTo(cell)
  .shieldDropDown({
    dataSource: {
      data: ["motorbike", "car", "truck"]
    },
    value: !item["transport"] ? null : item["transport"].toString()
  }).swidget().focus();
}
});
