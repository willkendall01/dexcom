get_data() {
	var curr_url = window.location.href;
	var parsed_url = new URL(curr_url);
	var url_data = parsed_url.searchParams;
	var auth_code = url_data.get('code');
	console.log("Auth Code: "+ auth_code);
	return "client_secret=Bu0MHYZ5OmMhFwl4&client_id=iPzOFA8R15l4KjimEB3oHh5XTD7fKoMB&code=" + auth_code + "&grant_type=authorization_code&redirect_uri=https://dry-earth-08919.herokuapp.com/welcome";
}
var data = get_data()



var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
     var token = this.response.access_token;
     get_bg_val(token)
  }
});

xhr.open("POST", "https://cors-anywhere.herokuapp.com/https://api.dexcom.com/v2/oauth2/token");
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);

function get_bg_val(token){
	console.log(token);
}
//     var data = null;
//     var date_time = curr_date()
    
//     var xhr = new XMLHttpRequest();
//     xhr.withCredentials = false;
    
//     xhr.addEventListener("readystatechange", function () {
//       if (this.readyState === 4) {
//         console.log(this.responseText);
//             // var xmlDoc = xhr.responseXML;
//             readyXML(this.responseText);
            
//       }
//     });
//     document.getElementById("date").innerHTML = date_time[0] + "/" + date_time[1] + "/" + date_time[2]
//     document.getElementById("time").innerHTML = date_time[3] + ":" + date_time[4] + ":" + date_time[5]
    
    
//     //Request data point (right now linked to sandbox times)
    
   
//     if (date_time[4] < 10){
//         var start_minute = date_time[4] - 10 + 60;
//         var start_hour = date_time[3] - 1;
//     }
//     else {
//         if (date_time[4] < 20){
//            start_minute = "0" + (date_time[4] - 10); 
//         }
//         else{
//            start_minute = date_time[4] - 10;
//         }
//         start_hour = date_time[3];
//     }
    
//     console.log("Hour:" + date_time[3]);
//     console.log("Minute:" + date_time[4]);
//     console.log("Second:" + date_time[5]);
//     console.log("Start minute:" + start_minute);
    
//    xhr.open("GET", "https://cors-anywhere.herokuapp.com/https://sandbox-api.dexcom.com/v2/users/self/egvs?startDate=2018-03-15" + "T" + start_hour + ":" + start_minute + ":00&endDate=2018-03-15" + "T" + date_time[3] + ":" + date_time[4] + ":00");
    
//     //eventual method to retrieve data points. (right now just printing to ensure correctness)
//    document.getElementById("elem_to_get").innerHTML = "https://cors-anywhere.herokuapp.com/https://sandbox-api.dexcom.com/v2/users/self/egvs?startDate=2018-03-15" + "T" + start_hour + ":" + start_minute + ":00&endDate=2018-03-15" + "T" + date_time[3] + ":" + date_time[4] + ":00";
   
//     xhr.setRequestHeader("authorization", "Bearer " + token);
//     xhr.send(data);
// }
