package tk.solex.api.dao;

import org.springframework.data.repository.CrudRepository;
import tk.solex.api.model.Message;

public interface MessageDAO extends CrudRepository<Message, Long> {
}
