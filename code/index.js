(() => {

    window.addEventListener("load", init);

    function init() {
        document.body.style.display = "flex";
        document.body.style.flexDirection = "column";

        renderSchedule({
            startTime: "08:00",
            endTime: "21:00",
            increment: 30,
            events: []
        });
    }

    function createTimeBlock() {

    }

    function createEvent() {

    }

    function renderSchedule(schedule) {
        
    }

    function convertTimeToPercs(time, startTime, endTime) {
        const startHours = parseInt(startTime.split(":")[0]);
        const endHours = parseInt(endTime.split(":")[0]);
        const timeHours = parseInt(time.split(":")[0]);
        const startMins = parseInt(startTime.split(":")[1]) + startHours * 60;
        const endMins = parseInt(endTime.split(":")[1]) + endHours * 60;
        const timeMins = parseInt(time.split(":")[1]) + timeHours * 60;

        return (timeMins - startMins) / (endMins - startMins) * 100;
    }

})();

