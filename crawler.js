//version: 0.0.1

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  await console.log('Launching test');

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 })
  await page.goto('https://www.dndbeyond.com/characters/33025149/xRU80d');
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
   document.querySelectorAll('.ddbc-combat-attack__tohit'),
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
if (await page.$('.ct-primary-box > .ddbc-tab-list > .ddbc-tab-list__nav > .ct-primary-box__tab--spells > .ddbc-tab-list__nav-item-label') !== null)
{

await page.click('.ct-primary-box > .ddbc-tab-list > .ddbc-tab-list__nav > .ct-primary-box__tab--spells > .ddbc-tab-list__nav-item-label')

 const castInfo = await page.evaluate(() =>
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
     const spellsNamePone = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ddbc-spell-name'),
        (element, index) => element.textContent,
       )
     )
     const spellsTimePone = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__activation'),
        (element, index) => element.textContent,
       )
     )
     const spellsRangePone = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__range'),
        (element, index) => element.textContent,
       )
     )
     const spellsHitPone = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__attacking'),
        (element, index) => element.textContent,
       )
     )
     const spellsDmgPone = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__damage'),
        (element, index) => element.textContent,
       )
     )
     //console.log(spellsNamePone)
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
     const spellsNamePtwo = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ddbc-spell-name'),
        (element, index) => element.textContent,
       )
     )
     const spellsTimePtwo = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__activation'),
        (element, index) => element.textContent,
       )
     )
     const spellsRangePtwo = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__range'),
        (element, index) => element.textContent,
       )
     )
     const spellsHitPtwo = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__attacking'),
        (element, index) => element.textContent,
       )
     )
     const spellsDmgPtwo = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__damage'),
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
     const spellsNamePthree = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ddbc-spell-name'),
        (element, index) => element.textContent,
       )
     )
     const spellsTimePthree = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__activation'),
        (element, index) => element.textContent,
       )
     )
     const spellsRangePthree = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__range'),
        (element, index) => element.textContent,
       )
     )
     const spellsHitPthree = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__attacking'),
        (element, index) => element.textContent,
       )
     )
     const spellsDmgPthree = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__damage'),
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
     const spellsNamePfour = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ddbc-spell-name'),
        (element, index) => element.textContent,
       )
     )
     const spellsTimePfour = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__activation'),
        (element, index) => element.textContent,
       )
     )
     const spellsRangePfour = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__range'),
        (element, index) => element.textContent,
       )
     )
     const spellsHitPfour = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__attacking'),
        (element, index) => element.textContent,
       )
     )
     const spellsDmgPfour = await page.evaluate(() =>
       Array.from(
        document.querySelectorAll('.ct-spells-spell__damage'),
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
      const spellsNamePfive = await page.evaluate(() =>
        Array.from(
         document.querySelectorAll('.ddbc-spell-name'),
         (element, index) => element.textContent,
        )
      )
      const spellsTimePfive = await page.evaluate(() =>
        Array.from(
         document.querySelectorAll('.ct-spells-spell__activation'),
         (element, index) => element.textContent,
        )
      )
      const spellsRangePfive = await page.evaluate(() =>
        Array.from(
         document.querySelectorAll('.ct-spells-spell__range'),
         (element, index) => element.textContent,
        )
      )
      const spellsHitPfive = await page.evaluate(() =>
        Array.from(
         document.querySelectorAll('.ct-spells-spell__attacking'),
         (element, index) => element.textContent,
        )
      )
      const spellsDmgPfive = await page.evaluate(() =>
        Array.from(
         document.querySelectorAll('.ct-spells-spell__damage'),
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
       const spellsNamePsix = await page.evaluate(() =>
         Array.from(
          document.querySelectorAll('.ddbc-spell-name'),
          (element, index) => element.textContent,
         )
       )
       const spellsTimePsix = await page.evaluate(() =>
         Array.from(
          document.querySelectorAll('.ct-spells-spell__activation'),
          (element, index) => element.textContent,
         )
       )
       const spellsRangePsix = await page.evaluate(() =>
         Array.from(
          document.querySelectorAll('.ct-spells-spell__range'),
          (element, index) => element.textContent,
         )
       )
       const spellsHitPsix = await page.evaluate(() =>
         Array.from(
          document.querySelectorAll('.ct-spells-spell__attacking'),
          (element, index) => element.textContent,
         )
       )
       const spellsDmgPsix = await page.evaluate(() =>
         Array.from(
          document.querySelectorAll('.ct-spells-spell__damage'),
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
        const spellsNamePseven = await page.evaluate(() =>
          Array.from(
           document.querySelectorAll('.ddbc-spell-name'),
           (element, index) => element.textContent,
          )
        )
        const spellsTimePseven = await page.evaluate(() =>
          Array.from(
           document.querySelectorAll('.ct-spells-spell__activation'),
           (element, index) => element.textContent,
          )
        )
        const spellsRangePseven = await page.evaluate(() =>
          Array.from(
           document.querySelectorAll('.ct-spells-spell__range'),
           (element, index) => element.textContent,
          )
        )
        const spellsHitPseven = await page.evaluate(() =>
          Array.from(
           document.querySelectorAll('.ct-spells-spell__attacking'),
           (element, index) => element.textContent,
          )
        )
        const spellsDmgPseven = await page.evaluate(() =>
          Array.from(
           document.querySelectorAll('.ct-spells-spell__damage'),
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
         const spellsNamePeight = await page.evaluate(() =>
           Array.from(
            document.querySelectorAll('.ddbc-spell-name'),
            (element, index) => element.textContent,
           )
         )
         const spellsTimePeight = await page.evaluate(() =>
           Array.from(
            document.querySelectorAll('.ct-spells-spell__activation'),
            (element, index) => element.textContent,
           )
         )
         const spellsRangePeight = await page.evaluate(() =>
           Array.from(
            document.querySelectorAll('.ct-spells-spell__range'),
            (element, index) => element.textContent,
           )
         )
         const spellsHitPeight = await page.evaluate(() =>
           Array.from(
            document.querySelectorAll('.ct-spells-spell__attacking'),
            (element, index) => element.textContent,
           )
         )
         const spellsDmgPeight = await page.evaluate(() =>
           Array.from(
            document.querySelectorAll('.ct-spells-spell__damage'),
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
          const spellsNamePnine = await page.evaluate(() =>
            Array.from(
             document.querySelectorAll('.ddbc-spell-name'),
             (element, index) => element.textContent,
            )
          )
          const spellsTimePnine = await page.evaluate(() =>
            Array.from(
             document.querySelectorAll('.ct-spells-spell__activation'),
             (element, index) => element.textContent,
            )
          )
          const spellsRangePnine = await page.evaluate(() =>
            Array.from(
             document.querySelectorAll('.ct-spells-spell__range'),
             (element, index) => element.textContent,
            )
          )
          const spellsHitPnine = await page.evaluate(() =>
            Array.from(
             document.querySelectorAll('.ct-spells-spell__attacking'),
             (element, index) => element.textContent,
            )
          )
          const spellsDmgPnine = await page.evaluate(() =>
            Array.from(
             document.querySelectorAll('.ct-spells-spell__damage'),
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
           const spellsNamePten = await page.evaluate(() =>
             Array.from(
              document.querySelectorAll('.ddbc-spell-name'),
              (element, index) => element.textContent,
             )
           )
           const spellsTimePten = await page.evaluate(() =>
             Array.from(
              document.querySelectorAll('.ct-spells-spell__activation'),
              (element, index) => element.textContent,
             )
           )
           const spellsRangePten = await page.evaluate(() =>
             Array.from(
              document.querySelectorAll('.ct-spells-spell__range'),
              (element, index) => element.textContent,
             )
           )
           const spellsHitPten = await page.evaluate(() =>
             Array.from(
              document.querySelectorAll('.ct-spells-spell__attacking'),
              (element, index) => element.textContent,
             )
           )
           const spellsDmgPten = await page.evaluate(() =>
             Array.from(
              document.querySelectorAll('.ct-spells-spell__damage'),
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

/*console.log(featTitle)
console.log(featDescription)
console.log(featTitle.length)
console.log(featDescription.length)*/


 console.log((JSON.stringify(charName.concat(charRace, charClass))))
 /*console.log('Atributes', (JSON.stringify(charStats)))
 console.log('Modifiers',(JSON.stringify(charStatsMod)))
 console.log('Proficiency',(JSON.stringify(charBonus)))
 console.log('Speed', (JSON.stringify(charSpeed)))
 console.log('Hp', (JSON.stringify(charHp)))
 console.log('Saves', (JSON.stringify(charSav)))
 console.log('Advantage',(JSON.stringify(savAdv)))//Can affect index and final string length
 console.log('Senses', (JSON.stringify(charSen)))
 console.log('Vision', (JSON.stringify(charSenExtra)))
 console.log('Proficiencies', (JSON.stringify(charProf)))
 console.log('Skills', (JSON.stringify(charSkill)))
 console.log('Initiative', (JSON.stringify(charInit)))
 console.log('AC', (JSON.stringify(charAc)))
 console.log('Defenses', (JSON.stringify(charDef)))
 console.log('Attacks', (JSON.stringify(charAttack)))
 console.log(attackName)
 console.log(attackRange)
 console.log(attackBonus)
 console.log(attackDamage)
 console.log(attackNotes)
 console.log(attackType)
 console.log(actionTitle)
 console.log(actionDescription)
 console.log(bonusActionTitle)
 console.log(bonusActionDescription)
 console.log(bonusActionSpellsTitle)
 console.log(bonusActionSpellsDescription)
 console.log(reactionTitle)
 onsole.log(reactionDescription)
 //Spell console.log(castInfo)
 */

 browser.close();
 console.log('Browser closed');

})();
