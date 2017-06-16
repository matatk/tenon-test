'use strict'

// This gets the DOM (and other stuff) from the tab/content script
// http://stackoverflow.com/questions/19758028/chrome-extension-get-dom-content
function testWithTenon(contentResponse) {
	/* contentResponse is an object with the following fields:
	 *		.domContent -- the string that is the serialised DOM
	 *		.title -- the document.title of the web content
	 *		.tabId -- the integer id of the tab where the action was actioned
	 *		.apiKey -- the user's Tenon API key
	 */
	// Create the POST request (as if it had been a form)
	// http://stackoverflow.com/a/15312976
	const data = new FormData()
	data.append('key', contentResponse.apiKey)
	data.append('src', contentResponse.domContent)
	data.append('store', '1')

	const xhr = new XMLHttpRequest()
	xhr.open('POST', 'https://tenon.io/api/', true)
	xhr.onload = function() {
		const responseJSON = JSON.parse(this.responseText)
		if (responseJSON.status !== '200' ) {
			console.log('Tenon API response:', responseJSON)
			alert('Tenon error: ' + responseJSON.message +
				'\nMore info:\n\n' + responseJSON.moreInfo +
				'\n\nThe Tenon API response is available in the ' +
				'chrome://extensions/ debug console.')
		} else {
			browser.tabs.create({
				'url': 'http://tenon.io/history.php?responseID=' +
				responseJSON.request.responseID})
		}

		// Re-enable the browser action button
		browser.browserAction.enable(contentResponse.tabId)
		browser.browserAction.setBadgeText(
			{text: '', tabId: contentResponse.tabId})
	}
	xhr.send(data)
}

// When the browser-action button is clicked
browser.browserAction.onClicked.addListener(function(tab) {
	// This needs access to the user's API key
	browser.storage.sync.get({
		apiKey: ''
	}, function(items) {
		// Check an API key was specified
		const apiKey = items.apiKey
		if (!apiKey) {
			alert('Please specify your Tenon API key.\n\n' +
				"You can do so using the extension's options dialog.\n\n" +
				'You can find your API key at:\n' +
				'https://tenon.io/apikey.php')
			return
		}

		// Disable the browser action
		browser.browserAction.disable(tab.id)
		browser.browserAction.setBadgeText({
			text: 'Busy',
			tabId: tab.id
		})

		// The examples use tab.id for this, but I'm not sure why becuse tab.id
		// appears on this end as a string, and on the other end of the
		// sendMessage() call it seems to be an object containing an 'id' key.
		browser.tabs.sendMessage(
			tab.id,
			{
				text: 'get-dom',
				tabId: tab.id,
				apiKey: apiKey
			},
			testWithTenon)
	})
})
