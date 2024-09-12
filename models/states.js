const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AreaSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});


const LGASchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  areas: [AreaSchema], 
});


const StateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  localGovernments: [LGASchema], 
});


const State = mongoose.model('State', StateSchema);

module.exports = State;
