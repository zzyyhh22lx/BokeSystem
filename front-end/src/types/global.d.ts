// 全局类型声明在这里
declare module 'js-cookie' {
  export function set(key:string, data:object, opt:object): void
  export function get(key:string): string
  export function remove(key: string): void
}