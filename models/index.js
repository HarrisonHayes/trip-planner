const User = require('./User');
const Trip = require('./Trip');
const Destination = require('./Destination');
const Document = require('./Document');
const DocumentType = require('./DocumentType');

User.hasMany(Trip, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Trip.belongsTo(User, {
  foreignKey: 'user_id',
});

Trip.hasMany(Destination, {
  foreignKey: 'trip_id',
  onDelete: 'CASCADE',
});

Destination.belongsTo(Trip, {
  foreignKey: 'trip_id',
});

Destination.hasMany(Document, {
  foreignKey: 'destination_id',
  onDelete: 'CASCADE',
});

Document.belongsTo(Destination, {
  foreignKey: 'destination_id',
});

// Document.hasOne(DocumentType, {
//   foreignKey: 'type_id',
// });

// DocumentType.belongsTo(Document, {
//   foreignKey: 'type_id',
// });

module.exports = { User, Trip, Destination, Document, DocumentType };
