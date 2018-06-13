window.onload = setInterval(getInfo, 3000);

let ids = [];
let hefeBeer = 0;
let fairyBeer = 0;
let gitBeer = 0;
let hollaBeer = 0;
let hoppiBeer = 0;
let mowinBeer = 0;
let rowBeer = 0;
let ruinBeer = 0;
let sleighBeer = 0;
let steamBeer = 0;

let layer = document.querySelector("#toplayer");

function getInfo(){
    let info = JSON.parse(FooBar.getData(true));
    console.log(info);
    
    // SHOWING THE QUEUE

    let queue = info.queue.length;
    let served = info.serving[0].id;
    document.querySelector('#queue span').textContent = queue;
    let percentQueue = queue*4;
    layer.style.width= percentQueue+"%";
    document.querySelector('#served span').textContent = served;

    // BARTENDERS STATUS
    
    const templateBartender = document.querySelector('#bartenderTemplate').content;
    const parentBartender = document.querySelector('#taps');
    parentBartender.innerHTML = '';
    info.bartenders.forEach(bartender=>{
        const tapStatus = bartender.statusDetail;
        tapImageSrc = "images/taps/tap_" + tapStatus + ".png";
        
        const cloneTap = templateBartender.cloneNode(true);
        const currentTap = cloneTap.querySelector('.tap');
        currentTap.setAttribute('src', tapImageSrc);
        cloneTap.querySelector('#bartenderNameSpan').textContent = bartender.name;
        cloneTap.querySelector('#bartenderStatusSpan').textContent = bartender.statusDetail;
        parentBartender.appendChild(cloneTap);
    })

    // KEG LIVE INFO

    const templateKeg = document.querySelector('#kegTemplate').content;
    const parentKeg = document.querySelector('#kegs');
    parentKeg.innerHTML = '';
    info.taps.forEach(tap=>{
        const beerName = String(tap.beer).replace(/\s+/g, '');
                    //https://css-tricks.com/snippets/javascript/strip-whitespace-from-string/
        const beerTypeSrc = "images/kegs/" + beerName;
        const beerTypeLvl = 100 - tap.level * .04;
        const beerLvlInLitres = tap.level / 100;
        
        const cloneKeg = templateKeg.cloneNode(true);
        const beerLvlContainer = cloneKeg.querySelector('span');
        const beerFullLabel = cloneKeg.querySelector('.fullkeg');
        const emptyKeg = cloneKeg.querySelector('.kegimg');

        beerLvlContainer.textContent = beerLvlInLitres;
        beerFullLabel.setAttribute('src', beerTypeSrc + "_full.png");
        emptyKeg.style.backgroundImage = `url(${beerTypeSrc}_empty.png)`;
        beerFullLabel.style.clipPath = `inset(${beerTypeLvl}% 0 0 0)`;

        parentKeg.appendChild(cloneKeg);
    });

    // TOP BEER


    info.serving.forEach(topBeer=>{
        const customerID = topBeer.id;
        let q = ids.indexOf(customerID);
        if (q < 0){
            ids.push(customerID);
            topBeer.order.forEach(beer=>{

                if(beer == "El Hefe"){
                    hefeBeer++;
                }
                else if(beer == "Fairy Tale Ale"){
                    fairyBeer++;
                }
                else if(beer == "GitHop"){
                    gitBeer++;
                }
                else if(beer == "Hollaback Lager"){
                    hollaBeer++;
                }
                else if(beer == "Hoppily Ever After"){
                    hoppiBeer++;
                }
                else if(beer == "Mowintime"){
                    mowinBeer++;
                }
                else if(beer == "Row 26"){
                    rowBeer++;
                }
                else if(beer == "Ruined Childhood"){
                    ruinBeer++;
                }
                else if(beer == "Sleighride"){
                    sleighBeer++;
                }
                else if(beer == "Steampunk"){
                    steamBeer++;
                }
                
            })
        }
        // console.log("hefe:", hefeBeer);
        // console.log("fairy:", fairyBeer);
        // console.log("git:", gitBeer);
        // console.log("holla:", hollaBeer);
        // console.log("hoppi:", hoppiBeer);
        // console.log("mowin:", mowinBeer);
        // console.log("row:", rowBeer);
        // console.log("ruin:", ruinBeer);
        // console.log("sleigh:", sleighBeer);
        // console.log("steam:", steamBeer);
        
        
        beerSoldArray = [hefeBeer, fairyBeer, gitBeer, hollaBeer, hoppiBeer, mowinBeer, rowBeer, ruinBeer, sleighBeer, steamBeer];
        let beerSold = 0;
        for (var i = 0; i < beerSoldArray.length; i++) {
            beerSold += beerSoldArray[i]
        }
        console.log(beerSold);


        const templateTop = document.querySelector('#topTemplate').content;
        const parentTop = document.querySelector('#tops');
        parentTop.innerHTML = '';
        beerSoldArray.forEach(beerTop=>{
            const cloneTop = templateTop.cloneNode(true);
            let topBar = document.querySelector(".topBar");
            topPercentage = 100 / (beerSold / beerTop);
            // topBar.style.width = beerTop;
            console.log(topPercentage);
        })


        // let hefePercent = 100 / (beerSold / hefeBeer);
        // let fairyPercent = 100 / (beerSold / fairyBeer);
        // let gitPercent = 100 / (beerSold / gitBeer);
        // let hollaPercent = 100 / (beerSold / hollaBeer);
        // let hoppiPercent = 100 / (beerSold / hoppiBeer);
        // let mowinPercent = 100 / (beerSold / mowinBeer);
        // let rowPercent = 100 / (beerSold / rowBeer);
        // let ruinPercent = 100 / (beerSold / ruinBeer);
        // let sleighPercent = 100 / (beerSold / sleighBeer);
        // let steamPercent = 100 / (beerSold / steamBeer);


    })

}

