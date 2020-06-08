package tk.solex.api.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import tk.solex.api.model.Conversation;

public interface ConversationDAO extends JpaRepository<Conversation, Long> {

    Conversation findFirstById(Long id);
}
