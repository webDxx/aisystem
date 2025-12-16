<template>
    <div class="dashboard-container">
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in stats" :key="item.title">
                <el-card shadow="hover" class="stat-card">
                    <div class="stat-content">
                        <div>
                            <div class="stat-title">{{ item.title }}</div>
                            <div class="stat-value">{{ item.value }}</div>
                            <div class="stat-change" :class="item.change.includes('+') ? 'text-green' : 'text-red'">
                                {{ item.change }} <span class="stat-suffix">较上月</span>
                            </div>
                        </div>
                        <div class="stat-icon" :class="`bg-${item.color}`">
                            <component :is="item.icon" />
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <el-card class="chart-card mt-4">
            <template #header>
                <div class="card-header">
                    <span>销售趋势分析</span>
                </div>
            </template>
            <div ref="chartRef" class="chart-container"></div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as echarts from "echarts";

const stats = ref([
    { title: "总销售额", value: "¥1,234,567", change: "+12.5%", icon: "Coin", color: "blue" },
    { title: "本月订单", value: "456", change: "+8.2%", icon: "ShoppingCart", color: "purple" },
    { title: "新增客户", value: "89", change: "-2.4%", icon: "User", color: "indigo" },
    { title: "库存预警", value: "12", change: "需要关注", icon: "Warning", color: "red" },
]);

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const initChart = () => {
    if (chartRef.value) {
        chartInstance = echarts.init(chartRef.value);
        const option = {
            tooltip: {
                trigger: "axis",
            },
            legend: {
                data: ["销售额", "订单量"],
                bottom: 0,
            },
            grid: {
                left: "3%",
                right: "4%",
                bottom: "10%",
                containLabel: true,
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            },
            yAxis: [
                {
                    type: "value",
                    name: "销售额",
                },
                {
                    type: "value",
                    name: "订单量",
                },
            ],
            series: [
                {
                    name: "销售额",
                    type: "line",
                    smooth: true,
                    itemStyle: {
                        color: "#409eff",
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "rgba(64,158,255,0.5)" },
                            { offset: 1, color: "rgba(64,158,255,0.01)" },
                        ]),
                    },
                    data: [12000, 13200, 10100, 13400, 9000, 23000, 21000],
                },
                {
                    name: "订单量",
                    type: "line",
                    yAxisIndex: 1,
                    smooth: true,
                    itemStyle: {
                        color: "#9c27b0",
                    },
                    data: [220, 182, 191, 234, 290, 330, 310],
                },
            ],
        };
        chartInstance.setOption(option);
    }
};

const handleResize = () => {
    chartInstance?.resize();
};

onMounted(() => {
    initChart();
    window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    chartInstance?.dispose();
});
</script>

<style scoped>
.stat-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.stat-title {
    font-size: 12px;
    color: #909399;
    text-transform: uppercase;
}
.stat-value {
    font-size: 24px;
    font-weight: bold;
    margin-top: 8px;
    color: #303133;
}
.stat-change {
    font-size: 12px;
    margin-top: 4px;
    font-weight: 500;
}
.text-green {
    color: #67c23a;
}
.text-red {
    color: #f56c6c;
}
.stat-suffix {
    color: #c0c4cc;
    font-weight: normal;
}
.stat-icon {
    padding: 12px;
    border-radius: 8px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}
.bg-blue {
    background-color: #409eff;
}
.bg-purple {
    background-color: #9c27b0;
}
.bg-indigo {
    background-color: #3f51b5;
}
.bg-red {
    background-color: #f56c6c;
}

.mt-4 {
    margin-top: 20px;
}
.chart-container {
    height: 350px;
    width: 100%;
}
.card-header {
    font-weight: bold;
}
</style>
