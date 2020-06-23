package tk.solex.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import tk.solex.api.dao.RoleDAO;
import tk.solex.api.dao.UserDAO;
import tk.solex.api.model.Role;
import tk.solex.api.model.User;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserDAO userDAO;

    @Autowired
    RoleDAO roleDAO;


    @BeforeAll()
    void createUser() throws Exception {
        userDAO.save(new User("testmail","testingonlyuser","","",new Date(), roleDAO.findByName("ROLE_USER").get()));
    }

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    void elevate() throws Exception {

        User user = userDAO.findByUsername("testingonlyuser").get();
        Role admin = roleDAO.findByName("ROLE_ADMIN").get();
        mockMvc.perform(put("/api/users/elevate?userId="+user.getId())).andDo(print()).andExpect(status().isOk());

    }
    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    void getAll() throws Exception {


        mockMvc.perform(get("/api/users/getAll")).andDo(print()).andExpect(status().isOk());

    }


    @AfterAll()
    void deleteUser() {

        User user = userDAO.findByUsername("testingonlyuser").get();
        userDAO.delete(user);
    }
}