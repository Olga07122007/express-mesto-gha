const router = require('express').Router();

const {
  updateUserValidation,
  updateAvatarValidation,
  userIdValidation,
  createUserValidation,
} = require('../middlewares/validatons');

const {
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  getMe,
  createUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getMe);
router.get('/:userId', userIdValidation, getUser);
router.patch('/me', updateUserValidation, updateUser);
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);
router.post('/', createUserValidation, createUser);

module.exports = router;
