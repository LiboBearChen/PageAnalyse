//receive message from eventPage.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.todo == "markWords") {
        var words = request.savedWords;
        $('.api').css('color', addColor);


        //mark words on pages
        var keyword = document.getElementById("keyword").value;
        var display = document.getElementById("fileContent");

        var newcontent = "";

        let spans = document.querySelectorAll('mark');

        for (var i = 0; i < spans.length; i++) {
            spans[i].outerHTML = spans[i].innerHTML;
        }

        var re = new RegExp(keyword, "gi");
        var replaceText = "<mark id='markme'>$&</mark>";
        var bookContent = display.innerHTML;

        newcontent = bookContent.replace(re, replaceText);

        display.innerHTML = newcontent;
        var count = document.querySelectorAll('mark').length;
        document.getElementById("searchstat").innerHTML = "found " + count + " matches";

    }
});