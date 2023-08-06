// 深拷贝的实现
function deepCopy(object) {
    if (!object || typeof object !== "object") return;

    let newObject = Array.isArray(object) ? [] : {};

    for (let key in object) {
        // 有可能key 是继承来的
        if (object.hasOwnProperty(key)) {
            newObject[key] =
                typeof object[key] === "object" ? deepCopy(object[key]) : object[key];
        }
    }
    return newObject;
}
// 对象扁平化
function flattenObject(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, key) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        Object.assign(acc, flattenObject(obj[key], pre + key));
      } else {
        acc[pre + key] = obj[key];
      }
      return acc;
    }, {});
}
// 数组 + 对象扁平化
function flattenObject(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, key) => {
      const pre = prefix.length ? prefix + '.' : '';
      const value = obj[key];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        Object.assign(acc, flattenObject(value, pre + key));
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const newKey = pre + key + '[' + index + ']';
          if (typeof item === 'object' && item !== null) {
            Object.assign(acc, flattenObject(item, newKey));
          } else if (item !== undefined && item !== null) {
            acc[newKey] = item;
          }
        });
      } else if (value !== undefined && value !== null) {
        acc[pre + key] = value;
      }
      return acc;
    }, {});
  }
  