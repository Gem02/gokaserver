const UserModel = require('../models/User');

const getWorkersByLocation = async (req, res) => {
    const { filter, search } = req.query;
    
  
    if (req.user) {

      try {
        const id = req.user.id;
        const user = await UserModel.findById(id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        
        let query = { role: 'artisan' };
  
        
        if (filter === 'area') {
          query.area = user.area;
        } else if (filter === 'lga') {
          query.lga = user.lga;
        } else if (filter === 'state') {
          query.state = user.state;
        } else if(filter === 'all'){
          const workers = await UserModel.find(query).select('-password');
          return res.status(200).json(workers);
        } else {
          return res.status(400).json({ message: 'Invalid filter type' });
        }
  
       
        if (search) {
          query.$or = [
            { name: { $regex: search, $options: 'i' } }, // Search by name
            { businessName: { $regex: search, $options: 'i' } }, // Search by business name
            { specialization: { $regex: search, $options: 'i' } } // Search by specialization
          ];
        }
        const workers = await UserModel.find(query).select('-password');
        res.status(200).json(workers);
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
      }
    } else {
      res.status(500).json({ message: 'User not authenticated' });
    }
  };

const categoryWorker = async(req, res) =>{
  const {search} = req.query
  let query = {}

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } }, // Search by name
      { businessName: { $regex: search, $options: 'i' } }, // Search by business name
      { specialization: { $regex: search, $options: 'i' } } // Search by specialization
    ];
  }

  const workers = await UserModel.find(query).select('-password');
  return res.status(200).json(workers);
}

module.exports = {getWorkersByLocation, categoryWorker}