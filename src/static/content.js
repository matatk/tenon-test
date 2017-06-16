'use strict'

// Listen for messages
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// If the received message has the expected format...
	if (request.text === 'get-dom') {
		// Call the specified callback, passing
		// the web-page's DOM content as argument
		sendResponse({
			domContent: document.all[0].outerHTML,
			title: document.title,
			tabId: request.tabId,  // this can't be gleaned from sender above
			apiKey: request.apiKey
		})
	}
})
