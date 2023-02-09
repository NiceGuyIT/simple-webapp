migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pomG5Di6S7CEdSa")

  collection.type = "base"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("pomG5Di6S7CEdSa")

  collection.type = ""

  return dao.saveCollection(collection)
})
