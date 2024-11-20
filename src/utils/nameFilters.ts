const eliminateSigns = (input: string) => {
  const regex: RegExp = /^[^a-zA-Z]$/;
  const splitWord = input.split("");

  if (regex.test(splitWord[0])) {
    if (regex.test(splitWord[1])) {
      splitWord.splice(0, 2);
      const rejoined = splitWord.join("");
      console.log(rejoined);
      return rejoined;
    }

    splitWord.splice(0, 1);
    const rejoined = splitWord.join("");
    console.log(rejoined);
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
    console.log(rejoined);
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
    console.log(rejoined);
    return rejoined;
  } else {
    return input;
  }
};

const convertPossibleWrongName = (input: string) => {
  const possibleWords: string[] = ["GI1R/4", "GI1", "GI91R/3", "GI1R/4"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "G.91 R/4";
    }
  }

  return input;
};

const convertPossibleBracketError = (input: string) => {
  const possibleWords: string[] = ["B-25)-1"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "B-25J-1";
    }
  }

  return input;
};

const convertPossibleSwiss = (input: string) => {
  const possibleWords: string[] = ["QHunter", "Hunter £58"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Hunter F.58";
    }
  }

  return input;
};

const eliminateCross = (input: string) => {
  const splitWord = input.split("");

  if (splitWord[0] != "F") {
    return input;
  } else if (splitWord[1] === "E") {
    splitWord.splice(0, 2);
    const rejoined = splitWord.join("");
    console.log(rejoined);
    return rejoined;
  } else {
    return input;
  }
};

const fixMirageError = (input: string) => {
  const possibleWords: string[] = ["Mirage IlIC"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Mirage IIIC";
    }
  }

  return input;
};

const fixYSerror = (input: string) => {
  const possibleWords: string[] = ["GI91YS"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "G.91 YS";
    }
  }

  return input;
};

const fixSuError = (input: string) => {
  const possibleWords: string[] = ["Su-2 Mv-5"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Su-2 MV-5";
    }
  }

  return input;
};

const fixMigError = (input: string) => {
  const possibleWords: string[] = [`MIG-21 "Lazur-M"`, `MiG-21 "Lazur-M"`];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "MiG-21 Lazur-M";
    }
  }

  return input;
};

const eliminateK = (input: string) => {
  const splitWord = input.split("");

  if (splitWord[0] != "k") {
    return input;
  } else {
    splitWord.splice(0, 1);
    const rejoined = splitWord.join("");
    console.log(rejoined);
    return rejoined;
  }
};

const eliminateHarrierError = (input: string) => {
  const possibleWords: string[] = [
    "Sea Harrier FRS.L",
    "Sea Harrier FRS.I",
    "Sea Harrier FRS.l",
  ];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Sea Harrier FRS.1";
    }
  }

  return input;
};

function stackedElims(input: string) {
  return eliminateHarrierError(
    eliminateK(
      fixMigError(
        fixSuError(
          fixYSerror(
            fixMirageError(
              eliminateCross(
                convertPossibleSwiss(
                  convertPossibleBracketError(
                    convertPossibleWrongName(
                      eliminateSigns(eliminateO(eliminateP(input)))
                    )
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}

export { eliminateO, eliminateSigns, eliminateP, stackedElims };
