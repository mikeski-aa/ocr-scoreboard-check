import { corrections } from "./nameFilterMap";

const eliminateSigns = (input: string) => {
  const regex: RegExp = /^[^a-zA-Z]$/;
  const splitWord = input.split("");

  if (input === ")35D") {
    return "J35D";
  }

  if (input === "134") {
    return "J34";
  }

  if (regex.test(splitWord[0])) {
    if (regex.test(splitWord[1])) {
      splitWord.splice(0, 2);
      const rejoined = splitWord.join("");
      // console.log(rejoined);
      return rejoined;
    }

    splitWord.splice(0, 1);
    const rejoined = splitWord.join("");
    // console.log(rejoined);
    return rejoined;
  } else {
    return input;
  }
};

const fixImisreads = (input: string) => {
  const splitWord = input.split("");

  if (splitWord[0] === "1" && splitWord[1] === "-") {
    splitWord[0] = "I";
    const rejoined = splitWord.join("");
    // console.log(rejoined);
    return rejoined;
  } else {
    return input;
  }
};

// elminates O that OCR can accidentally put when mis-recognising
const eliminateO = (input: string) => {
  const splitWord = input.split("");
  const possibleWords = ["Osprey Mk IV", "O3U-1", "OS2U-1", "OS2U-2"];

  if (splitWord[0] != "O") {
    return input;
  } else if (possibleWords.includes(input)) {
    return input;
  } else {
    splitWord.splice(0, 1);
    const rejoined = splitWord.join("");
    // console.log(rejoined);
    return rejoined;
  }
};

const eliminateP = (input: string) => {
  const splitWord = input.split("");

  if (splitWord[0] != "P") {
    return input;
  } else if (splitWord[1] === "M") {
    splitWord.splice(0, 1);
    const rejoined = splitWord.join("");
    // console.log(rejoined);
    return rejoined;
  } else {
    return input;
  }
};

const eliminateCross = (input: string) => {
  const splitWord = input.split("");

  if (splitWord[0] != "F") {
    return input;
  } else if (splitWord[1] === "E") {
    splitWord.splice(0, 2);
    const rejoined = splitWord.join("");
    // console.log(rejoined);
    return rejoined;
  } else {
    return input;
  }
};

const eliminateK = (input: string) => {
  const splitWord = input.split("");

  if (splitWord[0] != "k") {
    return input;
  } else {
    splitWord.splice(0, 1);
    const rejoined = splitWord.join("");
    // console.log(rejoined);
    return rejoined;
  }
};

const formatSU = (input: string) => {
  const regex = /^SU-/;

  if (input.match(regex)) {
    const splitInput = input.split("");
    splitInput[1] = "u";
    const rejoined = splitInput.join("");
    return rejoined;
  }

  return input;
};

export function newStackedElims(input: string) {
  const eliminatedString: string = formatSU(
    eliminateK(
      eliminateCross(
        eliminateP(eliminateO(eliminateSigns(fixImisreads(input))))
      )
    )
  );

  return corrections[eliminatedString] || eliminatedString;
}
