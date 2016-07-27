### img-assets-webpack-plugin

针对图片资源生成映射关系数组的插件

目前只支持png, gif, jpg, jpeg4种

支持由file-loader转化的base64图

### usage:

```javascript
var ImgAssetsPlugin = require('./webpack.plugin/imgAssets');

//...webpack.config.js
//...
//...
  plugins: [      
      new ImgAssetsPlugin({
        filename: 'imgAssets.json'
      })
  ]
}
//options.filename can be absolute path
```
