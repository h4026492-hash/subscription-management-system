package com.example.subscriptionservice;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class SubscriptionService {

    private final SubscriptionRepository repository;

    public SubscriptionService(SubscriptionRepository repository) {
        this.repository = repository;
    }

    public List<Subscription> getAllSubscriptions() {
        return repository.findAll();
    }

    public Subscription createSubscription(Subscription subscription) {
        return repository.save(subscription);
    }

    public void deleteSubscription(Long id) {
        repository.deleteById(id);
    }
}

