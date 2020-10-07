
export  function inArray(item, arr) {
  let result=false
  arr.forEach((arrItem) => {
    if (arrItem === item){
      result=true
    }
  })
  return result
}

//对某一字段去重，titleName 表示列表item的某一字段
export function distinct(arr,titleName) {
  let setArr=new Set()
  arr.forEach(item=>{setArr.add(item[titleName])})
  return Array.from(setArr)
}

export function getmmssTime(numTime) {
  let h = parseInt(numTime/60)
  if (h < 10)
    h = '0' + h
  else
    h = h + ''
  let m=numTime % 60
  if(m<10)
    m='0'+m
  else
    m=m+''

  return h+':'+m

}

export function delItem() {

}

