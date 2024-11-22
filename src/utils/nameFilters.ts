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

const fixImisreads = (input: string) => {
  const splitWord = input.split("");

  if (splitWord[0] === "1" && splitWord[1] === "-") {
    splitWord[0] = "I";
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
  const possibleWords: string[] = [
    "GI1R/4",
    "GI1",
    "GI91R/3",
    "GI1R/4",
    "GI1 R/4",
  ];

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
  const possibleWords: string[] = [
    "QHunter",
    "Hunter £58",
    "QHunter £58",
    "Hunter F58",
  ];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Hunter F.58";
    }
  }

  return input;
};

const covertAlphaJetOneWord = (input: string) => {
  if (input === "AlphaJetA") {
    return "Alpha Jet A";
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
    console.log(rejoined);
    return rejoined;
  } else {
    return input;
  }
};

const fixMirageError = (input: string) => {
  const possibleWords: string[] = [
    "Mirage IlIC",
    "Mirage IIC",
    "Mirage IlC",
    "Mirage lIC",
  ];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Mirage IIIC";
    }
  }

  return input;
};

const fixNewMirageErrors = (input: string) => {
  const possibleWords: string[] = [
    "Mirage IlIE",
    "Mirage IIE",
    "Mirage IlE",
    "Mirage lIE",
  ];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Mirage IIIE";
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

const eliminateTornadoError = (input: string) => {
  const possibleWords: string[] = [
    "Tornado IDSWTD61",
    "tTornado IDS WTD61",
    "tTornado IDSWTD61",
  ];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Tornado IDS WTD61";
    }
  }

  return input;
};

const eliminateFFourError = (input: string) => {
  const possibleWords: string[] = ["F-4E) ADTW"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "F-4EJ ADTW";
    }
  }

  return input;
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

const filterAJ = (input: string) => {
  const possibleWords: string[] = ["A37", "N37", "A337"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "AJ37";
    }
  }

  return input;
};

const filterAJS = (input: string) => {
  const possibleWords: string[] = ["NJS37", "AS337"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "AJS37";
    }
  }

  return input;
};

const filterCrossF4F = (input: string) => {
  const possibleWords: string[] = ["JEF-4F"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "F-4F";
    }
  }

  return input;
};
("MiG-9 (1)");

const migFilter = (input: string) => {
  const possibleWords: string[] = [
    "MiG-9 (1)",
    "MiG-9 (j)",
    "MiG-9 (J)",
    "MiG-9 ())",
  ];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "MiG-9 (l)";
    }
  }

  return input;
};

const hornetFilter = (input: string) => {
  const possibleWords: string[] = ["Hornet Mk.II"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Hornet Mk.III";
    }
  }

  return input;
};

const removeStartSpace = (input: string) => {
  const regex = /^\s/;

  if (input.match(regex)) {
    const splitWord = input.split("");
    splitWord.splice(0, 1);
    const rejoined = splitWord.join("");
    console.log(rejoined);
    return rejoined;
  } else {
    return input;
  }
};

const limFix = (input: string) => {
  const possibleWords: string[] = ["Lim-5p"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Lim-5P";
    }
  }

  return input;
};

const migTwoOneFix = (input: string) => {
  const possibleWords: string[] = ["MiG-215 (R-13-300)"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "MiG-21S (R-13-300)";
    }
  }

  return input;
};

const clOneThreeFix = (input: string) => {
  const possibleWords: string[] = ["CL-13B MK6", "CL-13B Mk6"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "CL-13B Mk.6";
    }
  }

  return input;
};

function stackedElims(input: string) {
  return covertAlphaJetOneWord(
    removeStartSpace(
      hornetFilter(
        migFilter(
          filterCrossF4F(
            migTwoOneFix(
              limFix(
                clOneThreeFix(
                  filterAJS(
                    filterAJ(
                      formatSU(
                        eliminateFFourError(
                          eliminateTornadoError(
                            fixNewMirageErrors(
                              eliminateHarrierError(
                                eliminateK(
                                  fixMigError(
                                    fixSuError(
                                      fixYSerror(
                                        fixMirageError(
                                          eliminateCross(
                                            convertPossibleSwiss(
                                              convertPossibleBracketError(
                                                convertPossibleWrongName(
                                                  eliminateSigns(
                                                    eliminateO(
                                                      eliminateP(
                                                        fixImisreads(input)
                                                      )
                                                    )
                                                  )
                                                )
                                              )
                                            )
                                          )
                                        )
                                      )
                                    )
                                  )
                                )
                              )
                            )
                          )
                        )
                      )
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
