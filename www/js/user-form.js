var formClickEvent= function(){
    var rectangles = d3.selectAll("rect")
    .on("click",function(d){

        $('form').empty()

        $('form').jsonForm(
            {
                "schema": {
                    "milestone": {
                        "type": "object",
                        "title": d.taskName,
                        "properties": {
                            "task": {
                                "type": "object",
                                "title": d.jobName,
                                "properties": {
                                    "status": {
                                        "type": "string",
                                        "enum": ["NEW","RUNNING","SUCCEEDED","FAILED","SKIPPED"],
                                        "title":"Status"

                                    },
                                    "comments": {
                                        "type": "textarea",
                                        "title": d.content,

                                    }

                                }

                            }


                        }

                    }

                }

            }
        )
    })
}
