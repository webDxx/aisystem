<template>
    <el-container class="layout-container">
        <Sidebar />
        <el-container direction="vertical">
            <Header />
            <el-main>
                <router-view v-slot="{ Component }">
                    <transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";
</script>

<style scoped>
.layout-container {
    height: 100vh;
}
.el-main {
    background-color: #f9fafb; /* gray-50 */
    padding: 24px;
}
</style>
