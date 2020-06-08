package tk.solex.api.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tk.solex.api.model.Advertisement;

import tk.solex.api.model.Category;

import java.util.List;
import java.util.Optional;

public interface AdvertisementDAO extends JpaRepository <Advertisement,Long> {

    List<Advertisement> findByTitleContaining(String title);
    List<Advertisement> findByTitleContainingAndCategory(String title, Optional<Category> category);
    List<Advertisement> findByTitleContainingAndCategoryIn(String title, List<Category> category);


}
