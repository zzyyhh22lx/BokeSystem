interface anyObj {
    [key:string]:any
}

interface storageData {
    [key:string]: string
}

declare module '@/components/locale-control/core' {
    export default function useLang(lang: 'zh-CN' | 'en'): null
}

interface KStringObj {
  [key: string]: any
}