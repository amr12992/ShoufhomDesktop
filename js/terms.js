var SERVER_URL = "http://ShoufhomNode-iam688687.codeanyapp.com:3000"

$(document).ready(function() {
    $("#grid").shieldGrid({
        dataSource: {
            remote: {
                read: {
                    url: SERVER_URL + "/readterms",
                    type: "post"
                }
            },
            schema: {
                fields: {
                    termYear: { path: "termYear" },
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
            field: "termYear",
            title: "Term year"
        }],
    editing: {
        enabled: true,
        type: "cell",
        mode: "form",
        confirmation: {
        }
    }
});
});

function addNewTerm() {
    var confirmed = confirm("WARNING: Starting a new term will effectively archive ALL the data from the current term, meaning they cannot be altered anymore.\n\nProceed?");
    if (confirmed)
        $.post(SERVER_URL + '/createNewTerm', function(data) {
            location.reload();
        });
}
