var app = new Vue({
  el: '#app',
  data() {
    return {
      exifs: null,
      imageURL: null,
    }
  },
  methods: {
    convertDMStoDD(degrees, minutes, seconds, direction) {
      var dd = degrees + (minutes/60) + (seconds/3600);
      if (direction == "S" || direction == "W") {
          dd = dd * -1;
        }
        return dd;
    },
    add_gps_location(exif_data){
      var gps_data = this.exifs["GPS Data"];
      var latDegree = gps_data["GPSLatitude"][0];
      var latMinute = gps_data["GPSLatitude"][1];
      var latSecond = gps_data["GPSLatitude"][2];
      var latDirection = gps_data["GPSLatitudeRef"];
      var latFinal = this.convertDMStoDD(latDegree, latMinute, latSecond, latDirection);
      console.log(latFinal);
      // Calculate longitude decimal
      var lonDegree = gps_data["GPSLongitude"][0];
      var lonMinute = gps_data["GPSLongitude"][1];
      var lonSecond = gps_data["GPSLongitude"][2];
      var lonDirection = gps_data["GPSLongitudeRef"];
      var lonFinal = this.convertDMStoDD(lonDegree, lonMinute, lonSecond, lonDirection);
      console.log(lonFinal);
      link = "https://www.google.com/maps/search/?api=1&query="+latFinal+","+lonFinal;
      this.exifs["GPS Data"]["Coordinate"] = link;
    },
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
              // lat = exif_data_GPS["GPSLatitude"];
              // longi =  exif_data_GPS["GPSLongitude"];
              // link = "http://www.google.com/maps/place/";
              // link = link.concat(lat).concat(",").concat(longi);
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
