// 获取当前时间
export const getTime =()=>{
  let currentDate = new Date().getHours()
  if(currentDate <= 6) return '清晨'
  else if(currentDate <=11) return '早上'
  else if(currentDate <=12) return '中午'
  else if(currentDate <=19) return '下午'
  else return '晚上'
}