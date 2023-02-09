migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rrr4TA376CPgzuD")

  collection.type = "base"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rrr4TA376CPgzuD")

  collection.type = ""

  return dao.saveCollection(collection)
})
