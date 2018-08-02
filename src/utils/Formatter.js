export function formatToUnits(number) {
  const abbrev = ['', 'K', 'M', 'B', 'T'];
  const order = Math.min(Math.floor(Math.log10(Math.abs(number)) / 3), abbrev.length - 1);
  const suffix = abbrev[order];
  return (number / Math.pow(10, order * 3)).toFixed(2) + suffix;
}

export function shuffle(arr){
    let ctr = arr.length;
    let temp;
    let index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arr[ctr];
        arr[ctr] = arr[index];
        arr[index] = temp;
    }
    return arr;
};
