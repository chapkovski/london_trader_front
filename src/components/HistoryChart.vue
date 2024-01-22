<script setup>
import { ref, reactive, onMounted, watch, nextTick } from 'vue';
import { useTraderStore } from '@/store/app';
import { storeToRefs } from 'pinia';
import { Chart } from 'highcharts-vue';
import HighCharts from 'highcharts';
import StockCharts from 'highcharts/modules/stock';
import HighchartsNoData from 'highcharts/modules/no-data-to-display';

const traderStore = useTraderStore();
const { history } = storeToRefs(traderStore);
const priceGraph = ref(null);

const original_options = {
  xAxis: {
    type: 'datetime',
    ordinal: false,
  },
  title: { text: 'History chart' },
  time: {
    useUTC: false
  },
  series: [
    {
      name: 'Price',
      data: [],
    }
  ],
  lang: {
    noData: 'No data to display'
  },
  noData: {
    style: {
      fontWeight: 'bold',
      fontSize: '15px',
      color: '#303030'
    }
  },
  plotOptions: {
    line: {
      marker: {
        enabled: true,
        radius: 3
      }
    }
  },
};

const chartOptions = reactive(original_options);

watch(history, (newHistory) => {
  if (newHistory && newHistory.length) {
    chartOptions.series[0].data = newHistory.map(item => ({
      x: item.timestamp * 1000, // Convert Unix timestamp to JavaScript timestamp
      y: item.price
    }));
  }
}, { deep: true });

onMounted(async () => {
  await nextTick();
//   priceGraph.value.chart.setSize(100, 200);
//   priceGraph.value.chart.reflow();
});

StockCharts(HighCharts)
HighchartsNoData(HighCharts);
</script>

<script>
export default {
  components: {
    highcharts: Chart
  }
}
</script>

<template>
  <div style="width: 100%;">
    <highcharts ref="priceGraph" :constructor-type="'stockChart'" :options="chartOptions" style="height:300px">
    </highcharts>
  </div>
</template>

<style scoped></style>