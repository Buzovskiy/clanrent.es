/**
 *
 * @param arr - array with arrays inside
 * @param num_cols - number of elements in arrays
 * @param inst - item that we push to array
 * @returns array
 */
const makeTwoDimensionalArr = function (arr, num_cols, inst) {
   if (arr.length === 0) arr.push([]);
   if (arr[arr.length - 1].length === num_cols) arr.push([]);
   arr[arr.length - 1].push(inst);
   return arr;
}

export default makeTwoDimensionalArr;