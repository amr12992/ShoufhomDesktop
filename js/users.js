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
                        url: SERVER_URL + "/addClass",
                        type: "post",
                        data: function (edited) {
                            return edited[0].data;
                        }
                    },
                    update: {
                        url: SERVER_URL + "/modifyClass",
                        type: "post",
                        data: function (edited) {
                            return edited[0].data;
                        }
                    },
                    remove: {
                        url: SERVER_URL + "/deleteClass",
                        type: "post",
                        data: function (removed) {
                            return removed[0].data;
                        }
                    }
                }
            },
            schema: {
                fields: {
                    gradeLevel: { path: "gradeLevel", type: String },
                    classNumber: { path: "classNumber", type: String },
                    termYear: { path: "termYear" },
                    classID: { path: "classID" },
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
            title: "Class ID"
        }, {
            field: "termYear",
            title: "Year"
        }, {
            field: "gradeLevel",
            title: "Class level"
        }, {
            field: "classNumber",
            title: "Section"
        }, {
            width: "140px",
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
                    return "Delete class ID " + item.classID
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
                        url: SERVER_URL + "/addSubject",
                        type: "post",
                        data: function (edited) {
                            edited[0].data.classID = request.classID;
                            return edited[0].data;
                        }
                    },
                    update: {
                        url: SERVER_URL + "/modifySubject",
                        type: "post",
                        data: function (edited) {
                            edited[0].data.classID = request.classID;
                            return edited[0].data;
                        }
                    },
                    remove: {
                        url: SERVER_URL + "/deleteSubject",
                        type: "post",
                        data: function (removed) {
                            return removed[0].data;
                        }
                    }
                }
            },
            schema: {
                fields: {
                    subjectName: { path: "subjectName", type: String },
                    subjectID: { path: "subjectID" },
                    subjectType: { path: "subjectType", type: String },
                    teacherID: { path: "userID", type: String },
                    fName: { path: "fName" },
                    mName: { path: "mName" },
                    lName: { path: "lName" },
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
            title: "Subject ID"
        }, {
            field: "subjectName",
            title: "Subject Name"
        }, {
            field: "subjectType",
            title: "Subject Type",
        }, {
            field: "teacherID",
            title: "Teacher ID",
        }, {
            field: "fName",
            title: "Teacher First Name"
        }, {
            field: "lName",
            title: "Teacher Last Name"
        }, {
            width: "150px",
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
                    return "Delete subject ID " + item.subjectID
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
                    update: {
                        url: SERVER_URL + "/modifySubjectExams",
                        type: "post",
                        data: function (edited) {
                            var data = edited[0].data;
                            return {
                              subjectID: data.subjectID,
                              dateTime: data.date + ' ' + data.time,
                              exam: data.exam
                            };
                        }
                    }
                }
            },
            schema: {
                fields: {
                    subjectID: { path: "subjectID", type: String },
                    date: { path: "date", type: String },
                    time: { path: "time", type: String },
                    exam: { path: "exam" }
                }
            }
        },
        events: {
        },
        rowHover: false,
        columns: [{
            field: "date",
            title: "Date"
        }, {
            field: "time",
            title: "Time"
        }, {
            width: "80px",
            title: "Options",
            buttons: [{ commandName: "edit", caption: "Edit" }]
        }],
        editing: {
            enabled: true,
            type: "cell",
            mode: "form"
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
