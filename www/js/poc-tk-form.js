$('form').jsonForm(

    {
        "schema": {
            "tasks": {
                "type": "array",
                "items": {
                    "type": "object",
                    "title": "Task",
                    "properties": {
                        "description": {
                            "type": "string",
                            "title": "Description",
                            "required": true

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
                { "description": "Hardware Sizing and Signoff", "completed": "true", "percent": 34  },
                { "description": "Hardware Provisioning", "completed": "false", "percent": 6  },
                { "description": "Data Model"   }

            ]

        }



    });
