// src/js/utility/unity_webplayer_head.js
'use strict'
var unityObjectUrl = "src/js/utility/UnityObject2.js";
if (document.location.protocol == 'https:')
	unityObjectUrl = unityObjectUrl.replace("http://", "https://ssl-");
document.write('<script type="text\/javascript" src="' + unityObjectUrl + '"><\/script>');