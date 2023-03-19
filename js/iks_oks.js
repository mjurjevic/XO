window.addEventListener('load', init)


var sva_polja_iks_oks;
function init()
{
    sva_polja_iks_oks = document.getElementsByClassName('polje');

    for (const polje of sva_polja_iks_oks) {

        polje.addEventListener('click',otvoriPolje)
        
    }
}

var igrac_na_potezu = "X";
var brojac = 0;
var kraj_igre = false;


var brojac_pobeda_x = 0;
var brojac_pobeda_o = 0;

function otvoriPolje(event)
{

    if(kraj_igre){
        var nova_igra = window.confirm("Da li zelite opet da igrate?")
        if(nova_igra == true)
        {
            resetuj_sve_na_pocetak();
            // window.location.reload();
        }
        return;
        
    }


    // console.log(event);

    console.log("Kliknuo sam polje");
    var polje_kliknuto  = event.target;
    if(brojac % 2 == 0)
    {
        igrac_na_potezu = "X"
        polje_kliknuto.style.backgroundColor = 'red';
    }
    else
    {
        igrac_na_potezu = "O"
        polje_kliknuto.style.backgroundColor = 'blue';
    }
    brojac++
    polje_kliknuto.innerHTML = igrac_na_potezu;
    polje_kliknuto.removeEventListener('click', otvoriPolje);

    proveri_pobedu();


    if(brojac == 9)
    {
        kraj_igre = true;
        var rez = document.getElementById('rezultat');
        rez.innerHTML = `Nereseno!`;
        if(kraj_igre){
            var nova_igra = window.confirm("Da li zelite opet da igrate?")
            if(nova_igra == true)
            {
                // window.location.reload();
                resetuj_sve_na_pocetak();
            }
            return;
            
        }
    }
}

function proveri_pobedu()
{
    console.log(sva_polja_iks_oks);
    //redovi za pobedu
    proveri_pobedu_pojedinacno(0,1,2);
    proveri_pobedu_pojedinacno(3,4,5);
    proveri_pobedu_pojedinacno(6,7,8);

    //kolone za pobedu
    proveri_pobedu_pojedinacno(0,3,6);
    proveri_pobedu_pojedinacno(1,4,7);
    proveri_pobedu_pojedinacno(2,5,8);

    //pozicije po dijagonalama za pobedu
    proveri_pobedu_pojedinacno(0,4,8);
    proveri_pobedu_pojedinacno(2,4,6);
}

function proveri_pobedu_pojedinacno(poz1,poz2,poz3)
{
    var prvo = sva_polja_iks_oks[poz1];
    var drugo = sva_polja_iks_oks[poz2];
    var trece = sva_polja_iks_oks[poz3];
    prvo = prvo.innerHTML;
    drugo= drugo.innerHTML;
    trece = trece.innerHTML;
    console.log(prvo,drugo,trece);

    if( prvo == drugo && drugo == trece && prvo != "")
    {
        var rez = document.getElementById('rezultat');
        rez.innerHTML = `Pobednik je ${prvo}`;
        rez.classList.add('rez');

        kraj_igre = true;

        if(prvo == "X") brojac_pobeda_x++;
        else brojac_pobeda_o++;
        var rezultat_score = document.getElementById('score');
        // rezultat_score.style.fontSize= "50px";
        rezultat_score.classList.add('rezultat');
        rezultat_score.innerHTML = `X ${brojac_pobeda_x} - ${brojac_pobeda_o} O`
    }
}


function resetuj_sve_na_pocetak()
{
    brojac = 0;
    kraj_igre = false;
    for (const polje of sva_polja_iks_oks) {
        polje.innerHTML = "";
        polje.style.backgroundColor = 'white';
        polje.addEventListener('click',otvoriPolje)
    }
}