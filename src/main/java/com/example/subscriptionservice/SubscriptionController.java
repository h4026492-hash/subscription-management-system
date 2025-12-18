package com.example.subscriptionservice;

import java.util.List;

import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SubscriptionController {

    private static final Logger log =
            LoggerFactory.getLogger(SubscriptionController.class);

    private final SubscriptionService service;

    public SubscriptionController(SubscriptionService service) {
        this.service = service;
    }

    @GetMapping("/subscriptions")
    public List<Subscription> getSubscriptions() {
        log.info("Fetching all subscriptions");
        return service.getAllSubscriptions();
    }

    @PostMapping("/subscriptions")
    public Subscription createSubscription(
            @Valid @RequestBody Subscription subscription) {

        log.info("Creating subscription plan={} price={}",
                subscription.getPlan(),
                subscription.getPrice());

        return service.createSubscription(subscription);
    }

    @DeleteMapping("/subscriptions/{id}")
    public void deleteSubscription(@PathVariable Long id) {
        log.info("Deleting subscription id={}", id);
        service.deleteSubscription(id);
    }
}



