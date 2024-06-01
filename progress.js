//we have values

//on each try:
//calculate progress
//saves progress
//load progress
//display progress

export class Progress {
    constructor(correct, total, seconds=60) {
        this.wpm = this.#calculateWpm(correct, seconds);
        this.accuracy = this.#accuracy(correct, total);
        this.date = Progress.dateNow();
    }

    #accuracy(correct, total){
        return Math.round((correct / total) * 100)
      }

    #calculateWpm(correct, seconds) {
        try {
            let minutes = seconds / 60;
            const wpm = (correct / 5) / minutes;
            if (wpm < 0) {
                throw new Error(`WPM can't be negative: ${wpm}`);
            } else {
                return Math.round(wpm);
            }
        } catch (err) {
            console.log(`ERROR: ${err}`);
            return 0;
        }
    }
    static dateNow (){
        const d = new Date()
        const date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        return date
      }
    get save(){
        return this.#saveToLocalStorage();
    }
    get load(){
        return this.#loadProgress();
    }
    get clear(){
        return this.#clearAllStorage();
    }
    #saveToLocalStorage() {
        const progressData = {
            wpm: this.wpm,
            accuracy: this.accuracy,
            date: this.date
        };
    let existingProgress = localStorage.getItem('userProgress');
    let progressArray = [];
    if (existingProgress) {
        progressArray = JSON.parse(existingProgress);
    }
    progressArray.push(progressData);
    localStorage.setItem('userProgress', JSON.stringify(progressArray));
    }
    #loadProgress(){
        //load user progress
        const userProgressData = JSON.parse(localStorage.getItem('userProgress')) || [];
        return userProgressData
      }
    #clearAllStorage() {
    if (typeof localStorage !== 'undefined' && typeof localStorage.clear === 'function') {
        localStorage.clear();
        console.log('All local storage data has been cleared.');
    } else {
        console.error('localStorage.clear is not a function or localStorage is not available.');
    }
    }

}

