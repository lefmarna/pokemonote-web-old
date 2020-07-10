<template>
  <div>
    <div class="container my-1 my-sm-2">
      <div class="row d-flex">
        <div class="col-12 col-md-6 px-1">
          <div class="bg-white border rounded-lg shadow-sm mb-1 p-2 order-md-1">
            素早さ：<input
              type="number"
              min="0"
              max="999"
              v-model.number="speed"
            />
          </div>
          <div
            class="bg-white border rounded-lg shadow-sm mb-1 p-2 order-md-1 d-flex"
          >
            <div class="col-6">
              <p>素早さアップ</p>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="speedUp1"
                  v-model.number="tailwind"
                  true-value="2"
                  false-value="1"
                />
                <label class="form-check-label" for="speedUp1">
                  おいかぜ (×2.0)
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="speedUp2"
                  v-model.number="ability"
                  true-value="2"
                  false-value="1"
                />
                <label class="form-check-label" for="speedUp2"
                  >天候特性 (×2.0)
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="speedUp3"
                  v-model.number="scarf"
                  true-value="15"
                  false-value="10"
                />
                <label class="form-check-label" for="speedUp3">
                  スカーフ (×1.5)
                </label>
              </div>
            </div>
            <div class="col-6">
              <p>素早さダウン</p>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="speedDown1"
                  v-model.number="paralysis"
                  true-value="5"
                  false-value="10"
                />
                <label class="form-check-label" for="speedDown1">
                  まひ (×0.5)
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="speedDown2"
                  v-model.number="macho"
                  true-value="5"
                  false-value="10"
                />
                <label class="form-check-label" for="speedDown2">
                  鉄球 (×0.5)
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="speedDown3"
                  v-model.number="swamp"
                  true-value="25"
                  false-value="100"
                />
                <label class="form-check-label" for="speedDown3">
                  湿原 (×0.25)
                </label>
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
                <td>
                  {{ Math.floor(speed * 4) }} ({{ Math.floor(calcSpeed * 4) }})
                </td>
              </tr>
              <tr v-if="option1">
                <td>+5</td>
                <td>
                  {{ Math.floor((speed * 35) / 10) }} ({{
                    Math.floor((calcSpeed * 35) / 10)
                  }})
                </td>
              </tr>
              <tr v-if="option1">
                <td>+4</td>
                <td>
                  {{ Math.floor(speed * 3) }} ({{ Math.floor(calcSpeed * 3) }})
                </td>
              </tr>
              <tr>
                <td>+3</td>
                <td>
                  {{ Math.floor((speed * 25) / 10) }} ({{
                    Math.floor((calcSpeed * 25) / 10)
                  }})
                </td>
              </tr>
              <tr>
                <td>+2</td>
                <td>
                  {{ Math.floor(speed * 2) }} ({{ Math.floor(calcSpeed * 2) }})
                </td>
              </tr>
              <tr>
                <td>+1</td>
                <td>
                  {{ Math.floor((speed * 15) / 10) }} ({{
                    Math.floor((calcSpeed * 15) / 10)
                  }})
                </td>
              </tr>
              <tr>
                <td>±0</td>
                <td>{{ Math.floor(speed) }} ({{ Math.floor(calcSpeed) }})</td>
              </tr>
              <tr>
                <td>-1</td>
                <td>
                  {{ Math.floor((speed * 67) / 100) }} ({{
                    Math.floor((calcSpeed * 67) / 100)
                  }})
                </td>
              </tr>
              <tr>
                <td>-2</td>
                <td>
                  {{ Math.floor((speed * 5) / 10) }} ({{
                    Math.floor((calcSpeed * 5) / 10)
                  }})
                </td>
              </tr>
              <tr>
                <td>-3</td>
                <td>
                  {{ Math.floor((speed * 4) / 10) }} ({{
                    Math.floor((calcSpeed * 4) / 10)
                  }})
                </td>
              </tr>
              <tr v-if="option1">
                <td>-4</td>
                <td>
                  {{ Math.floor((speed * 33) / 100) }} ({{
                    Math.floor((calcSpeed * 33) / 100)
                  }})
                </td>
              </tr>
              <tr v-if="option1">
                <td>-5</td>
                <td>
                  {{ Math.floor((speed * 29) / 100) }} ({{
                    Math.floor((calcSpeed * 29) / 100)
                  }})
                </td>
              </tr>
              <tr v-if="option1">
                <td>-6</td>
                <td>
                  {{ Math.floor((calcSpeed * 25) / 100) }} ({{
                    Math.floor((calcSpeed * 25) / 100)
                  }})
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <adsense
      ad-client="ca-pub-3240586325286249"
      ad-slot="3353369882"
      ad-style="display:block"
      ad-format="auto"
    ></adsense>
  </div>
</template>

<script>
export default {
  name: "CalcSpeed",
  head: {
    title() {
      return {
        inner: this.title
      };
    },
    meta() {
      return [
        { name: "title", content: this.title },
        { name: "description", content: this.description },
        { property: "og:title", content: this.title },
        { property: "og:description", content: this.description }
      ];
    }
  },
  data() {
    return {
      title: "素早さ計算機（ポケモン剣盾に対応）",
      description:
        "ポケモン剣盾に対応している素早さ計算機です。実数値を入力することで、あらゆる状態の素早さをリアルタイムに表示します。",
      remove: 0,
      speed: 100,
      tailwind: 1,
      ability: 1,
      scarf: 10,
      paralysis: 10,
      macho: 10,
      swamp: 100,
      option1: false,
      item: ""
    };
  },
  computed: {
    calcSpeed() {
      return Math.floor(
        (this.speed *
          this.tailwind *
          this.ability *
          this.scarf *
          this.paralysis *
          this.macho *
          this.swamp) /
          100000
      );
    }
  }
};
</script>
