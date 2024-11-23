# Air RB Parser READ ME

A brief overview of the problem before describing the application.

- In the MMO game "War Thunder", in the "Air Realistic Battle" mode you are matched with other players based on the rating of your plane. The ratings start at 1.0 and go all the way up to 13.0. The matchmaker can place you against planes around your own plane's rating, up to +-1.0 of your plane's rating.

- This means that you can be potentially facing higher or lower tier planes, making it possible to have a tougher or easier match.

- The only way to tell if you are in an "uptier" or a "downtier" scenario is to deduce it from your own team's lineup, as you are unable to see what the opposite team is fielding.

- As there are over 1160+ vehicles and vehicle variants in the game, it is rather difficult to know them all.

- The purpose of this application is to read a screenshot of your team's lineup, and directly tell the user what kind of game they are in by revealing the rating of each vehicle and thus showing whether it is a "downtier" or an "uptier".

## Table of Contents

- [How it works](#how-it-works)
- [Installation](#installation)

## How it works

### Parsing stage - ./parsers/vehicle_names.ts

First order of business was to create a list of all planes and their specific ratings.
I originally thought to go through game files and find these values directly, however, I was not able to get everything I needed.
Fortunately, the player-ran War Thunder Wiki is an excellent up to date resource.

In order to get a list of each plane names, the following url needed to be accessed and parsed for each country
`https://wiki.warthunder.com/Category:${CATEGORY_NAME}`

Here is an example of what the page looks like for `USA_aircraft`.
There are 10 nations in War Thunder, so this had to be done for each.

![Nation screenshot](readme_screenshots/readme-parser-nation-vehs.png)

In order to parse the data, I used Cheerio https://cheerio.js.org/.

The reason for this choice was that it is a powerful yet relatively simple to use library for static HTML content parsing. And, as the content being loaded and parsed is static it was the perfect choice.

After each plane name was selected and read (this was done using HTML selectors such as `#mw-pages > div > div > div:nth-child(${x}) > ul > li:nth-child(${y}) > a`), the names needed to be formatted so that the next part of the parse can begin.

As some plane names have spaces in them, they needed to be formatted. This was reqired as the name obtained from the list of plane names is directly used in the URL to get specific plane data. Hence it needed to be formatted to match the format style of the URL string.

Example:

- Name obtained from original parse: `A-10A Late`;
- Name required for URL `A-10A_Late`
- Example URL we need to parse: `https://wiki.warthunder.com/A-10A_Late`

![Vehicle screenshot](readme_screenshots/readme-parser-vehicle-pic.png)

This is the page that loads for a specific vehicle. The ONLY item the parser cares about here is the Battle Rating table and specifically the "RB" value highlighted in red.

Once again, selecting this value was achieved by using Cheerio's HTML selectors (`$(
      "#mw-content-text > div.mw-parser-output > div.specs_card_main > div.specs_card_main_info > div.general_info_2 > div.general_info_br > table > tbody > tr:nth-child(2) > td:nth-child(2)"
    ).html();`);

Now that we had the name and rating, the two items we cared about the most, the data was stored as an array of objects initially in the format of:

```js
const airplane = {
  name: airplaneName,
  rating: airplaneRating,
};
```

We now have the plane names and ratings. However we aren't done processing the data.

- Data needs to be cleaned
  - Near-duplicates need to be fixed - example: `F-86K (France)` and `F-86K (Italy)` are the same plane for the purpose of our application, as their Battle Rating is the same.
  - Names need to be cleaned - i.e unnescessary brackets removed `F-14A IRIAF (USA)` - there is only one `F-14A IRIAF` in the game, the `(USA)` is redundant
  - Parsing errors causing quotations to appear in name i.e `"A10 "Late""` need to be removed.
- Data needs to be stored
  - It is not a good idea to run the parsing scripts every time a page is loaded. They can take a couple of minutes to finish and this would slow down the performance of the application considerably.
  - One option is to store them in a database
  - Another option is a CSV file
