<template>
    <el-aside width="240px" class="sidebar-container">
        <div class="logo-container">
            <div class="logo-icon">
                <el-icon><Box /></el-icon>
            </div>
            <span class="logo-text">PSI System</span>
        </div>

        <el-menu
            :default-active="activeMenu"
            class="el-menu-vertical"
            background-color="#0f172a"
            text-color="#94a3b8"
            active-text-color="#ffffff"
            router
        >
            <el-menu-item index="/dashboard">
                <el-icon><DataLine /></el-icon>
                <span>仪表盘</span>
            </el-menu-item>
            <el-menu-item index="/products">
                <el-icon><Goods /></el-icon>
                <span>商品管理</span>
            </el-menu-item>
            <el-menu-item index="/purchase">
                <el-icon><ShoppingCart /></el-icon>
                <span>采购管理</span>
            </el-menu-item>
            <el-menu-item index="/sales">
                <el-icon><Sell /></el-icon>
                <span>销售管理</span>
            </el-menu-item>
            <el-menu-item index="/inventory">
                <el-icon><House /></el-icon>
                <span>库存管理</span>
            </el-menu-item>
            <el-menu-item index="/suppliers">
                <el-icon><Van /></el-icon>
                <span>供应商</span>
            </el-menu-item>
            <el-menu-item index="/settings">
                <el-icon><Setting /></el-icon>
                <span>系统设置</span>
            </el-menu-item>
        </el-menu>

        <div class="user-info">
            <div class="user-avatar">
                <img src="https://ui-avatars.com/api/?name=Admin+User&background=3b82f6&color=fff" alt="User" />
            </div>
            <div class="user-details">
                <div class="user-name">管理员</div>
                <div class="user-email">admin@psi.com</div>
            </div>
        </div>
    </el-aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const activeMenu = computed(() => route.path);
</script>

<style scoped lang="scss">
.sidebar-container {
    background-color: #0f172a; // Slate 900
    height: 100vh;
    display: flex;
    flex-direction: column;
    color: white;
    transition: width 0.3s;

    .logo-container {
        height: 64px;
        display: flex;
        align-items: center;
        padding: 0 24px;
        background-color: #020617; // Slate 950
        border-bottom: 1px solid #1e293b;

        .logo-icon {
            width: 32px;
            height: 32px;
            background-color: #2563eb;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
        }

        .logo-text {
            font-size: 18px;
            font-weight: bold;
            letter-spacing: 0.5px;
        }
    }

    .el-menu-vertical {
        border-right: none;
        flex: 1;
        overflow-y: auto;
        padding-top: 16px;
    }

    :deep(.el-menu-item) {
        &:hover {
            background-color: #1e293b;
        }
        &.is-active {
            background-color: #2563eb;
        }
    }

    .user-info {
        padding: 16px;
        border-top: 1px solid #1e293b;
        background-color: #020617;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
            background-color: #1e293b;
        }

        .user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-right: 12px;
            border: 2px solid #334155;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .user-details {
            .user-name {
                font-size: 14px;
                font-weight: 600;
            }
            .user-email {
                font-size: 12px;
                color: #94a3b8;
            }
        }
    }
}
</style>
