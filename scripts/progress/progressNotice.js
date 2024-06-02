import Progress from "./progress.js";

export default function noticeProgress (results){
    const bestValues = getBestTestValues()
    const result = new Progress(results.correct, results.total);
    if (result.wpm > bestValues.maxWpm && result.accuracy > bestValues.maxAccuracy){
        return `New typing speed and accurasy record!
        Improved WPM from ${bestValues.maxWpm} to ${result.wpm}!
        Improved Accuracy from ${bestValues.maxAccuracy}% to ${result.accuracy}%!
        `
    } else if (result.wpm > bestValues.maxWpm){
         return `New typing speed record!
        Improved WPM from ${bestValues.maxWpm} to ${result.wpm}!
        `
    }else if (result.accuracy > bestValues.maxAccuracy){
        return `New accurasy record!
        Improved Accuracy from ${bestValues.maxAccuracy}% to ${result.accuracy}%!
        `
    }else{
        return `Your typing speed is ${result.wpm} WPM!
        Your accuracy is ${result.accuracy}%!
        `
    }
}

function getBestTestValues (){
let allData = JSON.parse(localStorage.getItem('userProgress'))
if (allData){
const maxWpm = allData.reduce((max, obj) => max.wpm > obj.wpm ? max : obj).wpm;
const maxAccuracy = allData.reduce((max, obj) => max.accuracy > obj.accuracy ? max : obj).accuracy;
return {maxWpm, maxAccuracy}
}else{
    return {maxWpm:0, maxAccuracy:0}
}
}
