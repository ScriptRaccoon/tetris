export function addInfo() {
    $("#infoButton").text("Show Keys");
    $("#infoButton").click(() => {
        $("#keyInfos").toggle();
        const text = $("#infoButton").text();
        $("#infoButton").text(text == "Show Keys" ? "Hide Keys" : "Show Keys");
        let opacity = parseInt($("main").css("opacity"));
        $("main").css("opacity", 1.2 - opacity);
    });
}
