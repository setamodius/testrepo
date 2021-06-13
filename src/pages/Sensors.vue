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
  </q-page>
</template>

<script>
import { sensors } from "../api/pharma.js";

export default {
  name: "Sensors",
  components: {
    CardSensor: () => import("components/cards/CardSensor")
  },
  created() {
    this.callApi();
    this.$auth.$watch("loading", loading => {
      this.callApi();
    });
  },
  methods: {
    async callApi() {
      sensors().then(result => console.log((this.sensors = result.data)));
    }
  },
  data() {
    return {
      sensors: []
    };
  }
};
</script>
