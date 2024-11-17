const fixWords = (input: string) => {
  const wordArray = input.split("");

  if (
    (wordArray[0] === "O" &&
      !(
        wordArray[1] === "S" ||
        wordArray[1] === "3" ||
        wordArray[1] === "s"
      )) ||
    wordArray[0] === "3"
  ) {
    wordArray.splice(0, 1);
    const joined = wordArray.join("");
    console.log(joined);
  } else {
    const joined = wordArray.join("");
    console.log(joined);
  }
};

export { fixWords };
