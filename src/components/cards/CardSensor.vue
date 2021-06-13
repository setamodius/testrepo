<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">{{ sensorValues.Name }}</div>
          <div class="text-subtitle2 text-grey">
            Son ölçüm zamanı: {{ LastMeasurement }}
          </div>
        </div>

        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable>
                  <q-item-section>Remove Card</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Send Feedback</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Share</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-separator />

    <q-list>
      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="green" name="thermostat" />
        </q-item-section>

        <q-item-section>
          Sıcaklık
        </q-item-section>
        <q-item-section side top>
          <q-item-label class="text-h6 text-blue"
            >{{ Temperature }} °C</q-item-label
          >
        </q-item-section>
      </q-item>

      <q-item clickable>
        <q-item-section avatar>
          <q-icon color="blue" name="water" />
        </q-item-section>

        <q-item-section>
          Nem
        </q-item-section>
        <q-item-section side top>
          <q-item-label class="text-h6 text-blue"
            >% {{ Humidity }}</q-item-label
          >
        </q-item-section>
      </q-item>
    </q-list>
    <q-separator />

    <q-card-actions align="right">
      <q-btn flat color="primary" icon="refresh" @click="getLastValues" />
    </q-card-actions>
  </q-card>
</template>

<script>
import { lastvalues } from "../../api/pharma.js";
export default {
  name: "CardCafe",
  data() {
    return {
      Temperature: "",
      Humidity: "",
      LastMeasurement: ""
    };
  },
  props: {
    sensorValues: {
      type: Object,
      default: () => ({
        Id: 0,
        IsActive: false,
        Name: "-",
        SensorMac: "-"
      })
    }
  },
  mounted() {
    this.getLastValues();
  },
  methods: {
    getLastValues() {
      lastvalues(this.sensorValues.Id).then(result => {
        this.Temperature = result.data.Temperature;
        this.Humidity = result.data.Humidity;
        let date = new Date(result.data.MeasurementDate);
        this.LastMeasurement = date.toLocaleString("tr-TR");
        console.log(result.data.Humidity);
      });
    }
  }
};
</script>

<style scoped></style>
