//GENERATES AN MXL DOCUMENT FROM AN ARRAY
//ARRAY FORMAT: [[(part)[(measure)[(note) pitch, octave, duration]]]];
//Duration format: 1: sixteenth, 2: eighth, 4: quarter, 8: half, 16: whole

function generateMXL(a, p){
	let output = '';
	let partNum = a.length;
	let DIVS = 2;
	let TYPES = ["sixteenth","eighth","quarter","half","whole"];
	let TYPEMASTER = [0,0, 1, 1, 2, 2, 2, 2, 3,3,3,3,3,3,3,3,4];
	//Header
	output += '<score-partwise version="4.0"><part-list>'
	for(let i = 1; i< partNum+1; i++){
		output+= '<score-part id="P' + i + '"><part-name>Music</part-name></score-part>'
	}
	output += '</part-list>';
	//Body
	for(let i = 0; i<partNum; i++){
		output += '<part id="P'+(i+1)+'">';
		let measureNumbers = a[i].length;
		for(let j = 0; j< measureNumbers; j++){
			output += '<measure number="'+(j+1)+'">';
			if(j == 0){
				output+='<attributes><divisions>4</divisions><key><fifths>'+p[0]+'</fifths></key><time><beats>'+p[1]+'</beats><beat-type>'+p[2]+'</beat-type></time>'
				output += '<clef><sign>G</sign><line>2</line></clef>'
				output += '</attributes>';
			}
			for(let k = 0; k< a[i][j].length; k++){
				if(a[i][j][k][0] == "R"){//Is it a rest??
					output+= "<note><rest/>" + '<duration>'+ a[i][j][k][2]+ '</duration><type>'+ TYPES[TYPEMASTER[a[i][j][k][2]]] +'</type></note>'
				}else{ //Do the note instead
					output+='<note><pitch><step>'+a[i][j][k][0].substring(0,1)+'</step>'
					if(a[i][j][k][0].length > 1){
						let type = a[i][j][k][0].substring(1,2);
						output+= '<alter>';
						if(type == "#"){
							output+= '1';
						}
						if(type == "b"){
							output+= '-1';
						}
						output+= '</alter>';
					}
					output+= '<octave>'+a[i][j][k][1]+'</octave></pitch><duration>'+ a[i][j][k][2]+ '</duration><type>'+ TYPES[TYPEMASTER[a[i][j][k][2]]] +'</type>';
					output += '</note>';
				}
			}
			output += '</measure>';
		}
		output += '</part>';
	}
	output += '</score-partwise>';
	
	return output;
}