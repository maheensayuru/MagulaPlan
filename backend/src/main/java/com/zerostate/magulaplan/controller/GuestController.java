package com.zerostate.magulaplan.controller;

import com.zerostate.magulaplan.dto.GuestRequestDto;
import com.zerostate.magulaplan.dto.GuestResponseDto;
import com.zerostate.magulaplan.service.GuestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/guests")
public class GuestController {

    private final GuestService guestService;


    @Autowired
    public GuestController(GuestService guestService) {

        this.guestService = guestService;
    }


    //    1. Create new guest
    @PostMapping
    public ResponseEntity<GuestResponseDto> createGuest(@RequestBody GuestRequestDto guestRequestDto) {
        GuestResponseDto createdGuest = guestService.saveGuest(guestRequestDto);

//        201
        return new ResponseEntity<>(createdGuest, HttpStatus.CREATED);
    }

//    2. Read all guests
    @GetMapping
    public ResponseEntity<List<GuestResponseDto>> getAllGuests(){
        List<GuestResponseDto> getAllGuests = guestService.getAllGuests();

//        200
        return new ResponseEntity<>(getAllGuests, HttpStatus.OK);
    }

//    3. Read one guest by ID
    @GetMapping("/{guestId}")
    public ResponseEntity<GuestResponseDto> getGuestById(@PathVariable UUID guestId){
        GuestResponseDto guest = guestService.getGuestById(guestId);

//        200
        return ResponseEntity.ok(guest);
    }

//    4. UPDATE an existing guest
    @PutMapping("/{guestId}")
    public ResponseEntity<GuestResponseDto> updateGuest(@PathVariable UUID guestId, @RequestBody GuestRequestDto guestRequestDto){

        GuestResponseDto updateGuest = guestService.updateGuest(guestId,  guestRequestDto);

//        200
        return ResponseEntity.ok(updateGuest);
    }

//    5. Delete a guest
    @DeleteMapping("/{guestId}")
    public ResponseEntity<Void> deleteGuest(@PathVariable UUID guestId){
        guestService.deleteGuest(guestId);
//  Return 204 NO Content status
        return ResponseEntity.noContent().build();
    }
}
