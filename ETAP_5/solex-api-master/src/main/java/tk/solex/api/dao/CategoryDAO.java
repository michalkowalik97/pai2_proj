package tk.solex.api.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tk.solex.api.model.Category;

public interface CategoryDAO extends JpaRepository<Category, Long> {
}
