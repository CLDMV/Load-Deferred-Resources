# Load Deferred Resources

As have time and time again had to do with websites, deferring javascript and css and various other elements of a site. This simple 1.36 KB (when uglified) script will load deferred css and js (inline or not) once the page has loaded. Preventing those pesky files from blocking your site and giving you a bad score!

## Usage
Essentially grab which file you want ldr.js, ldr.min.js, ldr-uglified.min.js. Then take the contents and place it at the end of your page. From there all you need to do is place your JS and/or CSS includes into a <noscript> tag with a class of "deferred-resources". 

You can see examples of this working in the examples folder.

## Browser Support
Currently this code supports the following browsers:

Browser | Version | Usage % not covered
------------ | ------------- | -------------
Chrome | 4.0+ | 0%
IE | 9.0+ | 0.17%
Firefox | 3.0+ | 0.01%
Safari | 3.1+ | 0%
Opera | 9.5+ | 0.01%

Note: Stats from https://caniuse.com/usage-table as of 2019-01-31

## Planned Update (Maybe)

> After looking at https://caniuse.com/usage-table is seems that only 0.19% of internet users are not supportted as of RIGHT now. With the below "planned" update that would bring it down to 0.03%. Nearly all of that are people running browsers and operating systems the Software creator doesn't even support anymore and hasn't for years.

The next planned update will have a broader browser support version which will support older browsers by removing getElementsByClassName [replaced with getElementsByTagName and .className] and setAttribute [replaced with createAttribute and setAttributeNode].

Below are the browsers planned to be supported:

Browser | Version | Usage % not covered
------------ | ------------- | -------------
Chrome | 1.0+ | 0%
IE | 6.0+ | 0.01%
Firefox | 3.0+ | 0.01%
Safari | 3.1+ | 0%
Opera | 9.5+ | 0.01%

Unfortunately to my knowledge to support anything older I would need to itterate over all nodes in the document via .childNodes and search for the specific ones we want to modify. Making the code much larger than it is and the usage of the browsers below the above table is probably close to none.

## Notes

> Someone please bitch at me to update this!
