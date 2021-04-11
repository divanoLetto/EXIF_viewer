# EXIF Viewer 
Questo progetto realizzato con il framework Vue, permette di visualizzare i metadata EXIF e di geolocalizzazioni contenuti nelle immagini come indicato nell'assegnamento *imageEXIFViewer.pdf*. 

## Struttura ##
Il progetto è diviso in 4 file:
- __index.html__: definisce la vista e la struttura principale dell'applicazione.
- __model_controller.js__: definisce le operazioni eseguibili dall'utente, la logica e i dati necessari all'applicazione. In particolare implementa le funzioni di l'upload, di ruotazione oraria e antioraria e di estrazione dei metadati EXIF e GPS contenuti nelle immagini.
- __exif_property.js__: specifica la vista di un singolo metadato EXIF e le operazioni necessarie. In particolare consente di prendere in ingresso un dizionario di proprietà contenente i metadate e realizza una vista che tiene conto del fatto che gli elementi possono essere stati codificati in modo gerarchico.
- __style.css__: definisce l'aspetto grafico.

L'applicazione utilizza le librerie di [*Exif.js*](https://github.com/exif-js/exif-js "Exif.js") per l'estrazione dei metadati e [*JavaScript Load Image*](https://github.com/blueimp/JavaScript-Load-Image "Load Image") per la gestione delle immagini. 

## Esecuzione ##
Per l'esecuzione sono sufficienti i file *.html*, *.javascript* e *.css* contenuti nel repository e un brower (es. Google Chrome).
L'applicazione è disponibile anche al link: *http://lorenzomwebsite.altervista.org/HCI/index.html*.
