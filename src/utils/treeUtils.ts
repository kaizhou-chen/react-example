/**
 * 显示层级结构
 * @param tree  Array 数组，数据是树状结构
 * @param func 回调函数
 * @param key 字段名称
 * @param path 
 * @returns 
 */
export function findPath(tree: any, func: any, key= "", path = []) {
  if (!tree) return []
  for (const data of tree) {
    // @ts-ignore
    key=== "" ? path.push(data) : path.push(data[key]);
    if (func(data)) return path
    if (data.children && data.children.length) {
      const findChildren: any = findPath(data.children, func, key, path)
      if (findChildren.length) return findChildren
    }
    path.pop()
  }
  return []
}

/**
 * 遍历树节点
 * @param current 根节点
 * @param callback 回调函数
 */
export function traverse(current: any, callback: any) {
  callback(current)

  if (current.children) {
    current.children.forEach((child: any) => {
      callback(child)
      traverse(child, callback);
    });
  }
}

/**
 * element 根节点
 * value 要匹配的值
 * field 要查找的字段
 */
function searchTree(element, value, field) {
  if (element[field || 'id'] == value) {
    return element;
  } else if (element.children != null) {
    let result = null;
    for(let i = 0; result == null && i < element.children.length; i++) {
      result = searchTree(element.children[i], value, field);
    }
    return result;
  }
  return null;
}

export function searchTreeList(list, value, field?) {
  for (const item of list) {
    let result = searchTree(item, value, field);
    if (result) {
      return result
    }
  }
  return null;
}