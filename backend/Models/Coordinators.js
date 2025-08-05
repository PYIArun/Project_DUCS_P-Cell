import mongoose from 'mongoose';

const CoordinatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  linkedin: { type: String, required: true },
  phone: { type: String, required: true },
}, 
{ strict: false } // Allows additional fields if needed
);

const Coordinator = mongoose.model('Coordinator', CoordinatorSchema);
export default Coordinator;
