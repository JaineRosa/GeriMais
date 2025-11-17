package com.example.notification_service.Repository;

import com.example.notification_service.Models.LogAlerta;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogAlertaRepository extends MongoRepository<LogAlerta, String> {
}