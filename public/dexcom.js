request_token();
setInterval(request_token, 15000);
function get_data() {
	var curr_url = window.location.href;
	var parsed_url = new URL(curr_url);
	var url_data = parsed_url.searchParams;
	var auth_code = url_data.get('code');
	console.log("Auth Code: "+ auth_code);
	return "client_secret=Bu0MHYZ5OmMhFwl4&client_id=iPzOFA8R15l4KjimEB3oHh5XTD7fKoMB&code=" + auth_code + "&grant_type=authorization_code&redirect_uri=https://dry-earth-08919.herokuapp.com/welcome";
}



function request_token(){
var data = get_data()
var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
     var token = JSON.parse(this.responseText);
     token = token.access_token;
     get_bg_val(token)
  }
});

xhr.open("POST", "https://cors-anywhere.herokuapp.com/https://api.dexcom.com/v2/oauth2/token");
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);
}

function get_bg_val(token){
	console.log(token);

    var data = null;
    var date_init = new Date();
    var time = date_init.getTime()
    var start_time = new Date(time - 11100000);
    var end_time = new Date(time - 10800000);


    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
            // var xmlDoc = xhr.responseXML;
            // readygit XML(this.responseText);
            
      }
    });

    var d_options = { month: "2-digit", day: "2-digit"}; 
    var t_options = { hour12: false }; 


    var s_date = start_time.toLocaleDateString("en-us", d_options);
    var e_date = end_time.toLocaleDateString("en-us", d_options)
     
    var s_time = start_time.toLocaleTimeString("en-us", t_options);
    var e_time = end_time.toLocaleTimeString("en-us", t_options)
	 document.getElementById("s_date").innerHTML = s_date

	 document.getElementById("s_time").innerHTML = s_time

    
	 document.getElementById("e_date").innerHTML = e_date

	 document.getElementById("e_time").innerHTML = e_time


	
   xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://api.dexcom.com/v2/users/self/egvs?startDate="+s_date + "T" + s_time + "&endDate=" + e_date + "T" + e_time);

    xhr.setRequestHeader("authorization", "Bearer " + token);
    xhr.send(data);
}	
