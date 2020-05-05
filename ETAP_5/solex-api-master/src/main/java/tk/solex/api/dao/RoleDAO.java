package tk.solex.api.dao;

import org.springframework.data.repository.CrudRepository;
import tk.solex.api.model.Role;

public interface RoleDAO extends CrudRepository<Role, Long> {
    public Role findRoleByName(String name);
}
