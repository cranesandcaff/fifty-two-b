Package.describe({
  name: 'ng-material-shim',
  description: 'The angular-material version available through atmosphere never seems to be right. This is just a downloaded version that always matches what I expect.'
})

Package.onUse(function(api){
  api.addFiles([
    'material.js',
    'material.css',
    'material-layout.css'
  ], [
    'client'
  ])
})
