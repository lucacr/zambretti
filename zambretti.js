// beteljuice.com - near enough Zambretti Algorhithm 
// Giugno 2008 - v1.0
// tweak added so decision # can be output

/* Negretti and Zambras 'slide rule' is supposed to be better than 90% accurate 
for a local forecast upto 12 hrs, it is most accurate in the temperate zones and about 09:00  hrs local solar time.
I hope I have been able to 'tweak it' a little better ;-)	

This code is free to use and redistribute as long as NO CHARGE is EVER made for its use or output
*/

// ---- 'Posizione' variables ------------
var z_where = 1;  // Nordern = 1 or Sudern = 2 Emisfero
var z_Barometro_top = 1050;	// upper limits of your local 'weather window' (1050.0 hPa for UK)
var z_Barometro_bottom = 950;	// lower limits of your local 'weather window' (950.0 hPa for UK)

// usage:   forecast = betel_cast( z_hpa, z_month, z_wind, z_trend [, z_where] [, z_Barometro_top] [, z_Barometro_bottom])[0];

// z_hpa is Sea Level Adjusted (Relative) Barometro in hPa or mB
// z_month is current month as a number between 1 to 12
// z_wind is English windrose cardinal eg. N, NNW, NW etc.
// NB. if calm a 'nonsense' value should be sent as z_wind (direction) eg. 1 or calm !
// z_trend is Barometrometer trend: 0 = no change, 1= rise, 2 = fall
// z_where - OPTIONAL for posting with form
// z_Barometro_top - OPTIONAL for posting with form
// z_Barometro_bottom - OPTIONAL for posting with form
// [0] a short forecast text is returned
// [1] zambretti severity number (0 - 25) is returned ie. betel_cast() returns a two deep array


var z_forecast = new Array("Settled fine", "Tempo bello", "Tendenza al bello", "Fine, becoming less settled", "Bello, possibili schiarite", "Fairly fine, miglioramento", "Fairly fine, possibili schiarite al mattino", "Fairly fine, schiarite alla sera", "Showery early, miglioramento", "Variabile, mending", "Fairly fine, showers likely", "Rather unsettled clearing later", "Unsettled, probabile miglioramento", "Showery, bright intervals", "Showery, becoming less settled", "Variabile, possibile pioggia", "Unsettled, short fine intervals", "Unsettled, rain later", "Unsettled, some rain", "Mostly very unsettled", "Piogge occasionali, worsening", "Rain at times, very unsettled", "Piogge frequenti", "Pioggia, very unsettled", "Tempesta, possibile miglioramento", "Tempesta, abbondanti piogge"); 

// equivalents of Zambretti 'dial window' letters A - Z
var rise_options  = new Array(25,25,25,24,24,19,16,12,11,9,8,6,5,2,1,1,0,0,0,0,0,0) ; 
var Stabile_options  = new Array(25,25,25,25,25,25,23,23,22,18,15,13,10,4,1,1,0,0,0,0,0,0) ; 
var fall_options =  new Array(25,25,25,25,25,25,25,25,23,23,21,20,17,14,7,3,1,1,1,0,0,0) ; 

var z_test = new Array();

// ---- MAIN FUNCTION --------------------------------------------------
function betel_cast( z_hpa, z_month, z_wind, z_trend, z_Emisfero, z_upper, z_lower) {
	if(z_Emisfero) z_where = z_Emisfero;	// used by input form
	if(z_upper) z_Barometro_top = z_upper;	// used by input form
	if(z_lower) z_Barometro_bottom = z_lower; 	// used by input form
	z_range = z_Barometro_top - z_Barometro_bottom;
	z_constant = (z_range / 22).toFixed(3);

	z_season = (z_month >= 4 && z_month <= 9) ; 	// true if 'Summer'
	if (z_where == 1) {  		// Nord Emisfero
		if (z_wind == "N") {  
			z_hpa += 6 / 100 * z_range ;  
		} else if (z_wind == "NNE") {  
			z_hpa += 5 / 100 * z_range ;  
		} else if (z_wind == "NE") {  
//			z_hpa += 4 ;  
			z_hpa += 5 / 100 * z_range ;  
		} else if (z_wind == "ENE") {  
			z_hpa += 2 / 100 * z_range ;  
		} else if (z_wind == "E") {  
			z_hpa -= 0.5 / 100 * z_range ;  
		} else if (z_wind == "ESE") {  
//			z_hpa -= 3 ;  
			z_hpa -= 2 / 100 * z_range ;  
		} else if (z_wind == "SE") {  
			z_hpa -= 5 / 100 * z_range ;  
		} else if (z_wind == "SSE") {  
			z_hpa -= 8.5 / 100 * z_range ;  
		} else if (z_wind == "S") {  
//			z_hpa -= 11 ;  
			z_hpa -= 12 / 100 * z_range ;  
		} else if (z_wind == "SSW") {  
			z_hpa -= 10 / 100 * z_range ;  //
		} else if (z_wind == "SW") {  
			z_hpa -= 6 / 100 * z_range ;  
		} else if (z_wind == "WSW") {  
			z_hpa -= 4.5 / 100 * z_range ;  //
		} else if (z_wind == "W") {  
			z_hpa -= 3 / 100 * z_range ;  
		} else if (z_wind == "WNW") {  
			z_hpa -= 0.5 / 100 * z_range ;  
		}else if (z_wind == "NW") {  
			z_hpa += 1.5 / 100 * z_range ;  
		} else if (z_wind == "NNW") {  
			z_hpa += 3 / 100 * z_range ;  
		} 
		if (z_season == 1) {  	// if Summer
			if (z_trend == 1) {  	// Miglioramento
				z_hpa += 7 / 100 * z_range;  
			} else if (z_trend == 2) {  //	falling
				z_hpa -= 7 / 100 * z_range; 
			} 
		} 
	} else {  	// must be Sud Emisfero
		if (z_wind == "S") {  
			z_hpa += 6 / 100 * z_range ;  
		} else if (z_wind == "SSW") {  
			z_hpa += 5 / 100 * z_range ;  
		} else if (z_wind == "SW") {  
//			z_hpa += 4 ;  
			z_hpa += 5 / 100 * z_range ;  
		} else if (z_wind == "WSW") {  
			z_hpa += 2 / 100 * z_range ;  
		} else if (z_wind == "W") {  
			z_hpa -= 0.5 / 100 * z_range ;  
		} else if (z_wind == "WNW") {  
//			z_hpa -= 3 ;  
			z_hpa -= 2 / 100 * z_range ;  
		} else if (z_wind == "NW") {  
			z_hpa -= 5 / 100 * z_range ;  
		} else if (z_wind == "NNW") {  
			z_hpa -= 8.5 / 100 * z_range ;  
		} else if (z_wind == "N") {  
//			z_hpa -= 11 ;  
			z_hpa -= 12 / 100 * z_range ;  
		} else if (z_wind == "NNE") {  
			z_hpa -= 10 / 100 * z_range ;  //
		} else if (z_wind == "NE") {  
			z_hpa -= 6 / 100 * z_range ;  
		} else if (z_wind == "ENE") {  
			z_hpa -= 4.5 / 100 * z_range ;  //
		} else if (z_wind == "E") {  
			z_hpa -= 3 / 100 * z_range ;  
		} else if (z_wind == "ESE") {  
			z_hpa -= 0.5 / 100 * z_range ;  
		}else if (z_wind == "SE") {  
			z_hpa += 1.5 / 100 * z_range ;  
		} else if (z_wind == "SSE") {  
			z_hpa += 3 / 100 * z_range ;  
		} 
		if (z_season == 0) { 	// if Winter
			if (z_trend == 1) {  // Miglioramento
				z_hpa += 7 / 100 * z_range;  
			} else if (z_trend == 2) {  // falling
				z_hpa -= 7 / 100 * z_range; 
			} 
		} 
	} 	// END Nord / Sud

	if(z_hpa == z_Barometro_top) z_hpa = z_Barometro_top - 1;
	z_option = Math.floor((z_hpa - z_Barometro_bottom) / z_constant); 
 	z_output = "";
	if(z_option < 0) {
		z_option = 0;
		z_output = "Exceptional Weather, ";
	}
	if(z_option > 21) {
		z_option = 21;
		z_output = "Exceptional Weather, ";
	}

	if (z_trend == 1) { 	// Miglioramento
		z_output += z_forecast[rise_options[z_option]] ; 
z_test[1] = rise_options[z_option];
	} else if (z_trend == 2) { 	// falling
		z_output += z_forecast[fall_options[z_option]] ; 
z_test[1] = fall_options[z_option];
	} else { 	// must be 'Stabile'
		z_output += z_forecast[Stabile_options[z_option]] ; 
z_test[1] = Stabile_options[z_option];
	} 
//	return z_output ; 
z_test[0] = z_output ;
return z_test ; 
}	// END function   		
		
