var SERVER_URL = "http://ShoufhomNode-iam688687.codeanyapp.com:3000"

$(document).ready(function() {
    $("#datetimepicker").shieldDateTimePicker({

    });
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
                        url: SERVER_URL + "",
                        type: "post",
                        data: function (edited) {
                            console.log(edited[0].data);
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
                    subjectID: { path: "subjectID", type: String },
                    date: { path: "date", type: String },
                    time: { path: "time", type: String },
                }
            }
        },
        events: {
        },
        rowHover: false,
        columns: [{
            field: "date",
            title: "Date",
            width: "60px"
        }, {
            field: "time",
            title: "Time",
            width: "60px"
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
    .shieldDateTimePicker().swidget().focus();
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
