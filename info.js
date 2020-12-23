let keysVisible = false;

export function addInfo() {
    $("#infoButton").text("Show Keys >");
    $("#infoButton").click(() => {
        $("#keyInfos").toggle();
        if (keysVisible) {
            $("#infoButton").text("Show keys >");
            keysVisible = false;
        } else {
            $("#infoButton").text("Hide keys <");
            keysVisible = true;
        }
    });
}
