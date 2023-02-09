migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qYM2uteDgDyAnue")

  collection.type = "base"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qYM2uteDgDyAnue")

  collection.type = ""

  return dao.saveCollection(collection)
})
