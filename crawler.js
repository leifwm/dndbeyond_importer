//version: 0.0.1

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  await console.log('Launching test');

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('https://www.dndbeyond.com/characters/34924358/QlCriX');
  await console.log('User navigated to site');
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

 await page.waitForSelector('.ct-actions > .ddbc-tab-options > .ddbc-tab-options__nav > .ddbc-tab-options__header:nth-child(3) > .ddbc-tab-options__header-heading')
  await page.click('.ct-actions > .ddbc-tab-options > .ddbc-tab-options__nav > .ddbc-tab-options__header:nth-child(3) > .ddbc-tab-options__header-heading')

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
    document.querySelectorAll('.ddbc-item-name'),
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

/*console.log(invName)
console.log(invWeight)
console.log(invQuantity)
console.log(invCost)*/

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
console.log('Browser closed');

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
         clas: charClass[0],

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

         proficiency: charBonus,
         speed: charSpeed,
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
         stealh: charSkill[16],
         survival: charSkill[17],

         initiative: charInit[0],
         armorClass: charAc[0],

 }

 // Attacks
var numberOfAttacks = attackName.length;
var i;

for (i = 0; i < numberOfAttacks; i++){
ficha['attack' + i] = attackName[i]
}
for (i = 0; i < numberOfAttacks; i++){
ficha['attackRange' + i] = attackRange[i]
}
for (i = 0; i < numberOfAttacks; i++){
ficha['attackBonus' + i] = attackBonus[i]
}
for (i = 0; i < numberOfAttacks; i++){
ficha['attackDamage' + i] = attackDamage[i]
}
for (i = 0; i < numberOfAttacks; i++){
ficha['attackNotes' + i] = attackNotes[i]
}
for (i = 0; i < numberOfAttacks; i++){
ficha['attackType' + i] = attackType[i]
}

//Actions

var numberOfActions = actionTitle.length;

for (i = 0; i < numberOfActions; i++){
ficha['action' + i] = actionTitle[i]
}
for (i = 0; i < numberOfActions; i++){
ficha['actionDescription' + i] = actionDescription[i]
}

//Bonus Action

var numberOfBonusActions = bonusActionTitle.length;

for (i = 0; i < numberOfBonusActions; i++){
ficha['bAction' + i] = bonusActionTitle[i]
}
for (i = 0; i < numberOfBonusActions; i++){
ficha['bActionDescription' + i] = bonusActionDescription[i]
}

var numberOfBonusActionsS = bonusActionSpellsTitle.length;

for (i = 0; i < numberOfBonusActionsS; i++){
ficha['bActionSpell' + i] = bonusActionSpellsTitle[i]
}
for (i = 0; i < numberOfBonusActionsS; i++){
ficha['bActionDescriptionSpell' + i] = bonusActionSpellsDescription[i]
}

//Reactions

var numberOfreActions = reactionTitle.length;

for (i = 0; i < numberOfreActions; i++){
ficha['action' + i] = reactionTitle[i]
}
for (i = 0; i < numberOfreActions; i++){
ficha['actionDescription' + i] = reactionDescription[i]
}

//Inventory

var numberOfItems = invName.length;

for (i = 0; i < numberOfItems; i++){
ficha['item' + i] = invName[i]
}
for (i = 0; i < numberOfItems; i++){
ficha['itemWeight' + i] = invWeight[i]
}
for (i = 0; i < numberOfItems; i++){
ficha['itemQuantity' + i] = invQuantity[i]
}
for (i = 0; i < numberOfItems; i++){
ficha['itemCost' + i] = invCost[i]
}

//features

var numberOfFeats = featTitle.length;

for (i = 0; i < numberOfFeats; i++){
ficha['Feature' + i] = featTitle[i]
}
for (i = 0; i < numberOfFeats; i++){
ficha['FeatureDescription' + i] = featDescription[i]
}

//SpelLs

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

    var nPoneSpells = spellsNamePone.length;

    for (i = 0; i < nPoneSpells; i++){
    ficha[labelPone + 'Spell' + i] = spellsNamePone[i]
    }
    for (i = 0; i < nPoneSpells; i++){
    ficha[labelPone + 'Spell' + i + 'Time' ] = spellsTimePone[i]
    }
    for (i = 0; i < nPoneSpells; i++){
    ficha[labelPone + 'Spell' + i + 'Range' ] = spellsRangePone[i]
    }
    for (i = 0; i < nPoneSpells; i++){
    ficha[labelPone + 'Spell' + i + 'Hit' ] = spellsHitPone[i]
    }
    for (i = 0; i < nPoneSpells; i++){
    ficha[labelPone + 'Spell' + i + 'Dmg' ] = spellsDmgPone[i]
    }
}

//Filter Two

if (lvlPtwo != undefined) {

    var labelPtwo = lvlPtwo[0]

    ficha['labelPtwo'] = labelPtwo

    var nPtwoSpells = spellsNamePtwo.length;

    for (i = 0; i < nPtwoSpells; i++){
    ficha[labelPtwo + 'Spell' + i] = spellsNamePtwo[i]
    }
    for (i = 0; i < nPtwoSpells; i++){
    ficha[labelPtwo + 'Spell' + i + 'Time' ] = spellsTimePtwo[i]
    }
    for (i = 0; i < nPtwoSpells; i++){
    ficha[labelPtwo + 'Spell' + i + 'Range' ] = spellsRangePtwo[i]
    }
    for (i = 0; i < nPtwoSpells; i++){
    ficha[labelPtwo + 'Spell' + i + 'Hit' ] = spellsHitPtwo[i]
    }
    for (i = 0; i < nPtwoSpells; i++){
    ficha[labelPtwo + 'Spell' + i + 'Dmg' ] = spellsDmgPtwo[i]
    }
}

//Filter Three

if (lvlPthree != undefined) {

    var labelPthree = lvlPthree[0]

    ficha['labelPthree'] = labelPthree

    var nPthreeSpells = spellsNamePthree.length;

    for (i = 0; i < nPthreeSpells; i++){
    ficha[labelPthree + 'Spell' + i] = spellsNamePthree[i]
    }
    for (i = 0; i < nPthreeSpells; i++){
    ficha[labelPthree + 'Spell' + i + 'Time' ] = spellsTimePthree[i]
    }
    for (i = 0; i < nPthreeSpells; i++){
    ficha[labelPthree + 'Spell' + i + 'Range' ] = spellsRangePthree[i]
    }
    for (i = 0; i < nPthreeSpells; i++){
    ficha[labelPthree + 'Spell' + i + 'Hit' ] = spellsHitPthree[i]
    }
    for (i = 0; i < nPthreeSpells; i++){
    ficha[labelPthree + 'Spell' + i + 'Dmg' ] = spellsDmgPthree[i]
    }
}

//Filter Four

if (lvlPfour != undefined) {

    var labelPfour = lvlPfour[0]

    ficha['labelPfour'] = labelPfour

    var nPfourSpells = spellsNamePfour.length;

    for (i = 0; i < nPfourSpells; i++){
    ficha[labelPfour + 'Spell' + i] = spellsNamePfour[i]
    }
    for (i = 0; i < nPfourSpells; i++){
    ficha[labelPfour + 'Spell' + i + 'Time' ] = spellsTimePfour[i]
    }
    for (i = 0; i < nPfourSpells; i++){
    ficha[labelPfour + 'Spell' + i + 'Range' ] = spellsRangePfour[i]
    }
    for (i = 0; i < nPfourSpells; i++){
    ficha[labelPfour + 'Spell' + i + 'Hit' ] = spellsHitPfour[i]
    }
    for (i = 0; i < nPfourSpells; i++){
    ficha[labelPfour + 'Spell' + i + 'Dmg' ] = spellsDmgPfour[i]
    }
}

//Filter Five

if (lvlPfive != undefined) {

    var labelPfive = lvlPfive[0]

    ficha['labelPfive'] = labelPfive

    var nPfiveSpells = spellsNamePfive.length;

    for (i = 0; i < nPfiveSpells; i++){
    ficha[labelPfive + 'Spell' + i] = spellsNamePfive[i]
    }
    for (i = 0; i < nPfiveSpells; i++){
    ficha[labelPfive + 'Spell' + i + 'Time' ] = spellsTimePfive[i]
    }
    for (i = 0; i < nPfiveSpells; i++){
    ficha[labelPfive + 'Spell' + i + 'Range' ] = spellsRangePfive[i]
    }
    for (i = 0; i < nPfiveSpells; i++){
    ficha[labelPfive + 'Spell' + i + 'Hit' ] = spellsHitPfive[i]
    }
    for (i = 0; i < nPfiveSpells; i++){
    ficha[labelPfive + 'Spell' + i + 'Dmg' ] = spellsDmgPfive[i]
    }
}

//Filter Six

if (lvlPsix != undefined) {

    var labelPsix = lvlPsix[0]

    ficha['labelPsix'] = labelPsix

    var nPsixSpells = spellsNamePsix.length;

    for (i = 0; i < nPsixSpells; i++){
    ficha[labelPsix + 'Spell' + i] = spellsNamePsix[i]
    }
    for (i = 0; i < nPsixSpells; i++){
    ficha[labelPsix + 'Spell' + i + 'Time' ] = spellsTimePsix[i]
    }
    for (i = 0; i < nPsixSpells; i++){
    ficha[labelPsix + 'Spell' + i + 'Range' ] = spellsRangePsix[i]
    }
    for (i = 0; i < nPsixSpells; i++){
    ficha[labelPsix + 'Spell' + i + 'Hit' ] = spellsHitPsix[i]
    }
    for (i = 0; i < nPsixSpells; i++){
    ficha[labelPsix + 'Spell' + i + 'Dmg' ] = spellsDmgPsix[i]
    }
}


//Filter Seven

if (lvlPseven != undefined) {

    var labelPseven = lvlPseven[0]

    ficha['labelPseven'] = labelPseven

    var nPsevenSpells = spellsNamePseven.length;

    for (i = 0; i < nPsevenSpells; i++){
    ficha[labelPseven + 'Spell' + i] = spellsNamePseven[i]
    }
    for (i = 0; i < nPsevenSpells; i++){
    ficha[labelPseven + 'Spell' + i + 'Time' ] = spellsTimePseven[i]
    }
    for (i = 0; i < nPsevenSpells; i++){
    ficha[labelPseven + 'Spell' + i + 'Range' ] = spellsRangePseven[i]
    }
    for (i = 0; i < nPsevenSpells; i++){
    ficha[labelPseven + 'Spell' + i + 'Hit' ] = spellsHitPseven[i]
    }
    for (i = 0; i < nPsevenSpells; i++){
    ficha[labelPseven + 'Spell' + i + 'Dmg' ] = spellsDmgPseven[i]
    }
}

//Filter Eight

if (lvlPeight != undefined) {

    var labelPeight = lvlPeight[0]

    ficha['labelPeight'] = labelPeight

    var nPeightSpells = spellsNamePeight.length;

    for (i = 0; i < nPeightSpells; i++){
    ficha[labelPeight + 'Spell' + i] = spellsNamePeight[i]
    }
    for (i = 0; i < nPeightSpells; i++){
    ficha[labelPeight + 'Spell' + i + 'Time' ] = spellsTimePeight[i]
    }
    for (i = 0; i < nPeightSpells; i++){
    ficha[labelPeight + 'Spell' + i + 'Range' ] = spellsRangePeight[i]
    }
    for (i = 0; i < nPeightSpells; i++){
    ficha[labelPeight + 'Spell' + i + 'Hit' ] = spellsHitPeight[i]
    }
    for (i = 0; i < nPeightSpells; i++){
    ficha[labelPeight + 'Spell' + i + 'Dmg' ] = spellsDmgPeight[i]
    }
}


//Filter Nine

if (lvlPnine != undefined) {

    var labelPnine = lvlPnine[0]

    ficha['labelPnine'] = labelPnine

    var nPnineSpells = spellsNamePnine.length;

    for (i = 0; i < nPnineSpells; i++){
    ficha[labelPnine + 'Spell' + i] = spellsNamePnine[i]
    }
    for (i = 0; i < nPnineSpells; i++){
    ficha[labelPnine + 'Spell' + i + 'Time' ] = spellsTimePnine[i]
    }
    for (i = 0; i < nPnineSpells; i++){
    ficha[labelPnine + 'Spell' + i + 'Range' ] = spellsRangePnine[i]
    }
    for (i = 0; i < nPnineSpells; i++){
    ficha[labelPnine + 'Spell' + i + 'Hit' ] = spellsHitPnine[i]
    }
    for (i = 0; i < nPnineSpells; i++){
    ficha[labelPnine + 'Spell' + i + 'Dmg' ] = spellsDmgPnine[i]
    }
}

//Filter Ten

if (lvlPten != undefined) {

    var labelPten = lvlPten[0]

    ficha['labelPten'] = labelPten

    var nPtenSpells = spellsNamePten.length;

    for (i = 0; i < nPtenSpells; i++){
    ficha[labelPten + 'Spell' + i] = spellsNamePten[i]
    }
    for (i = 0; i < nPtenSpells; i++){
    ficha[labelPten + 'Spell' + i + 'Time' ] = spellsTimePten[i]
    }
    for (i = 0; i < nPtenSpells; i++){
    ficha[labelPten + 'Spell' + i + 'Range' ] = spellsRangePten[i]
    }
    for (i = 0; i < nPtenSpells; i++){
    ficha[labelPten + 'Spell' + i + 'Hit' ] = spellsHitPten[i]
    }
    for (i = 0; i < nPtenSpells; i++){
    ficha[labelPten + 'Spell' + i + 'Dmg' ] = spellsDmgPten[i]
    }
}


//console.log(ficha)
console.log((JSON.stringify(ficha)))








})();
