$('form').jsonForm(

 {
        "schema": {
            "milestone": {
                "type": "array",
                "items": {
                    "type": "object",
                    "title": "Milestone",
                    "properties": {
                        "name": {
                            "type":"string",
                            "title": "Milestone Name"
                        },

                    "task": {
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
                                    "title":"Duration(days)"

                                },
                                "content": {
                                     "type":"textarea",
                                     "title": "Content"
                                }
                            }
                        }
                    }
                    },
                }
            }
        },
                      /*  ,
                    "task": {
                        "type": "string",
                        "title": "Task"

                    },

                    "duration": {
                        "type": "integer",
                        "title": "Duration (days)"
                    },
                    "content": {
                        "type": "textarea",
                        "title": "Content",
                    }*/

        "form": [
            {
                "type": "tabarray",
                "items": [
                    {
                        "type": "section",
                        "title": "Milestone {{value}}",
                        "items": [
                            {
                                "key":"milestone[]",
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
                            alert(JSON.stringify( $('#form').jsonFormValue() )) ;
                        }
                    }
                ]
            },
        ],
        "value": {
            "tasks": [
                { "milestone": "Organizational Alignment", }

            ]

        }
 }

);
