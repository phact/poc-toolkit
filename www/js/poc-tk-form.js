$('form').jsonForm(

    {
        "schema": {
            "tasks": {
                "type": "array",
                "items": {
                    "type": "object",
                    "title": "Task",
                    "properties": {
                        "name": {
                            "type": "string",
                            "title": "Name",
                            "required": true
                        },
                        "description": {
                            "type": "textarea",
                            "title": "Description",
                        },
                        "completed": {
                            "type": "string",
                            "title": "Completed?",
                            "enum": [ "true", "false"]

                        },
                        "percent": {
                            "type": "integer",
                            "title": "Percent"

                        }

                    }

                }

            }

        },
        "value": {
            "tasks": [
                { "name": "Hardware Sizing and Signoff", "completed": "true", "percent": 34  },
                { "name": "Hardware Provisioning", "completed": "false", "percent": 6  },
                { "name": "Data Model"   }

            ]

        }



    });
