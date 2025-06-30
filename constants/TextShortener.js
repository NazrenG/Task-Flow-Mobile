function TextShortener(data, count = 12) {
  return data.length <= count ? data : data.slice(0, count) + "...";
}

export default TextShortener;
