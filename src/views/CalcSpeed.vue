<template>
  <div>
    <div class="container">
      <div class="row bg-white">
        <div class="col-12 col-md-6">
          素早さ：<input type="number" v-model="speed" />
          <div>
            <p>状態</p>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck1"
              />
              <label class="form-check-label" for="defaultCheck1">
                おいかぜ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck2"
              />
              <label class="form-check-label" for="defaultCheck2">
                スカーフ
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck2"
              />
              <label class="form-check-label" for="defaultCheck2">
                まひ / きょうせいギプス
              </label>
            </div>
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="defaultCheck2"
              />
              <label class="form-check-label" for="defaultCheck2">
                湿原
              </label>
            </div>
          </div>
          <div>
            <p>オプション</p>
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customSwitch1"
              />
              <label class="custom-control-label" for="customSwitch1"
                >±4以上も表示する</label
              >
            </div>
            <div class="custom-control custom-switch">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customSwitch2"
              />
              <label class="custom-control-label" for="customSwitch2"
                >()内に元の素早さも表示する</label
              >
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <table class="table table-hover">
            <tr>
              <td scope="col">ランク</td>
              <td scope="col">素早さ</td>
            </tr>
            <tr>
              <td>+6</td>
              <td>{{ Math.floor(speed * 4.0) }}</td>
            </tr>
            <tr>
              <td>+5</td>
              <td>{{ Math.floor(speed * 3.5) }}</td>
            </tr>
            <tr>
              <td>+4</td>
              <td>{{ Math.floor(speed * 3.0) }}</td>
            </tr>
            <tr>
              <td>+3</td>
              <td>{{ Math.floor(speed * 2.5) }}</td>
            </tr>
            <tr>
              <td>+2</td>
              <td>{{ Math.floor(speed * 2.0) }}</td>
            </tr>
            <tr>
              <td>+1</td>
              <td>{{ Math.floor(speed * 1.5) }}</td>
            </tr>
            <tr>
              <td>±0</td>
              <td>{{ speed }}</td>
            </tr>
            <tr>
              <td>-1</td>
              <td>{{ Math.floor(speed * 0.67) }}</td>
            </tr>
            <tr>
              <td>-2</td>
              <td>{{ Math.floor(speed * 0.5) }}</td>
            </tr>
            <tr>
              <td>-3</td>
              <td>{{ Math.floor(speed * 0.4) }}</td>
            </tr>
            <tr>
              <td>-4</td>
              <td>{{ Math.floor(speed * 0.33) }}</td>
            </tr>
            <tr>
              <td>-5</td>
              <td>{{ Math.floor(speed * 0.29) }}</td>
            </tr>
            <tr>
              <td>-6</td>
              <td>{{ Math.floor(speed * 0.25) }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
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
      speed: 100
    };
  }
};
</script>
