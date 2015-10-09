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

//formData = {"milestones":[{"name":"Organizational Alignment","tasks":[{"name":"Ownersihp of the poject","duration":1,"content":"Get org knowledge"},{"name":"Budget for hardware","duration":2,"content":"Get org knowledge"}]},{"name":"Interest and understanding of Cassandra","tasks":[{"name":"Share competitive info and accurate positioning","duration":2,"content":""},{"name":"Eventual Consistency","duration":1,"content":""}]},{"name":"Find the right use case","tasks":[{"name":"Finding a champion","duration":2,"content":"Finding a champion"},{"name":"Understanding the Organization","duration":1,"content":"Understanding the Organization"},{"name":"Finding a Painpoint","duration":3,"content":"Finding a Painpoint"},{"name":"Tech day","duration":1,"content":"Tech day"}]},{"name":"POC","tasks":[{"name":"Identify Success Criteria (including timeline)","duration":2,"content":""},{"name":"Sign-off Success Criteria","duration":1,"content":"Sign-off Success Criteria"},{"name":"Jiras","duration":1,"content":"Jiras"},{"name":"Data Modeling","duration":1,"content":"Data Modeling"},{"name":"Application Development","duration":1,"content":"Application Development"},{"name":"Hardware Selection","duration":1,"content":"Hardware Selection"},{"name":"Sizing and TCO","duration":2,"content":"Sizing and TCO"},{"name":"Opps Readiness","duration":1,"content":"Opps Readiness"},{"name":"Using the right DSE Featrues","duration":1,"content":"Using the right DSE Featrues"}]}]}

var formData = function(){

    var result;
    myAjaxCall = $.ajax({
          url: "read/First land POC",
          context: document.body,
          type: "GET",
          contentType: "application/json; charset=utf-8",

      }).done(function(data) {
          console.log(data);
          buildGantt(data);
          formClickEvent();
      });

}


var buildGantt = function(data){

    $("#chart").empty()

    var id = 1;
    var dayCount =0
    var taskArray=[]
    var form= JSON.parse(data);
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

formData()
