const express = require('express')
const axios = require('axios')
const router = express.Router()

router.post('/', async (req, res) => {
  const patientData = {
    resourceType: "Patient",
    name: [{ use: "official", family: req.body.lastName, given: [req.body.firstName] }],
    gender: req.body.gender,
    birthDate: req.body.birthDate
  };

  try {
    const response = await axios.post('http://localhost:8080/fhir/Patient', patientData, {
      headers: { 'Content-Type': 'application/fhir+json' }
    });
    res.status(201).json(response.data)
  } catch (error) {
    console.error(error.response.data)
    res.status(500).json({ error: 'Failed to create patient' })
  }
});

router.get('/search', async (req, res) => {
    const name = req.query.name
  
    try {
      const response = await axios.get(`http://localhost:8080/fhir/Patient?name=${encodeURIComponent(name)}`, {
        headers: { 'Accept': 'application/fhir+json' }
      });
  
      res.json(response.data)
    } catch (error) {
      console.error('Error fetching patient by name:', error.message)
      res.status(500).json({ error: 'Failed to fetch patient' })
    }
  });

 
router.put('/:id', async (req, res) => {
  const patientId = req.params.id;
  const updatedPatientData = req.body;

  try {
    const response = await axios.put(
      `http://localhost:8080/fhir/Patient/${patientId}`,
      updatedPatientData,
      { headers: { 'Content-Type': 'application/fhir+json' } }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error updating patient:', error.message);
    res.status(500).json({ error: 'Failed to update patient' });
  }
});


router.delete('/:id', async (req, res) => {
  const patientId = req.params.id;

  try {
    const response = await axios.delete(`http://localhost:8080/fhir/Patient/${patientId}`);
    res.json({ message: `Patient ${patientId} deleted successfully.` });
  } catch (error) {
    console.error('Error deleting patient:', error.message);
    res.status(500).json({ error: 'Failed to delete patient' });
  }
});



module.exports = router;
