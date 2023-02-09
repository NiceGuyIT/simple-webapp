migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("Ax4GTVSdYCxJ45Z")

  collection.type = "base"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("Ax4GTVSdYCxJ45Z")

  collection.type = ""

  return dao.saveCollection(collection)
})
