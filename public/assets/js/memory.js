var cardsLabels = ["Grand Tinamou","Aigle Royal", "Vautour Moine","Trognon à queue blanche","Autour des Palombes", "Buse à tête blanche"];
var nbClics = 0,
    coups =0,
    carte1 = "",
    carte2="",
    case1 = "",
    case2 ="",
    imgOk =0,
    points =0,
    paireTrouvee = 20,
    paireNonTrouvee = 10,
    depart= false,
    temps_debut = new Date().getTime();

generation();

for(var i=0;i<12;i++)
{
    document.getElementById('img' +i).src='/assets/img_memory/Back.jpg';
}
depart=true;

function generation()
{
    var nb_alea,
        nb_img="",
        test = true,
        chaine = "";

    for (var i=0;i<12;i++)
    {
        while (test===true)
        {
            nb_alea = Math.floor(Math.random()*12) + 1;
            if(chaine.indexOf("-" + nb_alea + "-")>-1)
                nb_alea = Math.floor(Math.random()*12) + 1;
            else
            {
                nb_img = Math.floor((nb_alea+1)/2);
                document.getElementById('case' + i).innerHTML = "<img class='img-thumbnail img-fluid' style='cursor:pointer;' id='img" + i + "' src=" + nb_img + "'/assets/img_memory/carte.jpg' onClick='verifier(\"img" + i + "\", \"carte" + nb_img + "\")' alt='' />";
                chaine += "-" + nb_alea + "-";
                test=false;
            }
        }
        test=true;
    }
}

function verifier(limg,source)
{
    if(depart===true)
    {
        nbClics++;
        document.getElementById(limg).src='/assets/img_memory/'+source+'.jpg';

        if(nbClics ===1)
        {
            carte1=source;
            case1=limg;
        }
        else
        {
            carte2=source;
            case2=limg;
            if(case1!==case2)
            {
                depart=false;
                if(carte1!==carte2)
                {
                    attente =setTimeout(function()
                    {
                        document.getElementById(case1).src='/assets/img_memory/Back.jpg';
                        document.getElementById(case2).src='/assets/img_memory/Back.jpg';
                        depart=true;
                        nbClics=0;
                        coups++;
                        points = points - paireNonTrouvee;
                        document.getElementById('coups').innerHTML='<p>Nombre de clics : <strong>'+coups+'</strong></p>';

                    },800);
                }
                else
                {
                    depart=true;
                    nbClics=0;
                    coups++;
                    points= points + paireTrouvee;
                    document.getElementById('coups').innerHTML='<p>Nombre de clics :<strong>'+coups+'</strong></p>';
                    imgOk +=2;
                    document.getElementById('paireOk').innerHTML='<p>Vous avez trouvé <strong>'+imgOk/2+'</strong> paire(s) ! </p>';
                    document.getElementById('noms').innerHTML='<p>Bravo ! L\'oiseau trouvé est :  <strong>'+cardsLabels[Number(carte1.replace(/[^\d]/g, ""))-1]+'</strong></p>';

                    if(imgOk===12)
                    {
                        dif_temps = Math.floor((new Date().getTime()- temps_debut)/1000);
                        document.getElementById('temps').innerHTML='<p>Vous avez mis  <strong>'+dif_temps+'</strong> secondes </p>';
                        document.getElementById('coups').innerHTML='<p>et  <strong>' +coups+' </strong> clics </p>';
                    }
                    switch(imgOk===12)
                    {
                        case dif_temps<15:
                            points = points + 50;
                            document.getElementById('level').innerHTML ='<p><strong>Niveau Maître !</strong></p>';
                            depart=false;
                            break;
                        case dif_temps<30:
                            points = points + 30;
                            document.getElementById('level').innerHTML ='<p><strong>Niveau Expert !</strong></p>';
                            depart=false;
                            break;
                        case dif_temps<60:
                            points = points + 20;
                            document.getElementById('level').innerHTML ='<p><strong>Niveau Confirmé !</strong></p>';
                            depart=false;
                            break;
                        case dif_temps<90:
                            points = points + 10;
                            document.getElementById('level').innerHTML ='<p><strong>Niveau Amateur !</strong></p>';
                            depart=false;
                            break;
                        case dif_temps>=120:
                            document.getElementById('level').innerHTML ='<p><strong>Niveau Débutant !</strong></p>';
                            depart=false;
                            break;
                    }
                }
            }
            else
            {
                if(nbClics===2)nbClics=1;
            }
        }
    }
}

afficher_cacher('texte');
function afficher_cacher(id)
{

    if(document.getElementById(id).style.visibility == "hidden")
    {
        document.getElementById(id).style.visibility="visible";
        document.getElementById('button_'+id).innerHTML="Fermer";
    }
    else
    {
        document.getElementById(id).style.visibility="hidden";
        document.getElementById('button_'+id).innerHTML="Comment jouer ?";
    }
    return true;
}
