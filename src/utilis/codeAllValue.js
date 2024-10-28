function codeAllValue(code) {
  if (code.some((val) => val === '')) {
    return 'All Fields are Requires';
  }
  return '';
}

export default codeAllValue;
