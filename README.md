# EXIF Viewer 
Questo progetto realizzato con il framework *Vue*, permette di visualizzare i metadata EXIF e di geolocalizzazione contenuti nelle immagini seguendo le linee guida indicate nell'assegnamento *imageEXIFViewer.pdf*. 

## Struttura ##
Il progetto è diviso in 5 file principali:
- __view__: definisce la vista e la struttura principale dell'applicazione.
- __model__: tiene traccia del file immagine e dei suoi metadati necessari all'applicazione. 
- __exif_property__: specifica la vista di un singolo metadato EXIF. Consente di prendere in ingresso un dizionario di proprietà, contenente i metadati dell'immagine, e realizza una vista che tiene conto del fatto che gli elementi possono essere stati codificati in modo gerarchico.
- __navbar_controller__: definisce e implementa le funzioni eseguibili dall'utente ovvero l'upload e la ruotazione oraria e antioraria. 
- __drag_drop__: consente l'upload di immagine tramite l'azione di _drag and drop_ e fornisce un feedback visivo relativo a questa azione. 

L'applicazione utilizza le librerie di [*Exif.js*](https://github.com/exif-js/exif-js "Exif.js") per l'estrazione dei metadati e [*JavaScript Load Image*](https://github.com/blueimp/JavaScript-Load-Image "Load Image") per la gestione delle immagini.

## Esecuzione ##
Per l'esecuzione sono sufficienti i file *.html*, *.javascript* e *.css* contenuti nel repository e un brower (es. Google Chrome).
L'applicazione è disponibile anche al link: *http://lorenzomwebsite.altervista.org/HCI/view.html*.
