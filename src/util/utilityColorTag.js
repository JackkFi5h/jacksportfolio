
const color = function(text) {
    if(text == "Xamarin")
        return 'tags-xamarin'
    else if (text =="C#")
        return 'tags-csharp'
    else if (text == "Android")
        return 'tags-android'
    else if (text == "Unity")
        return 'tags-unity'
    else
        return 'tags-base'
  }
  module.exports = { color}