package tk.solex.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import tk.solex.api.dao.UserDAO;
import tk.solex.api.model.User;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserDAO userDAO;

    @Test
    @WithMockUser(username = "admin", password = "admin", roles = "ADMIN")
    void addUser() throws Exception {
        User user = new User();
        user.setUsername("test");
        user.setPasswordHash("test");

        ObjectMapper objectMapper = new ObjectMapper();
        String obj = "";
        try {
            obj = objectMapper.writeValueAsString(user);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        mockMvc.perform(post("/users/new")
        .content(obj).contentType(MediaType.APPLICATION_JSON)).andDo(print()).andExpect(status().isOk());

        user = userDAO.findByUsername("test").get();
        userDAO.delete(user);
    }
}