export default function displayProgress(data, dataElement){
    //display user progress data in a chart
    const dates = []
    const wpm = []
    const accuracy = []
    if (data){
    data.forEach((object)=>{
        dates.push(object.date)
        wpm.push(object.wpm)
        accuracy.push(object.accuracy)
})
    }else{
        return
    }
new Chart(dataElement, {
    type: "line",
    data: {
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