import { download } from '@/utils/download'
import { getCurrentInstance } from 'vue'

/**
 * 需要在 useExport 后使用, 依赖useExport 的 queryForm
 */

export interface IFormateParmas<T> {
  queryForm: T
}

export interface IFormateFn<T> {
  ({ queryForm }: IFormateParmas<T>): { [propName: string]: any }
}

function formateFn<T>({ queryForm }: IFormateParmas<T>) {
  return queryForm
}

export interface ApiFn {
  (data?: any): Promise<any>
}

interface IParams<Q> {
  api: ApiFn
  queryForm: Q
  fileName?: string
  formate?: IFormateFn<Q>
  autoLoadData?: boolean
}

export function useExport<T extends { [propName: string]: any }>({
  api,
  queryForm,
  fileName = '导出数据',
  formate = formateFn,
}: IParams<T>) {
  const exportData = async () => {
    // 以下需要根据实际情况调整
    const data = formate({ queryForm })
    const res = await api(data)
    download(res.data, fileName)
  }

  return exportData
}
