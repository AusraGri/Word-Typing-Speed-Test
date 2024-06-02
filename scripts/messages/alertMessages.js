export const alertMessage = {
  alertElement: null,
  init: function (alertElement) {
    this.alertElement = alertElement
  },
  display: function (message) {
    if (message) {
      this.alertElement.innerText = message
    }
  },
  clear: function () {
    this.alertElement.innerText = ""
  },
}
