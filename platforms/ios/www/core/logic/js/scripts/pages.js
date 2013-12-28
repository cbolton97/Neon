//each func represents a page in the ui
var pageList = {
    rotation: function () {
        createDate();
        $.getJSON('./core/logic/db/rotation.json', function (data) {
     
            for (var r in data.rotations) {
                if (data.rotations[r].date === window.today) {
                    var today = data.rotations[r];
                    loadTimeTable(today.structure, today.order, "today");
                }
                if (data.rotations[r].date === window.tomorrow) {
                    var tomorrow = data.rotations[r];
                    loadTimeTable(tomorrow.structure, tomorrow.order, "tomorrow");
                }
            }

            var checkOutputToday = _.isUndefined(today);
            var checkOutputTomorrow = _.isUndefined(tomorrow);

            if (checkOutputToday) {
                error("today", "Today's schedule could not be loaded")
            }
            if (checkOutputTomorrow) {
                error("tomorrow", "Tomorrow's schedule could not be loaded")
            }
        });
    },
    staff: function () {
        $('.list-data').html("");
        $.getJSON('./core/logic/db/staff.json', function (data) {

            for (var a in data.admin) {
                var source = data.admin[a];
                displayListItem("admin", source);
            }

            for (var t in data.teachers) {
                var source = data.teachers[t];
                displayListItem("teachers", source);
            }

            for (var s in data.support) {
                var source = data.support[s];
                displayListItem("support", source);
            }
        });
    },
    sites: function () {
        $('.list-data').html("");
        $.getJSON('./core/logic/db/sites.json', function (data) {

            for (var ac in data.academics) {
                var source = data.academics[ac];
                displayListItem("academics", source);
            }

            for (var at in data.athletics) {
                var source = data.athletics[at];
                displayListItem("athletics", source);
            }

            for (var ar in data.arts) {
                var source = data.arts[ar];
                displayListItem("arts", source);
            }

            for (var w in data.workexperience) {
                var source = data.workexperience[w];
                displayListItem("workexperience", source);
            }


        });
    },
    about: function () {
        $.getJSON('./core/logic/db/about.json', function (data) {
            $('.current-version').html(data.version);

        });
    }
}
function routePage(requestedPage) {
    pageList[requestedPage]();
}