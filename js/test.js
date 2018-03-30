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
                studentID: { path: "studentID", type: String },
                fName: { path: "fName", type: String },
                mName: { path: "mName", type: String },
                lName: { path: "lName", type: String },
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
            field: "studentID",
            title: "Student ID",
            width: "120px"
        }, {
            field: "fName",
            title: "First Name",
            width: "120px"
        }, {
            field: "lName",
            title: "Last Name",
            width: "120px"
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
                    return "Delete row with ID = " + item.id
                }
            }
        }
    },
    toolbar: [
                {
                    buttons: [
                        { commandName: "insert", caption: "Add student" }
                    ],
                    position: "bottom"
                }
            ]
});

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
