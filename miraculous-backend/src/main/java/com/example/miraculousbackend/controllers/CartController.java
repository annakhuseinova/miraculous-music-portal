package com.example.miraculousbackend.controllers;

import com.example.miraculousbackend.dto.AlbumCartDto;
import com.example.miraculousbackend.dto.TrackCartDto;
import com.example.miraculousbackend.services.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RequestMapping("/cart")
@RestController
public class CartController {


    private CartService cartService;

    @Autowired
    public void setCartService(CartService cartService) {
        this.cartService = cartService;
    }

    @PutMapping("/albums")
    @Secured({"ROLE_ARTIST", "ROLE_USER","ROLE_ADMIN"})
    public ResponseEntity<?> putOrRemoveAlbumFromCart(@RequestBody AlbumCartDto albumCartDto){

        return cartService.putOrRemoveAlbumFromCart(albumCartDto);
    }

    @PutMapping("/tracks")
    @Secured({"ROLE_ARTIST", "ROLE_USER","ROLE_ADMIN"})
    public ResponseEntity<?> putOrRemoveTrackFromCart(@RequestBody TrackCartDto trackCartDto){

        return cartService.putOrRemoveTrackFromCart(trackCartDto);

    }

}
