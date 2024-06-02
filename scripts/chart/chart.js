 //display user progress data in a chart, using ChartJS

export default function displayProgress(data, dataElement){
    let slicedData;
    if (data.length > 20){
      slicedData = data.slice(data.length - 10)
    }else{
      slicedData = data
    }
    let number = 0
    const dates = []
    const wpm = []
    const accuracy = []
    if (data){
    slicedData.forEach((object)=>{
        dates.push(number + 1)
        number ++
        wpm.push(object.wpm)
        accuracy.push(object.accuracy)
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
          borderColor: "#1865EF",
          backgroundColor: "#18E4EF",
          fill: false
        },
        {
          data: accuracy,
          label: "ACCURACY",
          borderColor: "#18EF3A",
          backgroundColor: "#94F780",
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