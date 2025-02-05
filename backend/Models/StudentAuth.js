const mongoose = require('mongoose');

const StudentAuth = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },

});
// ******************** For later use **********************
// const mongoose = require('mongoose');

// const StudentAuth = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   isRegistered: { type: Boolean, required: true },
//   applied_companies: [{
//     companyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
//     appliedDate: { type: Date, default: Date.now }  // Add fields relevant to the application, if needed
//   }],
//   session: { type: Date, required: true }, // The session date
// });

// module.exports = mongoose.model("StudentAuth", StudentAuth);



module.exports = mongoose.model("StudentAuth",StudentAuth);