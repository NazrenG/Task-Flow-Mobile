type TextShortenerProps = {
  text: string;
};

const TextShortener = ({ text }: TextShortenerProps) => {
  const totalCount = text.length;
  function shortener(word: string) {
    const sliced = word.slice(0, 12);
    return sliced + "...";
  }

  return totalCount < 12 ? text : shortener(text);
};

export default TextShortener;
