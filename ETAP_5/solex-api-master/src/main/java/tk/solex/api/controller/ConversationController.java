package tk.solex.api.controller;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.w3c.dom.UserDataHandler;
import tk.solex.api.dao.AdvertisementDAO;
import tk.solex.api.dao.ConversationDAO;
import tk.solex.api.dao.MessageDAO;
import tk.solex.api.dao.UserDAO;
import tk.solex.api.model.Conversation;
import tk.solex.api.model.Message;
import tk.solex.api.model.User;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Optional;

@RestController
public class ConversationController {
    @Autowired
    MessageDAO messageDAO;

    @Autowired
    ConversationDAO conversationDAO;

    @Autowired
    UserDAO userDAO;

    @Autowired
    AdvertisementDAO advertisementDAO;

    @RequestMapping("/wiadomosci")
    public String conversationPage() {
        return "<html><h1>Conversation Page</h1></html>";
    }

    @PostMapping("/nowa-konwersacja")
    public String newConversation(@RequestBody String json, HttpServletRequest request) {
        try {
            JSONParser parser = new JSONParser(json);
            LinkedHashMap<String, Object> convJson = parser.parseObject();
            Conversation conv = new Conversation();
            conv.setClient(getUser(request));
            conv.setAdvertisement(advertisementDAO.getOne(Long.parseLong((String) convJson.get("advertisement_id"))));
            conversationDAO.save(conv);
        } catch (Exception e) {
            System.out.println(e.getMessage().toString());
            return "Konwersacja nie została utworzona";
        }

        return "konwersacja utworzona";
    }

    @PostMapping("/nowa-wiadomosc")
    public String newMessage(@RequestBody String json, HttpServletRequest request) {

        try {
            JSONParser parser = new JSONParser(json);
            LinkedHashMap<String, Object> messageJson = parser.parseObject();
            Message mess = new Message();
            mess.setBody((String) messageJson.get("body"));
            mess.setDateTime(new Date());
            mess.setConversation(conversationDAO.getOne(Long.parseLong((String) messageJson.get("conversation_id"))));
            mess.setSender(getUser(request));

            messageDAO.save(mess);
        } catch (Exception e) {
            System.out.println(e.getMessage().toString());
            return "wiadomość nie została wysłana";
        }

        return "wiadomość została wysłana";
    }

    private User getUser(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        Optional<User> optionalUser = userDAO.findByUsername(principal.getName());
        return optionalUser.get();
    }
}
