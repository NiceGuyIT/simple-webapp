migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ttdnssx39rffum2")

  // remove
  collection.schema.removeField("kjlgdmku")

  // remove
  collection.schema.removeField("qbcihiuc")

  // remove
  collection.schema.removeField("zmf4vdqf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "edyydmeh",
    "name": "author",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "m7v44x137r9dijy",
      "cascadeDelete": false,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pssml5h4",
    "name": "isPopular",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "hfgsqxzq",
    "name": "isNew",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ttdnssx39rffum2")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kjlgdmku",
    "name": "author",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qbcihiuc",
    "name": "isPopular",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zmf4vdqf",
    "name": "isNew",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("edyydmeh")

  // remove
  collection.schema.removeField("pssml5h4")

  // remove
  collection.schema.removeField("hfgsqxzq")

  return dao.saveCollection(collection)
})
