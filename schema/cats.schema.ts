export const cats = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/cats",
  "title": "Cats",
  "description": "Cat Database",
  "type": "object",
  "properties": {
    "title": {
      "description": "Main title of the cats",
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
      "type": "uri"
    },
    "published": {
      "description": "Is the article published or not",
      "type": "boolean"
    },
    "authorID": {
      "description": "User ID of the article author",
      "type": "integer",
      "minimum": 0
    }
  },
  "required": ["title", "allText", "authorID"]
}