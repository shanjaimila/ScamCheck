package com.scamcheck.controller;

import com.scamcheck.dto.AnalysisResponse;
import com.scamcheck.dto.CaseSummaryDto;
import com.scamcheck.service.HistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class HistoryController {

    private final HistoryService historyService;

    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping
    public ResponseEntity<List<CaseSummaryDto>> getAllCases() {
        return ResponseEntity.ok(historyService.getAllCases());
    }

    @GetMapping("/{caseId}")
    public ResponseEntity<AnalysisResponse> getCaseById(@PathVariable String caseId) {
        return ResponseEntity.ok(historyService.getCaseById(caseId));
    }

    @DeleteMapping("/{caseId}")
    public ResponseEntity<Void> deleteCase(@PathVariable String caseId) {
        historyService.deleteCase(caseId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> clearAllHistory() {
        historyService.clearAllHistory();
        return ResponseEntity.noContent().build();
    }
}
