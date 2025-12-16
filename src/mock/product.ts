import { MockMethod } from "vite-plugin-mock";
import { Random } from "mockjs";

const productList = [
    {
        id: "1001",
        name: "高级人体工学椅",
        category: "办公家具",
        price: 899.0,
        stock: 45,
        status: "sales",
    },
    { id: "1002", name: "机械键盘 K8", category: "电子配件", price: 399.0, stock: 120, status: "sales" },
    { id: "1003", name: "4K 显示器 27寸", category: "电子设备", price: 1899.0, stock: 12, status: "low" },
    { id: "1004", name: "无线鼠标 M3", category: "电子配件", price: 89.0, stock: 300, status: "sales" },
    { id: "1005", name: "升降办公桌", category: "办公家具", price: 1299.0, stock: 0, status: "out" },
];

export default [
    {
        url: "/api/products",
        method: "get",
        response: () => {
            return {
                code: 200,
                message: "success",
                data: productList,
            };
        },
    },
    {
        url: "/api/products",
        method: "post",
        response: ({ body }) => {
            return {
                code: 200,
                message: "success",
                data: {
                    id: Random.integer(1006, 2000).toString(),
                    ...body,
                },
            };
        },
    },
    {
        url: "/api/products/delete",
        method: "post",
        response: () => {
            return {
                code: 200,
                message: "success",
                data: null,
            };
        },
    },
] as MockMethod[];
