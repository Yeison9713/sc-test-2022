module.exports = Vue.component("SC-DATA-TABLE", {
  props: {
    data_table: {
      type: Object,
      default: function () {
        return {
          columns: [{ label: "Col", value: "val", style: {}, class: ["text-center"], class_cell: ["text-left"] }],
          rows: [{ val: "Sin datos" }],
        };
      },
    },
    focus_table: null,
    events: {
      type: Object,
    },
    max_height: {
      type: String,
      default: "60",
    },
  },
  data() {
    return {
      table: this.data_table,
      index_tab: 0,
      pag_table: 0,

      style_table: {
        header: {
          color: "#000",
          "font-weight": "700",
        },
      },
    };
  },
  watch: {
    "focus_table": function (val) {
        console.log(val, 'estado focus table')
        if (val) window.addEventListener("keyup", this.checkKey);
        else window.removeEventListener("keyup", this.checkKey);        
    },
    data_table: {
      deep: true,
      handler: function (data) {
        this.table = data;
        Vue.nextTick(() => {
          this.index_tab = 0;
        });
      },
    },
    index_tab: function () {
      setTimeout(()=> $(".isFocused").get(0).scrollIntoView({behavior: "smooth", block: "end"}),1)
      if (this.events.changeIndex) this.events.changeIndex(this.index_tab)
    },
  },
  computed: {
    lengthTable() {
      return this.table.rows.length - 1 || 0;
    },
  },
  destroyed(){
    console.log('se destruyo sc-data-table')
    document.body.style.overflowY = "";
  },
  created() {
    // _scTable = this;
    document.body.style.overflowY = "hidden";
  },
  methods: {
    seleccionado(){
      let selectedRow = this.table.rows[this.index_tab];
      if (this.events.enter && this.data_table.rows.length) {
         this.events.enter(selectedRow);
         this.events.focus(false);
      }
    },
    funcionClick(index){
      this.index_tab = index
      this.seleccionado()
    },
    checkKey() {
      switch (event.which) {
        case 13: // enter
            this.seleccionado()
          break;
        case 27: // escape
          if (this.events.esc) {
            this.events.esc();
            // this.events.focus(false);
          }
          break;
        case 33:
          if (this.events.back_pag) {
            this.events.back_pag(--this.pag_table);
          }
          break;
        case 34:
          if (this.events.next_pag) {
            this.events.next_pag();
          }
          break;
        case 38: // arrow up
          if (this.index_tab > 0) --this.index_tab;
          break;
        case 40: // arrow down
          if (this.index_tab < this.lengthTable) ++this.index_tab;
          break;
          // :class="row.color ? row.color : ''"
      }
    },
  },
  template: /*html*/ `
  <div class="col-md-12 no-padding" id="SC-DATA-TABLE" style="padding-top: 1rem;">
    <div class="col-md-12 wrapper-grid no-padding">
      <div class="modal-container col-xs 12 col-sm-12 col-md-12 no-padding">
        <div class="col-xs-12 col-sm-12 col-md-12 no-padding">
          <div class="form-group">
            <table class="table table-light table-striped">
              <thead style="display:table; width:100%; table-layout:fixed;">
                <tr>
                  <th
                    v-for="(col, index) in table.columns"
                    :class="col.class"
                    :style="[style_table.header, col.style]"
                    :key="index"
                  >
                    {{ col.label || col.value }}
                  </th>
                </tr>
              </thead>
              <tbody :style="{display: 'block', 'max-height': max_height + 'vh', overflow: 'auto'}">
                <tr 
                  v-for="(row, index) in table.rows"
                  :key="index"
                  :class="{isFocused: index_tab == index && focus_table, }"
                  style="display:table; width:100%;table-layout:fixed;"
                  @click="funcionClick(index)"
                >
                  <td
                    v-for="col in table.columns"
                    :class="[col.class_cell]"
                  >
                    {{ row[col.value] || "" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
    `,
});
