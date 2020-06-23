package tk.solex.api.controller;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tk.solex.api.dao.CategoryDAO;
import tk.solex.api.model.Category;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryDAO categoryDAO;

    @GetMapping("/public/getAllCategories")
    public String getAllCategories(@RequestParam(required = false) boolean onlyMain) {

        if (onlyMain == false) {
            List<Category> categories = categoryDAO.findAll();
            return new Gson().toJson(categories);

        } else {
            List<Category> categories = categoryDAO.findAllByParent(null);
            return new Gson().toJson(categories);
        }
    }

    @GetMapping("/public/getCategory")
    public Optional<Category> getCategory(@RequestParam(required = false) Long id) {
        Optional<Category> categories = categoryDAO.findById(id);
        return categories;
    }


}
