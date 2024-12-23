const eliminateSigns = (input: string) => {
  const regex: RegExp = /^[^a-zA-Z]$/;
  const splitWord = input.split("");

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

const convertPossibleWrongName = (input: string) => {
  const possibleWords: string[] = [
    "GI1R/4",
    "GI1",
    "GI91R/3",
    "GI1R/4",
    "GI1 R/4",
    "G91 R/4",
    "3£G.91R/4",
    "3£G.91 R/4",
    "GI91R/4",
    "91 R/4",
    "G91R/4",
  ];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "G.91 R/4";
    }
  }

  return input;
};

const converGYnameFix = (input: string) => {
  const possibleWords: string[] = ["G91 YS"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "G.91 YS";
    }
  }

  return input;
};

const converGnameFix = (input: string) => {
  const possibleWords: string[] = ["G91R/3"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "G.91 R/3";
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
    // console.log(rejoined);
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
    // console.log(rejoined);
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
    // console.log(rejoined);
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

const j34fix = (input: string) => {
  const possibleWords: string[] = ["134", "l34", ")34"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "J34";
    }
  }

  return input;
};

const f84fix = (input: string) => {
  const possibleWords: string[] = ["F-848-26"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "F-84B-26";
    }
  }

  return input;
};

const jaboFix = (input: string) => {
  const possibleWords: string[] = ["Me 262 A-1a/jabo"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Me 262 A-1a/Jabo";
    }
  }

  return input;
};

const ilFix = (input: string) => {
  const possibleWords: string[] = ["¢IL-28", "1-28"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "IL-28";
    }
  }

  return input;
};

const bMigMLAFix = (input: string) => {
  const possibleWords: string[] = ["BMIG-23MLA"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "MIG-23MLA";
    }
  }

  return input;
};

const f89bfix = (input: string) => {
  const possibleWords: string[] = ["F-898"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "F-89B";
    }
  }

  return input;
};

const il28sh = (input: string) => {
  const possibleWords: string[] = ["1L-285h"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "IL-28Sh";
    }
  }

  return input;
};

const saabFix = (input: string) => {
  const possibleWords: string[] = ["SAAB-1050E", "SAAB-1050F"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "SAAB-1050G";
    }
  }

  return input;
};

const j35bFix = (input: string) => {
  const possibleWords: string[] = ["J328"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "J32B";
    }
  }

  return input;
};

const mirageFix = (input: string) => {
  const possibleWords: string[] = ["Mirage 2000C-54"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Mirage 2000C-S4";
    }
  }

  return input;
};

const saabFixNew = (input: string) => {
  const possibleWords: string[] = ["SAAB-1050E"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "SAAB-105OE";
    }
  }

  return input;
};

const fixf9f = (input: string) => {
  const possibleWords: string[] = ["FOF-8"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "F9F-8";
    }
  }

  return input;
};

const seaVixenFix = (input: string) => {
  const possibleWords: string[] = ["Sea Vixen FAW. Mk.2", "Sea Vixen FAW. Mk2"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Sea Vixen F.A.W. Mk.2";
    }
  }

  return input;
};

const fixF86f = (input: string) => {
  const possibleWords: string[] = ["F-86F-40 JASDFAL", "F-86F-40 JASDFALL"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "F-86F-40 JASDF";
    }
  }

  return input;
};

const g91preserieFix = (input: string) => {
  const possibleWords: string[] = ["91 pre-serie"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "G.91 pre-serie";
    }
  }

  return input;
};

const f84FFix = (input: string) => {
  const possibleWords: string[] = ["EF-84F"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "F-84F";
    }
  }

  return input;
};

const mirageIIICFix = (input: string) => {
  const possibleWords: string[] = ["Mirage I1IC"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Mirage IIIC";
    }
  }

  return input;
};

const hunterF6fix = (input: string) => {
  const possibleWords: string[] = ["Hunter £6"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Hunter F.6";
    }
  }

  return input;
};

const rodAdamFix = (input: string) => {
  const possibleWords: string[] = [
    "A32ARGd Adam",
    "A32A Rod Adam",
    "A32ARSd Adam",
  ];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "A32A Röd Adam";
    }
  }

  return input;
};

const iarFix = (input: string) => {
  const possibleWords: string[] = ["IAR-938"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "IAR-93B";
    }
  }

  return input;
};

const canberraFix = (input: string) => {
  const possibleWords: string[] = ["Canberra B Mk"];

  for (let x = 0; x < possibleWords.length; x++) {
    if (input === possibleWords[x]) {
      return "Canberra B Mk 2";
    }
  }

  return input;
};

function stackedElims(input: string) {
  return covertAlphaJetOneWord(
    converGYnameFix(
      f84fix(
        ilFix(
          converGnameFix(
            bMigMLAFix(
              j35bFix(
                g91preserieFix(
                  mirageFix(
                    mirageIIICFix(
                      seaVixenFix(
                        f84fix(
                          iarFix(
                            saabFix(
                              canberraFix(
                                hunterF6fix(
                                  f84FFix(
                                    il28sh(
                                      rodAdamFix(
                                        fixF86f(
                                          fixf9f(
                                            f89bfix(
                                              removeStartSpace(
                                                jaboFix(
                                                  hornetFilter(
                                                    saabFixNew(
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
                                                                                                      j34fix(
                                                                                                        fixImisreads(
                                                                                                          input
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
