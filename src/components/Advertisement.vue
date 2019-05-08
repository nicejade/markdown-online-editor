<!-- @format -->

<template>
  <div class="advertisement-moudle">
    <el-carousel :height="carouselHeight" type="card" :interval="5000" arrow="always">
      <el-carousel-item v-for="item in items" :key="item.alt">
        <a :href="item.path" target="_blank" rel="noreferrer noopener">
          <img class="advertisement-img" :src="item.image" :alt="item.alt" />
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Advertisement',

  data() {
    return {
      carouselHeight: '100px',
      items: [
        {
          path: '//click.dji.com/AAMD9H5ODH2wTVtxUWwxxw?pm=link&as=0004',
          image:
            '//u.djicdn.com/uploads/ad_image_file/file/1670/%E5%A4%A7%E7%96%86%E6%8E%A8%E5%B9%BF%E8%81%94%E7%9B%9Fbanner_970-250.jpg',
          alt: '“御”Mavic 2 - 全新 Hasselblad 镜头与你一同高瞻远瞩，以小见大'
        },
        {
          path: '//click.dji.com/AHT8n4-15xfguKCaOzzEPA?pm=link&as=0004',
          image: '//u.djicdn.com/uploads/ad_image_file/file/1234/970_250.jpg',
          alt: '特洛Tello-迷你无人机'
        },
        {
          path: '//click.dji.com/AHT8n4-15xfguKCaOzzEPA?pm=link&as=0004',
          image: '//u.djicdn.com/uploads/ad_image_file/file/1242/970_250.jpg',
          alt: '特洛Tello-益智编程无人机'
        },
        {
          path: '//click.dji.com/AHT8n4-15xfguKCaOzzEPA?pm=link&as=0004',
          image: '//u.djicdn.com/uploads/ad_image_file/file/992/970___250.jpg',
          alt: '大疆无人机-DJI "御" Mavic Air'
        }
      ]
    }
  },

  computed: {},

  components: {},

  mounted() {},

  methods: {}
}
</script>

<style lang="scss">
.advertisement-moudle {
  margin-bottom: 6 * $size-factor;
  .text-center {
    text-align: center;
  }
  .advertisement-img {
    width: 100%;
    min-height: 60px;
  }
  .VueCarousel {
    .VueCarousel-pagination {
      .VueCarousel-dot {
        .VueCarousel-dot-button {
          width: 12px !important;
          height: 12px !important;
          &:focus {
            border: none !important;
            outline: none !important;
          }
        }
      }
    }
  }
}
</style>
