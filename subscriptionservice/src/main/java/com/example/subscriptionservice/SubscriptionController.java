package com.example.subscriptionservice;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SubscriptionController {

    private final SubscriptionRepository repository;

    public SubscriptionController(SubscriptionRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/subscriptions")
    public List<Subscription> getAll() {
        return repository.findAll();
    }

    @PostMapping("/subscriptions")
    public Subscription create(@Valid @RequestBody Subscription subscription) {
        return repository.save(subscription);
    }

    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
        List<Subscription> list = repository.findAll();

        int total = list.stream()
                .mapToInt(Subscription::getPrice)
                .sum();

        Map<String, Object> response = new HashMap<>();
        response.put("total", total);
        response.put("count", list.size());
        response.put("nextRenewal", null);

        return response;
    }
}

