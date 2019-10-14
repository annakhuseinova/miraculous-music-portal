package com.example.miraculousbackend.controllers;

import com.example.miraculousbackend.services.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/search")
@CrossOrigin(origins = "*")
public class SearchController {

    private SearchService searchService;

    @Autowired
    public void setSearchService(SearchService searchService) {
        this.searchService = searchService;
    }

    @GetMapping("/{keyword}")
    public ResponseEntity<?> getSearchResults(@PathVariable("keyword") String keyword){

        return searchService.getSearchResults(keyword);
    }
}
