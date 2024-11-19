import Client from '../models/Client.js';

export const createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    client.password = undefined;
    res.status(201).json({
      status: 'success',
      data: client
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().select('-password');
    res.status(200).json({
      status: 'success',
      data: clients
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const getClientByCedula = async (req, res) => {
  try {
    const client = await Client.findOne({ cedula: req.params.cedula }).select('-password');
    if (!client) {
      return res.status(404).json({
        status: 'error',
        message: 'Client not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: client
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const updateClient = async (req, res) => {
  try {
    const client = await Client.findOneAndUpdate(
      { cedula: req.params.cedula },
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    
    if (!client) {
      return res.status(404).json({
        status: 'error',
        message: 'Client not found'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: client
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

export const deleteClient = async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({ cedula: req.params.cedula });
    if (!client) {
      return res.status(404).json({
        status: 'error',
        message: 'Client not found'
      });
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};