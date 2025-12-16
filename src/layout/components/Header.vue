<template>
    <el-header class="header-container">
        <div class="header-left">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>{{ currentRouteTitle }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="header-right">
            <div class="search-box">
                <el-input placeholder="全局搜索..." prefix-icon="Search" v-model="searchText" class="w-64" />
            </div>
            <div class="notification-icon">
                <el-badge is-dot class="item">
                    <el-button circle icon="Bell" />
                </el-badge>
            </div>
        </div>
    </el-header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const searchText = ref("");

const currentRouteTitle = computed(() => route.meta.title || "");
</script>

<style scoped lang="scss">
.header-container {
    background-color: white;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    height: 64px;
}

.header-right {
    display: flex;
    align-items: center;
    gap: 16px;
}
</style>
