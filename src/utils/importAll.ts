import { toUpperCamelCase } from '@/utils'

/**
 * 路由文件夹的自动导入  默认导入
 * @param files
 * @returns 路由
 */
export function importRoute(files: { [propName: string]: any }) {
  return Object.values(files).map((i) => i.default)
}

/**
 * Store文件夹的自动导入  具名导入
 * @param files
 * @returns 路由
 */
export function importStore(files: { [propName: string]: any }) {
  const temp: any = {}
  const stores = Object.values(files)
  stores.forEach((store) => {
    const keys = Object.keys(store)
    keys.forEach((k) => {
      temp[k] = store[k]
    })
  })
  return temp
}

/**
 * 路由文件夹的components 组件  默认导入
 * 1  所有组件, 需要外层包一个文件夹
 * 2  只读取 组件文件里的文件, 不包含组件文件夹里的文件
 * 3  组件名默认是 组件文件下文件的 文件名(首字母大写)
 * 3  如果 组件文件夹下文件的 的文件名为 index 则以 组件文件夹 为 组件名
 * @param files
 * @returns 路由
 */
export function importComponent(files: { [propName: string]: any }) {
  const temp: any = {}
  const all = Object.keys(files)
  all.forEach((i) => {
    const tempKeys = Reflect.ownKeys(temp)
    const nameOptions = i
      .split('/')
      .filter(
        (n: string) =>
          n !== 'index.vue' &&
          n !== 'src' &&
          n !== 'components' &&
          n !== '.' &&
          n.length > 0
      )
      .map((m: string) => {
        if (m.endsWith('.vue')) {
          return toUpperCamelCase(m.replace('.vue', ''))
        }
        return toUpperCamelCase(m)
      })
    if (nameOptions.length === 1) {
      if (!tempKeys.includes(nameOptions[0])) {
        temp[nameOptions[0]] = files[i].default
      }
    } else {
      if (!tempKeys.includes(nameOptions[1])) {
        temp[nameOptions[1]] = files[i].default
      } else {
        const key = nameOptions[0] + nameOptions[1]
        if (!tempKeys.includes(key)) {
          temp[key] = files[i].default
        }
      }
    }
  })
  return temp
}
