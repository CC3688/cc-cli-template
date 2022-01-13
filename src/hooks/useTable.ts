import { reactive, ref } from 'vue'

export interface IPageInfo {
  total: number
  pageNum: number
  pageSize: number
}

export interface IFormateParmas<T> {
  queryForm: T
  pageInfo: IPageInfo
}

export interface IFormateFn<T> {
  ({ queryForm, pageInfo }: IFormateParmas<T>): { [propName: string]: any }
}

export interface IFilterFn<T> {
  (data: T[]): any[]
}

function formateFn<T>({
  queryForm,
  pageInfo,
}: {
  queryForm: T
  pageInfo: IPageInfo
}) {
  return {
    pageNum: pageInfo.pageNum,
    pageSize: pageInfo.pageSize,
    param: queryForm,
  }
}

function filterFn<T>(data: T[]): T[] {
  return data
}

// interface IBaseData<T> {
//   data: T,
//   page: {
//     total: number
//   }
// }

export interface ApiFn<T> {
  (data?: any): Promise<T[]>
}

interface IParams<T, D> {
  api: ApiFn<D>
  formate?: IFormateFn<T>
  filter?: IFilterFn<D>
  queryForm: T
  autoLoadData?: boolean
}

export function useTable<T extends { [propName: string]: any }, D = any>({
  api,
  queryForm,
  formate = formateFn,
  filter = filterFn,
  autoLoadData = true,
}: IParams<T, D>) {
  const tableData = ref()
  const queryFormHook = reactive<T>(queryForm)
  const pageInfo = reactive({ total: 0, pageNum: 1, pageSize: 10 })
  const loadData = async () => {
    const parmasOrdata = formate({
      queryForm: queryFormHook,
      pageInfo: pageInfo,
    })

    // 以下代码, 要根据,接口实际返回, 做调整
    // const { data, page} = await api(parmasOrdata)
    // tableData.value = filter(data)
    // pageInfo.total = page.total
    const data = await api(parmasOrdata)
    tableData.value = filter(data)
    pageInfo.total = 32
  }
  const search = () => {
    pageInfo.pageNum = 1
    loadData()
  }
  autoLoadData && loadData()

  return { queryForm: queryFormHook, pageInfo, search, loadData, tableData }
}
