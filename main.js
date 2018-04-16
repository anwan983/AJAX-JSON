function ajax(method, url) {

    // utworzenie obiektu XMLHttpRequest

    var httpReq = new XMLHttpRequest();

    // otwarcie polaczenia z serwerem
    // od tej pory, dzialamy na zmiennej, ktora przetrzymuje obiekt XMLHttpRequest

    httpReq.open(method, url);

    // readystatechange - funkcja iteracyjna wbudowana w obietk XMLHttpRequest, wywolywana za kazdym razem, kiedy zmienia sie readystate - status nawiazania polaczenia i gotowosci danych do zwrocenia
    // jesli status polaczenia zostal zmieniony -> httpReq.readyState
    // 0: połączenie nie nawiązane,
    // 1: połączenie nawiązane,
    // 2: żądanie odebrane,
    // 3: przetwarzanie,
    // 4: dane zwrócone i gotowe do użycia.

    httpReq.onreadystatechange = function () {

        // jeśli 4: dane zwrócone
        if (httpReq.readyState == 4) {

            //  jeśli status 200 - ok
            if (httpReq.status == 200) {

                // do zmiennej przypisuje dane, ktore zostaly zwrocone w formacie tekstowym (responseText)
                var returnData = httpReq.responseText;


                httpReq.onsuccess(returnData);
                //  wywolanie funkcji onsuccess

                // zeruj obiekt, by nie utrzymywac polaczenia z serwerem
                httpReq = null;
            }
        }
    }

    // funkcja, przyjmujaca parametr (dane na ktorych dziala)
    httpReq.onsuccess = function (response) {
        var jsonObj = JSON.parse(response);
        console.log(jsonObj);
        
        var paragraf = document.createElement('p');
        paragraf.innerHTML = jsonObj.imie + " " + jsonObj.nazwisko + " " + jsonObj.zawod + " " + jsonObj.firma;
        
        var div = document.getElementById('dane-programisty');
        div.appendChild(paragraf);
    }
        
    httpReq.send();
};

document.getElementById('get-data').addEventListener("click", function(){
    var divHolder = document.createElement('div');
    divHolder.setAttribute("id", "dane-programisty");
    ajax('GET', "https://akademia108.pl/kurs-front-end/ajax/1-pobierz-dane-programisty.php");
    
    
if(document.body.contains(document.getElementById('dane-programisty'))==false) { document.body.appendChild(divHolder);

}   
});