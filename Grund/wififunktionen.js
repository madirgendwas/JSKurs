// Umfangsberechnung
var umfangberechne = function(radius)
{
  //var radius, umfang;
  //radius = document.getElementById('eingabe').value * 1;
  var umfang;
  umfang = 2 * radius * Math.PI;
  return umfang;
}

// Runden mit Angabe der Nachkomma
var runden = function(eingabe, nachkomma)
{
  var ausgabe;
  nachkomma = Math.pow(10, nachkomma);
//			if(nachkomma == 1) {nachkomma = 10};
//			if(nachkomma == 2) {nachkomma = 100};
//			if(nachkomma == 3) {nachkomma = 1000};
//			if(nachkomma == 4) {nachkomma = 10000};
  eingabe = eingabe * nachkomma;
  ausgabe = Math.round(eingabe);
  ausgabe = ausgabe / nachkomma;
  return ausgabe;
  // Math.floor() abrunden
  // Math.ceil() aufrunden
  // Math.round() kaufm.
}

//getElementById

var makebetrag = function(eingabe)
{
  var ausgabe;
  var tester;

  var tester = eingabe.replace(",", ".");
  var tester = tester.replace(" ", "");
  console.log(tester)
  ausgabe = tester * 1;

  return ausgabe;

}
var el = function(id)
{
    return (document.getElementById(id));
}
