<script lang="ts">
export default { name: 'CompassList' }
</script>
<script setup lang="ts">
import { getPost } from '@/api/compass'
import { IPost, IPostParams } from '@/interfaces/compass'
import { useTable, IFormateParmas } from '@/hooks/useTable'
import { useExport } from '@/hooks/useExport'

interface IQueryForm {
  id: number | null
  author: string
  title: string
}

interface IData {
  id: number
  title: string
  author: string
}

function formateFn({ queryForm, pageInfo }: IFormateParmas<IQueryForm>) {
  const params: IPostParams = {
    _page: pageInfo.pageNum,
    _limit: pageInfo.pageSize,
  }
  if (queryForm.id) params.id = queryForm.id
  if (queryForm.author) params.author = queryForm.author
  if (queryForm.title) params.title = queryForm.title
  return params
}

const { tableData, queryForm, pageInfo, search, loadData } = useTable<
  IQueryForm,
  IData
>({
  api: getPost,
  queryForm: { id: null, author: '', title: '' },
  formate: formateFn,
})

const exportData = useExport<IQueryForm>({
  api: getPost,
  queryForm: queryForm,
  fileName: '下载文件',
})

const columnData = [
  {
    prop: 'id',
    label: 'ID值',
    width: '',
    align: 'center',
  },
  {
    prop: 'title',
    label: '标题',
    width: '',
    align: 'center',
  },
  {
    prop: 'author',
    label: '作者',
    width: '',
    align: 'center',
  },
  {
    prop: '',
    label: '操作',
    width: '',
    align: 'center',
    slot: 'operation',
  },
]

const detail = (row: IPost) => {
  console.log(`row: ${row.id} - ${row.title} - ${row.author}`)
}

// getAllPost()
</script>

<template>
  <div>
    <el-form
      :inline="true"
      :model="queryForm"
      class="my-query-form"
      @keyup.enter="search"
    >
      <el-form-item label="id">
        <el-input
          v-model="queryForm.id"
          placeholder="Approved by"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="文章作者">
        <el-input
          v-model="queryForm.author"
          placeholder="文章作者"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="文章标题">
        <el-input
          v-model="queryForm.title"
          placeholder="文章标题"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">Query</el-button>
        <el-button type="primary" @click="exportData">download</el-button>
      </el-form-item>
    </el-form>
    <my-table :data="tableData" :column-data="columnData">
      <template v-slot:operation="{ scope }">
        <el-button @click="detail(scope.row)">查看详情</el-button>
      </template>
    </my-table>
    <my-pagination
      :total="pageInfo.total"
      v-model:page="pageInfo.pageNum"
      v-model:limit="pageInfo.pageSize"
      @pagination="loadData"
    />
  </div>
</template>

<style lang="scss" scoped>
.el-pagination {
  text-align: right;
}
</style>
