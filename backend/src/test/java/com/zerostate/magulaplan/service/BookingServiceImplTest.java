package com.zerostate.magulaplan.service;

import com.zerostate.magulaplan.dto.BookingCheckoutRequestDto;
import com.zerostate.magulaplan.dto.BookingResponseDto;
import com.zerostate.magulaplan.entity.Booking;
import com.zerostate.magulaplan.entity.User;
import com.zerostate.magulaplan.entity.Vendor;
import com.zerostate.magulaplan.exception.ResourceNotFoundException;
import com.zerostate.magulaplan.repo.BookingRepository;
import com.zerostate.magulaplan.repo.UserRepository;
import com.zerostate.magulaplan.repo.VendorRepository;
import com.zerostate.magulaplan.service.impl.BookingServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookingServiceImplTest {

    @Mock
    private BookingRepository bookingRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private VendorRepository vendorRepository;

    @InjectMocks
    private BookingServiceImpl bookingService;

    private User buildUser() {
        return User.builder().userId(1L).email("a@test.com").passwordHash("pw").build();
    }

    private Vendor buildVendor(Long id, String name) {
        return Vendor.builder().vendorId(id).businessName(name).build();
    }

    @Test
    @DisplayName("checkout() creates one booking per vendor and returns DTOs")
    void checkout_createsBookings() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(buildUser()));
        when(vendorRepository.findById(1L)).thenReturn(Optional.of(buildVendor(1L, "Sunset Studios")));
        when(vendorRepository.findById(2L)).thenReturn(Optional.of(buildVendor(2L, "Lakeview Gardens")));
        when(bookingRepository.save(any(Booking.class))).thenAnswer(inv -> inv.getArgument(0));

        List<BookingResponseDto> result = bookingService.checkout(
                new BookingCheckoutRequestDto(1L, List.of(1L, 2L)));

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getVendorName()).isEqualTo("Sunset Studios");
        assertThat(result.get(0).getStatus()).isEqualTo("PENDING");
        verify(bookingRepository, times(2)).save(any(Booking.class));
    }

    @Test
    @DisplayName("checkout() throws ResourceNotFoundException when a vendor is missing")
    void checkout_throwsWhenVendorMissing() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(buildUser()));
        when(vendorRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> bookingService.checkout(new BookingCheckoutRequestDto(1L, List.of(99L))))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    @DisplayName("getBookingsByUserId() returns the user's bookings")
    void getBookingsByUserId_returnsBookings() {
        Booking booking = Booking.builder()
                .bookingId(1L)
                .user(buildUser())
                .vendor(buildVendor(1L, "Sunset Studios"))
                .status("PENDING")
                .build();
        when(bookingRepository.findByUser_UserId(1L)).thenReturn(List.of(booking));

        List<BookingResponseDto> result = bookingService.getBookingsByUserId(1L);

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getVendorName()).isEqualTo("Sunset Studios");
    }
}
