'use strict';

(function () {
    const chromeDownloadsUrl = 'chrome://downloads/'

    chrome.browserAction.onClicked.addListener(async function (sourceTab) {
        console.log('clicked')
        let windowId = sourceTab.windowId
        let existingDownloadsTab = await getExistingDownloadsTabInWindow(windowId)
        if (existingDownloadsTab) {
            focusTab(existingDownloadsTab)
        } else {
            openNewDownloadsTab(windowId)
        }
    })

    function getExistingDownloadsTabInWindow(windowId, cb) {
        return new Promise((resolve, reject) => {
            chrome.tabs.query
                (
                    {
                        windowId: windowId
                        , url: chromeDownloadsUrl
                    }
                    , function (tabs) {
                        if (tabs && tabs.length >= 1) {
                            return resolve(tabs[0])
                        } else {
                            return resolve(null)
                        }
                    }
                )
        })
    }

    function focusTab(tab) {
        return new Promise((resolve, reject) => {
            chrome.tabs.update
                (
                    tab.id
                    , {
                        active: true
                    }
                    , function (tab) {
                        return resolve(tab)
                    }
                )
        })
    }

    function openNewDownloadsTab(windowId) {
        return new Promise((resolve, reject) => {
            chrome.tabs.create
                (
                    {
                        windowId: windowId
                        , url: chromeDownloadsUrl
                    }
                    , function (tab) {
                        return resolve(tab)
                    }
                )
        })
    }
})()