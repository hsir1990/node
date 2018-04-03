// assert模块提供了简单的断言测试功能，主要用来内部使用，也可能require(‘assert’)后在外部进行使用。
    // assert模块的API为locked状态，也就是说，这个模块的API将不会再有添加或修改了。


//     Assert模块方法列表：
//     assert(value[, message])
//     assert.deepEqual(actual, expected[, message])
//     assert.deepStrictEqual(actual, expected[, message])
//     assert.doesNotThrow(block[, error][, message])
//     assert.equal(actual, expected[, message])
//     assert.fail(actual, expected, message, operator)
//     assert.ifError(value)
//     assert.notDeepEqual(actual, expected[, message])
//     assert.notDeepStrictEqual(actual, expected[, message])
//     assert.notEqual(actual, expected[, message])
//     assert.notStrictEqual(actual, expected[, message])
//     assert.ok(value[, message])
//     assert.strictEqual(actual, expected[, message])
//     assert.throws(block[, error][, message])

// assert(value[,message])
//         assert()是assert.ok()的简写方式，两者用法一样。
//         如果value的值为true，那么什么也不会发生。如果value为false，将抛出一个信息为message的错误。
// assert.ok(value[, message])
//         参上。
// assert.equal(actual, expected[, message])     
//         判断实际值(actual)与期望徝(expected)是否相等(==)，如果不相等，则抛出一个message的错误。
// assert.notEqual(actual, expected[, message])
//         参上。
// assert.deepEqual(actual, expected[, message])
//         deep意味着子对象的可枚举属性也会被计算进去。如果本身属性及子对象属性都相等时通过。否则会抛出错误。
// assert.notDeepEqual(actual, expected[, message])
//         参上。
// assert.strictEqual(actual, expected[, message])
//         用法与assert.deepEqual()一样，判断条件为是否完全相等(===)。
// assert.notStrictEqual(actual, expected[, message])
//         参上。
// assert.deepStrictEqual(actual, expected[, message])
//         判断条件为是否深度严格相等。
// assert.notDeepStrictEqual(actual, expected[, message])
//         参上。
//         以上这几组的API用法一样，只有条件不同

// assert.fail(actual, expected, message, operator)
//         判断message是否是错误的(falsy)，如果是错误的(falsy)则抛出错误信息：实际值 操作operator 期望值。　
//         如果message为正确的(Truthy)，那么抛出信息为message的错误信息。
// assert.ifError(value)
//         判断value是否为false,如果为false则通过，如果为ture则抛出信息为value的错误。

// assert.throws(block[, error][, message])
//         这个暂时没搞太明白。
// assert.doesNotThrow(block[, error][, message])
//         这个暂时没搞太明白。