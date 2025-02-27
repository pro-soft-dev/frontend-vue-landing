<script setup lang="ts">
import { onMounted, ref } from "vue";
import Chart from "chart.js/auto";

const barChartRef = ref<HTMLCanvasElement | null>(null);
const lineChartRef = ref<HTMLCanvasElement | null>(null);

const initializeCharts = () => {
  if (barChartRef.value && lineChartRef.value) {
    new Chart(barChartRef.value, {
      type: "bar",
      data: {
        labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
          {
            label: "Article Searched",
            data: [250, 400, 330, 250, 160, 340, 270],
            backgroundColor: "#4F46E5",
          },
          {
            label: "Article Tagged/Linked",
            data: [220, 170, 140, 240, 130, 280, 220],
            backgroundColor: "#F97316",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            align: "start",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              boxWidth: 10,
              padding: 20,
            },
            maxHeight: 100,
          },
        },
      },
    });

    new Chart(lineChartRef.value, {
      type: "line",
      data: {
        labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
          {
            label: "Number of Visitors",
            data: [4000, 3200, 2800, 3500, 4500, 3800, 3400],
            borderColor: "#4F46E5",
            backgroundColor: "#4F46E580",
            fill: true,
          },
          {
            label: "Number of Bidders",
            data: [3000, 3800, 3900, 4200, 3500, 3200, 5000],
            borderColor: "#F97316",
            backgroundColor: "#F9731680",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            align: "start",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
              boxWidth: 10,
              padding: 20,
            },
            maxHeight: 100,
          },
        },
      },
    });
  }
};

onMounted(() => {
  initializeCharts();
});
</script>

<template>
  <div class="flex gap-3 mt-6 flex-col md:flex-row">
    <div class="w-full md:w-1/2 md:bg-white rounded-lg md:shadow p-1 md:p-6">
      <h4 class="text-lg font-medium mb-4">Article Activity</h4>
      <div class="h-[300px]">
        <canvas ref="barChartRef"></canvas>
      </div>
    </div>
    <div class="w-full md:w-1/2 md:bg-white rounded-lg md:shadow p-1 md:p-6">
      <h4 class="text-lg font-medium mb-4">Visitor & Bidder Trends</h4>
      <div class="h-[300px]">
        <canvas ref="lineChartRef"></canvas>
      </div>
    </div>
  </div>
</template>
