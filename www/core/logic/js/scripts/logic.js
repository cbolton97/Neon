
function onDeviceReady() {
    if (parseFloat(window.device.version) >= 7) {
        $("#wrapper-header").css("padding-top", "20px")
    }
    document.addEventListener("backbutton", core["backbttn"], false)
}

function onResume() {
    setTimeout(function () {
        var e = $(".action-refresh").attr("href"),
            t = e.search(">"),
            n = e.search(","),
            r = e.slice(0, t).trim();
        destination = e.slice(t + 1, n).trim(), data = e.slice(n + 1).trim();
        console.log(e);
        core[destination](r, data)
    }, 0)
}

function createDate() {
    function i(e) {
        return e < 1e3 ? e + 1900 : e
    }
    var e = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
    var t = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
    var n = new Date;
    var r = (n.getDate() < 10 ? "0" : "") + n.getDate();
    var s = e[n.getDay()];
    var o = t[n.getMonth()] + " " + r + ", " + i(n.getYear());
    window.dateList = [o];
    window.selectedDates = [];
    var u = 24;
    for (var a = 0; a < 6; a++) {
        var f = new Date((new Date).getTime() + u * 60 * 60 * 1e3);
        var l = (f.getDate() < 10 ? "0" : "") + f.getDate();
        var c = t[f.getMonth()] + " " + l + ", " + i(f.getYear());
        window.dateList.push(c);
        var u = u + 24
    }
}
$(".page-container, .layer-container").hide();
document.addEventListener("deviceready", onDeviceReady, false);
var trigger = "click";
document.addEventListener("resume", onResume, false);
$.fn.animateRotate = function (e, t, n, r) {
    var i = $.speed(t, n, r);
    var s = i.step;
    return this.each(function (t, n) {
        i.step = function (e) {
            $.style(n, "-webkit-transform", "rotate(" + e + "deg)");
            if (s) return s.apply(this, arguments)
        };
        $({
            deg: 0
        }).animate({
            deg: e
        }, i)
    })
};
window.today;
window.tomorrow;
$(".staff-list ul").on("click", "li", function (e) {
    var t = $(this).find(".item-link-container");
    var n = $(t).is(":visible");
    if (n) {
        $(this).find(".item-link-container").hide();
        $(".item-link-container").hide()
    } else {
        $(".item-link-container").hide();
        $(this).find(".item-link-container").show()
    }
});
$(".web-data").on("click", ".item-web", function (e) {
    var t = $(this).attr("href");
    var n = window.open(t, "_system", "location=yes");
    e.preventDefault();
    e.returnValue = false
});
$(document).on("click", ".route-initiator", function (e) {
    e.returnValue = false;
    e.preventDefault()
}).on(trigger, ".route-initiator", function (e) {
    var t = $(this).attr("href"),
        n = t.search(">"),
        r = t.search(","),
        i = t.slice(0, n).trim();
    destination = t.slice(n + 1, r).trim(), data = t.slice(r + 1).trim();
    console.log(t);
    core[destination](i, data);
    if ($(this).hasClass("action-refresh")) {
        $(this).animateRotate(360, 1e3, "linear")
    }
    if ($(this).hasClass("week-day")) {
        $(this).addClass("selected")
    }
    if (i === "nav") {
        $("#wrapper-nav ul a").removeClass("active");
        $(this).addClass("active")
    }
    e.returnValue = false;
    e.preventDefault()
});
var currentLayer, currentPage, cacheLayer, requestedStackPos, core = {
        Rotation: function (e) {
            $(".action-back").attr("href", "pop > routeLayer, Week_View");
            switch (e) {
            case "Week_View":
                $(".action-back").attr("href", "#");
                $(".week-data-loader").html(" ");
                $(".action-back").hide();
                createDate();
                $.getJSON("./core/logic/db/rotation.json", function (e) {
                    for (var t = 0; t < dateList.length; t++) {
                        for (var n in e.rotations) {
                            if (dateList[t] === e.rotations[n].date) {
                                var r = e.rotations[n];
                                window.selectedDates.push(r)
                            }
                        }
                    }
                    var i = 0;
                    for (var s in window.selectedDates) {
                        $(".week-data-loader").append("<div class='loader-" + i + "'></div>");
                        var o = helper["formatSchedule"](window.selectedDates[s].order);
                        helper["loadWeek"](window.selectedDates[s].date, window.selectedDates[s].day, window.selectedDates[s].structure, o, i);
                        i++
                    }
                });
                break;
            case "Day_View":
                window.scrollTo(0, 0);
                $(".action-back").show();
                var t = $(".week-data-loader").find(".selected").find(".data").html();
                $.getJSON("./core/logic/db/rotation.json", function (e) {
                    for (var n in e.rotations) {
                        if (t === e.rotations[n].date) {
                            var r = helper["formatSchedule"](e.rotations[n].order);
                            helper["loadDay"](e.rotations[n].date, e.rotations[n].day, e.rotations[n].structure, r)
                        }
                    }
                });
                break
            }
        },
        Staff: function (e) {
            $(".action-back").attr("href", "pop > routeLayer, Staff_list_View");
            switch (e) {
            case "Staff_List_View":
                $(".action-back").attr("href", "#");
                $(".action-back").hide();
                $(".list-data").html("");
                $.getJSON("./core/logic/db/staff.json", function (e) {
                    for (var t in e.admin) {
                        var n = e.admin[t];
                        helper["displayListItem"]("admin", n)
                    }
                    for (var r in e.teachers) {
                        var n = e.teachers[r];
                        helper["displayListItem"]("teachers", n)
                    }
                    for (var i in e.support) {
                        var n = e.support[i];
                        helper["displayListItem"]("support", n)
                    }
                });
                break;
            case "Staff_Info_View":
                $(".action-back").show();
                break
            }
        },
        Discover: function (e) {
            $(".action-back").attr("href", "pop > routeLayer, Discover_list_View");
            switch (e) {
            case "Discover_List_View":
                $(".action-back").attr("href", "#");
                $(".action-back").hide();
                $(".list-data").html("");
                $.getJSON("./core/logic/db/sites.json", function (e) {
                    for (var t in e.academics) {
                        var n = e.academics[t];
                        helper["displayListItem"]("academics", n)
                    }
                    for (var r in e.athletics) {
                        var n = e.athletics[r];
                        helper["displayListItem"]("athletics", n)
                    }
                    for (var i in e.arts) {
                        var n = e.arts[i];
                        helper["displayListItem"]("arts", n)
                    }
                    for (var s in e.workexperience) {
                        var n = e.workexperience[s];
                        helper["displayListItem"]("workexperience", n)
                    }
                });
                break
            }
        },
        About: function (e) {
            $(".action-back").attr("href", "pop > routeLayer, About_View");
            switch (e) {
            case "About_View":
                $(".action-back").attr("href", "#");
                $(".action-back").hide();
                $.getJSON("./core/logic/db/about.json", function (e) {
                    $(".current-version").html(e.version)
                });
                break
            }
        },
        routeLayer: function (e, t) {
            $.getJSON("./core/logic/db/pages.json", function (n) {
                var r = n.Stacks.length;
                for (var i = 0; i < r; i++) {
                    var s = _.values(n.Stacks[i]);
                    if (_.contains(s, t)) {
                        requestedPage = n.Stacks[i].page;
                        break
                    }
                }
                requestedStackPos = $("#" + requestedPage).children(".StackPos").attr("id");
                switch (e) {
                case "nav":
                    window.scrollTo(0, 0);
                    if (requestedPage !== currentPage) {
                        if (requestedStackPos === undefined) {
                            cacheLayer = t;
                            console.log("Switching stacks, requested stack doesn't have a saved state.")
                        } else {
                            cacheLayer = requestedStackPos;
                            console.log("Switching stacks, resuming saved state.")
                        }
                        $("#" + currentLayer).addClass("StackPos");
                        $("#" + t).removeClass("StackPos")
                    } else {
                        cacheLayer = t;
                        console.log("Not switching stacks, resetting stack state")
                    }
                    break;
                case "push":
                    cacheLayer = t;
                    break;
                case "pop":
                    cacheLayer = t;
                    break;
                default:
                    cacheLayer = t;
                    console.log("Routing..");
                    break
                }
                currentLayer = cacheLayer;
                $(".action-refresh").attr("href", "refresh > routeLayer, " + currentLayer);
                currentPage = requestedPage;
                $(".page-container, .layer-container").hide();
                $("#" + currentPage + ", #" + currentLayer).removeAttr("style");
                core[currentPage](currentLayer)
            })
        },
        scheduleError: function (e, t, n) {
            switch (t) {
            case "Week_View":
                $("#timetable-today-loader").load("./core/styling/templates/Week_View_template #error", function () {
                    $(".loader-" + n + ".error-reason").html(e);
                    $(".loader-" + n + ".error-reason").append("<span>Please refer to the school's website for the most up to date information.</span>")
                });
                break;
            case "Day_View":
                $("#timetable-tomorrow-loader").load("./core/styling/templates/Day_View.html #error", function () {
                    $(".error-reason").html(e);
                    $(".error-reason").append("<span>Please refer to the school's website for the most up to date information.</span>")
                });
                break
            }
        },
        backbttn: function () {
            var e = $(".action-back").attr("href"),
                t = e.search(">"),
                n = e.search(","),
                r = e.slice(0, t).trim();
            destination = e.slice(t + 1, n).trim(), data = e.slice(n + 1).trim();
            console.log(e);
            core[destination](r, data)
        }
    },
    helper = {
        formatSchedule: function (e) {
            var t = new Array;
            if (/^(?:1|2|3)$/.test(e)) {
                t.push(1);
                switch (e) {
                case "1":
                    t.push(1, 2, 3, 4);
                    break;
                case "2":
                    t.push(2, 3, 1, 4);
                    break;
                case "3":
                    t.push(3, 1, 2, 4);
                    break
                }
            } else {
                t.push(2);
                switch (e) {
                case "5":
                    t.push(5, 6, 7, 8);
                    break;
                case "6":
                    t.push(6, 7, 5, 8);
                    break;
                case "7":
                    t.push(7, 5, 6, 8);
                    break
                }
            }
            return t
        },
        loadWeek: function (e, t, n, r, s) {
            var o = new Array(r[1], r[2], r[3], r[4]);
            $(".loader-" + s).load("./core/styling/templates/Week_View_template.html #" + n, function () {
                var r = e.search(" "),
                    s = e.search(","),
                    u = e.slice(0, r).trim().slice(0, 3),
                    a = e.slice(r + 1, s).trim(),
                    f = t.slice(0, 3);
                $(this).find(".data").html(e);
                $(this).find(".day").append(f);
                $(this).find(".num").append(a);
                $(this).find(".month").append(u);
                if (!(n === "none")) {
                    var l = 1;
                    for (i in o) {
                        $(this).find(".order").append("<span>" + o[i] + "</span>");
                        l++
                    }
                } else {
                    console.log("caught one " + n)
                }
            })
        },
        loadDay: function (e, t, n, r) {
            var s = e.search(" "),
                o = e.search(","),
                u = e.slice(0, s).trim().slice(0, 3),
                a = e.slice(s + 1, o).trim(),
                f = t,
                l = r[0],
                c = new Array(r[1], r[2], r[3], r[4]);
            $(".day-data-loader").load("./core/styling/templates/Day_View_template.html #" + n, function () {
                if (!(n === "none")) {
                    var t = 1;
                    for (i in c) {
                        $("#timetable" + t).html(c[i]);
                        t++
                    }
                    $(this).find(".data").html(e);
                    $(this).find(".day").append(f);
                    $(this).find(".num").append(a);
                    $(this).find(".month").append(u);
                    $(this).find(".dayType").append(l)
                }
            })
        },
        displayListItem: function (e, t) {
            switch (e) {
            case "admin":
                $(".admin-list-data").append("<li> <span class='font-light item-title'>" + t.title + "</span><span class='item-name font-light'> " + t.name + "</span><div class='item-link-container'><a href='mailto:" + t.email + "' class='item-email route-initiator-null font-light'>Email: " + t.email + "</a> </div></li>");
                break;
            case "teachers":
                var n = _.isUndefined(t.website);
                if (!n) {
                    $(".teachers-list-data").append("<li><span class='font-light item-name'>" + t.name + "</span><div class='item-link-container'><a href='mailto:" + t.email + "' class='route-initiator-null font-light item-email'>Email: " + t.email + "</a><br /><a class='font-light route-initiator-null item-web' href='" + t.website + "'>Visit their website</a></div></li>")
                } else {
                    $(".teachers-list-data").append("<li><span class='item-name font-light'>" + t.name + "</span><div class='item-link-container'><a route-initiator-null href='mailto:" + t.email + "' class='font-light item-email'> Email: " + t.email + "</a></div></li>")
                }
                break;
            case "support":
                var r = _.isUndefined(t.website);
                if (!r) {
                    $(".support-list-data").append("<li> <span class='item-title font-light'>" + t.title + "</span><br /> <span class='item-name font-light'>" + t.name + "</span><div class='item-link-container'><a href='mailto:" + t.email + "' class='item-email route-initiator-null font-light'>Email: " + t.email + "</a><br /><a class='route-initiator-null item-web font-light' href='" + t.website + "'>Visit their website</a></div></li>")
                } else {
                    $(".support-list-data").append("<li> <span class='item-title font-light'>" + t.title + "</span><br /> <span class='item-name font-light'>" + t.name + "</span><div class='item-link-container'><a href='mailto:" + t.email + "' class='item-email route-initiator-null font-light'>Email: " + t.email + "</a></div></li>")
                }
                break;
            case "academics":
                $(".academics-list-data").append("<li><a class='font-light item-program route-initiator-null item-web' href='" + t.website + "'>" + t.name + "</a></li>");
                break;
            case "athletics":
                $(".athletics-list-data").append("<li><a class='font-light item-program route-initiator-null item-web' href='" + t.website + "'>" + t.name + "</a></li>");
                break;
            case "arts":
                $(".arts-list-data").append("<li><a class='font-light item-program route-initiator-null item-web' href='" + t.website + "'>" + t.name + "</a></li>");
                break;
            case "workexperience":
                $(".workexperience-list-data").append("<li><a class='font-light item-program route-initiator-null item-web' href='" + t.website + "'>" + t.name + "</a></li>");
                break
            }
        }
    };
core["routeLayer"]("startup", "Week_View");
app.initialize()