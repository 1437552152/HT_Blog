function getlocal(key){
  var obj= localStorage.getItem(key)?JSON.parse(localStorage.getItem(key)):{}
  return obj;
}