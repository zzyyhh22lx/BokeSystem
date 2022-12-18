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
export function validateFileName(fileName:string){
  const reg = new RegExp('[\\\\/:*?\"<>|]');
  if (reg.test(fileName)) {
	    // "上传的文件名不能包含【\\\\/:*?\"<>|】这些非法字符,请修改后重新上传!";
	    return false;
  }
  return true;
}