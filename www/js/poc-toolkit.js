var tasks = [
    {"startDate":new Date("Dec 09 01:36:45 EST 2012"),"endDate":new Date("Dec 09 02:36:45 EST 2012"),"taskName":"D Job","status":"RUNNING"}
    ,{"startDate":new Date("Dec 09 02:36:45 EST 2012"),"endDate":new Date("Dec 09 03:36:45 EST 2012"),"taskName":"P Job","status":"RUNNING"}
    ,{"startDate":new Date("Dec 09 03:36:45 EST 2012"),"endDate":new Date("Dec 09 04:36:45 EST 2012"),"taskName":"E Job","status":"RUNNING"}
    ,{"startDate":new Date("Dec 09 02:36:45 EST 2012"),"endDate":new Date("Dec 09 05:36:45 EST 2012"),"taskName":"A Job","status":"RUNNING"}
    ,{"startDate":new Date("Dec 09 05:36:45 EST 2012"),"endDate":new Date("Dec 09 06:36:45 EST 2012"),"taskName":"N Job","status":"RUNNING"}

];


var taskStatus = {
    "SUCCEEDED" : "bar",
    "FAILED" : "bar-failed",
    "RUNNING" : "bar-running",
    "KILLED" : "bar-killed"
};

var taskNames = [ "D Job", "P Job", "E Job", "A Job", "N Job" ];

tasks.sort(function(a, b) {
    return a.endDate - b.endDate;
});
var maxDate = tasks[tasks.length - 1].endDate;
tasks.sort(function(a, b) {
    return a.startDate - b.startDate;
});
var minDate = tasks[0].startDate;

var format = "%H:%M";
var timeDomainString = "1week";

var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format).height(450).width(900);

changeTimeDomain(timeDomainString);

gantt.timeDomainMode("fixed");

gantt(tasks);



function changeTimeDomain(timeDomainString) {
    this.timeDomainString = timeDomainString;
    switch (timeDomainString) {
        case "1hr":
            format = "%H:%M:%S";
        gantt.timeDomain([ d3.time.hour.offset(getEndDate(), -1), getEndDate()  ]);
        break;
        case "3hr":
            format = "%H:%M";
        gantt.timeDomain([ d3.time.hour.offset(getEndDate(), -3), getEndDate()  ]);
        break;

        case "6hr":
            format = "%H:%M";
        gantt.timeDomain([ d3.time.hour.offset(getEndDate(), -6), getEndDate()  ]);
        break;

        case "1day":
            format = "%H:%M";
        gantt.timeDomain([ d3.time.day.offset(getEndDate(), -1), getEndDate()  ]);
        break;

        case "1week":
            format = "%a %H:%M";
        gantt.timeDomain([ d3.time.day.offset(getEndDate(), -7), getEndDate()  ]);
        break;
        default:
            format = "%H:%M"


    }
    gantt.tickFormat(format);
    gantt.redraw(tasks);

}

function getEndDate() {
    var lastEndDate = Date.now();
    if (tasks.length > 0) {
        lastEndDate = tasks[tasks.length - 1].endDate;

    }

    return lastEndDate;

}
