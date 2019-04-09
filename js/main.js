/**
Mit dieser Funktion wird die Erstellung der Tabelle, sowie die Berechnung der Teilstreckendistanzen gestartet
@param list eine Liste von Punkten, die das Array in Teilstrecken unterteilen sollen
@param array ein Array von Punkten, die als Route angesehen werden
*/
function start(list, array) {
  var allpoints= document.getElementById("allpoints");
  allpoints.appendChild(createTable(list, array));
}

/**
Funktion um eine Tabelle zu erzeugen
Sie wird dynamisch erweitert, jenachdem wie viele Teilrouten vorliegen
@param list eine Liste von Punkten, die das Array unterteilen soll in Teilstrecken
@param array ein Array von Punkten, die als Route angesehen werden
@return gibt eine Tabelle zurück, die alle Längen der Teilstrecken und die Summe der Teilstrecken enthält
*/
function createTable(list, array){
  var dist = measurePartsOfLine (list, array);
	var myTable     = document.createElement("table");
	var mytablebody = document.createElement("tbody");

  currentRow = document.createElement("tr");
  currentCell1 = document.createElement("th");
  currentCell2 = document.createElement("th");
  currentText1 = document.createTextNode("Teilroute");
  currentText2 = document.createTextNode("Länge");
  currentCell1.appendChild(currentText1);
  currentCell2.appendChild(currentText2);
  currentRow.appendChild(currentCell1);
  currentRow.appendChild(currentCell2);
  mytablebody.appendChild(currentRow);

	for (var i = 0; dist.length-1 > i; i++) {
		currentRow = document.createElement("tr");
		currentCell1 = document.createElement("td");
    currentCell2 = document.createElement("td");
		currentText1 = document.createTextNode(i+1 + ". Teilroute");
    currentText2 = document.createTextNode( dist[i]);
    currentCell1.appendChild(currentText1);
    currentCell2.appendChild(currentText2);
    currentRow.appendChild(currentCell1);
    currentRow.appendChild(currentCell2);
    mytablebody.appendChild(currentRow);
	}

  currentRow = document.createElement("tr");
  currentCell1 = document.createElement("td");
  currentCell2 = document.createElement("td");
  currentText1 = document.createTextNode("Summe aller Routen");
  currentText2 = document.createTextNode( dist[dist.length-1]);
  currentCell1.appendChild(currentText1);
  currentCell2.appendChild(currentText2);
  currentRow.appendChild(currentCell1);
  currentRow.appendChild(currentCell2);
  mytablebody.appendChild(currentRow);
	myTable.appendChild(mytablebody);

  currentRow = document.createElement("tr");
  currentCell1 = document.createElement("td");
  currentCell2 = document.createElement("td");
  currentText1 = document.createTextNode("Länge der Ausgangsroute");
  currentText2 = document.createTextNode( getDistanceOfRoute(array));
  currentCell1.appendChild(currentText1);
  currentCell2.appendChild(currentText2);
  currentRow.appendChild(currentCell1);
  currentRow.appendChild(currentCell2);
  mytablebody.appendChild(currentRow);
  myTable.appendChild(mytablebody);

	return myTable;
}

/**
measurePartsOfLine berechnet die Länge von Teildistanzen einer Gesamtstrecke, die durch Splitpunkte unterteilt werden soll
@param list eine Liste von Punkten, die das Array unterteilen soll
@param array ein Array von Punkten, die als Route angesehen werden
@return gibt ein Array zurück, welches die Längen der einzelnene Teilstrecken enthält der letzte Eintrag ist immer die Summe alles Teilstrecken
*/
function measurePartsOfLine (list, array){
  var splittedLines= getSplittedLines(list, array);
  var distances = [];
  var sumOfDist=0;
  for (i=0; i<splittedLines.length;i++){
    distances[i]=getDistanceOfRoute(splittedLines[i]);
    sumOfDist= sumOfDist+distances[i];
  }
  var index = distances.length;
  distances[index]=sumOfDist;
  return distances;
}

/**
getSplittedLines ist eine Funktion, um eine Liste zu erhalten in der alle Linien aufgelistet sind, die entstehen, wenn man die Gesamtlinie mit den Splitpoints unterteilt
@param list eine Liste von Punkten, die die Route im Array spliten sollen
@param array ein Array von Punkten, die als Route angesehen werden
@return gibt ein Array zurück, dass die Teilstrecken der Route die durch die Splitpunkte geteilt wurde enthält
*/
function getSplittedLines (list, array){
  var splitpoints = getAllIndexofPointlist(list, array);
  var splittedLines = [];
  splittedLines[0] = [];

  for (n=0; n<splitpoints[0];n++){
  splittedLines[0][n] = [];
  splittedLines[0][n][0] = array[n][0];
  splittedLines[0][n][1] = array[n][1];
  }

  for (i=0; i<splitpoints.length-1;i++){
    var j=i+1;
    var n=splitpoints[i];
    splittedLines[i+1] = [];
      for (p=0;p<splitpoints[j]-splitpoints[i]-1;p++){
      n++;
      splittedLines[i+1][p] = [];
      splittedLines[i+1][p][0] =array[n][0];
      splittedLines[i+1][p][1] =array[n][1];
      }
  }

  if(splitpoints[splitpoints.length-1]==array.length-1){
    return splittedLines;
  }
  else{
    var ind = splittedLines.length;
    splittedLines[ind] = [];
    var m=splitpoints[splitpoints.length-1];
    for (q=0;q<array.length-splitpoints[splitpoints.length-1]-1;q++){
      m++;
      splittedLines[ind][q] = [];
      splittedLines[ind][q][0] = array[m][0];
      splittedLines[ind][q][1] = array[m][1];
    }

  }
return splittedLines;
}

/**
getAllIndexofPointlist ermittelt alle INdexe vom Splitpunkten in einem Array einer Route
@param list eine Liste von Punkten, die im Array gesucht werden sollen
@param array ein Array von Punkten, die als Route angesehen werden
@return gint ein Array zurück, das die Indexe der in der list aufgelisteten Punkte enthält
*/
function getAllIndexofPointlist (list, array){
  var indexList= [];
  var n = (-1);
  for(i=0; i<list.length; i++){
    n++;
    indexList[n] = getIndexofPoint(list[i],array);
  }
  return indexList;
}

/**
getIndexofPoint sucht einen Punkt in einem Array von Punkten und gibt den Index des Punktes zurück
@param point EIn Punkt der im Array gesucht werden soll
@param array ein Array von Punkten, die als Route angesehen werden
@return der Index an der sich der Punkt im Array befindet
*/
function getIndexofPoint (point, array){
  var found = false;
  var i = 0;
  while(found == false){
    if(point[0]==array[i][0] && point[1]==array[i][1]){
      found=true;
      return i;
    }
    else{
      i++;
    }
  }
}

/**
getDistanceOfRoute berechnet die Länge einer Route. Die Route ist als Array der Punkte angegeben
@param array ein Array von Punkten, die als Route angesehen werden
@return sumDist1 Gibt die Länge der Route zurück
*/
function getDistanceOfRoute (array) {
  var sumDist1 = 0;
  var newDist = 0;
  for(z = 1; z < array.length; z++){
    newDist= distance(array[z-1][0],array[z-1][1],array[z][0],array[z][1]);
    sumDist1 = sumDist1 + newDist;
  }
  return sumDist1;
}

/**
distance berechent die Länge einer Geraden zwischen zwei Punkten.
@param lat1 Latitude der ersten Koordinate
@param lon1 Longitude der ersten Koordinate
@param lat2 Latitude der zweiten Koordinate
@param lon2 Longitude der zweite Koordinate
@return die Distanz zwischen den Punkten
*/
function distance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180);
}
