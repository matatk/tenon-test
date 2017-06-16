'use strict'

function saveOptions() {
	const apiKey = document.getElementById('api-key').value
	setWrapper({
		apiKey: apiKey
	})
}

function restoreOptions() {
	getWrapper({
		apiKey: '',
	}, function(items) {
		document.getElementById('api-key').value = items.apiKey
	})
}

// Wrappers to support Firefox (which doesn't have storage.sync)
// and handle the status update.
function getWrapper(options, action) {
	const area = browser.storage.sync || browser.storage.local
	area.get(options, action)
}

function setWrapper(options) {
	const area = browser.storage.sync || browser.storage.local
	area.set(options, function() {
		const statusRegion = document.getElementById('status')
		statusRegion.textContent = 'Options saved.'
		setTimeout(function() {
			statusRegion.textContent = ''
		}, 750)
	})
}

document.addEventListener('DOMContentLoaded', restoreOptions)
document.getElementById('save').addEventListener('click', saveOptions)
