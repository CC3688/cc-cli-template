<script setup lang="ts">
import { type } from 'os'
import { withDefaults, defineProps } from 'vue'

interface IItem {
  [propName: string]: any
}

// 自定义props   ? 表示可选,  但实际是两个参数都是是必须要传的
// 不用 ?  页面加载会报 数据类型形要数据,结果得到 undefined 的错
interface IProps {
  data?: IItem[]
  columnData?: IItem[]
}
const props = defineProps<IProps>()

const formatter = (
  row: unknown,
  column: unknown,
  cellValue: IItem,
  index: unknown
) => {
  return cellValue
}
</script>

<template>
  <el-table
    ref="table"
    :data="data"
    :border="true"
    fit
    highlight-current-row
    style="width: 100%"
    class="my-table"
    v-bind="$attrs"
  >
    <template v-for="item in columnData">
      <!-- 插槽内容 自定义头表-->
      <el-table-column
        v-if="item.slot && item.slot_head"
        :key="item.prop + item.label + '1'"
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : ''"
        :min-width="item.minWidth ? item.minWidth : ''"
        :align="item.align"
        :show-overflow-tooltip="item.tooltip"
        :fixed="item.fixed"
        :sortable="item.sortable"
        :sortMethod="item.sortMethod"
      >
        <template v-slot:header="scope">
          <slot :name="item.slot_head" :scope="scope" />
        </template>
        <template v-slot="scope">
          <slot :name="item.slot" :scope="scope" />
        </template>
      </el-table-column>
      <!-- 插槽内容 -->
      <el-table-column
        v-else-if="item.slot"
        :key="item.prop + item.label + '2'"
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : ''"
        :min-width="item.minWidth ? item.minWidth : ''"
        :align="item.align"
        :show-overflow-tooltip="item.tooltip"
        :fixed="item.fixed"
        :sortable="item.sortable"
        :sortMethod="item.sortMethod"
      >
        <template v-slot="scope">
          <slot :name="item.slot" :scope="scope" />
        </template>
      </el-table-column>
      <!-- 自定义头表 -->
      <el-table-column
        v-else-if="item.slot_head"
        :key="item.prop + item.label + '3'"
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : ''"
        :min-width="item.minWidth ? item.minWidth : ''"
        :align="item.align"
        :show-overflow-tooltip="item.tooltip"
        :fixed="item.fixed"
        :formatter="item.formatter ? item.formatter : formatter"
        :sortable="item.sortable"
        :sortMethod="item.sortMethod"
      >
        <template v-slot:header="scope">
          <slot :name="item.slot_head" :scope="scope" />
        </template>
      </el-table-column>
      <!-- 列 -->
      <el-table-column
        v-else
        :key="item.prop + item.label + '4'"
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : ''"
        :min-width="item.minWidth ? item.minWidth : ''"
        :align="item.align"
        :show-overflow-tooltip="item.tooltip"
        :fixed="item.fixed"
        :formatter="item.formatter ? item.formatter : formatter"
        :sortable="item.sortable"
        :sortMethod="item.sortMethod"
      />
    </template>
  </el-table>
</template>

<style lang="scss" scoped></style>
