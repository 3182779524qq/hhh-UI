<template>
  <el-form :model="outData" :ref="reform" label-width="110px" class="my_el_form" :rules="formRule">
    <div
      class="form_item"
      v-for="(item,index) in formData"
      :key="index"
      :style="{ width:item.divwidth?item.divwidth:'50%',display:item.hide?'none':'block'}"
    >
      <el-form-item
        v-if="item.type=='input'"
        :label="item.name"
        :prop="item.field"
        :required="item.required"
      >
        <el-input
          :style="{ width:item.width?item.width+'px':'205px'}"
          :disabled="item.disabled?item.disabled:false"
          :placeholder="item.placeholder?item.placeholder:'请输入内容'"
          v-model="outData[item.field]"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-else-if="item.type=='select'"
        :label="item.name"
        :prop="item.field"
        :required="item.required"
        v-show="!item.isshow"
      >
        <el-select
          v-model="outData[item.field]"
          :multiple="item.multiple?item.multiple:false"
          :filterable="item.filterable?item.filterable:false"
          :disabled="item.disabled?item.disabled:false"
          :style="{ width:item.width?item.width+'px':'205px'}"
        >
          <el-option
            v-for="item in item.options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        v-else-if="item.type=='textarea'"
        :label="item.name"
        :prop="item.field"
        :required="item.required"
      >
        <el-input
          :style="{ width:item.width?item.width+'px':'205px'}"
          type="textarea"
          :disabled="item.disabled?item.disabled:false"
          :placeholder="item.placeholder?item.placeholder:'请输入内容'"
          v-model="outData[item.field]"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-else-if="item.type=='checkbox'"
        :label="item.name"
        :prop="item.field"
        :required="item.required"
      >
        <el-checkbox-group v-model="outData[item.field]" >
          <el-checkbox
            v-for="(checkedItem,index) in item.options"
            :label="checkedItem.value"
            :key="index"
          >{{checkedItem.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item v-else-if="item.type=='radio'" :label="item.name" :prop="item.field">
        <el-radio-group v-model="outData[item.field]" :disabled="item.disabled?item.disabled:false" :style="{ width:item.width?item.width+'px':'205px'}">
          <el-radio
            v-for="(checkedItem,index) in item.options"
            :label="checkedItem.value"
            :key="index"
          >{{checkedItem.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-else-if="item.type=='time'" :label="item.name" :prop="item.field">
        <el-time-picker
          :disabled="item.disabled?item.disabled:false"
          :style="{ width:item.width?item.width+'px':'205px'}"
          is-range
          v-model="outData[item.field]"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </el-form-item>
      <el-form-item v-else-if="item.type=='citypicker'" :label="item.name" :prop="item.field">
        <el-cascader
          :disabled="item.disabled?item.disabled:false"
          :style="{ width:item.width?item.width+'px':'205px'}"
          :options="cityoptions"
          :props="cityprops"
          v-model="outData[item.field]"
        ></el-cascader>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import citycode from "./cityCode";

export default {
  name: "HhhForm",
  props: {
    reform: {
      type: String,
      default: function() {
        return "alform";
      }
    },
    reformRule: {
      type: Object,
      default: function() {
        return {};
      }
    },
    formData: {
      type: Array,
      default: function() {
        return [
          {
            type: "input", // 普通输入框
            field: "id",
            name: "员工ID",
            icon: "2",
            dataType: "string"
          },
          {
            type: "select", // 普通下拉框
            field: "type",
            name: "告警类型",
            filterable: true, // 可搜索
            options: [],
            dataType: "string"
            // optionCallback: function (value) {
            //   return value + 'hh'
            // },
            // ajax: {
            //   url: this.$url.getPageList, // url地址
            //   data: {}, // 参数
            //   label: 'parkName', // key的字段
            //   value: 'parkCode' // value的字段
            // }
          },
          {
            type: "textarea", //  时间范围搜索
            field: "textarea",
            name: "文本框",
            dataType: "string"
          },
          {
            type: "checkbox", // 普通下拉框
            field: "checkbox",
            name: "职位",
            options: [],
            dataType: "array"
            // optionCallback: function (value) {
            //   return value + 'hh'
            // },
            // ajax: {
            //   url: this.$url.getPageList, // url地址
            //   data: {}, // 参数
            //   label: 'parkName', // key的字段
            //   value: 'parkCode' // value的字段
            // }
          }
        ];
      }
    }
  },
  data() {
    return {
      outData: {},
      formRule: {},
      cityoptions: citycode,
      cityprops: {
        value: "name",
        label: "name"
      },
    };
  },
  created() {
    this.formRule = this.reformRule;
  },
  mounted() {
    let outData = {};
    for (let i in this.formData) {
      let _data = this.formData[i];
      if (_data.type === "select" && _data.ajax != null) {
        this.$axios
          .ajax({
            method: _data.ajax.method ? _data.ajax.method : "get",
            url: _data.ajax.url,
            data: _data.ajax.data
          })
          .then(res => {
            let lab = _data.ajax.label;
            let val = _data.ajax.value;
            let list = res.data;
            if (
              _data.ajax.callback &&
              typeof _data.ajax.callback === "function"
            ) {
              console.log(1321);
              list = _data.ajax.callback(list);
            } else {
              //   console.log("================")
            }
            if (list != null) {
              let options = [];
              // options.push({
              //     key: '全部',
              //     value: ''
              // });
              for (let item of list) {
                options.push({
                  label: item[lab],
                  value: item[val]
                });
              }
              this.formData[i].options = options;
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else if (_data.type === "checkbox" && _data.ajax != null) {
        this.$axios
          .ajax({
            method: _data.ajax.method ? _data.ajax.method : "get",
            url: _data.ajax.url,
            data: _data.ajax.data
          })
          .then(res => {
            let lab = _data.ajax.label;
            let val = _data.ajax.value;
            let list = res.data;
            if (
              _data.ajax.callback &&
              typeof _data.ajax.callback === "function"
            ) {
              // console.log(1321)
              list = _data.ajax.callback(list);
            } else {
              //   console.log("================")
            }
            if (list != null) {
              let options = [];
              // options.push({
              //     key: '全部',
              //     value: ''
              // });
              for (let item of list) {
                options.push({
                  label: item[lab],
                  value: item[val]
                });
              }
              this.formData[i].options = options;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
      // if (_data.type == 'checkbox') {
      //     outData[_data.field] = [];
      // }else if(_data.type == 'select'&&_data.multiple){
      //     outData[_data.field] = [];
      // }else{
      //     }
      outData[_data.field] = _data.value;
      // console.log( outData)
    }
    this.emptyData = Object.assign({}, outData);
    this.outData = outData;
    // console.log(this.outData)
  },
  methods: {
    submitForm() {
      // console.log(this.outData)
      let flag = false;
      this.$refs[this.reform].validate(valid => {
        if (valid) {
          // console.log(this.outData)
          flag = true;
        } else {
          console.log("error submit!!");
          flag = false;
        }
      });
      if (flag) {
        return this.outData;
      } else {
        return false;
      }
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style scoped>
.my_el_form {
  display: flex;
  flex-wrap: wrap;
  padding-right: 25px;
}

.form_item {
  display: flex;
}
</style>

<style>
.form_item .el-form-item__label {
  color: #303133;
}
.form_item .el-input__inner {
  color: #303133;
}
</style>