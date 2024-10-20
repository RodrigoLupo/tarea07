const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const Recipe = require('../models/Recipe');

/**
 * App Routes 
*/
router.get('/', recipeController.homepage);
router.get('/recipe/:id', recipeController.exploreRecipe );
router.get('/categories', recipeController.exploreCategories);
router.get('/categories/:id', recipeController.exploreCategoriesById);
router.post('/search', recipeController.searchRecipe);
router.get('/explore-latest', recipeController.exploreLatest);
router.get('/explore-random', recipeController.exploreRandom);
router.get('/submit-recipe', recipeController.submitRecipe);
router.post('/submit-recipe', recipeController.submitRecipeOnPost);
router.post('/delete-recipe/:id', recipeController.deleteRecipe);

// Ruta para mostrar el formulario de edición
router.get('/edit-recipe/:id', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    res.render('edit-recipe', { recipe });
});

// Ruta para enviar el formulario de edición
router.post('/edit-recipe/:id', recipeController.editRecipe);
 
module.exports = router;