var getKthFromEnd = function (head, k) {
    let arr = [];
    while (head) {
        arr.push(head)
        head = head.next
    }
    for (let i = 0; i < k - 1; i++) {
        arr.pop()
    }
    return arr[arr.length - 1]
};