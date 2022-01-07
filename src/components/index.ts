import { importComponent } from '@/utils/importAll'

const res = importComponent(import.meta.globEager('./**/**.vue'))

export default res
