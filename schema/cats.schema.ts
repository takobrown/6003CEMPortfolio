export const cats = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/cats",
  "title": "Cats",
  "description": "Cats Database",
  "type": "object",
  "properties": {
    "title": {
      "description": "Cats Title",
      "type": "string"
    },
    "allText": {
      "description": "Body text of the cats",
      "type": "string"
    },
    "summary": {
      "description": "Optional short text summary of cats",
      "type": "string"
    },
    "imageURL": {
      "description": "URL for main image to show in cats",
      "type": "string"
    },
    "published": {
      "description": "Is the cat published or not",
      "type": "boolean"
    },
    "postID": {
      "description": "User ID of the upload cat",
      "type": "integer",
      "minimum": 0
    },
    "messagebox": {
      "description": "Optional box for message",
      "type": "string"
    }
  },
  "required": ["title", "allText", "postID"]
}