package tk.solex.api.controller;

import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tk.solex.api.dao.CategoryDAO;
import tk.solex.api.model.Category;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryDAO categoryDAO;

    @GetMapping("/public/getAllCategories")
    public String getAllCategories(){
        List<Category> categories =  categoryDAO.findAll();

        return new Gson().toJson(categories);

    }


}
