var req_data = get_data();
var refresh_token = "";
request_token_init();
setInterval(request_token_ref, 15000);

function get_data() {
	var curr_url = window.location.href;
	var parsed_url = new URL(curr_url);
	var url_data = parsed_url.searchParams;
	var auth_code = url_data.get('code');
	console.log("Auth Code: "+ auth_code);
	return "client_secret=Bu0MHYZ5OmMhFwl4&client_id=iPzOFA8R15l4KjimEB3oHh5XTD7fKoMB&code=" + auth_code + "&grant_type=authorization_code&redirect_uri=https://dry-earth-08919.herokuapp.com/welcome";
}



function request_token_init(){

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = false;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === 4) {
	     var resp = JSON.parse(this.responseText);
	     console.log(resp);
	     var token = resp.access_token;
	     window.refresh_token = resp.refresh_token;
	     console.log("Init ref: " + window.refresh_token);
	     get_bg_val(token)
	  }
	});

	xhr.open("POST", "https://cors-anywhere.herokuapp.com/https://api.dexcom.com/v2/oauth2/token");
	xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("cache-control", "no-cache");

	xhr.send(req_data);
}

function request_token_ref(){
	console.log("In req: " + window.refresh_token);

	var ref_data = "client_secret=Bu0MHYZ5OmMhFwl4&client_id=iPzOFA8R15l4KjimEB3oHh5XTD7fKoMB&refresh_token="
				 + window.refresh_token
				 + "&grant_type=refresh_token&redirect_uri=https://dry-earth-08919.herokuapp.com/welcome";

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = false;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === 4) {
		     var resp = JSON.parse(this.responseText);
		     console.log(resp);
		     var token = resp.access_token;
		     window.refresh_token = resp.refresh_token;
		     get_bg_val(token)
	  }
	});

	xhr.open("POST", "https://cors-anywhere.herokuapp.com/https://api.dexcom.com/v2/oauth2/token");
	xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("cache-control", "no-cache");

	xhr.send(ref_data);
}



function get_bg_val(token){
	console.log(token);

    var data = null;
    var date_init = new Date();
    var time = date_init.getTime()
//     var start_time = new Date(time - 21100000);
//     var end_time = new Date(time - 10800000);
    var start_time = new Date(time);
    var end_time = new Date(time+ 300001);


    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
            // var xmlDoc = xhr.responseXML;
            // readygit XML(this.responseText);
            
      }
    });

    var month_opt = {month: "2-digit"}; 
	var day_opt = {day: "2-digit"}; 
	var year_opt = {year: "numeric"}; 
    var t_options = { hour12: false }; 


    var s_date = start_time.toLocaleDateString("en-us", year_opt) + "-" + start_time.toLocaleDateString("en-us", month_opt) + "-" +start_time.toLocaleDateString("en-us", day_opt);
    
    var e_date = end_time.toLocaleDateString("en-us", year_opt) + "-" + end_time.toLocaleDateString("en-us", month_opt) + "-" +end_time.toLocaleDateString("en-us", day_opt);
     
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
