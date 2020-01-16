
var url = require('url');

function get_data() {
	var curr_url = window.location.href;
	var parsed_url = url.parse(curr_url, true);
	var url_data = parsed_url.query;
	var auth_code = url_data.code;
	console.log("Auth Code: "+ auth_code);
	return "client_secret=Bu0MHYZ5OmMhFwl4&client_id=iPzOFA8R15l4KjimEB3oHh5XTD7fKoMB&code=" + auth_code + "&grant_type=authorization_code&redirect_uri=https://dry-earth-08919.herokuapp.com/welcome";

}
var data = get_data()



var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://api.dexcom.com/v2/oauth2/token");
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);