Vue.component('menu-navbar', {
  // The template is taken from a standard boostrap navbar 
  template:
    `<div class="navbarcontainer">
      <input type="file" ref="inputNavbar" @change="click_input" hidden>
      <nav class="navbar navbar-expand-sm navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <h2 class="nav-link disabled text-dark" href="#">ExifViewer</h2>
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <button type="button" class="btn btn-light" v-on:click="browse_button">BrowseFile</button>
            </li>
            <li v-if="$parent.imageURL != null" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Rotate
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <button class="dropdown-item btn-light" v-on:click="rotate_left">Rotate left</button>
                <button class="dropdown-item btn-light" v-on:click="rotate_right">Rotate right</button>
              </div>
            </li>
          </ul>
        </div>
        </nav>
    </div>`,
    methods:{
      // browse file button
      browse_button (){
        this.$refs.inputNavbar.click();
      },
      // select local image from pc and upload
      click_input (event) {
        file = event.target.files[0];
        this.$parent.upload_image(file);
      },
      // rotate left function
      rotate_left (){
        var immagine = new Image();
        immagine.src = this.$parent.imageURL;
        var rotatedImage = loadImage.scale(immagine,{orientation: 8, canvas: true});
        this.$parent.imageURL = rotatedImage.toDataURL();
      },
      // rotate right function
      rotate_right (){
        var immagine = new Image();
        immagine.src = this.$parent.imageURL;
        var rotatedImage = loadImage.scale(immagine,{orientation: 6, canvas: true});
        this.$parent.imageURL = rotatedImage.toDataURL();
      }
    },
    mounted() {
        // Hotkeys "a","s" to rotate left and right
        this._keyListener = function(e) {
            e.preventDefault();
            if (this.$parent.imageURL != null){
              if (e.key === "a" && (e.ctrlKey || e.metaKey)) {
                  this.rotate_left();
              }else if (e.key === "s" && (e.ctrlKey || e.metaKey)) {
                  this.rotate_right();
              }
            }
        };
        document.addEventListener('keydown', this._keyListener.bind(this));
    },
})
