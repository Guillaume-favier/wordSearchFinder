var fs = require('fs');
var filePtr = {}
var fileBuffer = {}
var buffer = new Buffer.alloc(4096)
var chalk = require('chalk');

exports.fopen = function(path, mode) {
    var handle = fs.openSync(path, mode)
    filePtr[handle] = 0
    fileBuffer[handle]= []
    return handle
}

exports.fclose = function(handle) {
    fs.closeSync(handle)
    if (handle in filePtr) {
        delete filePtr[handle]
        delete fileBuffer[handle]
    } 
    return
}

exports.fgets = function(handle) { 
    if(fileBuffer[handle].length == 0)
    {
        var pos = filePtr[handle]
        var br = fs.readSync(handle, buffer, 0, 4096, pos)
        if(br < 4096) {
            delete filePtr[handle]
            if(br == 0)  return false
        }
        var lst = buffer.slice(0, br).toString().split("\n")
        var minus = 0
        if(lst.length > 1) {
            var x = lst.pop()
            minus = x.length
        } 
        fileBuffer[handle] = lst 
        filePtr[handle] = pos + br - minus
    }
    return fileBuffer[handle].shift()
}

exports.eof = function(handle) {
    return (handle in filePtr) == false && (fileBuffer[handle].length == 0) 
}
exports.drawTable = (arr, poss=[]) => {
    process.stdout.write("┌─────");
    for (let i = 0; i < arr[0].length; i++) {
            process.stdout.write("┬─────")
    }
    process.stdout.write("┐\n")
    process.stdout.write("│     │");
    for (let i = 0; i < arr[0].length; i++) {
            if (i < 10){
                    process.stdout.write("  "+i+"  │")
            }else{
                    process.stdout.write(" "+i+"  │")
            }
    }
    process.stdout.write("\n├─────");
    for (let i = 0; i < arr[0].length; i++) {
            process.stdout.write("┼─────")
    }
    process.stdout.write("┤\n")
    for (let i = 0; i < arr.length; i++) {
            
            
            const element = arr[i];
            let maybe = false
            let possNow = []
            for (let k = 0; k < poss.length; k++) {
                    if (poss[k][0] ===i){
                            maybe=true
                            possNow.push(poss[k][1])
                    }
            }
            const testfornow = (j)=> { for (let raf = 0; raf < possNow.length; raf++) return possNow[raf] === j }
            if (i<10){
                    process.stdout.write("│  "+i+"  │");
            }else{
                    process.stdout.write("│ "+i+"  │");
            }
            for (let j = 0; j < element.length; j++) {
                    const elj = element[j];
                    if (testfornow(j)){
                            process.stdout.write("  "+chalk.yellow(elj)+"  │")
                    }else{
                            process.stdout.write("  "+elj+"  │")
                    }
            }
            process.stdout.write("\n")
    }
    process.stdout.write("└─────");
    for (let i = 0; i < arr[0].length; i++) {
            process.stdout.write("┴─────")
    }
    process.stdout.write("┘\n")
}