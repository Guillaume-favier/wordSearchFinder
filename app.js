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
console.table(bigArr)


// get the word of the user 

let word = prompt("Word: ").toUpperCase()
var start = new Date()
// a func who get the value of a 2 dimentional array via coord in a list

const getOfCoo = (coo, a) => { 
    let res = false
    try {res = a[coo[0]][coo[1]]}
    catch (error) {let blabla = error}
    return res
}

// a function who move from case to case via an oriantation code

const orient = (n, a) => {
    switch (n) {
        case 0:
            return [a[0],a[1]+1]
        case 1:
            return [a[0]+1,a[1]+1]
        case 2:
            return [a[0]+1,a[1]]
        case 3:
            return [a[0]+1,a[1]-1]
        case 4:
            return [a[0],a[1]-1]
        case 5:
            return [a[0]-1,a[1]-1]
        case 6:
            return [a[0]-1,a[1]]
        case 7:
            return [a[0]-1,a[1]+1]
    }
}
const getArrow = (n, a) => {
    switch (n) {
        case 0:
            return "→"
        case 1:
            return "↘"
        case 2:
            return "↓"
        case 3:
            return "↙"
        case 4:
            return "←"
        case 5:
            return "↖"
        case 6:
            return "↑"
        case 7:
            return "↗"
    }
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
for(i=0; i < bigArr.length ; i++){
    let ta1 = bigArr[i]
    for (let j = 0; j < ta1.length; j++) {
        const element = ta1[j];
        if (word[0] === element[0]){
            for(let l=0; l < 8; l++){
                let ele = orient(l, [i, j])
                let t = getOfCoo(ele,bigArr) 
                if (t !=false && t === word[1]) {
                    if (suite(i,j,l,word)){
                        console.log("line: "+i+"   column: "+j+"    dirrection: "+getArrow(l))
                        ok = true
                    }
                }
            }
        }
    }
}
if (!ok) console.log("There are no word matching with your input !")
console.info('execution time : '+((new Date() - start)/1000)+" s")