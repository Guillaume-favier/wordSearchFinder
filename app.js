console.clear()
var readline = require("./readline.js")
var prompt = require('prompt-sync')();


// read the file and put the grid in a 2 dimentional array 
let bigArr = []
const source = "scheme.txt"
let f = readline.fopen(source,"r")
if (!f){
    console.error("There are no "+source+" file")
    process.exit(1)
}

let i = 0
do{
    var line=readline.fgets(f)
    if (line!=false){
        let pre = line.split("")
        if (pre[pre.length-1] == "\r"){
            pre = pre.slice(0,-1)
        }
        bigArr[i] = pre
    }
    i++
}while (!readline.eof(f))
readline.fclose(f)
readline.drawTable(bigArr)


// get the word of the user 

let word = prompt("Word: ").toUpperCase()
var start = new Date()
console.clear()
// a func who get the value of a 2 dimentional array via coord in a list

const getOfCoo = (coo, a) => { 
    let res = false
    try {res = a[coo[0]][coo[1]]}
    catch (error) {let blabla = error}
    return res
}

// convert the id of the direction (0 ... 7) into the position.
const orient = (n, a) => {
    const l = [[a[0], a[1] + 1], [a[0] + 1, a[1] + 1], [a[0] + 1, a[1]], [a[0] + 1, a[1] - 1], [a[0], a[1] - 1], [a[0] - 1, a[1] - 1], [a[0] - 1, a[1]], [a[0] - 1, a[1] + 1]]
    return l[n]
}



// get the simbol of acording to the direction number
const getArrow = (n, a) => {
    const arrows = ["→", "↘", "↓", "↙", "←", "↖", "↑", "↗"]
}



const suite = (i,j,l,word) => {
    for (let k = 0; k < word.length; k++) {
        const element = word[k];
        if (element != getOfCoo([i,j],bigArr)){
            return false
        }
        [i,j]=orient(l,[i,j])
    }
    return true
}

let ok = false
for (i = 0; i < bigArr.length; i++) { // test all possible positions 
    let ta1 = bigArr[i]
    for (let j = 0; j < ta1.length; j++) {
        const element = ta1[j];
        if (word[0] === element[0]){ // for each positions test if the letter is the same then the first letter of the world
            for (let l = 0; l < 8; l++) { // then the all possible orientation for the word to continue
                let ele = orient(l, [i, j])
                let t = getOfCoo(ele,bigArr) 
                if (t !=false && t === word[1]) { // test if the second letter match the word
                    if (suite(i,j,l,word)){ // test if all the word match
                        let allCoo = [[i,j]]
                        let ni = i
                        let nj = j
                        for (let k = 0; k < word.length-1; k++) {
                            [ni, nj] = orient(l,[ni,nj])
                            allCoo.push([ni,nj])
                        }
                        readline.drawTable(bigArr, allCoo)
                        console.log("start:\n   line: "+i+"   column: "+j+"    dirrection: "+getArrow(l))
                        console.log("end:\n   line: "+ni+"   column: "+nj)
                        ok = true
                    }
                }
            }
        }
    }
}
if (!ok) console.log("There are no word matching with your input !")

// console.info('execution time : '+((new Date() - start)/1000)+" s")