// Listen for messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	// If the received message has the expected format...
	if (request.text === 'get_dom') {
		// Call the specified callback, passing
		// the web-page's DOM content as argument
		sendResponse({
			domContent: document.all[0].outerHTML,
			title: document.title,
			tab_id: request.tab_id,  // this can't be gleaned from sender above
			api_key: request.api_key
		});
	}
});
