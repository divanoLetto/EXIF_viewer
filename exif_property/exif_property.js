var header_id = 0;

Vue.component('exif-property', {
   // the template html for each exif property
  template:
  `<div class="card" :id="set_item_id" style=width:100% >
    <div class="card-header" :id="set_header_id">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" :data-target="set_collapse_id_" aria-expanded="false" :aria-controls="set_collapse_id">
          {{name.toUpperCase()}}
        </button>
      </h5>
    </div>
    <div :id="set_collapse_id" class="collapse" :aria-labelledby="set_header_id" data-parent="#accordion">
      <div class="card-body">
        <ul class="list-group p-0">
          <li v-for="(subitem, subname) in item" class="list-group-item">
            <div v-if="!has_nested_property(subitem)">
              <b>{{subname}}</b>: <div v-if="subname!='Coordinate'" class=inline>{{subitem}}</div>
                                  <a v-else class=inline :href="subitem" target="_blank"> GoogleMaps </a>
            </div>
            <div v-else>
              <b>{{subname}}:</b>
              <ul class="list-group p-0 mt-2">
                <li v-for="(subsubitem, subsubname) in subitem"  class="list-group-item"><b>{{subsubname}}</b>: {{subsubitem}}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>`,
  props: ['name','item'],  // each exif property is stored as a pair (name, item).
  computed: {
      // the form used for the exif properties is a boostrapt standard implementation of a dropdown list,
      // it requires that each elementa has unique id and class,
      // the following four "computed functions" just assign unique id to each component created with v-for directives.
      set_item_id : function(){
        header_id++;
        return header_id;
      },
      set_header_id : function() {
        result = "header_"+header_id;
        return result;
      },
      set_collapse_id : function() {
        result = "collapse_"+header_id;
        return result;
      },
      set_collapse_id_ : function() {
        result = "#collapse_"+header_id;
        return result;
      },
   },
   methods: {
     // function that checks if exif property has nested attributes
     has_nested_property(item){
       if (item.constructor != Object) { // if is not a dictionary
          return false;
       }else {
           var num_property = Object.keys(item);
           if(num_property < 2){ // if it has only one property
             return false;
           }
           return true; // if it has lots of properties
       }
     }
   }
})
