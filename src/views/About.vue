<template>
    <div class="home">
        <p class="tab" ref="tab">
            <ul class="tab_content" ref="tabWrapper">
                <li class="tab_item" v-for="item,i in itemList" ref="tabitem" :key="i">
                    {{item.title}}
                </li>
            </ul>
        </p>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BScroll from "better-scroll";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
    components: {}
})
export default class Home extends Vue {
    itemList = [
        { title: "关注" },
        { title: "推荐" },
        { title: "深圳" },
        { title: "视频" },
        { title: "音乐" },
        { title: "热点" },
        { title: "新时代" },
        { title: "娱乐" },
        { title: "头条号" },
        { title: "问答" },
        { title: "图片" },
        { title: "科技" },
        { title: "体育" },
        { title: "财经" },
        { title: "军事" },
        { title: "国际" }
    ] as any;
    created() {
        this.$nextTick(() => {
            this.InitTabScroll();
        });
    }
    InitTabScroll() {
        let width = 0;
        let ref = this.$refs as any;
        console.log(ref);
        for (let i = 0; i < this.itemList.length; i++) {
            width += ref.tabitem[i].getBoundingClientRect().width;
        } //getBoundingClientRect() 返回元素的大小及其相对于视口的位置
        ref.tabWrapper.style.width = width + "px";
        this.$nextTick(() => {
            let scroll = (this as any).scroll;
            if (!scroll) {
                scroll = new BScroll(ref.tab, {
                    startX: 0,
                    click: true,
                    scrollX: true,
                    scrollY: false,
                    eventPassthrough: "vertical"
                });
            } else {
                scroll.refresh();
            }
        });
    }
}
</script>

<style lang="scss" scoped>
 .tab{
  width: 100vw;
  overflow: hidden;
  padding:5px;
  .tab_content{
   line-height: 2rem;
   display: flex;
   .tab_item{
    flex: 0 0 60px;
    width:60px;
   } 
  }
 } 
 </style>