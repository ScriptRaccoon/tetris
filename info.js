let keysVisible = false;

export function addInfo() {
    $("#infoButton").text("Show Keys >");
    $("#infoButton").click(() => {
        $("#keyInfos").toggle();
        if (keysVisible) {
            $("#infoButton").text("Show keys >");
            keysVisible = false;
            $("#game").css("opacity", 1);
        } else {
            $("#infoButton").text("Hide keys <");
            $("#game").css("opacity", 0.5);
            keysVisible = true;
        }
    });
}
