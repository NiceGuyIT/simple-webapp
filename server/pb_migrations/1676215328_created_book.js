migrate((db) => {
  const collection = new Collection({
    "id": "ttdnssx39rffum2",
    "created": "2023-02-12 15:22:08.336Z",
    "updated": "2023-02-12 15:22:08.336Z",
    "name": "book",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vhcvl12k",
        "name": "title",
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
      },
      {
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
      },
      {
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
  const collection = dao.findCollectionByNameOrId("ttdnssx39rffum2");

  return dao.deleteCollection(collection);
})
