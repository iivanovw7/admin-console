export function ifArrayContains(element, list) {
  for (const current of list) {
    if (current === element) {
      return true;
    }
  }
  return false;
}
