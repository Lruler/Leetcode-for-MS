/**
 * --- 问题描述 ---
 *
 * 给定一组文件路径，找出它们共同的的父级目录。
 * 如果不存在共同的父级目录，返回 `null`
 */

function findParentDirectory(paths) {
  // path为0的情况
  if (paths.length === 0) return null;

  let newPaths = paths.map((path) => path.split('/'));
  // 找出层级最高的路径
  let minLen = paths[0].length;
  let minIndex = 0;
  for (let i = 1; i < newPaths.length; ++i) {
    let tempLen = newPaths[i].length;
    if (tempLen <= minLen) {
      minLen = tempLen;
      minIndex = i;
    }
  }
  let res = null;
  let isParent = false;
  // 倒着寻找共同父级目录
  for (let i = minLen; i > 1; --i) {
    res = newPaths[minIndex].slice(0, i).join('/');
    isParent = newPaths.every((path) => path.slice(0, i).join('/') === res);
    if (isParent) break;
  }
  if (isParent) return res;
  else return null;
}

// 互斥锁
type ReleaseFn = () => void;

class Mutex {
  locked = false;
  waiting: Array<() => void> = [];

  async acquire(): Promise<ReleaseFn> {
    const release = () => {
      if (this.waiting.length > 0) {
        const next = this.waiting.pop();
        if (next) next();
      } else {
        this.locked = false;
      }
    };

    if (this.locked) {
      await new Promise<void>((resolve) => {
        this.waiting.push(resolve);
      });
      this.locked = true;
      return release;
    }

    this.locked = true;
    return release;
  }
}