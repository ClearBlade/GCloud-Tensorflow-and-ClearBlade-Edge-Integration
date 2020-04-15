var buttonGroupClick = function(event){
    $(event.target.parentElement).attr("selection",event.target.value);
    $(event.target.parentElement).children().removeClass("btn-outline-primary");
    $(event.target.parentElement).children().addClass("btn-secondary")
    $(event.target).removeClass("btn-secondary")
    $(event.target).addClass("btn-outline-primary")
    CB_PORTAL.selectPage(event.target.value);
    datasources.clicked.sendData({"status":1});
}

$(".headerNavButton").click(function(event){
    buttonGroupClick(event)
});

