<template>
  <q-page class="q-pa-sm">
    <q-btn
      @click="callApi"
      round
      dense
      flat
      color="white"
      icon="logout"
    ></q-btn>
    <div class="row q-col-gutter-lg">
      <div
        v-for="item in sensors"
        :key="item.Id"
        class="col-lg-4 col-md-4 col-xs-12 col-sm-12"
      >
        <card-sensor :sensorValues="item" />
      </div>
    </div>
    <!-- <div class="row q-col-gutter-sm  q-py-sm">
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="q-ma-xs" style="background-color: #38b1c5">
          <q-card-section class="text-h6 text-white">
            Sıcaklık Verileri
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <iframe
              :src="tempaddress"
              height="400"
              width="100%"
              frameborder="0"
            ></iframe>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="q-ma-xs" style="background-color: #ea4b64">
          <q-card-section class="text-h6 text-white">
            Nem Verileri
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <iframe
              :src="humaddress"
              height="400"
              width="100%"
              frameborder="0"
            ></iframe>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
        <q-card class="q-ma-xs" style="background-color: #ea4b64">
          <q-card-section class="text-h6 text-white">
            Nem Verileri
          </q-card-section>
          <q-card-section class="q-pa-sm">
            <IEcharts
              style="height: 300px;"
              ref="barRef"
              @ready="onReady"
              :option="line_chart"
              :resizable="true"
            ></IEcharts>
          </q-card-section>
        </q-card>
      </div>
    </div> -->
  </q-page>
</template>

<script>
import IEcharts from "vue-echarts-v3/src/full.js";
import { pharmacies, sensors } from "../api/pharma.js";

export default {
  name: "PageIndex",
  components: {
    CardSensor: () => import("components/cards/CardSensor"),
    CardCharts: () => import("components/cards/CardCharts"),
    TabSocial: () => import("components/tabs/TabSocial"),
    CardWithImage: () => import("components/cards/CardWithImage"),
    CardTimeLine: () => import("components/cards/CardTimeLine"),
    TodoList: () => import("components/list/TodoList"),
    LineChart: () => import("components/charts/LineChart"),
    IEcharts
  },
  methods: {
    async callApi() {
      sensors().then(result => console.log((this.sensors = result.data)));

      // const token = await this.$auth.getTokenSilently();
      // console.log(token);
      // // Use Axios to make a call to the API
      // const { data } = await axios.get("/ker/pharmacy/sensor", {
      //   headers: {
      //     Authorization: `Bearer ${token}` // send the access token through the 'Authorization' header
      //   }
      // });
      // console.log(data);
      // this.tempaddress = data.temp;
      // this.humaddress = data.hum;
      // this.temperatures = data.alldata.results[0].series[0].values;
      // this.line_chart.dataset.source = this.temperatures;
    },
    onReady(instance, echarts) {
      this.echarts = echarts;
    }
  },
  data() {
    return {
      sensors: [],
      mode: "list",
      tempaddress: "",
      humaddress: "",
      temperatures: {},
      line_chart: {
        tooltip: { show: true },
        title: {
          show: true,
          textStyle: { color: "rgba(0, 0, 0 , .87)", fontFamily: "sans-serif" }
        },
        grid: { containLabel: true, left: "0", bottom: "0", right: "0" },
        xAxis: {
          show: false,
          type: "category",
          axisLine: {
            lineStyle: { color: "rgba(0, 0, 0 , .54)", type: "dashed" }
          },
          axisTick: {
            show: true,
            alignWithLabel: true,
            lineStyle: {
              show: true,
              color: "rgba(0, 0, 0 , .54)",
              type: "dashed"
            }
          },
          axisLabel: { show: false },
          boundaryGap: false
        },
        yAxis: {
          show: false,
          type: "value",
          axisLine: {
            lineStyle: { color: "rgba(0, 0, 0 , .54)", type: "dashed" }
          },
          axisLabel: { show: false },
          splitLine: { lineStyle: { type: "dashed" } },
          axisTick: {
            show: true,
            lineStyle: {
              show: true,
              color: "rgba(0, 0, 0 , .54)",
              type: "dashed"
            }
          }
        },
        series: [{ type: "line", areaStyle: {}, smooth: false }],
        dataset: {
          source: []
        },
        color: ["#45c2c5"]
      }
    };
  }
};
</script>
