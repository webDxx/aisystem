<template>
    <div class="product-container">
        <div class="filter-container">
            <div class="left-panel">
                <el-input
                    v-model="searchQuery"
                    placeholder="搜索商品..."
                    style="width: 200px"
                    class="filter-item"
                    clearable
                    @input="handleFilter"
                >
                    <template #prefix>
                        <el-icon><Search /></el-icon>
                    </template>
                </el-input>
                <el-button class="filter-item ml-2" @click="handleFilter">
                    <el-icon class="mr-1"><Filter /></el-icon> 筛选
                </el-button>
            </div>
            <div class="right-panel">
                <el-button type="primary" @click="handleCreate">
                    <el-icon class="mr-1"><Plus /></el-icon> 新增商品
                </el-button>
            </div>
        </div>

        <el-table v-loading="loading" :data="filteredData" style="width: 100%; margin-top: 20px" border>
            <el-table-column type="selection" width="55" />
            <el-table-column prop="id" label="ID" width="100" />
            <el-table-column prop="name" label="商品名称" min-width="150" />
            <el-table-column prop="category" label="分类" width="120" />
            <el-table-column label="单价" width="120">
                <template #default="{ row }"> ¥{{ row.price.toFixed(2) }} </template>
            </el-table-column>
            <el-table-column prop="stock" label="库存" width="100" />
            <el-table-column label="状态" width="100">
                <template #default="{ row }">
                    <el-tag :type="getStatusType(row.status)">
                        {{ getStatusText(row.status) }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template #default="{ row }">
                    <el-button link type="primary" @click="handleUpdate(row)">
                        <el-icon><Edit /></el-icon>
                    </el-button>
                    <el-button link type="danger" @click="handleDelete(row)">
                        <el-icon><Delete /></el-icon>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-container">
            <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="filteredData.length"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
        </div>

        <!-- Dialog -->
        <el-dialog v-model="dialogVisible" :title="dialogStatus === 'create' ? '新增商品' : '编辑商品'" width="500px">
            <el-form ref="dataFormRef" :model="tempProduct" :rules="rules" label-position="top">
                <el-form-item label="商品名称" prop="name">
                    <el-input v-model="tempProduct.name" placeholder="输入商品名称" />
                </el-form-item>
                <el-form-item label="分类" prop="category">
                    <el-select v-model="tempProduct.category" placeholder="选择分类" style="width: 100%">
                        <el-option label="办公家具" value="办公家具" />
                        <el-option label="电子配件" value="电子配件" />
                        <el-option label="电子设备" value="电子设备" />
                    </el-select>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="单价" prop="price">
                            <el-input-number
                                v-model="tempProduct.price"
                                :precision="2"
                                :step="0.1"
                                :min="0"
                                style="width: 100%"
                            />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="库存" prop="stock">
                            <el-input-number v-model="tempProduct.stock" :min="0" style="width: 100%" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="tempProduct.status" placeholder="选择状态" style="width: 100%">
                        <el-option label="在售" value="sales" />
                        <el-option label="库存紧张" value="low" />
                        <el-option label="缺货" value="out" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()"> 确认 </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, nextTick } from "vue";
import { getProducts, createProduct, updateProduct, deleteProduct, Product } from "@/api/product";
import { ElMessage, ElMessageBox } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

const loading = ref(true);
const tableData = ref<Product[]>([]);
const searchQuery = ref("");
const dialogVisible = ref(false);
const dialogStatus = ref<"create" | "update">("create");
const dataFormRef = ref<FormInstance>();

const currentPage = ref(1);
const pageSize = ref(10);

const tempProduct = reactive<Product>({
    id: "",
    name: "",
    category: "",
    price: 0,
    stock: 0,
    status: "sales",
});

const rules = reactive<FormRules>({
    name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
    category: [{ required: true, message: "请选择分类", trigger: "change" }],
    price: [{ required: true, message: "请输入单价", trigger: "blur" }],
    stock: [{ required: true, message: "请输入库存", trigger: "blur" }],
    status: [{ required: true, message: "请选择状态", trigger: "change" }],
});

onMounted(() => {
    fetchData();
});

const fetchData = async () => {
    loading.value = true;
    try {
        const data = await getProducts();
        tableData.value = data as any; // Mock data wrapper issue if type mismatch, but handled in request
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

const filteredData = computed(() => {
    if (!searchQuery.value) return tableData.value;
    const query = searchQuery.value.toLowerCase();
    return tableData.value.filter((item) => item.name.toLowerCase().includes(query) || item.id.toLowerCase().includes(query));
});

const handleFilter = () => {
    currentPage.value = 1;
};

const handleSizeChange = (val: number) => {
    pageSize.value = val;
};

const handleCurrentChange = (val: number) => {
    currentPage.value = val;
};

const resetTemp = () => {
    tempProduct.id = "";
    tempProduct.name = "";
    tempProduct.category = "";
    tempProduct.price = 0;
    tempProduct.stock = 0;
    tempProduct.status = "sales";
};

const handleCreate = () => {
    resetTemp();
    dialogStatus.value = "create";
    dialogVisible.value = true;
    nextTick(() => {
        dataFormRef.value?.clearValidate();
    });
};

const createData = async () => {
    if (!dataFormRef.value) return;
    await dataFormRef.value.validate(async (valid) => {
        if (valid) {
            try {
                await createProduct(tempProduct);
                tableData.value.unshift({ ...tempProduct, id: Math.random().toString().slice(2, 6) }); // Mock update
                dialogVisible.value = false;
                ElMessage.success("创建成功");
            } catch (error) {
                // handled by request
            }
        }
    });
};

const handleUpdate = (row: Product) => {
    Object.assign(tempProduct, row);
    dialogStatus.value = "update";
    dialogVisible.value = true;
    nextTick(() => {
        dataFormRef.value?.clearValidate();
    });
};

const updateData = async () => {
    if (!dataFormRef.value) return;
    await dataFormRef.value.validate(async (valid) => {
        if (valid) {
            try {
                await updateProduct(tempProduct);
                const index = tableData.value.findIndex((v) => v.id === tempProduct.id);
                tableData.value.splice(index, 1, { ...tempProduct });
                dialogVisible.value = false;
                ElMessage.success("更新成功");
            } catch (error) {
                // handled
            }
        }
    });
};

const handleDelete = (row: Product) => {
    ElMessageBox.confirm("确认删除该商品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    }).then(async () => {
        try {
            await deleteProduct(row.id);
            const index = tableData.value.findIndex((v) => v.id === row.id);
            tableData.value.splice(index, 1);
            ElMessage.success("删除成功");
        } catch (error) {
            // handled
        }
    });
};

const getStatusType = (status: string) => {
    const map: Record<string, string> = {
        sales: "success",
        low: "warning",
        out: "danger",
    };
    return map[status] || "info";
};

const getStatusText = (status: string) => {
    const map: Record<string, string> = {
        sales: "在售",
        low: "库存紧张",
        out: "缺货",
    };
    return map[status] || status;
};
</script>

<style scoped lang="scss">
.product-container {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.filter-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .left-panel,
    .right-panel {
        display: flex;
        align-items: center;
    }

    .ml-2 {
        margin-left: 8px;
    }
    .mr-1 {
        margin-right: 4px;
    }
}

.pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
</style>
