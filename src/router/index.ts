import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainLayout from "@/layout/MainLayout.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        component: MainLayout,
        redirect: "/dashboard",
        children: [
            {
                path: "dashboard",
                name: "Dashboard",
                component: () => import("@/views/dashboard/index.vue"),
                meta: { title: "仪表盘", icon: "DataLine" },
            },
            {
                path: "products",
                name: "Products",
                component: () => import("@/views/product/index.vue"),
                meta: { title: "商品管理", icon: "Goods" },
            },
            {
                path: "purchase",
                name: "Purchase",
                component: () => import("@/views/product/index.vue"), // Reusing for now
                meta: { title: "采购管理", icon: "ShoppingCart" },
            },
            {
                path: "sales",
                name: "Sales",
                component: () => import("@/views/product/index.vue"),
                meta: { title: "销售管理", icon: "Sell" },
            },
            {
                path: "inventory",
                name: "Inventory",
                component: () => import("@/views/product/index.vue"),
                meta: { title: "库存管理", icon: "House" },
            },
            {
                path: "suppliers",
                name: "Suppliers",
                component: () => import("@/views/product/index.vue"),
                meta: { title: "供应商", icon: "Van" },
            },
            {
                path: "settings",
                name: "Settings",
                component: () => import("@/views/product/index.vue"),
                meta: { title: "系统设置", icon: "Setting" },
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
