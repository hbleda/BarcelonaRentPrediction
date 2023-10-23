var distritoBarrioMapa = {
  'Ciutat Vella': ['el Raval', 'Gotic', 'Barceloneta', 'Sant Pere. Santa Caterina i la Ribera'], 
  'L\'Eixample': ['Fort Pienc', 'Sagrada Familia', "la Dreta de l'Eixample", "l'Antiga Esquerra de l'Eixample", "la Nova Esquerra de l'Eixample", 'Sant Antoni'], 
  'Gràcia': ['el Coll', 'la Salut', 'la Vila de Gracia', "el Camp d'en Grassot i Gracia Nova",'Vallcarca i els Penitents'], 
  'Horta-Guinardó': ['el Baix Guinardo', 'Can Baro', 'el Guinardo', "la Font d'en Fargues", 'el Carmel'], 
  'Les Corts': ['les Corts','Pedralbes'], 
  'Nou Barris': ['Vilapicina i la Torre Llobeta'], 
  'Sant Andreu': ['la Sagrera', 'el Congres i els Indians', 'Navas'], 
  'Sant Martí': ["el Camp de l'Arpa del Clot", 'el Clot', 'el Parc i la Llacuna del Poblenou', 'el Poblenou', 'Diagonal Mar i el Front Maritim del Poblenou', 'el Besos i el Maresme', 'Provencals del Poblenou'], 
  'Sants-Montjuïc': ['el Poble Sec', 'la Font de la Guatlla', 'Hostafrancs', 'la Bordeta', 'Sants - Badal', 'Sants',  'la Maternitat i Sant Ramon', 'la Marina de Port'], 
  'Sarrià-Sant Gervasi': ['Sarria', 'les Tres Torres', 'Sant Gervasi - la Bonanova','Sant Gervasi - Galvany', 'el Putget i el farro']
};

function getBanyosValue() {
  var uiBanyos = document.getElementsByName("uiBanyos");
  for(var i in uiBanyos) {
    if(uiBanyos[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function getHabitacionesValue() {
  var uiHabitaciones = document.getElementsByName("uiHabitaciones");
  for(var i in uiHabitaciones) {
    if(uiHabitaciones[i].checked) {
        return parseInt(i)+1;
    }
  }
  return -1; // Invalid Value
}

function onClickedEstimatePrice() {
  console.log("Estimate rent price button clicked");
  var distritos = document.getElementById("uiDistritos");
  var barrios = document.getElementById("uiBarrios");
  var superficie = document.getElementById("uiSuperficie");
  var banyos = getBanyosValue();
  var habitaciones = getHabitacionesValue();  
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5000/predict_rent_price"; //Use this if you are NOT using nginx
  //var url = "/api/predict_rent_price"; // Use this if  you are using nginx.

  $.post(url, {
      distritos: distritos.value,
      barrios: barrios.value,
      superficie: parseFloat(superficie.value),
      habitaciones: habitaciones,
      banyos: banyos
      
     
  },function(data, status) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Euros</h2>";
      console.log(status);
  });
}

function onPageLoad() {
  console.log( "document loaded" );
  var urlDis = "http://127.0.0.1:5000/get_distritos_names"; // Use this if you are NOT using nginx 
  //var urlDis = "/api/get_distritos_names"; // Use this if  you are using nginx.
  $.get(urlDis,function(data, status) {
      console.log("got response for get_distritos_names request");
      if(data) {
          var distritos = data.distritos;
          var uiDistritos = document.getElementById("uiDistritos");
          $('#uiDistritos').empty();
          for(var i in distritos) {
              var opt = new Option(distritos[i]);
              $('#uiDistritos').append(opt);
          }
      }
  });
  var urlBar = "http://127.0.0.1:5000/get_barrios_names"; // Use this if you are NOT using nginx
  //var urlBar = "/api/get_barrios_names"; // Use this if  you are using nginx.
  $.get(urlBar,function(data, status) {
    console.log("got response for get_barrios_names request");
    if(data) {
        var barrios = data.barrios;
        var uiBarrios = document.getElementById("uiBarrios");
        $('#uiBarrios').empty();
        for(var i in barrios) {
            var opt = new Option(barrios[i]);
            $('#uiBarrios').append(opt);
        }
    }
});
  // Cargar distritos en el select
  var uiDistritos = document.getElementById("uiDistritos");
  for (var distrito in distritoBarrioMapa) {
    var opt = new Option(distrito);
    uiDistritos.append(opt);
  }
  // Escuchar cambios en la selección de distrito y actualizar barrios
  $(uiDistritos).change(function () {
    var distritoSeleccionado = $(this).val();
    var barrios = distritoBarrioMapa[distritoSeleccionado];

    var uiBarrios = $("#uiBarrios").empty(); // limpiar opciones existentes
    barrios.forEach(function (barrio) {
        var opt = new Option(barrio);
        uiBarrios.append(opt); // añadir nuevos barrios
    });
});
 // Simular un cambio para cargar los barrios del primer distrito por defecto
 $(uiDistritos).change();
}

window.onload = onPageLoad;
