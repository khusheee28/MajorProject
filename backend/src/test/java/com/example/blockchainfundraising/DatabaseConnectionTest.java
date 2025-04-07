package com.example.blockchainfundraising;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class DatabaseConnectionTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void testDatabaseConnection() {
        ResponseEntity<String> response = restTemplate.postForEntity(
            "/api/campaigns/test",
            null,
            String.class
        );

        assertFalse(response.getStatusCode().is2xxSuccessful());
        assertNotNull(response.getBody());
        assertFalse(response.getBody().contains("Database connection successful"));
    }
} 