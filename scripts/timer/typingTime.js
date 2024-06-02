export const typingTime = {
    id: null,
    setTimeout: function (seconds, callback) {
        this.id = setTimeout(callback, seconds * 1000);
    },
    clearTimeout: function () {
        clearTimeout(this.id);
        this.id = null;
    }
};