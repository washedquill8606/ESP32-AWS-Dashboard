var battery = new Array();
var labels = new Array();
var parts = [];

var batteryIndicator = document.getElementById("battery-indicator");
var batteryIndicatorGraph = document.getElementById("battery-indicator-graph");
var partsIndicator = document.getElementById("parts-indicator");

fetch("https://esp32aws-curso-117.s3.amazonaws.com")
.then(res => res.text())
.then(res => {
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(res, "text/xml");

  //console.log(xmlDoc.getElementsByTagName("Key"));
  for(let item of xmlDoc.getElementsByTagName("Key")){
      //console.log(item.childNodes[0].nodeValue);
      url = item.childNodes[0].nodeValue;
      if(url.replace("dataLake/","") != ""){
        const name = url.replace("dataLake/","");
        labels.push(name);
        getData(url); 
        }
    }

    console.log(parts);
    console.log(battery);

    loadChart(labels,battery);
});

const getData = (url) =>{
    fetch("https://esp32aws-curso-117.s3.amazonaws.com/"+url)
    .then(data => data.json())
    .then(data => {
        //console.log(data);
        battery.push(data.bateria);
        parts.push(data.piezas);

        batteryIndicator.innerHTML = data.bateria+"%";
        batteryIndicatorGraph.style.height = String(data.bateria)+"%";
        partsIndicator.innerHTML = data.piezas;

        lastBattery = data.bateria;

        chart.update();
    });
};

const onButton = document.getElementById("on-button");
const offButton = document.getElementById("off-button");

onButton.addEventListener('click', ()=>{
    console.log("Encender");
    const action = 'publish/on';
    fetchPublishData();
});

offButton.addEventListener('click', ()=>{
    console.log("Apagar");

    const action = 'publish/off';
    fetchPublishData();
});

const fetchPublishData=(action)=>{
    fetch(document.URL+action)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(e => console.log(e));
}