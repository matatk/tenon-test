// This gets the DOM (and other stuff) from the tab/content script
// http://stackoverflow.com/questions/19758028/chrome-extension-get-dom-content
function testWithTenon(contentResponse) {
	/* contentResponse is an object with the following fields:
	 *		.domContent -- the string that is the serialised DOM
	 *		.title -- the document.title of the web content
	 *		.tab_id -- the integer id of the tab where the action was actioned
	 *		.api_key -- the user's Tenon API key
	 */
	// Create the POST request (as if it had been a form)
	// http://stackoverflow.com/a/15312976
	var data = new FormData();
	data.append('key', contentResponse.api_key);
	data.append('src', contentResponse.domContent);
	data.append('store', '1');

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://tenon.io/api/', true);
	xhr.onload = function() {
		var responseJSON = JSON.parse(this.responseText);
		if (responseJSON.status != '200' ) {
			console.log("Tenon API response:", responseJSON);
			alert("Tenon error: " + responseJSON.message +
					"\nMore info:\n\n" + responseJSON.moreInfo +
					"\n\nThe Tenon API response is available in the " +
					"chrome://extensions/ debug console.");
		} else {
			chrome.tabs.create({
				"url": 'http://tenon.io/history.php?responseID=' +
					responseJSON.request.responseID});
		}

		// Re-enable the browser action button
		chrome.browserAction.enable(contentResponse.tab_id);
		chrome.browserAction.setBadgeText(
				{text: '', tabId: contentResponse.tab_id});
	};
	xhr.send(data);
}

// When the browser-action button is clicked
chrome.browserAction.onClicked.addListener(function(tab) {
	// This needs access to the user's API key
	chrome.storage.sync.get({
		api_key: ''
	}, function(items) {
		// Check an API key was specified
		var api_key = items.api_key;
		if (!api_key) {
			alert("Please specify your Tenon API key.\n\n" +
					"You can do so using the extension's options dialog.\n\n" +
					"You can find your API key at:\n" +
					"https://tenon.io/apikey.php");
			return;
		}

		// Disable the browser action
		chrome.browserAction.disable(tab.id);
		chrome.browserAction.setBadgeText({
			text: 'Busy',
			tabId: tab.id
		});

		// The examples use tab.id for this, but I'm not sure why becuse tab.id
		// appears on this end as a string, and on the other end of the
		// sendMessage() call it seems to be an object containing an 'id' key.
		chrome.tabs.sendMessage(
				tab.id,
				{
					text: 'get_dom',
					tab_id: tab.id,
					api_key: api_key
				},
				testWithTenon);
	});
});
