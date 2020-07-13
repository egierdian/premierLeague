var dbPromised = idb.open("football_db", 1, upgradeDb => {
    var articlesObjectStore = upgradeDb.createObjectStore("team", {keyPath: "id"});
    articlesObjectStore.createIndex("name", "name", { unique: false });
});

function saveForLater(article) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("team", "readwrite");
        var store = tx.objectStore("team");
        //console.log("hasil");
        console.log(article);
        store.put(article);
        return tx.complete;
      })
      .then(function() {
        console.log("Artikel berhasil di simpan.");
      });
}

const getAll = () => {
    return new Promise((resolve, reject) => {
      dbPromised
        .then(db => {
          var tx = db.transaction("team", "readonly");
          var store = tx.objectStore("team");
          return store.getAll();
        })
        .then(team => {
          resolve(team);
        });
    });
}

function getById(iniID) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then(db => {
        var tx = db.transaction("team", "readonly");
        var store = tx.objectStore("team");
        
        return store.get(Number(iniID));
      })
      .then(team => {
        //console.log(team);
      })
  });
}

function deleteById (id){
  return new Promise(function(resolve,reject){
      dbPromised
      .then(function(db) {
        var tx = db.transaction('team', 'readwrite');
        var store = tx.objectStore('team');
        console.log("cek"+id.id);
        store.delete(Number(id.id));
        return tx.complete; 
      })
      .then(function(id) {
        console.log(id);
        console.log('Item deleted');
      })
      .catch(err => {
        console.error(err);
      })

  });
}