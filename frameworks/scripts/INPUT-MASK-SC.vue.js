module.exports = Vue.component("input-mask-sc", {
  props: {
    val: 0,
    mask: {},
  },
  data() {
    return {
      numberMask: null,
      value: this.val,
      maskParams: this.mask,
      maskOptions: {
        mask: Number,
        scale: 0,
        signed: false,
        thousandsSeparator: ".",
        padFractionalZeros: false,
        normalizeZeros: true,
        radix: ",",
        // mapToRadix: [''],
        min: 0,
        max: 99.99,
      },
    };
  },
  created() {
    // _COMPIPUTMASK = this
  },
  mounted() {
    this.numberMask = IMask(this.$refs.inputMask, {
      ...this.maskOptions,
      ...this.maskParams,
    });
  },
  computed: {
    placeholder() {
      if (!this.numberMask) return "0";
      return `${this.numberMask.masked.max}`;
    },
  },
  watch: {
    "$props.val": function (val) {
      if (!this.$listeners["get_num"]) {
        let strNum = typeof val == "string" ? val.trim() : val;
        if (isFinite((strNum))) {
          strNum = parseFloat(strNum || 0).toString();
          this.$nextTick(() => (this.numberMask.value = strNum));
        }
      }
    },
  },
  methods: {
    get_num() {
      let val = this.numberMask.unmaskedValue
      this.$nextTick(() => this.$emit("get_num", val));
    },
  },
  template: /*html*/ `
  <input
    :value="val"
    ref="inputMask"
    class="form-control center text-center"
    data-orden="1"
    :placeholder="placeholder"
    @keyup="get_num"
    disabled
  />
    `,
});
