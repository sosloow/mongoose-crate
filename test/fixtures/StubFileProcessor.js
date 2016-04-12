var fs = require('fs'),
  async = require('async'),
  path = require('path')

var StubFileProcessor = function() {

}

StubFileProcessor.prototype.createFieldSchema = function() {
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

StubFileProcessor.prototype.process = function(attachment, storageProvider, model, callback) {
  storageProvider.save(attachment, function(error, url, path) {
    model.size = attachment.size
    model.name = attachment.name
    model.type = attachment.type
    model.url = url
    model.path = path

    callback(error)
  })
}

StubFileProcessor.prototype.willOverwrite = function(model) {
  return !!model.path
}

StubFileProcessor.prototype.remove = function(storageProvider, model, callback) {
  storageProvider.remove(model, callback)
}

module.exports = StubFileProcessor
