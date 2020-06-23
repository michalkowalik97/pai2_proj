package tk.solex.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.aspectj.lang.annotation.After;
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
import tk.solex.api.message.request.LoginDTO;
import tk.solex.api.message.request.RegisterDTO;
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
class LoginControllerTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    MockMvc mockMvc;

    @Autowired
    UserDAO userDAO;

    @Autowired
    RoleDAO roleDAO;


    @BeforeAll()
    void createUser() throws  Exception {
        RegisterDTO registerDTO = new RegisterDTO();
        registerDTO.setAddress("TESTADDRESS");
        registerDTO.setEmail("TESTEMAIL222333");
        registerDTO.setUsername("TESTUSERNAME12345");
        registerDTO.setPassword("12345");
        registerDTO.setPhone("123456789");
        mockMvc.perform(post("/api/register")
                .content(objectMapper.writeValueAsString(registerDTO))
                .contentType("application/json"))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    void should_login() throws  Exception {
        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setUsername("TESTUSERNAME12345");
        loginDTO.setPassword("12345");
        mockMvc.perform(post("/api/login")
                .content(objectMapper.writeValueAsString(loginDTO))
                .contentType("application/json"))
                .andDo(print())
                .andExpect(status().is(200));
    }

    @AfterAll()
    void deleteUser() {

        User user = userDAO.findByUsername("TESTUSERNAME12345").get();
        userDAO.delete(user);
    }
}