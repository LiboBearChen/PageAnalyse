//context menu
var contextMenuItem = {
    "id": "saveWord",
    "title": "SaveWord",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

//show badge at the beginning
chrome.storage.sync.get(['words'], function (storage) {
    refreshBadge(storage.words.length);
});

//refresh the  badge
function refreshBadge(number){
    chrome.browserAction.setBadgeText({ "text": number.toString() });
}

//listen to context menu click
chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "saveWord" && clickData.selectionText) {
        chrome.storage.sync.get(['words'], function (storage) {
            var newWords = [];
            if (storage.words) {
                newWords=storage.words;
            }

            //avoid duplicate words
            var saved=false;
            for(i in newWords){
                if(newWords[i]===clickData.selectionText){
                    saved=true;
                }
            }
            if(!saved){
                newWords.push(clickData.selectionText);
                chrome.storage.sync.set({ 'words': newWords }, function () {});
            }
        });
    }
});

chrome.storage.onChanged.addListener(function (changes) {
    refreshBadge(changes.words.newValue.length);
});


