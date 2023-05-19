export const selectAll = (list, basekey = "id", credkey = "creds_id") =>
  list.map((item) => [item[basekey], item[credkey]]);

export const selectAllApplications = (
  list,
  basekey = "id",
  userBaseID = "userBaseData.id"
) => list.map((item) => [item[basekey], item[userBaseID]]);

export const selectAllDrivers = (list) => {
  let finalList = [];
  for (let x = 0; x < list.length; x++) {
    if (list[x].userBaseData !== null && list[x].userBaseData !== undefined) {
      finalList.push([list[x].id, list[x].userBaseData.id]);
    } else {
      finalList.push([list[x].id, null]);
    }
  }
  return finalList;
};

function indexOf2d(array2d, item) {
  return [].concat.apply([], [].concat.apply([], array2d)).indexOf(item);
}

function indexIn2dArray(array2d, item) {
  let index = [].concat.apply([], [].concat.apply([], array2d)).indexOf(item);
  if (index === -1) {
    return false;
  }
  let numColumns = array2d[0].length;
  let row = parseInt(index / numColumns);
  let col = index % numColumns;
  return [row, col];
}

function flatten2d(array2d) {
  return [].concat.apply([], [].concat.apply([], array2d));
}

export const selectOne = (selected, base_id, cred_id) => {
  const selectedIndex = indexOf2d(selected, base_id);
  let newSelected = [];

  if (selectedIndex === -1) {
    if (selected.length > 0) {
      newSelected.push(...selected, [base_id, cred_id]);
    } else {
      newSelected.push([base_id, cred_id]);
    }
    // console.log("item added to arr", newSelected);
  } else if (indexIn2dArray(selected, base_id)[0] === 0) {
    // console.log(
    //   "item removed at arr start ",
    //   indexIn2dArray(selected, base_id)
    // );
    newSelected = newSelected.concat(selected.slice(1));
  } else if (indexIn2dArray(selected, base_id)[0] === selected.length - 1) {
    // console.log("item removed at arr end ", indexIn2dArray(selected, base_id));
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (indexIn2dArray(selected, base_id)[0] > 0) {
    // console.log(
    //   "item removed somewhere, neither at end or start",
    //   indexIn2dArray(selected, base_id)
    // );
    newSelected = newSelected.concat(
      selected.slice(0, indexIn2dArray(selected, base_id)[0]),
      selected.slice(indexIn2dArray(selected, base_id)[0] + 1)
    );
  }

  return newSelected;
};
