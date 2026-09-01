package com.scamcheck.repository;

import com.scamcheck.model.CaseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CaseRepository extends JpaRepository<CaseEntity, String> {
    List<CaseEntity> findAllByOrderByTimestampDesc();
}
