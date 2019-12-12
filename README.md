# hhh-ui

> 一个基于vue＋element的二次开发组件

## Build Setup

``` bash
# install dependencies
安装
 cnpm install hhh-ui -S
hhh-form     element表单组件对的二次封装
props：
    reform：表单的ref属性
    reformRule：表单校验规则默认，{}
        eg：{
            phone: [
                { required: true, message:'错误提示', trigger: 'blur' },
                或者
                {
                    validator: 自定义校验规则，可以参考element的校验规则,
                    required: true,//是否必填
                    trigger: 'blur'//触发校验的方式
                }
            ],
        }
    formData：form表单的值，Array 必填
        eg:[
            {
                type: "input", // 表单输入框的类型
                               //目前支持:input,select,textarea,checkbox,radio,time
                field: "phone",//字段名称
                name: " 手机号：",//字段的文字描述
                divwidth:"100%",//单个表单输入框的宽度，默认一行两个，即50%
                width:'460',//表单输入框的宽度
                value: ""//表单输入框的默认初值
                placeholder: "请输入手机号",//输入框的placeholder提示


                filterable: true, // 下拉选择宽的搜索
                options: [//涉及有选项的
                    {
                        label: "启用",
                        value: 0
                    }
                ],
            }
        ]

使用：
    在main.js中引用import HhhUi from 'hhh-ui'
        全局注册   Vue.use(HhhUi)

    页面引用
      <hhh-form ref="myform" :reformRule="reformRule" :formData="formData" reform="reform"></hhh-form>

```

