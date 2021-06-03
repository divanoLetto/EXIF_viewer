/*
This file contains the base structure of the application,
keeps track of the uploaded image file and its exif and GPS metadata,
exposes methods for extracting metadata from the image.
*/
var app = new Vue({
  el: '#app',
  data() {
    return {
      exifs: null,
      imageURL: null,
    }
  },
  methods: {
    // To convert coordinates into data used to get a link for GoogleMap.
    convertDMStoDD(degrees, minutes, seconds, direction) {
      var dd = degrees + (minutes/60) + (seconds/3600);
      if (direction == "S" || direction == "W") {
          dd = dd * -1;
        }
        return dd;
    },
    // To create the GoogleMap link starting from the exif data.
    add_gps_location(exif_data){
      // Calculate latitude decimal
      var gps_data = this.exifs["GPS Data"];
      var latDegree = gps_data["GPSLatitude"][0];
      var latMinute = gps_data["GPSLatitude"][1];
      var latSecond = gps_data["GPSLatitude"][2];
      var latDirection = gps_data["GPSLatitudeRef"];
      var latFinal = this.convertDMStoDD(latDegree, latMinute, latSecond, latDirection);
      // Calculate longitude decimal
      var lonDegree = gps_data["GPSLongitude"][0];
      var lonMinute = gps_data["GPSLongitude"][1];
      var lonSecond = gps_data["GPSLongitude"][2];
      var lonDirection = gps_data["GPSLongitudeRef"];
      var lonFinal = this.convertDMStoDD(lonDegree, lonMinute, lonSecond, lonDirection);
      link = "https://www.google.com/maps/search/?api=1&query="+latFinal+","+lonFinal;
      this.exifs["GPS Data"]["Coordinate"] = link;
    },
    // To upload the image and to extract the exif data from it.
    // This function is called by other child components that manage the Upload button or the DragAndDrop area.
    upload_image(file){
      let fileType = file.type; //getting selected file type
      let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //some valid image extensions
      if(validExtensions.includes(fileType)){//if user selected file is an image file
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.readAsDataURL(file);
        fileReader.onload = e =>{
          let fileURL = fileReader.result; //passing user file source in fileURL variable
          this.imageURL = fileURL;
          let vm = this;
          EXIF.getData(file, function() {
            var exif_data =  EXIF.getAllTags(this); //get all metadata from the image
            exif_data_GPS = {}
            exif_data_EXIF = {}
            for (var key in exif_data) {  // divide EXIF data from GPS data
                if (exif_data.hasOwnProperty(key)) {
                    if (key.includes("GPS")){
                      exif_data_GPS[key] = exif_data[key];
                    }else{
                      exif_data_EXIF[key] = exif_data[key];
                    }
                }
            }
            all_data = {};
            all_data["EXIF Data"] = exif_data_EXIF;
            if (Object.keys(exif_data_GPS).length > 0){
              all_data["GPS Data"] = exif_data_GPS;
            }
            vm.exifs = all_data; // set EXIF and GPS data
            if (vm.exifs["GPS Data"]!= undefined && vm.exifs["GPS Data"]!= undefined){
              vm.add_gps_location();  // add the GPS location property (GoogleMap)
            }
          })
        }
      }else{
        alert("This is not an Image File!");
        this.dragging = false;
      }
    }
  }
})
