import createAxios from '@/utils/request/axios';

const api = {
  getDetail: '/performance_result/unixbench/',
//   detailCompare: '/performance_result/unixbench/?distinct=unixbench_testcase_name'
}

export function getDetail(limit: number) {
  return createAxios({
    url: api.getDetail,
    method: 'get',
    params: {
      limit: limit
    }
  })
}
