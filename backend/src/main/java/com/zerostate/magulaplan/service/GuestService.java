package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.entity.Guest;

import java.util.List;
import java.util.UUID;

public interface GuestService {

//    save guest
    Guest saveGuest(Guest guest);

//    fetch all guest
    List<Guest> getAllGuests();

    Guest getGuestById(UUID guestId);

    Guest UpdateGuest(Guest guest);


}
