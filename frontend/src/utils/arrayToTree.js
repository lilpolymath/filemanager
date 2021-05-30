export const arrayToTree = (array) => {
  var map = {}, node, roots = [], i;

  for (i = 0; i < array.length; i += 1) {
    map[array[i].id] = i;
    array[i].children = [];
  }

  for (i = 0; i < array.length; i += 1) {
    node = array[i];

    if (node.parentId) {
      array[map[node.parentId]]?.children.push(node);
    } else {
      roots.push(node);
    }
}

  return roots;
}

export default arrayToTree