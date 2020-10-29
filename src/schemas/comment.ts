const createCommentSchema =

{
    "title": "createCommentSchema",
    "type": "object",
    "properties": {
        "text": {
            "type": "string"
        }
    },
    "required": ["text"]
}

const getAllSchema =

{
    "title": "getAllSchema",
    "type": "object",
    "properties": {
        "comment": {
            "type": "string"
        },
    },
    "required": []
}

const getByIdSchema =

{
    "title": "getByIdSchema",
    "type": "object",
    "properties": {
        "comment": {
            "type": "string"
        },
    },
    "required": []
}

const updateByIdSchema =

{
    "title": "updateByIdSchema",
    "type": "object",
    "properties": {
        "text": {
            "type": "string"
        }
    },
    "required": ["text"]
}

export default [
    {
        name: "createCommentSchema",
        schema: createCommentSchema
    },
    {
        name: "getAllSchema",
        schema: getAllSchema
    },
    {
        name: "getByIdSchema",
        schema: getByIdSchema
    },
    {
        name: "updateByIdSchema",
        schema: updateByIdSchema
    }
]