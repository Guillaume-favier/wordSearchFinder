# wordSearchFinder

wordSearchFinder is an nodejs project to find word in a wordSearch grid

## Usage

Edit the `scheme.txt` file and put your crossword grid like in the exemple.
Launch the program with `npm test` or `node app.js` and enter your word.
It will tell you the coordinate of the first letter of you word on the grid and the dirrection for the other letter.

## Instalation

You first need to get [nodejs](https://nodejs.org/en/) and then clone the repo and enter this commands :
```sh
npm i
```

## Exemple

```
┌─────────┬─────┬─────┬─────┬─────┬─────┐
│ (index) │  0  │  1  │  2  │  3  │  4  │
├─────────┼─────┼─────┼─────┼─────┼─────┤
│    0    │ 'J' │ 'D' │ 'O' │ 'L' │ 'L' │
│    1    │ 'B' │ 'E' │ 'A' │ 'R' │ 'K' │
│    2    │ 'M' │ 'N' │ 'P' │ 'Q' │ 'S' │
│    3    │ 'H' │ 'G' │ 'I' │ 'F' │ 'T' │
│    4    │ 'B' │ 'A' │ 'L' │ 'L' │ 'C' │
└─────────┴─────┴─────┴─────┴─────┴─────┘
Word: ball
line: 4   column: 0    dirrection: →
```