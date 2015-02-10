
var FileProcessor = function() {

}

FileProcessor.prototype.createFieldSchema = function() {
  return {
    size: Number,
    name: String,
    type: {
      type: String
    },
    url: String,
    path: String
  }
}

FileProcessor.prototype.process = function(attachment, storageProvider, model, callback) {
  storageProvider.save(attachment, function(error, url, path) {
    model.size = attachment.size
    model.name = attachment.name
    model.type = attachment.type
    model.url = url
    model.path = path

    callback(error)
  })
}

FileProcessor.prototype.willOverwrite = function(model) {
  return !!model.path
}

FileProcessor.prototype.remove = function(storageProvider, model, callback) {
  if(!model.path) {
    return callback()
  }

  storageProvider.remove(model, callback)
}

module.exports = FileProcessor
