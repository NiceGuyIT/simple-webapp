migrate((db) => {
  const collection = new Collection({
    "id": "m7v44x137r9dijy",
    "created": "2023-02-12 15:23:26.691Z",
    "updated": "2023-02-12 15:23:26.691Z",
    "name": "author",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "lpw519h2",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "jzozwsct",
        "name": "field",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "collectionId": "ttdnssx39rffum2",
          "cascadeDelete": false,
          "maxSelect": 10,
          "displayFields": []
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("m7v44x137r9dijy");

  return dao.deleteCollection(collection);
})
