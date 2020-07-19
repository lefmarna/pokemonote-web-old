<template>
  <div>
    <div class="container my-1 my-sm-2">
      <div class="row d-flex">
        <div class="col-12 col-md-6 px-1">
          <div class="bg-white border rounded-lg shadow-sm mb-1 p-2 order-md-1">
            素早さ：
            <input type="number" min="0" max="999" v-model.number="speed" />
            <div class="form-row">
              <div class="col">
                <label for="selectItem">道具</label>
                <select class="form-control" id="selectItem" v-model="item">
                  <option value="20">スピードパウダー (×2)</option>
                  <option value="15">こだわりスカーフ (×1.5)</option>
                  <option value="10">--- 道具を選択 ---</option>
                  <option value="5">くろいてっきゅう (×0.5)</option>
                </select>
              </div>
              <div class="col">
                <label for="selectaAility">特性</label>
                <select
                  class="form-control"
                  id="selectaAility"
                  v-model="ability"
                >
                  <option value="20">すいすい・ようりょくそ (×2)</option>
                  <option value="2">はやあし・かるわざ (×2)</option>
                  <option value="10">--- 特性を選択 ---</option>
                  <option value="5">スロースタート (×0.5)</option>
                </select>
              </div>
            </div>
            <div class="d-flex">
              <div class="form-check col-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="speedUp1"
                  v-model.number="tailwind"
                  true-value="2"
                  false-value="1"
                />
                <label class="form-check-label" for="speedUp1"
                  >おいかぜ (×2.0)</label
                >
              </div>
              <div class="form-check col-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="speedDown1"
                  v-model.number="paralysis"
                  true-value="5"
                  false-value="10"
                />
                <label class="form-check-label" for="speedDown1"
                  >まひ (×0.5)</label
                >
              </div>
              <div class="form-check col-4">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="speedDown3"
                  v-model.number="swamp"
                  true-value="25"
                  false-value="100"
                />
                <label class="form-check-label" for="speedDown3"
                  >湿原 (×0.25)</label
                >
              </div>
            </div>
          </div>
          <div class="bg-white border rounded-lg shadow-sm mb-1 p-2 order-md-1">
            <p>オプション</p>
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customSwitch1"
                v-model="option1"
              />
              <label class="custom-control-label" for="customSwitch1"
                >±4以上も表示する</label
              >
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6 px-1">
          <div class="bg-white border rounded-lg shadow-sm mb-1 order-md-1">
            <table class="table table-hover">
              <tr>
                <td>ランク</td>
                <td>素早さ</td>
              </tr>
              <tr v-if="option1">
                <td>+6</td>
                <td>{{ Math.floor(speed * 4) }} ({{ calcSpeed(400) }})</td>
              </tr>
              <tr v-if="option1">
                <td>+5</td>
                <td>
                  {{ Math.floor((speed * 35) / 10) }} ({{
                    Math.floor(calcSpeed(350))
                  }})
                </td>
              </tr>
              <tr v-if="option1">
                <td>+4</td>
                <td>{{ Math.floor(speed * 3) }} ({{ calcSpeed(300) }})</td>
              </tr>
              <tr>
                <td>+3</td>
                <td>
                  {{ Math.floor((speed * 25) / 10) }} ({{
                    Math.floor(Math.floor(calcSpeed(250)))
                  }})
                </td>
              </tr>
              <tr>
                <td>+2</td>
                <td>
                  {{ Math.floor(speed * 2) }} ({{
                    Math.floor(Math.floor(calcSpeed(200)))
                  }})
                </td>
              </tr>
              <tr>
                <td>+1</td>
                <td>
                  {{ Math.floor((speed * 15) / 10) }} ({{
                    Math.floor(Math.floor(calcSpeed(150)))
                  }})
                </td>
              </tr>
              <tr>
                <td>±0</td>
                <td>
                  {{ Math.floor(speed) }} ({{ Math.floor(calcSpeed(100)) }})
                </td>
              </tr>
              <tr>
                <td>-1</td>
                <td>
                  {{ Math.floor((speed * 67) / 100) }} ({{
                    Math.floor(calcSpeed(67))
                  }})
                </td>
              </tr>
              <tr>
                <td>-2</td>
                <td>
                  {{ Math.floor((speed * 5) / 10) }} ({{
                    Math.floor(calcSpeed(50))
                  }})
                </td>
              </tr>
              <tr>
                <td>-3</td>
                <td>
                  {{ Math.floor((speed * 4) / 10) }} ({{
                    Math.floor(calcSpeed(40))
                  }})
                </td>
              </tr>
              <tr v-if="option1">
                <td>-4</td>
                <td>
                  {{ Math.floor((speed * 33) / 100) }} ({{
                    Math.floor(calcSpeed(33))
                  }})
                </td>
              </tr>
              <tr v-if="option1">
                <td>-5</td>
                <td>
                  {{ Math.floor((speed * 29) / 100) }} ({{
                    Math.floor(calcSpeed(29))
                  }})
                </td>
              </tr>
              <tr v-if="option1">
                <td>-6</td>
                <td>
                  {{ Math.floor((speed * 25) / 100) }} ({{
                    Math.floor(calcSpeed(25))
                  }})
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      <Adsense
        data-ad-client="ca-pub-3240586325286249"
        data-ad-slot="3353369882"
      ></Adsense>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalcSpeed",
  data() {
    return {
      remove: 0,
      speed: 100,
      item: 10,
      ability: 10,
      tailwind: 1,
      paralysis: 10,
      swamp: 100,
      option1: false,
    };
  },
  methods: {
    calcSpeed(rank) {
      // 特性が「はやあし・かるわざ」のときは計算の順番を変える
      if (this.ability == 2) {
        return Math.floor(
          (Math.floor(
            (Math.floor(
              (Math.floor((this.speed * rank) / 100) * this.item) / 10
            ) *
              this.paralysis) /
              10
          ) *
            2 *
            this.tailwind *
            this.swamp) /
            100
        );
        // 特性がその他であれば通常通り計算する
      } else {
        return Math.floor(
          (Math.floor(
            (Math.floor(
              (Math.floor(
                (Math.floor((this.speed * rank) / 100) * this.ability) / 10
              ) *
                this.item) /
                10
            ) *
              this.paralysis) /
              10
          ) *
            this.tailwind *
            this.swamp) /
            100
        );
      }
    },
  },
};
</script>
