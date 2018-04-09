var SERVER_URL = "http://ShoufhomNode-iam688687.codeanyapp.com:3000"

$(document).ready(function() {
    $("#grid").shieldGrid({
        dataSource: {
            remote: {
                read: {
                    url: SERVER_URL + "/readstudents",
                    type: "post"
                },
                modify: {
                    create: {
                        url: SERVER_URL + "/addNewStudent",
                        type: "post",
                        data: function (edited) {
                            return edited[0].data;
                        }
                    },
                    update: {
                        url: SERVER_URL + "/editStudent",
                        type: "post",
                        data: function (edited) {
                            return edited[0].data;
                        }
                    }
                }
            },
            schema: {
                fields: {
                    civilID: { path: "civilID", type: String },
                    studentID: { path: "studentID", type: String },
                    fNameID: { path: "fNameID", type: String },
                    mNameID: { path: "mNameID", type: String },
                    lNameID: { path: "lNameID", type: String },
                    guardianCivilID: { path: "guardianCivilID", type: String },
                    activeFlag: { path: "activeFlag", type: Boolean }
                }
            }
        },
        paging: {
            pageSize: 20,
        },
        events: {

        },
        rowHover: false,
        columns: [{
            field: "civilID",
            title: "Civil ID"
        }, {
            field: "studentID",
            title: "Student ID"
        }, {
            field: "fName",
            title: "First name"
        }, {
            field: "mName",
            title: "Middle name"
        }, {
            field: "lName",
            title: "Last name"
        }, {
            field: "guardianCivilID",
            title: "Guardian Civil ID"
        }, {
            field: "activeFlag",
            title: "Active"
        }, {
            //width: "140px",
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
