// loader.js

function loadContent(pageName) {
    // Erstelle eine neue XMLHttpRequest
    var xhr = new XMLHttpRequest();
  
    // Definiere die Callback-Funktion für den Abschluss der Anfrage
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        // Erfolgreiche Anfrage, füge den geladenen Inhalt in den Container ein
        document.getElementById(pageName + '-container').innerHTML = xhr.responseText;
      } else {
        // Die Anfrage war nicht erfolgreich
        console.error('Fehler beim Laden der Seite ' + pageName);
      }
    };
  
    // Konfiguriere die Anfrage (GET-Methode für einfaches Laden)
    xhr.open('GET', pageName + '.html', true);
  
    // Sende die Anfrage
    xhr.send();
  }
  