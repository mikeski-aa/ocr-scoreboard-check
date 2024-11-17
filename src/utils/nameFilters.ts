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

const eliminateSigns = (input: string) => {
  const regex: RegExp = /^[^a-zA-Z]$/;
  const splitWord = input.split("");

  if (regex.test(splitWord[0]) || regex.test(splitWord[1])) {
    splitWord.splice(0, 2);
    const rejoined = splitWord.join("");
    return rejoined;
  } else {
    return input;
  }
};

// elminates O that OCR can accidentally put when mis-recognising
const eliminateO = (input: string) => {
  const splitWord = input.split("");
  const possibleWords = ["Osprey Mk IV", "O3U-1", "OS2U-1", "OS2U-2"];

  if (splitWord[0] === "O" && possibleWords.includes(input)) {
    return input;
  } else {
    splitWord.splice(0, 1);
    const rejoined = splitWord.join("");
    console.log(rejoined);
    return rejoined;
  }
};

export { fixWords, eliminateO, eliminateSigns };
