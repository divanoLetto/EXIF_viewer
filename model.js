var app = new Vue({
  el: '#app',
  data() {
    return {
      exifs: null,
      imageURL: null,
    }
  },
  methods: {
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
            all_data = {}
            all_data["EXIF Data"] = exif_data_EXIF;
            if (Object.keys(exif_data_GPS).length > 0){
              all_data["GPS Data"] = exif_data_GPS;
            }
            vm.exifs = all_data; // set EXIF and GPS data
          })
        }
      }else{
        alert("This is not an Image File!");
        this.dragging = false;
      }
    }
  }
})
