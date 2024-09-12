const State = require('../models/states'); 


const plateauState = new State({
  name: 'Plateau State',
  localGovernments: [
    {
      name: 'Jos North',
      areas: [
        { name: 'Tudun Wada' },
        { name: 'Farin Gada' },
        { name: 'Dadin Kowa/Kuffang' },
        { name: 'Jenta' },
        { name: 'Rayfield' },
      ]
    },
    {
      name: 'Jos South',
      areas: [
        { name: 'Bukuru' },
        { name: 'Du' },
        { name: 'Gyel' },
        { name: 'Vwang' },
        { name: 'Kuru' },
      ]
    },
    {
      name: 'Bassa',
      areas: [
        { name: 'Jengre' },
        { name: 'Miango' },
        { name: 'Rafin Bauna' },
        { name: 'Binchin' },
        { name: 'Rukuba' },
      ]
    },
    {
      name: 'Shendam',
      areas: [
        { name: 'Shendam' },
        { name: 'Kalong' },
        { name: 'Pankshin' },
        { name: 'Chip' },
        { name: 'Yelwa' },
      ]
    },
    {
      name: 'Riyom',
      areas: [
        { name: 'Riyom Town' },
        { name: 'Ta-Hoss' },
        { name: 'Kwi' },
        { name: 'Danto' },
        { name: 'Lughu' },
      ]
    },
  ]
});

// Create Bauchi State
const bauchiState = new State({
  name: 'Bauchi State',
  localGovernments: [
    {
      name: 'Bauchi',
      areas: [
        { name: 'Yelwa' },
        { name: 'Miri' },
        { name: 'Gwallameji' },
        { name: 'Kangere' },
        { name: 'Rafin Zurfi' },
      ]
    },
    {
      name: 'Tafawa Balewa',
      areas: [
        { name: 'Bununu' },
        { name: 'Lere' },
        { name: 'Tapshin' },
        { name: 'Bogoro' },
        { name: 'Wai' },
      ]
    },
    {
      name: 'Misau',
      areas: [
        { name: 'Misau Town' },
        { name: 'Zindi' },
        { name: 'Giade' },
        { name: 'Hardawa' },
        { name: 'Disina' },
      ]
    },
    {
      name: 'Azare',
      areas: [
        { name: 'Azare Town' },
        { name: 'Madachi' },
        { name: 'Bulkachuwa' },
        { name: 'Itas' },
        { name: 'Shira' },
      ]
    },
    {
      name: 'Katagum',
      areas: [
        { name: 'Katagum Town' },
        { name: 'Dambam' },
        { name: 'Chinade' },
        { name: 'Gamawa' },
        { name: 'Jama\'are' },
      ]
    },
  ]
});

// Create Nassarawa State
const nassarawaState = new State({
  name: 'Nassarawa State',
  localGovernments: [
    {
      name: 'Lafia',
      areas: [
        { name: 'Shabu' },
        { name: 'Kwandere' },
        { name: 'Doma' },
        { name: 'Agyaragu' },
        { name: 'Akura' },
      ]
    },
    {
      name: 'Keffi',
      areas: [
        { name: 'Angwan Lambu' },
        { name: 'Gandu' },
        { name: 'Tudun Wada' },
        { name: 'Sabon Gari' },
        { name: 'Angwan Rimi' },
      ]
    },
    {
      name: 'Akwanga',
      areas: [
        { name: 'Andaha' },
        { name: 'Ankwe' },
        { name: 'Ancho' },
        { name: 'Gudi' },
        { name: 'Nunku' },
      ]
    },
    {
      name: 'Karu',
      areas: [
        { name: 'Mararaba' },
        { name: 'Masaka' },
        { name: 'Ado' },
        { name: 'Nyanya' },
        { name: 'New Karu' },
      ]
    },
    {
      name: 'Nasarawa',
      areas: [
        { name: 'Nasarawa Town' },
        { name: 'Ara' },
        { name: 'Udege' },
        { name: 'Loko' },
        { name: 'Tunga' },
      ]
    },
  ]
});



module.exports = { plateauState, bauchiState, nassarawaState};

