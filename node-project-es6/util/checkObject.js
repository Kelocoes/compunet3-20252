function checkObjectIsEmpty(obj) {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Input must be a non-null object');
  }
  return Object.keys(obj).length === 0;
}

export { checkObjectIsEmpty };