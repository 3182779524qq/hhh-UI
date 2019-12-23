<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <!-- <div class="collapse-btn" @click="collapseChage">
            <i class="el-icon-menu"></i>
    </div>-->
    <!-- <div class="logo">
      <img src="../assets/img/logo.png" alt />
    </div> -->
    <div class="system">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          :to="{ name:item.name }"
          v-for="(item,index) in routeArr"
          :key="index"
        >{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- <div class="logo" @click="collapseChage">
    </div>-->
    <!-- <div class="system" @click="top" title="点击返回顶部 ↑">管理后台</div> -->
    <div class="header-right">
      <div class="header-user-con">
        <div class="user-loginOut" @click="loginout">
          <!-- <img src="../assets/img/out.png" alt /> -->
          退出
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import bus from "../bus";
// import GlobalUtil from "../utils/globalUtil";

export default {
  name:"HhhHead",
  data() {
    return {
      collapse: false,
      fullscreen: false,
      name: "JMTool",
      message: 2,
      // userInfo: GlobalUtil.getLocalStorage("userInfo"),
      avatar: "http://up.qqya.com/allimg/201710-t/17-101805_137721.jpg",
      routeArr: []
    };
  },
  computed: {
    username() {
      // let username = GlobalUtil.getLocalStorage('userInfo').realName;
      // return username ? username : this.name;
      return "张三";
    },
    userType() {
      // let userInfo = GlobalUtil.getLocalStorage('userInfo');
      // if (userInfo.roles.length == 1) {
      //     return userInfo.roles[0].name
      // } else if (userInfo.roles.length == 2) {
      //     return '官方管理员'
      // }
      return "官方管理员";
    },
    num() {
      return this.$store.state.num;
    }
  },
  created() {
    this.routeArr = this.$route.meta.breadArr;
    // bus.$on("backTop", msg => {
    //   // 监听点击事件后内页返回顶部
    //   // console.log(msg)
    //   this.$emit("backTop", "jjjjj");
    // });
  },
  methods: {
    top() {
      // 点击后内页返回顶部
      // console.log(this.$refs)
      this.$emit("backTop", "jjjjj");
    },
    add() {
      this.$store.commit("addNum");
    },
    // 退出登录
    loginout() {
      console.log(111)
      // this.confirm({
      //   customClass: "loginOut",
      //   title: "退出登录",
      //   message: "是否确认退出当前登录？",
      //   thenFun: () => {
      //     this.$axios.post(this.$url.logout).then(res => {
      //       if (res.code === -2) {
      //         this.$router.push("/login");
      //       }
      //     });
      //   }
      // });
      // this.$axios.post(this.$url.doLoginOut).then(res => {
      //     if (res.retCode != 0) {
      //         return false
      //     }
      //     GlobalUtil.removeLocalStorage('author');
      //     GlobalUtil.removeLocalStorage('userInfo');
      //     GlobalUtil.delCookie('headers');
      //     GlobalUtil.removeLocalStorage('permission');
      //     GlobalUtil.removeLocalStorage('routers', ['403', '404', 'login']);
      //     this.$router.push('/login');
      // })
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      // bus.$emit("collapse", this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  watch: {
    $route: {
      handler(newData, oldData) {
        // console.log(newData)
        this.routeArr = newData.meta.breadArr;
        //   this.routeArr = []
        // if (newData.query.productId) {
        //   this.routeArr[2].label = '编辑商品'
        //   console.log(1)
        // }else{

        // }
      },
      deep: true
    }
  },
  mounted() {
    // if (document.body.clientWidth < 1500) {
    //   this.collapseChage();
    // }
  }
};
</script>

<style scoped>
.header {
  /* top: 0;
  left: 0px;
  right: 0;
  position: absolute; */
  box-sizing: border-box;
  height: 60px;
  font-size: 22px;
  color: #999;
  overflow: hidden;
  /* background: #f3f3f3; */
}

.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 60px;
}

.header .logo {
  float: left;
  width: 200px;
  height: 60px;
  background: #001529;
  /* background: url('../../assets/img/logo.png') no-repeat; */
  /* background-size: contain; */
  text-align: center;
  vertical-align: middle;
  line-height: 60px;
}

.header .logo img {
  width: 110px;
  height: 18px;
  /* logo自适应 */
  /* width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  vertical-align: middle;
  cursor: pointer; */
}
.header .system {
  float: left;
  font-size: 16px;
  line-height: 60px;
  margin-top: 20px;
  margin-left: 20px;
  /* height: 60px; */
}

.header-right {
  float: right;
  padding-right: 50px;
  font-size: 12px;
  color: black;
  line-height: 60px;
  font-family: "Microsoft YaHei";
}

.header-user-con {
  display: flex;
  height: 60px;
  align-items: center;
}

.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}

.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}

.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}

.btn-bell .el-icon-bell {
  color: #fff;
}

.user-name {
  margin-left: 10px;
}

.user-loginOut {
  font-size: 14px;
  margin-left: 20px;
  color: #303133;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.user-loginOut img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
}
.user-avator {
  margin-left: 20px;
}

.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}

.el-dropdown-menu__item {
  text-align: center;
}
</style>
<style>
.loginOut {
  width: 424px;
  height: 173px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
}
.loginOut .el-message-box__title {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
}
.loginOut .el-message-box__message {
  margin: 20px 0;
}
</style>