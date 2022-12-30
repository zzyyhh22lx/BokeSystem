// 裁剪文字
export function cropText(target: string, num: number): string {
  const result:Array<string> = [...target]
  if(result.length > num) {
    result.splice(num)
    result.push('...')
  }
  return result.join('')
}

// 验证文件名字是否合法
export function validateFileName(fileName:string):boolean {
  const reg = new RegExp('[\\\\/:*?\"<>|]');
  if (reg.test(fileName)) {
	    // "上传的文件名不能包含【\\\\/:*?\"<>|】这些非法字符,请修改后重新上传!";
	    return false;
  }
  return true;
}

// 获得cookie
export function getCookie(name:string):string {
  const {cookie} = document
  const hashMap = new Map()
  cookie.split(';').forEach((value) => {
    const v = value.split('=')
    hashMap.set(v[0].trim(), v[1])
  })
  return hashMap.get(name)
}

// 防抖
// n秒内只运行一次
export function throttle(fn:any, delay:number) {
  let startTime = Date.now()
  return function () {
    const lastTime = Date.now()
    if(lastTime - startTime > delay) {
      fn()
      startTime = lastTime
    }
  }
}

// 节流
// n秒后执行该事件，如果在n秒内被重复触发，则重新计时
export function debounce(fn:any, delay:number) {
  let startTime = Date.now()
  return function() {
    const lastTime = Date.now()
    if(lastTime - startTime > delay) fn()
    startTime = lastTime
  }
}