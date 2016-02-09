Tenon Test
==========

Test web pages for accessibility with [Tenon](http://tenon.io) from within Chrome.

This Chrome extension allows you to test a page using Tenon by sending its source (DOM serialised as a string) to the Tenon API. This is useful for pages that are behind 'login walls' or similar, which Tenon cannot access from outside.

This is very preliminary just now! If the page you want to test is publicly-reachable, you should really check out the 'Tenon Check' extension, which you can get for Chrome, Firefox and Opera at the following locations.

-   [Firefox 'Tenon Check' extension](https://addons.mozilla.org/en-GB/firefox/addon/tenon-check/)
-   [Chrome 'Tenon Check' extension](https://chrome.google.com/webstore/detail/tenon-check/bmibjbhkgepmnehjfhjaalkikngikhgj)
    -   [Source code for the Chrome 'Tenon Check' extension](https://github.com/karlgroves/Tenon-Check)
-   [Opera 'Tenon Check' extension](https://addons.opera.com/en-gb/extensions/details/tenon-check/)

The above extensions do not require you to have an account with Tenon, so they're a good way to get started (this extension, however, does require an account).

Important Notes and Limitations
-------------------------------

-   You must have a Tenon account and [API key](https://tenon.io/apikey.php) to use this extension.
-   This currently only sends over the serialised HTML code for the DOM (including any inline CSS or images) -- therefore Tenon cannot carry out some tests of which it's capable, such as contrast tests, and no JavaScript-induced behaviour will be reflected.
-   Currently you cannot specify or chose a project under which the results will be filed.

Test a page using Tenon, either by the page's URL or by sending over its source.

Usage
-----

Currently I have not packaged this up as an official extension, but you can get Chrome to load it from the directory of the cloned repository by following the [Chrome developer docs' instructions on loading extensions from directories](https://developer.chrome.com/extensions/getstarted#unpacked).

Future Work
-----------

-   Allow sending URL only instead.
    -   ...thus the option to *not* require a Tenon account can be supported.
-   Include all of the page assets when sending source: currently only the HTML and any script/inlined images in the DOM are sent across; this means Tenon cannot perform all of the tests of which it's capable (e.g. contrast).
-   Allow specification of project ID so that test results can be filed in the project of your choice.

