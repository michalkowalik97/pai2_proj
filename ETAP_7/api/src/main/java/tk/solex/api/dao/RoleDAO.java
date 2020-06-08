package tk.solex.api.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tk.solex.api.model.Role;

import java.util.Optional;

@Repository
public interface RoleDAO extends CrudRepository<Role, Long> {
    Optional<Role> findByName(String name);
}
