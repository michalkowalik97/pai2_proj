package tk.solex.api.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tk.solex.api.model.Category;

import java.util.List;
import java.util.Optional;

public interface CategoryDAO extends JpaRepository<Category, Long> {

    Optional<Category> findById(Long id);
  //  List<Category> findAllById(Long id);
    List<Category> findByParentIn(List<Category> categories);
    List<Category> findAllByParent(Category parent);
}
