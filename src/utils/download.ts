export function download(data: any, name: string) {
  const link = document.createElement('a')
  try {
    const blob = new Blob([data], { type: 'application/vnd.ms-excel' })
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.download = name + '.xlsx' // 下载的文件名  注意：加.xls是兼容火狐浏览器
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (err) {
    console.log('234', err)
  }
}
