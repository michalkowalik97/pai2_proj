package tk.solex.api.model;

import com.google.gson.annotations.SerializedName;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name="category")
public class Category {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @SerializedName(value = "value")
    private long Id;

    @SerializedName(value = "label")
    private String name;

    @ManyToOne(optional = true)
    private Category parent;


    public long getId() {
        return Id;
    }

    public void setId(long id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getParent() {
        return parent;
    }

    public void setParent(Category parent) {
        this.parent = parent;
    }

}