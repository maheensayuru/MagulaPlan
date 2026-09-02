package com.zerostate.magulaplan.repo;

import com.zerostate.magulaplan.entity.Guest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface GuestRepository extends JpaRepository<Guest, UUID> {
    List<Guest> findByUser_UserId(Long userId);
}
