// 找到map初始化的那个父组件
export const findMapObjEL = (currentEL) => {
  let found = 0
  while (currentEL && !found) {
    if (currentEL.mapObj === undefined) {
      currentEL = currentEL.$parent;
    } else {
      found = true;
    }
  }
  return currentEL;
}

export const a = 1
