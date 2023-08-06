// 手动实现useState
let _state; // 在函数组件的多次渲染之间保留状态值

function useState(initialValue) {
  // 如果_state未初始化，将其设置为初始值
  _state = _state === undefined ? initialValue : _state;

  function setState(newState) {
    _state = newState;

    // 模拟React的渲染，这里我们只是手动调用render函数
    // 在实际的React库中，会通过调度器和渲染机制重新渲染组件
    render();
  }

  return [_state, setState];
}
