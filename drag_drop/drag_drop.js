Vue.component('drag-drop-area', {
  data() {
    return {
      dragging: false
    }
  },
  template:
    `<div class="drag-area p-4" :class="{active: dragging}" @drop.prevent="drop_file" @dragover.prevent="drag_feedback" @dragleave.prevent="dragleave_feedback">
      <input type="file" ref="inputDrag" @change="click_input" hidden>
      <div class="icon"><i class="fas fa-cloud-upload-alt"></i></div>
      <header v-if="!dragging">Drag & Drop to Upload File</header>
      <header v-else>Release to Upload File</header>
      <span>OR</span>
      <button type="button" class="btn btn-dark" v-on:click="browse_button">Browse File</button>
    </div>`,
    methods:{
      // browse file button  v-on:click="browse_button"
      browse_button (){
        this.$refs.inputDrag.click();
      },
      // select local image from pc and upload
      click_input (event) {
        file = event.target.files[0];
        this.$parent.upload_image(file);
      },
      // Drag and drop file
      drop_file(e) {
        let droppedFiles = e.dataTransfer.files;
        if(!droppedFiles) return;
        this.$parent.upload_image(droppedFiles[0]);
      },
      // give visual feedback for drag action
      drag_feedback(){
        this.dragging = true;
      },
      // give visual feedback for dragleave action
      dragleave_feedback(){
        this.dragging = false;
      }
    }
})
