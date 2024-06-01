export function displayProgress(data, dataElement){
    //display user progress in  a chart
    const dates = []
    const wpm = []
    const accuracy = []
    if (data){
    data.forEach((object)=>{
        dates.push(object.date)
        wpm.push(object.wpm)
        accuracy.push(object.accuracy)
    console.log(dates, wpm, accuracy)
})
    }else{
        return
    }
new Chart(dataElement, {
    type: "line",
    data: {
      labels: dates,
      datasets: [
        {
          data: wpm,
          label: "WPM",
          borderColor: "#3e95cd",
          fill: false
        },
        {
          data: accuracy,
          label: "ACCURACY",
          borderColor: "#8e5ea2",
          fill: false
        },
      ]
    },
    options: {
      title: {
        display: true,
        text: "Typing Progress"
      }
    }
  });

}

let data = [
    { wpm: 20, accuracy: 0, date: '2024-4-31 10h 13min 16s' },
    { wpm:35, accuracy: 77, date: '2024-4-31 10h 13min 16s' },
    { wpm: 0, accuracy: 96, date: '2024-4-31 10h 13min 16s' },
    { wpm: 100, accuracy: 67, date: '2024-4-31 10h 13min 16s' },
    { wpm: 60, accuracy: 50, date: '2024-4-31 10h 13min 16s' },
    { wpm: 15, accuracy: 1, date: '2024-4-31 10h 13min 16s' },
    { wpm: 107, accuracy: 100, date: '2024-4-31 10h 13min 16s' },
]


//accuracy can be from 0 to 100
// wpm can be from 1 to 200