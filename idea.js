const stuff = [
  { NAME: "MiG-21bis", RATING: 11.0 },
  { NAME: "MiG-21F-13", RATING: 9.3 },
  { NAME: "MiG-21PFM", RATING: 9.3 },
  { NAME: "MiG-21S", RATING: 9.7 },
  { NAME: "MiG-21SMT", RATING: 9.7 },
  { NAME: "MiG-21bis-SAU (Italy)", RATING: 11.0 },
];

function testFilter() {
  const filtered = stuff.filter((item) => item.NAME.includes("MiG-21S"));

  console.log(filtered);
}

testFilter();
