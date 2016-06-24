function saveOptions() {
	var api_key = document.getElementById('api_key').value;
	setWrapper({
		api_key: api_key
	});
}

function restoreOptions() {
	getWrapper({
		api_key: '',
	}, function(items) {
		document.getElementById('api_key').value = items.api_key;
	});
}

// Wrappers to support Firefox (which doesn't have storage.sync)
// and handle the status update.
function getWrapper(options, action) {
	var area = chrome.storage.sync || chrome.storage.local;
	area.get(options, action);
}

function setWrapper(options) {
	var area = chrome.storage.sync || chrome.storage.local;
	area.set(options, function() {
		var statusRegion = document.getElementById('status');
		statusRegion.textContent = 'Options saved.';
		setTimeout(function() {
			statusRegion.textContent = '';
		}, 750);
	});
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
