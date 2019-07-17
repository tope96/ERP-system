var element = document.getElementById("calendar");
element.classList.add("active-bar");


function createCalendar(calendarJSON){
    var jsonObject = JSON.parse(calendarJSON);
    jsonObject.forEach(obj => {
        obj.title = obj.Nazwa;
        obj.start = obj.DataRealizacji;
        delete obj.Nazwa;
        delete obj.DataRealizacji;
        delete obj.IdKontoDomenowe;
        delete obj.IdPracownik;
        delete obj.IdProjekt;
        delete obj.IdZadanie;
        delete obj.Opis;
        delete obj.Priorytet;
        delete obj.Status;
    });
    

var calendarEl = document.getElementById('maincalendar');            
var calendar = new FullCalendar.Calendar(calendarEl, {
  plugins: [ 'dayGrid' ],
  events: jsonObject
  
});

calendar.render();
};
