// Handle booking functionality for destinations
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const bookingModal = document.getElementById('bookingModal');
    const paymentModal = document.getElementById('paymentModal');
    const bookingForm = document.getElementById('bookingForm');
    const paymentForm = document.getElementById('paymentForm');
    
    // Get all booking buttons
    const bookBtns = document.querySelectorAll('.book-btn');
    
    // Price map for room types
    const roomPrices = {
        'standard': 150,
        'deluxe': 250,
        'suite': 350,
        'villa': 500
    };
    
    // Add click event to all booking buttons
    bookBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const destination = this.getAttribute('data-destination');
            document.getElementById('destinationName').textContent = destination;
            document.getElementById('destinationInput').value = destination;
            
            // Set minimum date for check-in to today
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('checkIn').min = today;
            
            // Display the modal
            bookingModal.style.display = 'block';
        });
    });
    
    // Close modal when clicking on X
    document.querySelector('.close').addEventListener('click', function() {
        bookingModal.style.display = 'none';
    });
    
    document.querySelector('.payment-close').addEventListener('click', function() {
        paymentModal.style.display = 'none';
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === bookingModal) {
            bookingModal.style.display = 'none';
        }
        if (event.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });
    
    // Update total price when form fields change
    const updatePrice = function() {
        const roomType = document.getElementById('roomType').value;
        const checkIn = new Date(document.getElementById('checkIn').value);
        const checkOut = new Date(document.getElementById('checkOut').value);
        
        // Calculate number of nights
        let nights = 0;
        if (!isNaN(checkIn.getTime()) && !isNaN(checkOut.getTime())) {
            nights = Math.max(1, Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
        }
        
        // Calculate total price
        const pricePerNight = roomPrices[roomType] || 150;
        const totalPrice = nights * pricePerNight;
        
        document.getElementById('totalPrice').textContent = totalPrice;
    };
    
    // Check-out date should be after check-in date
    document.getElementById('checkIn').addEventListener('change', function() {
        const checkInDate = new Date(this.value);
        const nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        
        const checkOutInput = document.getElementById('checkOut');
        checkOutInput.min = nextDay.toISOString().split('T')[0];
        
        // If current check-out date is before new check-in date, update it
        const checkOutDate = new Date(checkOutInput.value);
        if (checkOutDate <= checkInDate) {
            checkOutInput.value = nextDay.toISOString().split('T')[0];
        }
        
        updatePrice();
    });
    
    // Update price when form fields change
    ['checkOut', 'roomType'].forEach(id => {
        document.getElementById(id).addEventListener('change', updatePrice);
    });
    
    // Handle booking form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            destination: document.getElementById('destinationInput').value,
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            adults: document.getElementById('adults').value,
            children: document.getElementById('children').value,
            roomType: document.getElementById('roomType').value,
            paymentMethod: document.getElementById('paymentMethod').value,
            totalPrice: document.getElementById('totalPrice').textContent
        };
        
        // Validate dates
        if (!formData.checkIn || !formData.checkOut) {
            alert('Please select valid dates');
            return;
        }
        
        // Fill payment modal with booking details
        document.getElementById('paymentDestination').textContent = formData.destination;
        document.getElementById('paymentDates').textContent = `${formData.checkIn} to ${formData.checkOut}`;
        document.getElementById('paymentGuests').textContent = `${formData.adults} Adult(s), ${formData.children} Children`;
        
        // Format room type (capitalize first letter)
        const roomTypeFormatted = formData.roomType.charAt(0).toUpperCase() + formData.roomType.slice(1);
        document.getElementById('paymentRoom').textContent = `${roomTypeFormatted} ($${roomPrices[formData.roomType]}/night)`;
        
        document.getElementById('paymentTotal').textContent = formData.totalPrice;
        
        // Hide booking modal and show payment modal
        bookingModal.style.display = 'none';
        paymentModal.style.display = 'block';
    });
    
    // Handle payment form submission
    paymentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get booking data from previous form
        const bookingData = {
            destination: document.getElementById('destinationInput').value,
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            adults: document.getElementById('adults').value,
            children: document.getElementById('children').value,
            roomType: document.getElementById('roomType').value,
            paymentMethod: document.getElementById('paymentMethod').value,
            totalPrice: document.getElementById('totalPrice').textContent
        };
        
        try {
            // Send booking data to backend
            const response = await fetch('/destinations/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('Booking successful! You can view your booking in the dashboard.');
                window.location.href = '/dashboard';
            } else {
                alert(data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
        
        // Close modal
        paymentModal.style.display = 'none';
    });
});
