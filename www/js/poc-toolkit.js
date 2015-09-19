Date.prototype.addDays= function(h){
    date = new Date();
    date.setDate(this.getDate()+h);
    return date;
}

today = new Date();

var tasks = [
    {"startDate":today,"endDate":today.addDays(1),"taskName":"Organizational Alignment","status":"SUCCEEDED"}
    ,{"startDate":new Date("Sep 18 02:36:45 EST 2015"),"endDate":new Date("Sep 18 03:36:45 EST 2015"),"taskName":"Interest and understanding of Cassandra","status":"RUNNING"}
    ,{"startDate":new Date("Sep 18 03:36:45 EST 2015"),"endDate":new Date("Sep 18 04:36:45 EST 2015"),"taskName":"Find the right use case","status":"RUNNING"}
    ,{"startDate":new Date("Sep 18 02:36:45 EST 2015"),"endDate":new Date("Sep 18 05:36:45 EST 2015"),"taskName":"POC","status":"RUNNING"}

];


var taskStatus = {
    "SUCCEEDED" : "bar",
    "FAILED" : "bar-failed",
    "RUNNING" : "bar-running",
    "KILLED" : "bar-killed"
};

var taskNames = ["Organizational Alignment", "Interest and understanding of Cassandra", "Find the right use case", "POC"]

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

var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format).height(450).width(800);

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
