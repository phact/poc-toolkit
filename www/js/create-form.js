var default_schema =
    {
    "schema": {
        "milestones": {
            "type": "array",
            "items": {
                "type": "object",
                "title": "Milestone",
                "properties": {
                    "name": {
                        "type":"string",
                        "title": "Milestone Name"
                    },

                    "tasks": {
                        "type": "array",
                        "title": "Tasks",
                        "items": {
                            "type": "object",
                            "required": true,
                            "properties": {
                                "name": {
                                    "type":"string",
                                    "title": "Type Name"
                                },
                                "duration": {
                                    "type":"integer",
                                    "title":"Duration(days)",
                                    "required":true

                                },
                                "content": {
                                    "type":"textarea",
                                    "title": "Content"
                                }
                            }, "required":["duration"]
                        }
                    }
                },
            }
        }
    },

    "form": [
        {
            "type": "tabarray",
            "items": [
                {
                    "type": "section",
                    "title": "Milestone {{idx}}",
                    "items": [
                        {
                            "title":"Milestone {{idx}}",
                            "type":"fieldset",
                            "key":"milestones[]",
                            "valueInLegend": true
                        }
                    ]
                }
            ]
        },
        {
            "type": "actions",
            "items": [
                {
                    "type":"button",
                    "title":"save",
                    "onClick": function (evt) {
                        evt.preventDefault();
                        buildGantt();
                        saveTemplate();
                    }
                }
            ]
        },
    ],

}


var default_value = {  "value": {
    "milestones":[
        {
            "name":"Organizational Alignment",
            "tasks":[
                {
                    "name":"Ownersihp of the poject",
                    "duration":1,
                    "content":"Get org knowledge"
                },
                {
                    "name":"Budget for hardware",
                    "duration":2,
                    "content":"Get org knowledge"
                }
            ]
        },
        {
            "name":"Interest and understanding of Cassandra",
            "tasks":[
                {
                    "name":"Share competitive info and accurate positioning",
                    "duration":2,
                    "content":""
                },
                {
                    "name":"Eventual Consistency",
                    "duration":1,
                    "content":""
                }
            ]
        },
        {
            "name":"Find the right use case",
            "tasks":[
                {
                    "name":"Finding a champion",
                    "duration":2,
                    "content":"Finding a champion"
                },
                {
                    "name":"Understanding the Organization",
                    "duration":1,
                    "content":"Understanding the Organization"
                },
                {
                    "name":"Finding a Painpoint",
                    "duration":3,
                    "content":"Finding a Painpoint"
                },
                {
                    "name":"Tech day",
                    "duration":1,
                    "content":"Tech day"
                }
            ]
        },
        {
            "name":"POC",
            "tasks":[
                {
                    "name":"Identify Success Criteria (including timeline)",
                    "duration":2,
                    "content":""
                },
                {
                    "name":"Sign-off Success Criteria",
                    "duration":1,
                    "content":"Sign-off Success Criteria"
                },
                {
                    "name":"Jiras",
                    "duration":1,
                    "content":"Jiras"
                },
                {
                    "name":"Data Modeling",
                    "duration":1,
                    "content":"Data Modeling"
                },
                {
                    "name":"Application Development",
                    "duration":1,
                    "content":"Application Development"
                },
                {
                    "name":"Hardware Selection",
                    "duration":1,
                    "content":"Hardware Selection"
                },
                {
                    "name":"Sizing and TCO",
                    "duration":2,
                    "content":"Sizing and TCO"
                },
                {
                    "name":"Opps Readiness",
                    "duration":1,
                    "content":"Opps Readiness"
                },
                {
                    "name":"Using the right DSE Featrues",
                    "duration":1,
                    "content":"Using the right DSE Featrues"
                }
            ]
        }
    ]

}
}

$('form').jsonForm($.extend(default_schema, default_value))
