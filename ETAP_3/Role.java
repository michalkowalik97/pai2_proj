@Entity
@Table(name = "role")
public class Role {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long Id;

    private String name;

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

    @Override
    public String toString() {
        return "Role{" +
                "Id=" + Id +
                ", name='" + name + '\'' +
                '}';
    }
}
