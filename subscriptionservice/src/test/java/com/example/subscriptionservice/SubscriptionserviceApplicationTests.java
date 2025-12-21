package com.example.subscriptionservice;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Disabled("Disabled in CI due to logging classpath issues with snapshot Spring Boot; replaced by unit tests")
class SubscriptionserviceApplicationTests {

	@Test
	void contextLoads() {
	}

}
