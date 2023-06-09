export const users = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/users",
  "title": "Users",
  "description": "Users database",
  "type": "object",
  "properties": {
    "id": {
      "description": "Unique ID for user",
      "type": "string"
    },
    "firstname": {
      "description": "User First Name",
      "type": "string"
    },
    "lastname": {
      "description": "User Last Name",
      "type": "string"
    },
    "username": {
      "description": "Login Name",
      "type": "string"
    },
    "signupcode": {
      "description": "The Pet Shelter staff register account code",
      "type": "string"
    },
    "password": {
      "description": "User password",
      "type": "string"
    },
    "permission": {
      "description": "Permission of the users.",
      "type": "string"
    },
    "email": {
      "description": "User email",
      "type": "string"
    },
    "avatarurl": {
      "description": "User avatar's URL",
      "type": "string"
    }
  },
  "required": ["username", "password", "email", "signupcode"]
}
