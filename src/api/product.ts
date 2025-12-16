import request from "@/utils/request";

export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: "sales" | "low" | "out";
}

export function getProducts(params?: any) {
    return request({
        url: "/products",
        method: "get",
        params,
    });
}

export function createProduct(data: any) {
    return request({
        url: "/products",
        method: "post",
        data,
    });
}

export function updateProduct(data: any) {
    // Mock uses same endpoint or specific update logic
    return request({
        url: "/products",
        method: "post", // Simplification for mock
        data,
    });
}

export function deleteProduct(id: string) {
    return request({
        url: "/products/delete",
        method: "post",
        data: { id },
    });
}
