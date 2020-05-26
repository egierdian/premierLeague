//mendaftarkan service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      this.navigator.serviceWorker
      .register("/service-worker.js")
      .then(function() {
        console.log("Pendaftaran serviceWorker berhasil");
      })
      .catch(function() {
        console.log("Pendaftaran serviceWorker gagal");
      });
    });
  } else {
    console.log("ServiceWorker belum didukung browser");
  }
  
  document.addEventListener("DOMContentLoaded", function () {
      var urlParams = new URLSearchParams(window.location.search);
      var id = urlParams.get("id");
      var isFromSaved = urlParams.get("saved");
      var btnSave = document.getElementById("save");
      var btnDelete = document.getElementById("hapus");

      if (isFromSaved) {
        btnSave.style.display = 'none';
        getSavedTeamById();
      } else {
        btnDelete.style.display = 'none';
      }

      var item = getTeamById();

      save.onclick = function () {
        M.toast({html: 'Saved succes..'})
        console.log("Di klik.");
        item.then(function (article) {
          saveForLater(article);
          window.location.href = 'index.html'; 
        });
      }

      hapus.onclick = function(){
        M.toast({html: 'Team was deleted'})
        console.log("button delete diklik");
        item.then(function(id){
          deleteById(id);
          isFromSaved = false;
          window.location.href ='index.html';
        })
      }
  });