package tk.solex.api.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import javax.xml.bind.DatatypeConverter;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;

@Service
public class FileStorageService {
    @Value("${upload.path}")
    private String path;

    public void delete(String fileName) throws IOException {
        Files.delete( Paths.get(fileName));
    }

    public String upload(MultipartFile file) throws IOException, NoSuchAlgorithmException {
        if(file.isEmpty()) {
            throw new IOException("File was empty");
        }
        MessageDigest md = MessageDigest.getInstance("MD5");
        String timestamp = file.getOriginalFilename() + Instant.now().getEpochSecond();

        md.update(timestamp.getBytes());
        byte[] digest = md.digest();
        String fileName = DatatypeConverter
                .printHexBinary(digest).toUpperCase() + getFileExtension(file);

        InputStream fileStream = file.getInputStream();

        Files.copy(fileStream, Paths.get(path+fileName), StandardCopyOption.REPLACE_EXISTING);
        return path+fileName;
    }

    private static String getFileExtension(MultipartFile file) {
        String extension = "";

        try {
            if (!file.isEmpty()) {
                String name = file.getOriginalFilename();
                extension = name.substring(name.lastIndexOf("."));
            }
        } catch (Exception e) {
            extension = "";
        }

        return extension;

    }


}
