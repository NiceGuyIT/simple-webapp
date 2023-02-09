migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("FlwF8mAmByRkNc0")

  collection.type = "base"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("FlwF8mAmByRkNc0")

  collection.type = ""

  return dao.saveCollection(collection)
})
