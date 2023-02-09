migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lCzTz4SFw9m8HjI")

  collection.name = "users"
  collection.type = "auth"
  collection.system = false
  collection.listRule = "id = @request.auth.id"
  collection.viewRule = "id = @request.auth.id"
  collection.createRule = ""
  collection.updateRule = "id = @request.auth.id"
  collection.options = {
    "allowEmailAuth": true,
    "allowOAuth2Auth": true,
    "allowUsernameAuth": false,
    "exceptEmailDomains": null,
    "manageRule": null,
    "minPasswordLength": 8,
    "onlyEmailDomains": null,
    "requireEmail": true
  }

  // remove
  collection.schema.removeField("w5jsobrl")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lCzTz4SFw9m8HjI")

  collection.name = "profiles"
  collection.type = ""
  collection.system = true
  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.options = {}

  // add
  collection.schema.addField(new SchemaField({
    "system": true,
    "id": "w5jsobrl",
    "name": "userId",
    "type": "user",
    "required": true,
    "unique": true,
    "options": {
      "maxSelect": 1,
      "cascadeDelete": true
    }
  }))

  return dao.saveCollection(collection)
})
