Date.prototype.addDays= function(h){
    date = new Date();
    date.setDate(this.getDate()+h);
    return date;
}

//define global variables
currentDay = new Date();

currentDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate());
var tasks;
var taskStatus
var taskNames
var maxDate
var minDate
var gantt



var formData = function(){

    var result;
    myAjaxCall = $.ajax({
        url: "read/First-land-POC",
        context: document.body,
        type: "GET",
        contentType: "application/json; charset=utf-8",

    }).done(function(data) {
        console.log(data);

        //replace form value with database
        if (data!== ""){
            $("form").empty();
            default_schema.value = JSON.parse(data);
            $('#form').jsonForm(default_schema);
            buildGantt(data);
        }
    });

}


var saveTemplate = function(){
    var form= $('#form').jsonFormValue();

    myAjaxCall = $.ajax({
        url: "write/First-land-POC/"+JSON.stringify(form),
        context: document.body,
        type: "GET",
        contentType: "application/json; charset=utf-8",

    }).done(function(data) {
        console.log(data);
        console.log("I wrote the payload to the db");

    });

}

var buildGantt = function(){

    $("#chart").empty()

    var id = 1;
    var dayCount =0
    var taskArray=[]
    var form= $('#form').jsonFormValue();
    var milestones = []
    milestones = form.milestones;
    $.each(milestones, function(milestone_index,milestone){
        $.each(milestone.tasks, function(task_index, task){
            //    console.log(milestone.name +" - "+ task.name)
            taskObject = {
                "startDate":currentDay.addDays(dayCount),
                "endDate":currentDay.addDays(dayCount+task.duration),
                "taskName":milestone.name,
                "jobName":task.name,
                "status":"NEW",
                "id":id,
                "duration":task.duration,
                "content": task.content
            }
            id++
                dayCount= dayCount+task.duration
            //   console.log(taskObject)
            taskArray.push(taskObject)

        })

    })

    /*
       tasks = [
       {"startDate":today,"endDate":today.addDays(1),"taskName":"Organizational Alignment","status":"SUCCEEDED"}
       ,{"startDate":new Date("Sep 18 02:36:45 EST 2015"),"endDate":new Date("Sep 18 03:36:45 EST 2015"),"taskName":"Interest and understanding of Cassandra","status":"RUNNING"}
   ,{"startDate":new Date("Sep 18 03:36:45 EST 2015"),"endDate":new Date("Sep 18 04:36:45 EST 2015"),"taskName":"Find the right use case","status":"RUNNING"}
        ,{"startDate":new Date("Sep 18 02:36:45 EST 2015"),"endDate":new Date("Sep 18 05:36:45 EST 2015"),"taskName":"POC","status":"RUNNING"}

    ];
    */
    tasks=taskArray;

    taskStatus = {
        "SUCCEEDED" : "bar",
        "FAILED" : "bar-failed",
        "RUNNING" : "bar-running",
        "SKIPPED" : "bar-killed",
        "NEW" : "bar-new"
    };

    tasks.sort(function(a, b) {
        return a.endDate - b.endDate;
    });
    maxDate = tasks[tasks.length - 1].endDate;

    tasks.sort(function(a, b) {
        return a.startDate - b.startDate;
    });
    minDate = tasks[0].startDate;

    taskNames = []
    $.each(tasks,function(i,task){
        taskNames.push(task.taskName)
    })
    taskNames = $.unique(taskNames).reverse()

    var format = "%b:%d";
    var timeDomainString = "1week";

    gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format).height(450).width(800);

    //    changeTimeDomain(timeDomainString);

    gantt.timeDomainMode("fit");

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
}

formData();
