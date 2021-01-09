
/* document.addEventListener("DOMContentLoaded", () => {
    const expandsMore = document.querySelectorAll("[expand-more]");

    function expand() {
        const showContent = document.getElementById(this.dataset.target);
        if (showContent.classList.contains("expand-active")) {
            this.innerHTML = this.dataset.showtext;
        } else {
            this.innerHTML = this.dataset.hidetext;
        }
        showContent.classList.toggle("expand-active");
    }
   

    expandsMore.forEach((expandsMore) => {
        expandsMore.addEventListener("click", expand);
    });
}) */







function myFunction() {
  var x = document.getElementById("showMoreContent1");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
 
}







/* var a;
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
 */

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




/* $(document).ready(function(){
$(".readNow").click(function(){
        
        $(this).siblings(".dots").toggle();
        if($(this).text()=="read more"){
            $(this).text("read less");
        }
        else {
            $(this).text("read more");
        }

    });
}); */