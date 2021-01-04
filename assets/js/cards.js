var a;
function show_hide() {
    if(a==1)
    {
        document.getElementById("fakeDivButtonContent").style.display="inline";
        return a=0;
    }else{
        document.getElementById("fakeDivButtonContent").style.display="none";
        return a=1;
    }

}


/* $(document).ready(function)() {
    $(".readNow").click(function(){
        $(this).prev().toggle();
        $(this).siblings(".dots").toggle();
        if($(this).text()=="read more"){
            $(this).text("read less");
        }else {
            $(this).text("read more");
        }

    });
}; */

$(document).ready(function(){
$(".readNow").click(function(){
       
        $(this).siblings(".dots").toggle();
        if($(this).text()=="read more"){
            $(this).text("read less");
        }
        else {
            $(this).text("read more");
        }

    });
})