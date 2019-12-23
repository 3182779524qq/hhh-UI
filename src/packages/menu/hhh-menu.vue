<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            background-color="#001529"
            text-color="#ffffff"
            active-text-color="#ffffff"
            router
        >
            <template v-for="item in menuList">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index" v-if="item.show">
                        <template slot="title">
                            <!-- <img :src="item.icon" alt=""> -->
                            <!-- <i :class="item.icon" class="iconfont"></i> -->
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="(subItem,i) in item.subs">
                            <el-menu-item :key="i" :index="subItem.index" v-if="subItem.show">
                                <!-- <i :class="subItem.icon" class="iconfont"></i> -->
                                <!-- <img :src="item.icon" alt=""> -->
                                <span slot="title">{{ subItem.title }}</span>
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index" v-if="item.show">
                        <!-- <i :class="item.icon" class="iconfont"></i> -->
                        <!-- <img :src="item.icon" alt=""> -->
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script>
import bus from "../bus";
export default {
  name: "HhhMenu",
  data() {
    return {
      collapse: false
    };
  },
  props: {
    menuList: {
      type: Array,
      default: function() {
        return [
          {
            index: "demo",
            show: true,
            title: "采购商",
            subs: [
              {
                icon: "icon-gift-liwu",
                index: "entryAudit",
                show: true,
                title: "入驻审核"
              },
              {
                icon: "icon-gift-liwu",
                index: "buyerManagement",
                show: true,
                title: "采购商信息"
              }
            ]
          },
          {
            index: "demoForm",
            show: true,
            title: "商品管理",
            subs: [
              {
                icon: "icon-gift-liwu",
                index: "classify",
                show: true,
                title: "分类管理"
              },
              {
                icon: "icon-gift-liwu",
                index: "goodList",
                show: true,
                title: "商品信息"
              }
            ]
          },
          {
            index: "1",
            title: "订单管理",
            show: true,
            subs: [
              {
                icon: "icon-gift-liwu",
                index: "orderList",
                show: true,
                title: "订单信息"
              }
            ]
          }
        ];
      }
    }
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // this.getPermission()
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  },
  methods: {}
};
</script>
<style scoped>
.sidebar {
  display: block;
  /* position: absolute;
  left: 0;
  top: 60px;
  bottom: 0; */
  overflow-y: scroll;
}

.iconfont {
  padding-right: 7px;
}

/* .icon-pinpaiguanli{
        margin-right: 20px;
    } */
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar-el-menu img {
  width: 20px;
  margin-right: 16px;
}
.sidebar > ul {
  height: 100%;
}

.el-menu-item.is-active {
  background-color: #3b7bfa !important;
  /* color:  !important; */
}

.el-menu-item.is-active i {
  color: inherit !important;
}

.el-menu-item i {
  color: #ffffff;
}

.el-menu--inline li {
  /* 二级菜单颜色 */
  background-color: #001932 !important;
  text-indent: 10px;
}

.el-menu-item {
  height: 50px;
  line-height: 50px;
  /* text-align: center; */
}
</style>
<style>
.sidebar .el-submenu__title {
  color: #ffffff;
  /* text-align: center; */
  font-size: 16px;
}

.sidebar .el-submenu__title i {
  color: #ffffff;
}
</style>
