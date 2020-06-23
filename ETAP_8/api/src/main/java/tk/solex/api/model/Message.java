package tk.solex.api.model;

import javax.persistence.*;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Entity
@Table(name="message")
public class Message {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long Id;

    private String body;

    private Date dateTime;

    @OneToOne
    private Conversation conversation;

    @OneToOne
    private User sender;

    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }

    public Conversation getConversation() {
        return conversation;
    }

    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }


}