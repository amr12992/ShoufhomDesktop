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
            detailCreated: students
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

function students(e) {
    var request = {
        classID: e.item.classID
    };
    $("<div/>").appendTo(e.detailCell).shieldGrid({
        dataSource: {
            remote: {
                read: {
                    url: SERVER_URL + "/getStudentsFromClass",
                    type: "post",
                    data: function() {
                        return request;
                    }
                },
                modify: {
                    create: {
                        url: SERVER_URL + "/addStudentToClass",
                        type: "post",
                        data: function (edited) {
                            edited[0].data.classID = request.classID;
                            return edited[0].data;
                        }
                    },
                    remove: {
                        url: SERVER_URL + "/deleteStudentFromClass",
                        type: "post",
                        data: function (removed) {
                            removed[0].data.classID = request.classID;
                            return removed[0].data;
                        }
                    }
                }
            },
            schema: {
                fields: {
                    studentID: { path: "studentID", type: String },
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

        },
        rowHover: false,
        columns: [{
            field: "studentID",
            title: "Student ID"
        }, {
            field: "fName",
            title: "Student First Name"
        }, {
            field: "lName",
            title: "Student Last Name"
        }, {
            width: "150px",
            title: "Options",
            buttons: [{ commandName: "edit", caption: "Edit" },
            { commandName: "delete", caption: "Remove" }
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
                    return "Remove student ID " + item.studentID + " from class?";
                }
            }
        }
    },
    toolbar: [
        {
            buttons: [
                { commandName: "insert", caption: "Add student" }
            ],
            position: "top"
        }
    ]
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
