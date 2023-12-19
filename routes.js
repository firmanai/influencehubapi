const express = require('express');
const router = express.Router();
const handlers = require('./handlers');

router.get('/', handlers.getAPI);
router.post('/register', handlers.registerUser);
router.post('/login', handlers.loginUser);
router.get('/kol', handlers.getAllKOL);
router.get('/kol/:ig', handlers.getKOLByUsername);
router.get('/find', handlers.getKOLByFollowers);
router.post('/kol', handlers.addKOL);
router.put('/kol/:ig', handlers.updateKOLByIG);
router.put('/kol/:oldIg/:newIg', handlers.updateKOLByOldAndNewIG);
router.delete('/kol/:ig', handlers.deleteKOLByIG);

module.exports = router;
