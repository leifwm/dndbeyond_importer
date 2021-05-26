//ver 0.5.0

// Hi, hope this code helps your dnd game

/*

To make sure this code works you must install puppeteer.
Puppeteerit is a Node.js module that helps navigate your browser trough code.
(more on https://pptr.dev/)

for this you must install the following:

node.js and npm ---> "https://nodejs.org/en/download/. access and install it for you OS of choice
this two will allow us to install puppeteer (obs: npm comes bundled with node.js)
to install puppeteer open your Terminal and type:

npm i puppeteer

Note: When you install Puppeteer, it downloads a recent version of Chromium (~170MB Mac, ~282MB Linux, ~280MB Win).
Chromium is basically Chrome but is guaranteed to work and can do headless navigation.

When all this is done you can just run the code using a scripting tool or your terminal.

to use terminal write:

/Users/username/Desktop/scrapperMulti.js (this can be different for you, use your file dierctory this is an example)


if you want to continually support the development of this script and the TTS mod
that goes with it donate to lwm.funds@gmail.com on paypal

enjoy!

*/

//ignore this next lines!!!
const puppeteer = require('puppeteer');

function myLogger(some) {
console.log(some);
}

(async function myFunction (){

//Here is what matters to you, you can insert here the Url for you party's characters, use the sharable link and be sure to set the sheet as public.
var headlessState = true //If you turn this in to false you can see the browser opening your sheets and copying stuff,
//use the setting above to sse if everything is going all right, or change it because its fun to watch.
//sometimes this script can activate ddb captcha, when this happens use false and solve the captcha when it opens then run the script again.


//next insert the urls, you can put as many as you want, but remeber to use "" and ,
var urls = ["https://www.dndbeyond.com/characters/Example",
            "https://www.dndbeyond.com/characters/Example",
            "https://www.dndbeyond.com/characters/Example",
            "https://www.dndbeyond.com/characters/Example",
            "https://www.dndbeyond.com/characters/Example"];



//you shouldn't mess with the rest of the file with no scripting knowledge.

var i;

for (i in urls) {
    await myScrapper(headlessState, urls[i]).then(
            function(value) {myLogger(value);},
            function(error) {myLogger(error);}
    );
}

})();

async function myScrapper(headless, url) {
  const browser = await puppeteer.launch({ headless: headless });
  //await console.log('Launching test');

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto(url);
  //await console.log('User navigated to site');
  await page.waitForTimeout(5000)


const charName = await page.evaluate(() =>
   Array.from(
	 document.querySelectorAll('.ddbc-character-name '),
	 (element, index) => element.textContent,
   )
 )
const charRace = await page.evaluate(() =>
   Array.from(
 	document.querySelectorAll('.ddbc-character-summary__race'),
 	(element, index) => element.textContent,
   )
 )
const charClass = await page.evaluate(() =>
   Array.from(
 	document.querySelectorAll('.ddbc-character-summary__classes'),
 	(element, index) => element.textContent,
   )
 )
const charStats = await page.evaluate(() =>
   Array.from(
 	document.querySelectorAll('.ddbc-ability-summary__primary'),
 	(element, index) => element.textContent,
   )
 )
const charStatsMod = await page.evaluate(() =>
   Array.from(
   document.querySelectorAll('.ddbc-ability-summary__secondary  > span'),
   (element, index) => element.textContent,
   )
 )
const charBonus = await page.evaluate(() =>
   Array.from(
   document.querySelectorAll('.ct-proficiency-bonus-box__value  > span'),
   (element, index) => element.textContent,
   )
 )
const charSpeed = await page.evaluate(() =>
   Array.from(
   document.querySelectorAll('.ct-speed-box__box-value > span'),
   (element, index) => element.textContent,
   )
 )
const charHp = await page.evaluate(() =>
   Array.from(
    document.querySelectorAll('.ct-health-summary__hp-number'),
    (element, index) => element.textContent,
   )
 )
const charSav = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ddbc-saving-throws-summary__ability-modifier'),
   (element, index) => element.textContent,
  )
)
const savAdvdirty = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ct-dice-adjustment-summary > span'),
   (element, index) => element.textContent,
  )
)
const savAdv = savAdvdirty.filter(element => element != '' )
const charSen = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ct-senses__callout-value'),
   (element, index) => element.innerHTML,
  )
)
const charSenExtra = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ct-senses__summary'),
   (element, index) => element.textContent,
  )
)
const charProf = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ct-proficiency-groups__group-items'),
   (element, index) => element.textContent,
  )
)
const charSkill = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ct-skills__col--modifier'),
   (element, index) => element.textContent,
  )
)
const charSkillcleaner = charSkill.shift();
const charInit = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ct-initiative-box'),
   (element, index) => element.textContent,
  )
)
const charAc = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ddbc-armor-class-box__value'),
   (element, index) => element.textContent,
  )
)
const charDefdirty = await page.evaluate(() =>
    Array.from(
    document.querySelectorAll('.ct-defenses-summary__group-items'),
    (element, index) => element.textContent,
    )
)

var defResistenceD = charDefdirty[0];
var defImmunityD = charDefdirty[1];

if (defResistenceD != null) {
var defResistenceS = defResistenceD.match(/[A-Z][a-z]+/g);
var defResistence = defResistenceS.join(', ')
} else {var defResistence = 'None'}

if (defImmunityD != null) {
var defImmunityS = defImmunityD.match(/[A-Z][a-z]+/g);
var defImmunity = defImmunityS.join(', ')
} else {var defImmunity = 'None'}

const charDef = [defResistence, defImmunity]

await page.waitForSelector('.ct-actions > .ddbc-tab-options > .ddbc-tab-options__nav > .ddbc-tab-options__header:nth-child(1) > .ddbc-tab-options__header-heading')
await page.click('.ct-actions > .ddbc-tab-options > .ddbc-tab-options__nav > .ddbc-tab-options__header:nth-child(3) > .ddbc-tab-options__header-heading')

const attackName = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ddbc-combat-attack__label'),
   (element, index) => element.textContent,
  )
)
const attackRange = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ddbc-combat-attack__range-value'),
   (element, index) => element.textContent,
  )
)
const attackBonus = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ddbc-combat-attack__action'),
   (element, index) => element.textContent,
  )
)
const attackDamage = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ddbc-combat-attack__damage'),
   (element, index) => element.textContent,
  )
)
// checking for versatile
var a
for (a in attackDamage) {
    var v = attackDamage[a].includes("d", 4)
    if (v == true) {
        var l = attackDamage[a].length;
        attackDamage[a] = attackDamage[a].slice(0, l/2);
    }

}

const attackNotes = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ddbc-combat-attack__notes'),
   (element, index) => element.textContent,
  )
)
const attackType = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ddbc-combat-attack__meta-item'),
   (element, index) => element.textContent,
  )
)

  const actionTitle = await page.evaluate(() =>
    Array.from(
     document.querySelectorAll('.ct-feature-snippet__heading'),
     (element, index) => element.textContent,
    )
  )
  const actionDescription = await page.evaluate(() =>
    Array.from(
     document.querySelectorAll('.ct-feature-snippet__content'),
     (element, index) => element.textContent,
    )
  )

await page.click('.ct-actions > .ddbc-tab-options > .ddbc-tab-options__nav > .ddbc-tab-options__header:nth-child(4) > .ddbc-tab-options__header-heading')

const bonusActionTitle = await page.evaluate(() =>
    Array.from(
     document.querySelectorAll('.ct-feature-snippet__heading'),
     (element, index) => element.textContent,
    )
  )
const bonusActionDescription = await page.evaluate(() =>
    Array.from(
     document.querySelectorAll('.ct-feature-snippet__content'),
     (element, index) => element.textContent,
    )
  )
const bonusActionSpellsTitle = await page.evaluate(() =>
    Array.from(
     document.querySelectorAll('.ct-actions-list__spells-heading'),
     (element, index) => element.textContent,
    )
  )
const bonusActionSpellsDescription = await page.evaluate(() =>
    Array.from(
     document.querySelectorAll('.ct-actions-list__spells-list'),
     (element, index) => element.textContent,
    )
  )

await page.click('.ct-actions > .ddbc-tab-options > .ddbc-tab-options__nav > .ddbc-tab-options__header:nth-child(5) > .ddbc-tab-options__header-heading')

const reactionTitle = await page.evaluate(() =>
   Array.from(
    document.querySelectorAll('.ct-feature-snippet__heading'),
    (element, index) => element.textContent,
   )
 )
const reactionDescription = await page.evaluate(() =>
   Array.from(
    document.querySelectorAll('.ct-feature-snippet__content'),
    (element, index) => element.textContent,
   )
 )
 // Spell Section --------------------------
var castInfo = undefined
if (await page.$('.ct-primary-box > .ddbc-tab-list > .ddbc-tab-list__nav > .ct-primary-box__tab--spells > .ddbc-tab-list__nav-item-label') !== null)
{

await page.click('.ct-primary-box > .ddbc-tab-list > .ddbc-tab-list__nav > .ct-primary-box__tab--spells > .ddbc-tab-list__nav-item-label')

 var castInfo = await page.evaluate(() =>
   Array.from(
    document.querySelectorAll('.ct-spells-level-casting__info-items'),
    (element, index) => element.textContent,
   )
 )
//console.log(castInfo)

//first filter --------------------------------

var linkNav = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(2) > .ddbc-tab-options__header-heading'),
   (element, index) => element.innerHTML,
    )
)
 if (linkNav[0] != null) {
var linkNavSelector = linkNav[0].match(/(Concentration|Ritual)/g);
 if (linkNavSelector != ('Concentration' || 'Ritual') )
 {
     await page.click('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(2) > .ddbc-tab-options__header-heading')
     var spellsNamePone = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ddbc-spell-name'),
        (element, index) => element.textContent,
       )
     )
     var spellsTimePone = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__activation'),
        (element, index) => element.textContent,
       )
     )
     var spellsRangePone = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__range'),
        (element, index) => element.textContent,
       )
     )
     var spellsHitPone = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__attacking'),
        (element, index) => element.textContent,
       )
     )
     var spellsDmgPone = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__damage'),
        (element, index) => element.textContent,
       )
     )
     var lvlPone = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(2) > .ddbc-tab-options__header-heading'),
        (element, index) => element.textContent,
       )
     )

     //console.log(spellsNamePone)
     //console.log(lvlPone)
     /*console.log(spellsTimePone)
     console.log(spellsRangePone)
     console.log(spellsHitPone)
     console.log(spellsDmgPone)*/

 }
}

//second filter -------------------------


var linkNav = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(3) > .ddbc-tab-options__header-heading'),
   (element, index) => element.innerHTML,
    )
)

 if (linkNav[0] != null) {

var linkNavSelector = linkNav[0].match(/(Concentration|Ritual)/g);
 if (linkNavSelector != ('Concentration' || 'Ritual') )
 {
     await page.click('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(3) > .ddbc-tab-options__header-heading')
     var spellsNamePtwo = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ddbc-spell-name'),
        (element, index) => element.textContent,
       )
     )
     var spellsTimePtwo = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__activation'),
        (element, index) => element.textContent,
       )
     )
     var spellsRangePtwo = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__range'),
        (element, index) => element.textContent,
       )
     )
     var spellsHitPtwo = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__attacking'),
        (element, index) => element.textContent,
       )
     )
     var spellsDmgPtwo = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__damage'),
        (element, index) => element.textContent,
       )
     )
     var lvlPtwo = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(3) > .ddbc-tab-options__header-heading'),
        (element, index) => element.textContent,
       )
     )
     //console.log(spellsNamePtwo)
     /*console.log(spellsTimePtwo)
     console.log(spellsRangePtwo)
     console.log(spellsHitPtwo)
     console.log(spellsDmgPtwo)*/

 }
}

//third filter ---------------------------------------

var linkNav = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(4) > .ddbc-tab-options__header-heading'),
   (element, index) => element.innerHTML,
    )
)

 if (linkNav[0] != null) {
var linkNavSelector = linkNav[0].match(/(Concentration|Ritual)/g);
 if (linkNavSelector != ('Concentration' || 'Ritual') )
 {
     await page.click('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(4) > .ddbc-tab-options__header-heading')
     var spellsNamePthree = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ddbc-spell-name'),
        (element, index) => element.textContent,
       )
     )
     var spellsTimePthree = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__activation'),
        (element, index) => element.textContent,
       )
     )
     var spellsRangePthree = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__range'),
        (element, index) => element.textContent,
       )
     )
     var spellsHitPthree = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__attacking'),
        (element, index) => element.textContent,
       )
     )
     var spellsDmgPthree = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__damage'),
        (element, index) => element.textContent,
       )
     )
     var lvlPthree = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(4) > .ddbc-tab-options__header-heading'),
        (element, index) => element.textContent,
       )
     )
     //console.log(spellsNamePthree)
     /*console.log(spellsTimePthree)
     console.log(spellsRangePthree)
     console.log(spellsHitPthree)
     console.log(spellsDmgPthree)*/

 }
}

//fourth filter ---------------------------------------
var linkNav = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(5) > .ddbc-tab-options__header-heading'),
   (element, index) => element.innerHTML,
    )
)

 if (linkNav[0] != null) {

var linkNavSelector = linkNav[0].match(/(Concentration|Ritual)/g);
 if (linkNavSelector != ('Concentration' || 'Ritual') )
 {
     await page.click('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(5) > .ddbc-tab-options__header-heading')
     var spellsNamePfour = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ddbc-spell-name'),
        (element, index) => element.textContent,
       )
     )
     var spellsTimePfour = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__activation'),
        (element, index) => element.textContent,
       )
     )
     var spellsRangePfour = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__range'),
        (element, index) => element.textContent,
       )
     )
     var spellsHitPfour = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__attacking'),
        (element, index) => element.textContent,
       )
     )
     var spellsDmgPfour = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__damage'),
        (element, index) => element.textContent,
       )
     )
     var lvlPfour = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(5) > .ddbc-tab-options__header-heading'),
        (element, index) => element.textContent,
       )
     )
     //console.log(spellsNamePfour)
     /*console.log(spellsTimePfour)
     console.log(spellsRangePfour)
     console.log(spellsHitPfour)
     console.log(spellsDmgPfour)*/

 }

}
 //fifth filter ---------------------------------------
 var linkNav = await page.evaluate(() =>
   Array.from(
    document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(6) > .ddbc-tab-options__header-heading'),
    (element, index) => element.innerHTML,
     )
 )


 if (linkNav[0] != null) {

 var linkNavSelector = linkNav[0].match(/(Concentration|Ritual)/g);
  if (linkNavSelector != ('Concentration' || 'Ritual') )
  {
      await page.click('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(6) > .ddbc-tab-options__header-heading')
      var spellsNamePfive = await page.evaluate(() =>
        Array.from(
         document.querySelectorAll('.ddbc-spell-name'),
         (element, index) => element.textContent,
        )
      )
      var spellsTimePfive = await page.evaluate(() =>
        Array.from(
         document.querySelectorAll('.ct-spells-spell__activation'),
         (element, index) => element.textContent,
        )
      )
      var spellsRangePfive = await page.evaluate(() =>
        Array.from(
         document.querySelectorAll('.ct-spells-spell__range'),
         (element, index) => element.textContent,
        )
      )
      var spellsHitPfive = await page.evaluate(() =>
        Array.from(
         document.querySelectorAll('.ct-spells-spell__attacking'),
         (element, index) => element.textContent,
        )
      )
      var spellsDmgPfive = await page.evaluate(() =>
        Array.from(
         document.querySelectorAll('.ct-spells-spell__damage'),
         (element, index) => element.textContent,
        )
      )
      var lvlPfive = await page.evaluate(() =>
        Array.from(
         document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(6) > .ddbc-tab-options__header-heading'),
         (element, index) => element.textContent,
        )
      )
      //console.log(spellsNamePfive)
      /*console.log(spellsTimePfive)
      console.log(spellsRangePfive)
      console.log(spellsHitPfive)
      console.log(spellsDmgPfive)*/

  }
}

  //Sixth filter ---------------------------------------
  var linkNav = await page.evaluate(() =>
    Array.from(
     document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(7) > .ddbc-tab-options__header-heading'),
     (element, index) => element.innerHTML,
      )
  )

  if (linkNav[0] != null) {

  var linkNavSelector = linkNav[0].match(/(Concentration|Ritual)/g);
   if (linkNavSelector != ('Concentration' || 'Ritual') )
   {
       await page.click('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(7) > .ddbc-tab-options__header-heading')
       var spellsNamePsix = await page.evaluate(() =>
         Array.from(
          document.querySelectorAll('.ddbc-spell-name'),
          (element, index) => element.textContent,
         )
       )
       var spellsTimePsix = await page.evaluate(() =>
         Array.from(
          document.querySelectorAll('.ct-spells-spell__activation'),
          (element, index) => element.textContent,
         )
       )
       var spellsRangePsix = await page.evaluate(() =>
         Array.from(
          document.querySelectorAll('.ct-spells-spell__range'),
          (element, index) => element.textContent,
         )
       )
       var spellsHitPsix = await page.evaluate(() =>
         Array.from(
          document.querySelectorAll('.ct-spells-spell__attacking'),
          (element, index) => element.textContent,
         )
       )
       var spellsDmgPsix = await page.evaluate(() =>
         Array.from(
          document.querySelectorAll('.ct-spells-spell__damage'),
          (element, index) => element.textContent,
         )
       )
       var lvlPsix = await page.evaluate(() =>
         Array.from(
          document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(7) > .ddbc-tab-options__header-heading'),
          (element, index) => element.textContent,
         )
       )
       //console.log(spellsNamePsix)
       /*console.log(spellsTimePsix)
       console.log(spellsRangePsix)
       console.log(spellsHitPsix)
       console.log(spellsDmgPsix)*/

   }
}
   //Seventh filter ---------------------------------------

   var linkNav = await page.evaluate(() =>
     Array.from(
      document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(8) > .ddbc-tab-options__header-heading'),
      (element, index) => element.innerHTML,
       )
   )

   if (linkNav[0] != null) {

   var linkNavSelector = linkNav[0].match(/(Concentration|Ritual)/g);
    if (linkNavSelector != ('Concentration' || 'Ritual') )
    {
        await page.click('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(8) > .ddbc-tab-options__header-heading')
        var spellsNamePseven = await page.evaluate(() =>
          Array.from(
           document.querySelectorAll('.ddbc-spell-name'),
           (element, index) => element.textContent,
          )
        )
        var spellsTimePseven = await page.evaluate(() =>
          Array.from(
           document.querySelectorAll('.ct-spells-spell__activation'),
           (element, index) => element.textContent,
          )
        )
        var spellsRangePseven = await page.evaluate(() =>
          Array.from(
           document.querySelectorAll('.ct-spells-spell__range'),
           (element, index) => element.textContent,
          )
        )
        var spellsHitPseven = await page.evaluate(() =>
          Array.from(
           document.querySelectorAll('.ct-spells-spell__attacking'),
           (element, index) => element.textContent,
          )
        )
        var spellsDmgPseven = await page.evaluate(() =>
          Array.from(
           document.querySelectorAll('.ct-spells-spell__damage'),
           (element, index) => element.textContent,
          )
        )
        var lvlPseven = await page.evaluate(() =>
          Array.from(
           document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(8) > .ddbc-tab-options__header-heading'),
           (element, index) => element.textContent,
          )
        )
        //console.log(spellsNamePseven)
        /*console.log(spellsTimePseven)
        console.log(spellsRangePseven)
        console.log(spellsHitPseven)
        console.log(spellsDmgPseven)*/

    }
}
    //eight filter ---------------------------------------

    var linkNav = await page.evaluate(() =>
      Array.from(
       document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(9) > .ddbc-tab-options__header-heading'),
       (element, index) => element.innerHTML,
        )
    )

    if (linkNav[0] != null) {

    var linkNavSelector = linkNav[0].match(/(Concentration|Ritual)/g);
     if (linkNavSelector != ('Concentration' || 'Ritual') )
     {
         await page.click('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(9) > .ddbc-tab-options__header-heading')
         var spellsNamePeight = await page.evaluate(() =>
           Array.from(
            document.querySelectorAll('.ddbc-spell-name'),
            (element, index) => element.textContent,
           )
         )
         var spellsTimePeight = await page.evaluate(() =>
           Array.from(
            document.querySelectorAll('.ct-spells-spell__activation'),
            (element, index) => element.textContent,
           )
         )
         var spellsRangePeight = await page.evaluate(() =>
           Array.from(
            document.querySelectorAll('.ct-spells-spell__range'),
            (element, index) => element.textContent,
           )
         )
         var spellsHitPeight = await page.evaluate(() =>
           Array.from(
            document.querySelectorAll('.ct-spells-spell__attacking'),
            (element, index) => element.textContent,
           )
         )
         var spellsDmgPeight = await page.evaluate(() =>
           Array.from(
            document.querySelectorAll('.ct-spells-spell__damage'),
            (element, index) => element.textContent,
           )
         )
         var lvlPeight = await page.evaluate(() =>
           Array.from(
            document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(9) > .ddbc-tab-options__header-heading'),
            (element, index) => element.textContent,
           )
         )
         //console.log(spellsNamePeight)
         /*console.log(spellsTimePeight)
         console.log(spellsRangePeight)
         console.log(spellsHitPeight)
         console.log(spellsDmgPeight)*/

     }
}
     //nineth filter ---------------------------------------

     var linkNav = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(10) > .ddbc-tab-options__header-heading'),
        (element, index) => element.innerHTML,
         )
     )

     if (linkNav[0] != null) {

     var linkNavSelector = linkNav[0].match(/(Concentration|Ritual)/g);
      if (linkNavSelector != ('Concentration' || 'Ritual') )
      {
          await page.click('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(10) > .ddbc-tab-options__header-heading')
          var spellsNamePnine = await page.evaluate(() =>
            Array.from(
             document.querySelectorAll('.ddbc-spell-name'),
             (element, index) => element.textContent,
            )
          )
          var spellsTimePnine = await page.evaluate(() =>
            Array.from(
             document.querySelectorAll('.ct-spells-spell__activation'),
             (element, index) => element.textContent,
            )
          )
          var spellsRangePnine = await page.evaluate(() =>
            Array.from(
             document.querySelectorAll('.ct-spells-spell__range'),
             (element, index) => element.textContent,
            )
          )
          var spellsHitPnine = await page.evaluate(() =>
            Array.from(
             document.querySelectorAll('.ct-spells-spell__attacking'),
             (element, index) => element.textContent,
            )
          )
          var spellsDmgPnine = await page.evaluate(() =>
            Array.from(
             document.querySelectorAll('.ct-spells-spell__damage'),
             (element, index) => element.textContent,
            )
          )
          var lvlPnine = await page.evaluate(() =>
            Array.from(
             document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(10) > .ddbc-tab-options__header-heading'),
             (element, index) => element.textContent,
            )
          )
          //console.log(spellsNamePnine)
          /*console.log(spellsTimePnine)
          console.log(spellsRangePnine)
          console.log(spellsHitPnine)
          console.log(spellsDmgPnine)*/

      }
}
      //tenth filter ---------------------------------------

      var linkNav = await page.evaluate(() =>
        Array.from(
         document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(11) > .ddbc-tab-options__header-heading'),
         (element, index) => element.innerHTML,
          )
      )

      if (linkNav[0] != null) {

      var linkNavSelector = linkNav[0].match(/(Concentration|Ritual)/g);
       if (linkNavSelector != ('Concentration' || 'Ritual') )
       {
           await page.click('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(11) > .ddbc-tab-options__header-heading')
           var spellsNamePten = await page.evaluate(() =>
             Array.from(
              document.querySelectorAll('.ddbc-spell-name'),
              (element, index) => element.textContent,
             )
           )
           var spellsTimePten = await page.evaluate(() =>
             Array.from(
              document.querySelectorAll('.ct-spells-spell__activation'),
              (element, index) => element.textContent,
             )
           )
           var spellsRangePten = await page.evaluate(() =>
             Array.from(
              document.querySelectorAll('.ct-spells-spell__range'),
              (element, index) => element.textContent,
             )
           )
           var spellsHitPten = await page.evaluate(() =>
             Array.from(
              document.querySelectorAll('.ct-spells-spell__attacking'),
              (element, index) => element.textContent,
             )
           )
           var spellsDmgPten = await page.evaluate(() =>
             Array.from(
              document.querySelectorAll('.ct-spells-spell__damage'),
              (element, index) => element.textContent,
             )
           )
           var lvlPten = await page.evaluate(() =>
             Array.from(
              document.querySelectorAll('.ct-spells__content > .ddbc-tab-options > .ddbc-tab-options__nav > .ct-spells__tab-level:nth-child(11) > .ddbc-tab-options__header-heading'),
              (element, index) => element.textContent,
             )
           )
           //console.log(spellsNamePten)
           /*console.log(spellsTimePten)
           console.log(spellsRangePten)
           console.log(spellsHitPten)
           console.log(spellsDmgPten)*/

       }
}

}
// End Spell Section --------------------------


// Inventory ------------------------
 await page.click('.ct-primary-box > .ddbc-tab-list > .ddbc-tab-list__nav > .ct-primary-box__tab--equipment > .ddbc-tab-list__nav-item-label')

 const invName = await page.evaluate(() =>
   Array.from(
    document.querySelectorAll('.ct-inventory-item__heading > .ddbc-item-name'),
    (element, index) => element.textContent,
   )
 )
 const invWeight = await page.evaluate(() =>
   Array.from(
    document.querySelectorAll('.ct-inventory-item__weight'),
    (element, index) => element.textContent,
   )
 )
 const invQuantity = await page.evaluate(() =>
   Array.from(
    document.querySelectorAll('.ct-inventory-item__quantity'),
    (element, index) => element.textContent,
   )
 )
 const invCost = await page.evaluate(() =>
   Array.from(
    document.querySelectorAll('.ct-inventory-item__cost'),
    (element, index) => element.textContent,
   )
 )
/*
console.log(invName.length)
console.log(invName)
console.log(invWeight.length)
console.log(invWeight)
console.log(invQuantity.length)
console.log(invQuantity)
console.log(invCost.length)
console.log(invCost)
*/
// Inventory  End ------------------------

await page.click('.ct-primary-box > .ddbc-tab-list > .ddbc-tab-list__nav > .ct-primary-box__tab--features > .ddbc-tab-list__nav-item-label')

const featTitle = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ct-feature-snippet > .ct-feature-snippet__heading'),
   (element, index) => element.textContent,
  )
)
const featDescription = await page.evaluate(() =>
  Array.from(
   document.querySelectorAll('.ct-feature-snippet__content'),
   (element, index) => element.textContent,
  )
)

browser.close();
//console.log('Browser closed');

/*console.log(featTitle)
console.log(featDescription)
console.log(featTitle.length)
console.log(featDescription.length)*/


 /*console.log((JSON.stringify(charName.concat(charRace, charClass))))
 console.log('Atributes', (JSON.stringify(charStats)))
 console.log('Modifiers',(JSON.stringify(charStatsMod)))
 console.log('Proficiency',(JSON.stringify(charBonus)))
 console.log('Speed', (JSON.stringify(charSpeed)))
 console.log('Hp', (JSON.stringify(charHp)))
 console.log('Saves', (JSON.stringify(charSav)))
 console.log('Senses', (JSON.stringify(charSen)))
 console.log('Vision', (JSON.stringify(charSenExtra)))
 console.log('Skills', (JSON.stringify(charSkill)))
 console.log('Initiative', (JSON.stringify(charInit)))
 console.log('AC', (JSON.stringify(charAc)))
 console.log('Defenses', (JSON.stringify(charDef)))
 //Vaiable Length
 console.log('Proficiencies', (JSON.stringify(charProf)))
 console.log('Save Advantage',(JSON.stringify(savAdv)))
 console.log('Attacks', (JSON.stringify(attackName)))
 console.log('Attacks Range', (JSON.stringify(attackRange)))
 console.log('Attacks Bonus', (JSON.stringify(attackBonus)))
 console.log('Attacks Damage', (JSON.stringify(attackDamage)))
 console.log('Attacks Notes', (JSON.stringify(attackNotes)))
 console.log('Attacks Type', (JSON.stringify(attackType)))
 console.log('Actions', (JSON.stringify(actionTitle)))
 console.log('Actions Description', (JSON.stringify(actionDescription)))
 console.log('Bonus Actions', (JSON.stringify(bonusActionTitle)))
 console.log('Bonus Actions Description', (JSON.stringify(bonusActionDescription)))
 console.log('Bonus Actions Spells', (JSON.stringify(bonusActionSpellsTitle)))
 console.log('Bonus Actions Spells Description', (JSON.stringify(bonusActionSpellsDescription)))
 console.log('Reactions', (JSON.stringify(reactionTitle)))
 console.log('Reactions Description', (JSON.stringify(reactionDescription)))
 //SpelLs
if (castInfo != undefined)
{
 console.log('Caster', (JSON.stringify(castInfo)))
 console.log('Spells Names', (JSON.stringify(spellsNamePone.concat(spellsNamePtwo, spellsNamePthree, spellsNamePfour, spellsNamePfive, spellsNamePsix, spellsNamePseven, spellsNamePeight, spellsNamePnine, spellsNamePten,))))
 console.log('Spells Times', (JSON.stringify(spellsTimePone.concat(spellsTimePtwo, spellsTimePthree, spellsTimePfour, spellsTimePfive, spellsTimePsix, spellsTimePseven, spellsTimePeight, spellsTimePnine, spellsTimePten,))))
 console.log('Spells Ranges', (JSON.stringify(spellsRangePone.concat(spellsRangePtwo, spellsRangePthree, spellsRangePfour, spellsRangePfive, spellsRangePsix, spellsRangePseven, spellsRangePeight, spellsRangePnine, spellsRangePten,))))
 console.log('Spells To Hit', (JSON.stringify(spellsHitPone.concat(spellsHitPtwo, spellsHitPthree, spellsHitPfour, spellsHitPfive, spellsHitPsix, spellsHitPseven, spellsHitPeight, spellsHitPnine, spellsHitPten,))))
 console.log('Spells Damage', (JSON.stringify(spellsDmgPone.concat(spellsDmgPtwo, spellsDmgPthree, spellsDmgPfour, spellsDmgPfive, spellsDmgPsix, spellsDmgPseven, spellsDmgPeight, spellsDmgPnine, spellsDmgPten,))))
}
else {console.log('Not a Caster')}
//Inventory
console.log('Items', (JSON.stringify(invName)))
console.log('Items Weight', (JSON.stringify(invWeight)))
console.log('Items Quantity', (JSON.stringify(invQuantity)))
console.log('Items Cost', (JSON.stringify(invCost)))
//Features
console.log('Features', (JSON.stringify(featTitle)))
console.log('Features Description', (JSON.stringify(featDescription)))

*/



var ficha = {
         name: charName[0],
         race: charRace[0],
         class: charClass[0],

         strAtr: charStats[0],
         dexAtr: charStats[1],
         conAtr: charStats[2],
         intAtr: charStats[3],
         wisAtr: charStats[4],
         chaAtr: charStats[5],

         strhMod: charStatsMod[0],
         dexMod: charStatsMod[1],
         conMod: charStatsMod[2],
         intMod: charStatsMod[3],
         wisMod: charStatsMod[4],
         chaMod: charStatsMod[5],

         proficiency: charBonus[0],
         speed: charSpeed[0],
         currentHp: charHp[0],
         maxHp: charHp[1],

         strSav: charSav[0],
         dexSav: charSav[1],
         conSav: charSav[2],
         intSav: charSav[3],
         wisSav: charSav[4],
         chaSav: charSav[5],

         passPerc: charSen[0],
         passInve: charSen[1],
         passInsi: charSen[2],
         extraSenses: charSenExtra[0],

         armorProf: charProf[0],
         weaponProf: charProf[1],
         toolProf: charProf[2],
         languageProf: charProf[3],

         acrobatics: charSkill[0],
         handling: charSkill[1],
         arcana: charSkill[2],
         athletics: charSkill[3],
         deception: charSkill[4],
         history: charSkill[5],
         insight: charSkill[6],
         intimidation: charSkill[7],
         investigation: charSkill[8],
         medicine: charSkill[9],
         nature: charSkill[10],
         perception: charSkill[11],
         performance: charSkill[12],
         persuasion: charSkill[13],
         religion: charSkill[14],
         hand: charSkill[15],
         stealth: charSkill[16],
         survival: charSkill[17],

         initiative: charInit[0],
         armorClass: charAc[0],

 }

 // Attacks
var numberOfAttacks = attackName.length;
ficha.numberOfAttacks = numberOfAttacks,
ficha.attackName = attackName,
ficha.attackRange = attackRange,
ficha.attackBonus = attackBonus,
ficha.attackDamage = attackDamage,
ficha.attackNotes = attackNotes,
ficha.attackType = attackType

//Actions
var numberOfActions = actionTitle.length;
ficha.numberOfActions = numberOfActions,
ficha.action = actionTitle,
ficha.actionDescription = actionDescription

//Bonus Action

var numberOfBonusActions = bonusActionTitle.length;
ficha.numberOfBonusActions = numberOfBonusActions,
ficha.bonusActionTitle = bonusActionTitle,
ficha.bonusActionDescription = bonusActionDescription

var numberOfBonusActionsSpells = bonusActionSpellsTitle.length;
ficha.numberOfBonusActionsSpells = numberOfBonusActionsSpells,
ficha.bonusActionSpellsTitle = bonusActionSpellsTitle,
ficha.bonusActionSpellsDescription = bonusActionSpellsDescription


//Reactions
var numberOfreactions = reactionTitle.length;
ficha.reactionTitle = reactionTitle,
ficha.reactionDescription = reactionDescription

//Inventory
var numberOfItems = invName.length;
ficha.numberOfItems = numberOfItems,
ficha.invName = invName,
ficha.invWeight = invWeight,
ficha.invQuantity = invQuantity,
ficha.invCost = invCost

//features
var numberOfFeats = featTitle.length;
ficha.numberOfFeats = numberOfFeats,
ficha.featTitle = featTitle,
ficha.featDescription = featDescription


//SpelLs
var i;

if (castInfo != null)
{
ficha['spellMod'] = castInfo[0]
ficha['spellAtc'] = castInfo[1]
ficha['spellSave'] = castInfo[2]
};

//filter One
if (lvlPone != undefined) {

    var labelPone = lvlPone[0]

    if (labelPone == '- 0 -') {var labelPone = 0}

    ficha['labelPone'] = labelPone

    ficha.spellsNamePone = spellsNamePone
    ficha.spellsTimePone = spellsTimePone
    ficha.spellsRangePone = spellsRangePone
    ficha.spellsHitPone = spellsHitPone
    ficha.spellsDmgPone = spellsDmgPone

}

//Filter Two

if (lvlPtwo != undefined) {

    var labelPtwo = lvlPtwo[0]

    ficha['labelPtwo'] = labelPtwo

    ficha.spellsNamePtwo = spellsNamePtwo
    ficha.spellsTimePtwo = spellsTimePtwo
    ficha.spellsRangePtwo = spellsRangePtwo
    ficha.spellsHitPtwo = spellsHitPtwo
    ficha.spellsDmgPtwo = spellsDmgPtwo
}

//Filter Three

if (lvlPthree != undefined) {

    var labelPthree = lvlPthree[0]

    ficha['labelPthree'] = labelPthree

    ficha.spellsNamePthree = spellsNamePthree
    ficha.spellsTimePthree = spellsTimePthree
    ficha.spellsRangePthree = spellsRangePthree
    ficha.spellsHitPthree = spellsHitPthree
    ficha.spellsDmgPthree = spellsDmgPthree
}

//Filter Four

if (lvlPfour != undefined) {

    var labelPfour = lvlPfour[0]

    ficha['labelPfour'] = labelPfour

    ficha.spellsNamePfour = spellsNamePfour
    ficha.spellsTimePfour = spellsTimePfour
    ficha.spellsRangePfour = spellsRangePfour
    ficha.spellsHitPfour = spellsHitPfour
    ficha.spellsDmgPfour = spellsDmgPfour
}

//Filter Five

if (lvlPfive != undefined) {

    var labelPfive = lvlPfive[0]

    ficha['labelPfive'] = labelPfive

    ficha.spellsNamePfive = spellsNamePfive
    ficha.spellsTimePfive = spellsTimePfive
    ficha.spellsRangePfive = spellsRangePfive
    ficha.spellsHitPfive = spellsHitPfive
    ficha.spellsDmgPfive = spellsDmgPfive
}

//Filter Six

if (lvlPsix != undefined) {

    var labelPsix = lvlPsix[0]

    ficha['labelPsix'] = labelPsix

    ficha.spellsNamePsix = spellsNamePsix
    ficha.spellsTimePsix = spellsTimePsix
    ficha.spellsRangePsix = spellsRangePsix
    ficha.spellsHitPsix = spellsHitPsix
    ficha.spellsDmgPsix = spellsDmgPsix
}


//Filter Seven

if (lvlPseven != undefined) {

    var labelPseven = lvlPseven[0]

    ficha['labelPseven'] = labelPseven

    ficha.spellsNamePseven = spellsNamePseven
    ficha.spellsTimePseven = spellsTimePseven
    ficha.spellsRangePseven = spellsRangePseven
    ficha.spellsHitPseven = spellsHitPseven
    ficha.spellsDmgPseven = spellsDmgPseven
}

//Filter Eight

if (lvlPeight != undefined) {

    var labelPeight = lvlPeight[0]

    ficha['labelPeight'] = labelPeight

    ficha.spellsNamePeight = spellsNamePeight
    ficha.spellsTimePeight = spellsTimePeight
    ficha.spellsRangePeight = spellsRangePeight
    ficha.spellsHitPeight = spellsHitPeight
    ficha.spellsDmgPeight = spellsDmgPeight
}

//Filter Nine

if (lvlPnine != undefined) {

    var labelPnine = lvlPnine[0]

    ficha['labelPnine'] = labelPnine

    ficha.spellsNamePnine = spellsNamePnine
    ficha.spellsTimePnine = spellsTimePnine
    ficha.spellsRangePnine = spellsRangePnine
    ficha.spellsHitPnine = spellsHitPnine
    ficha.spellsDmgPnine = spellsDmgPnine
}

//Filter Ten

if (lvlPten != undefined) {

    var labelPten = lvlPten[0]

    ficha['labelPten'] = labelPten

    ficha.spellsNamePten = spellsNamePten
    ficha.spellsTimePten = spellsTimePten
    ficha.spellsRangePten = spellsRangePten
    ficha.spellsHitPten = spellsHitPten
    ficha.spellsDmgPten = spellsDmgPten
}


//console.log(ficha)
//console.log((JSON.stringify(ficha)))
var fichaJSON = (JSON.stringify(ficha));
//console.log(fichaJSON);
return fichaJSON;








};
