
var path = require('path');
var fs = require('fs');

var write = function(uri, txt) {
    if (fs.existsSync(uri)) {
        fs.chmodSync(uri, '755');
    }
    fs.writeFileSync(uri, txt, 'utf8');
};

function ImgAssetsPlugin(options) {
  this.options = Object.assign({
    filename: 'imgAssets.json'
  }, options || {});
}

ImgAssetsPlugin.prototype.apply = function(compiler) {
  var options = this.options;
  compiler.plugin('done', function(stats) {
    var path = require('path');
    var statsJson = stats.toJson({
      context: options.context || process.cwd()
    });
    var outputs = [];
    statsJson.modules.forEach(function (v) {
      var item = {};
      if (v.name.match(/.(png|gif|jpe?g)$/)) {
        item = {
          name: v.name,
          assets: statsJson.publicPath + v.assets[0]
        };
        if (v.assets.length == 0) {
          item.assets = eval(v.source);
        }
        outputs.push(item);
      }
    });
    var fileUri = options.filename;
    if (!path.isAbsolute(options.filename)) {
      fileUri = path.join(process.cwd(), options.filename);
    }
    write(fileUri, JSON.stringify(outputs, null, '  '));
  });
};

module.exports = ImgAssetsPlugin;
